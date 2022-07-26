import ReactDOM from "react-dom";

type Props = {
    children: React.ReactNode;
    domid: string;
};

const Portal = ({ children, domid }: Props) => {
    const elem = typeof window !== "undefined" && document.querySelector(domid);
    return elem && children ? ReactDOM.createPortal(children, elem) : null;
};

export default Portal;
