import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("react-router-dom", () => ({
    __esModule: true,
    useNavigate: (url: string) => {},
}));

describe("App.tsx: 최초 로딩시 로그인 과정 검사", () => {
    it("비로그인 상태에서 컴포넌트 불러오기", () => {
        render(<App />);
        expect(screen.getByText("LOADING")).toBeInTheDocument();
    });
});
