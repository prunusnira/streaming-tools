import { useState } from "react";
import { BodyContainer } from "./howto.style";
import { PagerBtn, PagerContainer } from "./pager.style";

const Page1 = () => {
    return (
        <>
            Twitch BanPicker는?
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
        </>
    );
};

const Page2 = () => {
    return (
        <>
            1단계 참여하기
            <>스트리머</>
            <ul>
                <li>
                    시작하기 전에 각 팀으로부터 받을 전체 픽 개수, 턴당 각 팀으로부터 받을 픽 개수,
                    그리고 스트리머가 밴할 개수를 구합니다
                </li>
                <li>(각 턴을 페이즈라고 부릅니다)</li>
                <li>
                    준비가 되었으면 참여할 시청자를 받기 위해 왼쪽 상단의 '인원 모집 시작' 버튼을
                    눌러줍니다
                </li>
                <li>인원 모집을 중단하려면 인원 모집 중단 버튼을 선택합니다</li>
                <li>인원 모집을 재개하려면 인원 모집 재개 버튼을 선택합니다</li>
                <li>인원 모집 상태와 무관하게 밴픽을 진행할 수 있습니다</li>
            </ul>
            <>시청자</>
            <ul>
                <li>
                    스트리머가 인원 참여 시작 버튼을 누르면 <b>!team 1 혹은 2</b> /{" "}
                    <b>!팀 1 혹은 2</b>를 입력하여 두 팀중에 한 곳에 참여합니다
                </li>
            </ul>
        </>
    );
};

const Page3 = () => {
    return (
        <>
            2단계 밴픽 진행하기
            <>스트리머</>
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
            {page === 0 && <Page1 />}
            {page === 1 && <Page2 />}
            {page === 2 && <Page3 />}
            <Pager setPage={setPage} />
        </BodyContainer>
    );
};

export default HowtoDlgBody;
