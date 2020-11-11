import React, { Component, Fragment } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

interface Props {
    picklist: string[],
    size: number,
    teamnum: number,
    edit: (text: string, idx: number) => void,
    remove: (teamNum: number, idx: number) => void
}

class BanPickPresenter extends Component<Props> {
    render() {
        const self = this;
        return (
            <Fragment>
                <Card>
                    <CardHeader>
                        SECTION TEAM {this.props.teamnum}
                    </CardHeader>
                    <CardBody>
                        {
                            this.props.picklist.map((v, i) => {
                                console.log(i+" "+v);
                                return (
                                    <Fragment>
                                        <Row>
                                            <Col xs="12">
                                                {v}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                <Button onClick={() => this.props.edit(v, i)}>수정</Button>
                                                <Button onClick={() => this.props.remove(this.props.teamnum, i)}>삭제</Button>
                                            </Col>
                                        </Row>
                                    </Fragment>
                                )
                            })
                        }
                    </CardBody>
                </Card>
            </Fragment>
        );
    }
}

export default BanPickPresenter;