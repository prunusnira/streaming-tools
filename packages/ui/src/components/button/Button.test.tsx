import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
    afterEach(() => {
        cleanup();
    });

    it("활성화된 버튼을 클릭하면 전달된 핸들러를 호출한다", async () => {
        // Given
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<Button onClick={handleClick}>밴픽 시작</Button>);

        // When
        await user.click(screen.getByRole("button", { name: "밴픽 시작" }));

        // Then
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("비활성화된 버튼은 클릭해도 핸들러를 호출하지 않는다", async () => {
        // Given
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(
            <Button disabled onClick={handleClick}>
                밴픽 시작
            </Button>,
        );

        // When
        await user.click(screen.getByRole("button", { name: "밴픽 시작" }));

        // Then
        expect(handleClick).not.toHaveBeenCalled();
    });
});
