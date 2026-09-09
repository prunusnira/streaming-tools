export type RouletteWeightMode = "percentage" | "integer";
export type RouletteInputMode = "manual" | "chat" | "donation";
export type RouletteItem = { id: string; name: string; weight: number };
export type DonationTier = { id: string; minimumAmount: number; weight: number };
export type DonationSettings = {
    minimumAmount: number;
    minimumAmountEnabled: boolean;
    tiers: DonationTier[];
};
export type SavedRoulette = {
    donationSettings?: DonationSettings;
    id: string;
    inputMode: RouletteInputMode;
    items: RouletteItem[];
    spinDuration?: number;
    title: string;
    updatedAt: number;
    weightMode: RouletteWeightMode;
};

export const createDonationTier = (minimumAmount = 0): DonationTier => ({
    id: crypto.randomUUID(),
    minimumAmount,
    weight: 1,
});

export const createDonationSettings = (): DonationSettings => ({
    minimumAmount: 1000,
    minimumAmountEnabled: false,
    tiers: [createDonationTier()],
});

export const getDonationSettings = (roulette: Pick<SavedRoulette, "donationSettings">) =>
    roulette.donationSettings ?? createDonationSettings();

// 첫 금액 구간은 0원 또는 최소 금액부터 시작해. 시작 금액은 사용자가 바꿀 수 없어.
export const getDonationTiers = ({
    minimumAmount,
    minimumAmountEnabled,
    tiers,
}: DonationSettings): DonationTier[] => {
    const first = minimumAmountEnabled ? Math.max(minimumAmount, 0) : 0;
    const [head, ...rest] = [...tiers].sort(
        (left, right) => left.minimumAmount - right.minimumAmount,
    );
    if (!head) return [];
    return [{ ...head, minimumAmount: first }, ...rest];
};

export const getRouletteItemName = (item: Pick<RouletteItem, "name">) =>
    item.name.trim() || "(이름없음)";

const greatestCommonDivisor = (left: number, right: number): number =>
    right === 0 ? left : greatestCommonDivisor(right, left % right);

const getDecimalScale = (items: RouletteItem[]) => {
    const decimals = items.reduce((maximum, item) => {
        const decimalPart = item.weight.toString().split(".")[1];
        return Math.max(maximum, decimalPart?.length ?? 0);
    }, 0);
    return 10 ** Math.min(decimals, 6);
};

export const convertRouletteWeightMode = (
    items: RouletteItem[],
    from: RouletteWeightMode,
    to: RouletteWeightMode,
): RouletteItem[] => {
    if (from === to) return items;

    if (to === "percentage") {
        const weights = items.map((item) => Math.max(item.weight, 0));
        const total = weights.reduce((sum, weight) => sum + weight, 0);
        if (!total) return items;
        // 소수 퍼센트 대신 합계 100의 정수를 유지해. 남는 값은 소수 부분이 큰 항목부터 배분해
        // 원래 비율과의 차이를 최소화한다.
        const percentages = weights.map((weight, index) => {
            const exact = (weight / total) * 100;
            return { exact, index, weight: Math.floor(exact) };
        });
        let remaining = 100 - percentages.reduce((sum, item) => sum + item.weight, 0);
        for (const percentage of [...percentages].sort(
            (left, right) =>
                right.exact - right.weight - (left.exact - left.weight) || left.index - right.index,
        )) {
            if (!remaining) break;
            percentage.weight += 1;
            remaining -= 1;
        }
        return items.map((item, index) => ({ ...item, weight: percentages[index].weight }));
    }

    // 퍼센트 합계가 100%가 아니어도 비어 있는 구간은 무시하고, 등록된 항목끼리의 비율만 유지해.
    const scale = getDecimalScale(items);
    const values = items.map((item) => Math.round(Math.max(item.weight, 0) * scale));
    const divisor = values.filter(Boolean).reduce(greatestCommonDivisor, 0);
    if (!divisor) return items;
    return items.map((item, index) => ({ ...item, weight: values[index] / divisor }));
};

export const createRoulette = (): SavedRoulette => ({
    donationSettings: createDonationSettings(),
    id: crypto.randomUUID(),
    inputMode: "manual",
    items: [],
    spinDuration: 3,
    title: "새 룰렛",
    updatedAt: Date.now(),
    weightMode: "percentage",
});

export const createRouletteItem = (): RouletteItem => ({
    id: crypto.randomUUID(),
    name: "",
    weight: 1,
});

export const createDefaultRoulette = (): SavedRoulette => ({
    ...createRoulette(),
    items: [createRouletteItem(), createRouletteItem()],
    title: "룰렛 1",
});
export const addRouletteItem = (items: RouletteItem[], name: string, weight = 1) => {
    const normalized = name.trim();
    if (!normalized) return items;
    const existing = items.find((item) => item.name === normalized);
    return existing
        ? items.map((item) =>
              item.id === existing.id ? { ...item, weight: item.weight + weight } : item,
          )
        : [...items, { id: crypto.randomUUID(), name: normalized, weight }];
};
export const chooseRouletteItem = (items: RouletteItem[]) => {
    const available = items.filter((item) => item.weight > 0);
    const total = available.reduce((sum, item) => sum + item.weight, 0);
    if (!total) return undefined;
    let value = Math.random() * total;
    return (
        available.find((item) => {
            value -= item.weight;
            return value < 0;
        }) ?? available.at(-1)
    );
};
const wheelColors = ["#38bdf8", "#a78bfa", "#34d399", "#fbbf24", "#fb7185", "#f97316"];

export type WheelSegment = {
    color: string;
    end: number;
    item: RouletteItem;
    percentage: number;
    start: number;
};

export const getWheelSegments = (items: RouletteItem[]): WheelSegment[] => {
    const total = items.reduce((sum, item) => sum + Math.max(item.weight, 0), 0);
    if (!total) return [];
    let degree = 0;
    return items.map((item, index) => {
        const next = degree + (Math.max(item.weight, 0) / total) * 360;
        const segment = {
            color: wheelColors[index % wheelColors.length],
            end: next,
            item,
            percentage: (Math.max(item.weight, 0) / total) * 100,
            start: degree,
        };
        degree = next;
        return segment;
    });
};

export const getWheelRotationForItem = (
    segments: WheelSegment[],
    itemId: string,
    currentRotation: number,
    minimumTurns = 4,
) => {
    const segment = segments.find((candidate) => candidate.item.id === itemId);
    if (!segment) return currentRotation;
    const segmentCenter = (segment.start + segment.end) / 2;
    const targetRotation = (360 - segmentCenter) % 360;
    const currentAngle = ((currentRotation % 360) + 360) % 360;
    const delta = (targetRotation - currentAngle + 360) % 360;
    return currentRotation + minimumTurns * 360 + delta;
};

export const getWheelBackground = (items: RouletteItem[]) => {
    const segments = getWheelSegments(items);
    if (!segments.length) return "conic-gradient(#475569 0deg 360deg)";
    return `conic-gradient(${segments.map((segment) => `${segment.color} ${segment.start}deg ${segment.end}deg`).join(", ")})`;
};
