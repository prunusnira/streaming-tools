import { useState } from "react";
import { PageMode } from "../../data/pageMode";

const useMain = () => {
    const [pageMode, setPageMode] = useState(PageMode.UserList);

    return {
        pageMode,
        setPageMode,
    };
};

export default useMain;
