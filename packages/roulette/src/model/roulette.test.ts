import { afterEach, describe, expect, it, vi } from "vitest";
import {
    addRouletteItem,
    chooseRouletteItem,
    convertRouletteWeightMode,
    createDefaultRoulette,
    createDonationSettings,
    createDonationTier,
    getDonationTiers,
    getWheelRotationForItem,
    getWheelSegments,
    type RouletteItem,
} from "./roulette";

describe("addRouletteItem", () => {
    it("같은 이름의 항목을 다시 추가하면 가중치를 더한다", () => {
        // Given
        const items: RouletteItem[] = [{ id: "pizza", name: "피자", weight: 2 }];
        // When
        const result = addRouletteItem(items, "피자");
        // Then
        expect(result).toEqual([{ id: "pizza", name: "피자", weight: 3 }]);
    });
});

describe("chooseRouletteItem", () => {
    afterEach(() => vi.restoreAllMocks());
    it("가중치 구간에 해당하는 항목을 선택한다", () => {
        // Given
        vi.spyOn(Math, "random").mockReturnValue(0.8);
        const items: RouletteItem[] = [
            { id: "one", name: "첫 번째", weight: 1 },
            { id: "two", name: "두 번째", weight: 3 },
        ];
        // When
        const result = chooseRouletteItem(items);
        // Then
        expect(result?.id).toBe("two");
    });
});

describe("convertRouletteWeightMode", () => {
    it("정수 가중치를 합계 100%의 퍼센트로 변환한다", () => {
        // Given
        const items: RouletteItem[] = [
            { id: "one", name: "첫 번째", weight: 1 },
            { id: "two", name: "두 번째", weight: 3 },
        ];

        // When
        const result = convertRouletteWeightMode(items, "integer", "percentage");

        // Then
        expect(result.map((item) => item.weight)).toEqual([25, 75]);
    });

    it("정수 가중치를 가장 가까운 정수 퍼센트로 변환한다", () => {
        // Given
        const items: RouletteItem[] = [
            { id: "one", name: "첫 번째", weight: 1 },
            { id: "two", name: "두 번째", weight: 2 },
        ];

        // When
        const result = convertRouletteWeightMode(items, "integer", "percentage");

        // Then
        expect(result.map((item) => item.weight)).toEqual([33, 67]);
        expect(result.reduce((sum, item) => sum + item.weight, 0)).toBe(100);
    });

    it("동일한 퍼센트는 최소 정수 가중치 1:1로 축약한다", () => {
        // Given
        const items: RouletteItem[] = [
            { id: "one", name: "첫 번째", weight: 50 },
            { id: "two", name: "두 번째", weight: 50 },
        ];

        // When
        const result = convertRouletteWeightMode(items, "percentage", "integer");

        // Then
        expect(result.map((item) => item.weight)).toEqual([1, 1]);
    });

    it("합계가 100%보다 작은 퍼센트도 빈 구간 없이 현재 비율로 정수화한다", () => {
        // Given
        const items: RouletteItem[] = [
            { id: "one", name: "첫 번째", weight: 20 },
            { id: "two", name: "두 번째", weight: 30 },
        ];

        // When
        const result = convertRouletteWeightMode(items, "percentage", "integer");

        // Then
        expect(result.map((item) => item.weight)).toEqual([2, 3]);
    });
});

describe("getWheelRotationForItem", () => {
    it("선택된 항목의 중심을 룰렛 포인터 위치로 회전한다", () => {
        // Given
        const items: RouletteItem[] = [
            { id: "one", name: "첫 번째", weight: 1 },
            { id: "two", name: "두 번째", weight: 3 },
        ];
        const segments = getWheelSegments(items);

        // When
        const rotation = getWheelRotationForItem(segments, "two", 37);
        const selected = segments.find((segment) => segment.item.id === "two");

        // Then
        expect(selected).toBeDefined();
        expect(((selected!.start + selected!.end) / 2 + rotation) % 360).toBeCloseTo(0);
        expect(rotation).toBeGreaterThanOrEqual(37 + 4 * 360);
    });
});

describe("createDefaultRoulette", () => {
    it("저장된 룰렛이 없을 때 사용할 비로그인 기본 룰렛을 만든다", () => {
        // Given
        // When
        const result = createDefaultRoulette();

        // Then
        expect(result.title).toBe("룰렛 1");
        expect(result.inputMode).toBe("manual");
        expect(result.spinDuration).toBe(3);
        expect(result.items).toHaveLength(2);
        expect(result.items.every((item) => item.name === "")).toBe(true);
    });
});

describe("createDonationSettings", () => {
    it("마지막 금액 구간이 제한 없이 이어질 수 있는 기본 설정을 만든다", () => {
        // Given
        // When
        const result = createDonationSettings();

        // Then
        expect(result.minimumAmountEnabled).toBe(false);
        expect(result.tiers).toEqual([expect.objectContaining({ minimumAmount: 0, weight: 1 })]);
    });
});

describe("getDonationTiers", () => {
    it("최소 금액 설정이 꺼져 있으면 첫 구간 시작 금액을 0원으로 고정한다", () => {
        // Given
        const settings = {
            ...createDonationSettings(),
            tiers: [createDonationTier(3000)],
        };

        // When
        const result = getDonationTiers(settings);

        // Then
        expect(result.map((tier) => tier.minimumAmount)).toEqual([0]);
    });

    it("최소 금액 설정이 켜져 있으면 첫 구간 시작 금액을 최소 금액으로 고정한다", () => {
        // Given
        const settings = {
            ...createDonationSettings(),
            minimumAmount: 5000,
            minimumAmountEnabled: true,
            tiers: [createDonationTier(0), createDonationTier(5000)],
        };

        // When
        const result = getDonationTiers(settings);

        // Then
        expect(result.map((tier) => tier.minimumAmount)).toEqual([5000, 5000]);
    });

    it("저장 순서와 무관하게 금액이 작은 구간부터 첫 구간으로 고정한다", () => {
        // Given
        const settings = {
            ...createDonationSettings(),
            tiers: [createDonationTier(1000), createDonationTier(3000)],
        };

        // When
        const result = getDonationTiers(settings);

        // Then
        expect(result.map((tier) => tier.minimumAmount)).toEqual([0, 3000]);
    });
});
