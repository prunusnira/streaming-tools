import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import styles from "./Button.module.css";

type ButtonVariant = "default" | "primary" | "destructive" | "outline" | "ghost" | "icon";
type ButtonSize = "default" | "sm" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
};

const sizeClassNames: Record<ButtonSize, string> = {
    default: styles.sizeDefault,
    sm: styles.sizeSm,
    lg: styles.sizeLg,
};

export const Button = ({ className, variant = "default", size = "default", asChild = false, ...props }: ButtonProps) => {
    const Component = asChild ? Slot : "button";

    return <Component className={cn(styles.button, styles[variant], sizeClassNames[size], className)} {...props} />;
};

export type { ButtonProps };
