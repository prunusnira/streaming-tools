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
                        Hosted on AWS S3, Made with React
                    </Col>
                    <Col className="no-wrap text-center" xs="12">
                        문의는 트위터로, 창 너비 1200px 이상 필요
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;