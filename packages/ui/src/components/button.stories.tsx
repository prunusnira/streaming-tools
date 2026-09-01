import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta = {
    component: Button,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        children: "밴픽 시작",
        variant: "primary",
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Destructive: Story = {
    args: {
        children: "데이터 리셋",
        variant: "destructive",
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};
