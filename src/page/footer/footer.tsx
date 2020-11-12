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
                        <a target="_blank" href="https://twitter.com/privatenira">Twitter</a>
                        &nbsp;&nbsp;
                        <a target="_blank" href="https://github.com/prunusnira/twitch-banpicker">GitHub</a>
                    </Col>
                    <Col className="no-wrap text-center" xs="12">
                        아마도 나중엔 크롬 익스텐션이 될 수도 있습니다. 버그 수정 문의는 트위터로. 최소 1200px 이상의 넓이는 필수입니다.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;