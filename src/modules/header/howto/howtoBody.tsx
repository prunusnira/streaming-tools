import React from "react";
import {
    Col,
    ColLeft,
    ListItem,
    OrderList,
    Row,
    SubTitle,
    Title,
    UnorderList,
} from "./howtoBody.style";

const HowToBody = () => {
    return (
        <Row>
            <Row>
                <Title>어디에 쓸 수 있나요?</Title>
                <UnorderList>
                    <ListItem>시청자 참여를 통한 컨텐츠 선택에 사용할 수 있습니다</ListItem>
                    <ListItem>
                        LoL의 밴/픽과 같이 사용자들로부터 컨텐츠를 추천받고, 진행하기 싫은 항목은
                        밴을 하면 됩니다.
                    </ListItem>
                </UnorderList>
            </Row>
            <Row>
                <Title>어떤 방식으로 진행되나요?</Title>
                <Col>
                    <ColLeft>
                        <SubTitle>스트리머가 할 일</SubTitle>
                    </ColLeft>
                    <OrderList>
                        <ListItem>
                            전체 픽 수, 턴당 픽/밴 수를 지정합니다 (진행 도중에 변경 가능)
                        </ListItem>
                        <ListItem>'인원 모집 시작' 버튼을 눌러 각 팀을 지원 받습니다</ListItem>
                        <ListItem>
                            인원 모집을 멈추거나 재개하려면 '인원 모집 중지/재개' 버튼을 누르면
                            됩니다.
                        </ListItem>
                        <ListItem>
                            각 팀에서 '이 팀에서 1명 선택' 버튼을 눌러 픽을 진행합니다
                        </ListItem>
                        <ListItem>
                            픽 순서가 끝나면 밴을 합니다 (픽 된 것중 없었으면 하는걸 지우는 단계)
                        </ListItem>
                        <ListItem>전체 픽이 완료될 때 까지 4~5를 반복합니다</ListItem>
                    </OrderList>
                </Col>
                <Col>
                    <ColLeft>
                        <SubTitle>시청자가 할 일</SubTitle>
                    </ColLeft>
                    <OrderList>
                        <ListItem>
                            스트리머가 '인원 모집 시작' 버튼을 누르면 <b>!팀 1</b> 혹은 <b>!팀 2</b>
                            를 입력하여 팀을 등록합니다 <br />
                            (영어로 <b>!team 1</b>, <b>!team 2</b>도 되요)
                        </ListItem>
                        <ListItem>
                            선택된 사용자는 스트리머와 소통하거나 선택하려는 내용을 입력합니다
                            <br />(<b>!픽 [내용]</b> 혹은 <b>!pick [내용]</b>으로 바로 지정할 수도
                            있습니다)
                        </ListItem>
                    </OrderList>
                </Col>
            </Row>
            <Row>
                <Title>부가요소</Title>
                <SubTitle>타이머</SubTitle>
                <Row>오른쪽 상단의 타이머를 이용하여 시간을 계산할 수 있습니다</Row>
            </Row>
        </Row>
    );
};

export default HowToBody;
