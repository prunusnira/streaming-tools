import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@streaming-tools/ui";

type Props = Record<string, unknown> & { className?: string; children?: ReactNode };

export const createComponent = (tag: ElementType, baseClassName: string) => {
    return ({ className, ...props }: Props) =>
        createElement(tag, { ...props, className: cn(baseClassName, className) });
};
