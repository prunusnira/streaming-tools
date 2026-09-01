import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
    };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return {
            hasError: true,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("밴픽 앱을 불러오는 중 오류가 발생했습니다.", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div role="alert">밴픽 앱을 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
