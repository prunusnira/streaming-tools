import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import './footer.css';

function Footer() {
    return (
        <footer className="footer d-flex align-items-center">
            <Container fluid className="no-wrap">
                <Row className="no-wrap">
                    <Col className="no-wrap text-center" xs="12">
                        (c) 2020 PrunusNira
                        &nbsp;&nbsp;
                        <a target="_blank" href="https://twitter.com/_nira_one">Twitter</a>
                        &nbsp;&nbsp;
                        <a target="_blank" href="https://github.com/prunusnira/twitch-banpicker">GitHub</a>
                    </Col>
                    <Col className="no-wrap text-center" xs="12">
                        Made with React (using redux, bootstrap, axios). Hosted on AWS Lightsail
                    </Col>
                    <Col className="no-wrap text-center" xs="12">
                        나중엔 크롬 익스텐션이 될 수도 있습니다. 문의는 트위터로. 1200px 이상의 넓이가 필요합니다.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;