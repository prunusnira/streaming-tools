import React from "react";
import Team from "./team";
import TeamListContainer from "./teamlistContainer";

describe("팀 인원 추가 후 1명 선택 테스트", () => {
    const team = new Team(1, "Test Team");
    // const teamlist = render(
    //     <TeamListContainer
    //         key="teamtest"
    //         team={team}
    //         totalPickCount={0}
    //         pickCount={0}
    //         banInterval={0}
    //         hide={false}
    //         phase={0}
    //         getUserSelected={() => {}}
    //         notNego={() => {}}
    //         updateTeam={() => {}}
    //     />
    // );

    // it('인원 추가 테스트', () => {
    //     team.addMember(new User('testuserid', 'Test User', false));
    //     expect(team.members.length).toBe(1);
    // });

    // it('인원 삭제(이동) 테스트', () => {
    //     team.removeMember('testuserid');
    //     expect(team.members.length).toBe(0);
    // });
});
