import { createElement } from "react";

type LoginRequiredAlertProps = {
    onManageAccounts?: () => void;
};

export const LoginRequiredAlert = ({ onManageAccounts }: LoginRequiredAlertProps) =>
    createElement(
        "section",
        undefined,
        createElement(
            "p",
            undefined,
            "로그인이 되어 있지 않아. 계정 관리 페이지에서 서비스를 로그인해줘.",
        ),
        createElement(
            "button",
            {
                onClick: onManageAccounts ?? (() => window.location.assign("/account")),
                type: "button",
            },
            "계정 관리로 이동",
        ),
    );
