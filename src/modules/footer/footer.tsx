import React from "react";
import { FooterWrapper } from "./footer.style";

const Footer = () => {
    return (
        <FooterWrapper>
            (c) 2020 PrunusNira &nbsp;&nbsp;
            <a target="_blank" href="https://twitter.com/_nira_one">
                Twitter
            </a>
            &nbsp;&nbsp;
            <a target="_blank" href="https://github.com/prunusnira/twitch-banpicker">
                GitHub
            </a>
            &nbsp;/ 문의는 트위터로 주세요. 최소 가로 길이 1000px 이상
        </FooterWrapper>
    );
};

export default Footer;
