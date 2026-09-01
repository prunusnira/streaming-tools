import { useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import page1 from "./content/page1.md?raw";
import page2 from "./content/page2.md?raw";
import page3 from "./content/page3.md?raw";
import styles from "./howtoMarkdown.module.css";
import legacyStyles from "../../pref/legacy.module.css";

const pages = [page1, page2, page3];

const markdownComponents: Components = {
    h1: ({ children }) => <h1 className={styles.headingOne}>{children}</h1>,
    h2: ({ children }) => <h2 className={styles.headingTwo}>{children}</h2>,
    p: ({ children }) => <p className={styles.paragraph}>{children}</p>,
    ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
    ol: ({ children }) => <ol className={styles.orderedList}>{children}</ol>,
    img: ({ alt, src }) => <img className={styles.image} src={src} alt={alt ?? ""} />,
    code: ({ children }) => <code className={styles.inlineCode}>{children}</code>,
};

type PagerProps = {
    setPage: (page: number) => void;
};

const Pager = ({ setPage }: PagerProps) => {
    return (
        <div className={legacyStyles.pager}>
            {pages.map((_, index) => (
                <button className={legacyStyles.button} key={index} onClick={() => setPage(index)}>
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

const HowtoDlgBody = () => {
    const [page, setPage] = useState(0);

    return (
        <section className={legacyStyles.stack}>
            <div className={legacyStyles.howtoContent}>
                <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                    {pages[page]}
                </ReactMarkdown>
            </div>
            <div className={legacyStyles.pager}>
                <Pager setPage={setPage} />
            </div>
        </section>
    );
};

export default HowtoDlgBody;
