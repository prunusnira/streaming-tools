import { FooterAnchor, FooterContainer, FooterItem } from "./footer.style";

const Footer = () => {
    return (
        <FooterContainer>
            <FooterItem>(c) 2020 PrunusNira</FooterItem>
            <FooterAnchor target="_blank" href="https://twitter.com/_nira_one">
                Twitter
            </FooterAnchor>
            <FooterAnchor target="_blank" href="https://github.com/prunusnira/twitch-banpicker">
                GitHub
            </FooterAnchor>
            <FooterItem>minimum width: 1350px</FooterItem>
        </FooterContainer>
    );
};

export default Footer;
