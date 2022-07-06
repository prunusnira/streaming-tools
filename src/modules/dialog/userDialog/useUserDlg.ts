import { useState } from "react";
import User from "../../../data/user";

const useUserDlg = () => {
    const [display, setDisplay] = useState(false);
    const [isNego, setNego] = useState(false);

    const skip = (user: User) => {
        // 현재 사용자를 처리함으로 표기하고 닫기
        user.setPicked();
        close();
    };

    const close = () => {
        setDisplay(false);
    };

    return { display, isNego, setNego, skip, close };
};

export default useUserDlg;
