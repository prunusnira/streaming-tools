import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ChatConnectionOptions } from "@streaming-tools/chat";
import { ViewerPickerPage } from "./ViewerPickerPage";

let chatConnectionOptions: ChatConnectionOptions | undefined;

vi.mock("@streaming-tools/auth", () => ({
    getAccessTokens: vi.fn().mockResolvedValue({}),
    getAuthenticatedAccounts: vi.fn().mockResolvedValue([]),
}));

vi.mock("@streaming-tools/auth/login-required-alert", () => ({
    LoginRequiredAlert: () => null,
}));

vi.mock("@streaming-tools/chat", () => ({
    useChatConnections: (options: ChatConnectionOptions) => {
        chatConnectionOptions = options;
    },
}));

const sendChat = async (input: { id: string; name: string; text: string }) => {
    await act(async () => {
        await chatConnectionOptions?.onMessage({ ...input, provider: "twitch" });
    });
};

describe("ViewerPickerPage", () => {
    afterEach(() => {
        cleanup();
        chatConnectionOptions = undefined;
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it("모집 중에 받은 채팅만 참가자로 추가하고 추첨 뒤에는 다시 포함할 수 있다", async () => {
        // Given
        const user = userEvent.setup();
        vi.spyOn(Math, "random").mockReturnValue(0);
        render(<ViewerPickerPage />);

        // When
        await sendChat({ id: "before", name: "모집 전", text: "안녕" });
        await user.click(screen.getByRole("button", { name: "모집 시작" }));
        await sendChat({ id: "viewer", name: "시청자", text: "참여할게" });
        vi.spyOn(window, "setTimeout").mockImplementation((handler) => {
            if (typeof handler === "function") handler();
            return 0;
        });
        await user.click(screen.getByRole("button", { name: "한 명 추첨하기" }));

        // Then
        expect(screen.queryByRole("button", { name: "모집 전" })).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: "시청자" })).toHaveAttribute(
            "aria-pressed",
            "false",
        );
        expect(screen.getByText("제외됨")).toBeInTheDocument();

        // When
        await user.click(screen.getByRole("button", { name: "닫기" }));
        await user.click(screen.getByRole("button", { name: "시청자" }));

        // Then
        expect(screen.getByText("추첨 대상")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "시청자" })).toHaveAttribute(
            "aria-pressed",
            "true",
        );
    });

    it("접두어 모집에서는 선택된 참가자의 새 채팅을 누적하고 TTS로 읽는다", async () => {
        // Given
        const user = userEvent.setup();
        const speak = vi.fn();
        Object.defineProperty(window, "speechSynthesis", {
            configurable: true,
            value: { cancel: vi.fn(), speak },
        });
        vi.stubGlobal(
            "SpeechSynthesisUtterance",
            class {
                constructor(_text: string) {}
            },
        );
        vi.spyOn(Math, "random").mockReturnValue(0);
        render(<ViewerPickerPage />);

        // When
        await user.click(screen.getByLabelText("접두어 참여"));
        await user.clear(screen.getByLabelText("접두어"));
        await user.type(screen.getByLabelText("접두어"), "!신청");
        await user.click(screen.getByRole("button", { name: "모집 시작" }));
        await sendChat({ id: "viewer", name: "시청자", text: "일반 채팅" });
        await sendChat({ id: "viewer", name: "시청자", text: "!신청 참여할게" });
        vi.spyOn(window, "setTimeout").mockImplementation((handler) => {
            if (typeof handler === "function") handler();
            return 0;
        });
        await user.click(screen.getByRole("button", { name: "한 명 추첨하기" }));
        await sendChat({ id: "viewer", name: "시청자", text: "새 채팅" });

        // Then
        expect(screen.getByText("일반 채팅")).toBeInTheDocument();
        const chatDialog = screen.getByRole("dialog", { name: "시청자님과의 채팅" });
        expect(within(chatDialog).getByText("!신청 참여할게")).toBeInTheDocument();
        expect(within(chatDialog).getByText("새 채팅")).toBeInTheDocument();
        expect(speak).toHaveBeenCalledTimes(1);
    });
});
