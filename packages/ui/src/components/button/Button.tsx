import { Slot, Slottable } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";
import styles from "./Button.module.css";

type ButtonVariant = "default" | "primary" | "destructive" | "outline" | "ghost" | "icon";
type ButtonSize = "default" | "sm" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
    variant?: ButtonVariant;
    size?: ButtonSize;
};

const sizeClassNames: Record<ButtonSize, string> = {
    default: styles.sizeDefault,
    sm: styles.sizeSm,
    lg: styles.sizeLg,
};

export const Button = ({
    className,
    variant = "default",
    size = "default",
    asChild = false,
    icon,
    iconPosition = "left",
    ...props
}: ButtonProps) => {
    const classNames = cn(styles.button, styles[variant], sizeClassNames[size], className);

    if (asChild)
        return (
            <Slot className={classNames} {...props}>
                {icon && iconPosition === "left" ? (
                    <span className={styles.buttonIcon}>{icon}</span>
                ) : null}
                <Slottable>{props.children}</Slottable>
                {icon && iconPosition === "right" ? (
                    <span className={styles.buttonIcon}>{icon}</span>
                ) : null}
            </Slot>
        );

    return (
        <button className={classNames} {...props}>
            {icon && iconPosition === "left" ? (
                <span className={styles.buttonIcon}>{icon}</span>
            ) : null}
            {props.children}
            {icon && iconPosition === "right" ? (
                <span className={styles.buttonIcon}>{icon}</span>
            ) : null}
        </button>
    );
};

export type { ButtonProps };
