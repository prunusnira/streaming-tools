import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import HowtoDlgBody from "./howtoDlgBody";

describe("HowtoDlgBody", () => {
    it("첫 번째 Markdown 안내와 이미지를 표시한다", () => {
        // Given
        render(<HowtoDlgBody />);

        // When
        const heading = screen.getByRole("heading", { name: "Twitch BanPicker는?" });

        // Then
        expect(heading).toBeInTheDocument();
        expect(screen.getByRole("img", { name: "Twitch BanPicker 화면 구성" })).toHaveAttribute(
            "src",
            "/img/howto.png",
        );
    });

    it("페이지 버튼을 누르면 해당 Markdown 안내로 전환한다", async () => {
        // Given
        const user = userEvent.setup();
        render(<HowtoDlgBody />);

        // When
        await user.click(screen.getByRole("button", { name: "2" }));

        // Then
        expect(screen.getByRole("heading", { name: "1단계: 참여하기" })).toBeInTheDocument();
    });
});
