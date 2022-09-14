import { useState } from "react";
import { BodyContainer, BodyContent, BodyPager, HowtoPH1, HowtoPH2 } from "./howto.style";
import { PagerBtn, PagerContainer } from "./pager.style";

const Page1 = () => {
    return (
        <>
            <HowtoPH1>Twitch BanPicker는?</HowtoPH1>
            <ul>
                <li>
                    시청자들의 참여를 유도하여 컨텐츠에 집중할 수 있게 해주는 트위치 스트리머용
                    툴입니다
                </li>
                <li>MOBA 장르의 밴/픽을 사용하는 것과 유사하게 동작합니다</li>
                <li>
                    스트리머가 정한 주제에 따라 시청자들로부터 선택지, 의견 등을 받을 수 있습니다
                </li>
            </ul>
            <HowtoPH1>화면 설명</HowtoPH1>
            <img src={"/img/howto.png"} width={"100%"} />
            <ul>
                <li>(1) 스트리머가 조작할 수 있는 컨트롤</li>
                <ul>
                    <li>인원 모집 컨트롤: 시청자의 참여 가능 여부를 조절할 수 있습니다</li>
                    <li>리셋: 현재까지의 시청자 참여 상태 및 밴픽 진행상황을 초기화합니다</li>
                    <li>팀원 목록 표시 컨트롤: 팀원 목록과 인원수를 표시할 지 결정합니다</li>
                    <li>페이즈 컨트롤: 각 페이즈에 따라 수행할 픽과 밴 수를 조절할 수 있습니다</li>
                    <li>현재 페이즈 알림: 현재 페이즈 상태를 표기하며 강제로 변경할 수 있습니다</li>
                </ul>
                <li>(2) 시스템 메뉴</li>
                <ul>
                    <li>사용방법: 현재 보고있는 창입니다</li>
                    <li>데이터 리셋: 저장된 트위치 로그인 정보를 리셋합니다</li>
                </ul>
                <li>(3) 페이지 표시 컨트롤</li>
                <ul>
                    <li>현재 페이지에 표시할 목록의 종류를 선택합니다</li>
                    <li>
                        기본 유저목록을 표시하며 밴픽목록 버튼을 선택하여 표기 항목을 변경할 수
                        있습니다
                    </li>
                </ul>
                <li>(4) 플레이 진행 컨트롤</li>
                <ul>
                    <li>이 팀에서 선택: 현재 팀에 등록된 시청자 중 한 명을 뽑는 버튼입니다</li>
                    <li>팀명 변경: 선택된 팀의 팀 이름을 변경합니다</li>
                </ul>
                <li>(5) 컨텐츠 표기 페이지</li>
                <ul>
                    <li>(3)에서 선택한 항목에 따라 데이터를 보여주는 공간입니다</li>
                </ul>
                <li>(6) 트위치 채팅</li>
                <ul>
                    <li>현재 채널의 실시간 채팅 목록을 표시합니다</li>
                </ul>
            </ul>
        </>
    );
};

const Page2 = () => {
    return (
        <>
            <HowtoPH1>1단계 참여하기</HowtoPH1>
            <HowtoPH2>스트리머</HowtoPH2>
            <ul>
                <li>
                    시작하기 전에 각 팀으로부터 받을 전체 픽 개수, 턴당 각 팀으로부터 받을 픽 개수,
                    그리고 스트리머가 밴할 개수를 구합니다
                </li>
                <ul>
                    <li>
                        <img src={"/img/p2st1.png"} width={350} />
                    </li>
                    <li>(각 턴을 페이즈라고 부릅니다)</li>
                </ul>
                <li>
                    준비가 되었으면 참여할 시청자를 받기 위해 왼쪽 상단의 '인원 모집 시작' 버튼을
                    눌러줍니다
                </li>
                <li>인원 모집을 중단하려면 인원 모집 중단 버튼을 선택합니다</li>
                <li>인원 모집을 재개하려면 인원 모집 재개 버튼을 선택합니다</li>
                <ul>
                    <li>
                        <img src={"/img/p2st2.png"} width={250} />
                        &nbsp;
                        <img src={"/img/p2st21.png"} width={250} />
                        &nbsp;
                        <img src={"/img/p2st22.png"} width={250} />
                    </li>
                </ul>
                <li>인원 모집 상태와 무관하게 밴픽을 진행할 수 있습니다</li>
            </ul>
            <HowtoPH2>시청자</HowtoPH2>
            <ul>
                <li>
                    스트리머가 인원 참여 시작 버튼을 누르면 <b>!team 1 혹은 2</b> /{" "}
                    <b>!팀 1 혹은 2</b>를 입력하여 두 팀중에 한 곳에 참여합니다
                </li>
                <ul>
                    <li>
                        <img src={"/img/p2st3.png"} />
                    </li>
                </ul>
            </ul>
        </>
    );
};

const Page3 = () => {
    return (
        <>
            <HowtoPH1>2단계 밴픽 진행하기</HowtoPH1>
            <HowtoPH2>스트리머</HowtoPH2>
            <ul>
                <li>
                    인원 모집이 충분히 진행되었다면 '이 팀에서 1명 선택' 버튼을 눌러 각 팀에 참여한
                    시청자 중 한 명을 선택합니다
                </li>
                <li>
                    잠시 후 랜덤으로 사용자가 선택되며 시청자와 대화하며 밴픽을 진행할 수 있습니다
                </li>
                <li>
                    각 페이즈마다 각 팀으로부터 받아야 하는 픽 개수가 정해져 있으므로 이를 다
                    채우고나면 밴을 진행할 수 있습니다
                </li>
                <li>이후 전체 밴픽 과정이 완료될 때 까지 반복합니다</li>
            </ul>
            <HowtoPH2>리셋</HowtoPH2>
            <ul>
                <li>
                    왼쪽 상단의 리셋 버튼을 누르면 현재까지의 밴픽 진행상황을 모두 리셋하고 최초
                    로딩 상태로 되돌릴 수 있습니다
                </li>
                <li>
                    오른쪽 상단의 데이터 리셋 버튼을 누르면 저장된 스트리머 정보를 리셋하고 로그인을
                    다시 진행해야 합니다
                </li>
            </ul>
        </>
    );
};

type Props = {
    setPage: (p: number) => void;
};

const Pager = ({ setPage }: Props) => {
    return (
        <PagerContainer>
            <PagerBtn onClick={() => setPage(0)}>1</PagerBtn>
            <PagerBtn onClick={() => setPage(1)}>2</PagerBtn>
            <PagerBtn onClick={() => setPage(2)}>3</PagerBtn>
        </PagerContainer>
    );
};

const HowtoDlgBody = () => {
    const [page, setPage] = useState(0);
    return (
        <BodyContainer>
            <BodyContent>
                {page === 0 && <Page1 />}
                {page === 1 && <Page2 />}
                {page === 2 && <Page3 />}
            </BodyContent>
            <BodyPager>
                <Pager setPage={setPage} />
            </BodyPager>
        </BodyContainer>
    );
};

export default HowtoDlgBody;
