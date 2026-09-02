import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import styles from "./Loading.module.css";

type LoadingProps = HTMLAttributes<HTMLElement>;

export const Loading = ({ className, ...props }: LoadingProps) => {
    return (
        <main className={cn(styles.loading, className)} {...props}>
            <span aria-label="로딩 중" className={styles.spinner} />
        </main>
    );
};

export type { LoadingProps };
