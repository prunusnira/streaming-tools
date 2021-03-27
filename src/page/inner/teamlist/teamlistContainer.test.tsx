import { render } from "@testing-library/react";
import React from "react";
import User from "../../../data/user";
import Team from "./team";
import TeamListContainer from "./teamlistContainer";

describe('팀 인원 추가 후 1명 선택 테스트', () => {
    const team = new Team(1, 'Test Team');

    it('인원 추가 후 선택 진행', () => {
        const wrapper = render(
            <TeamListContainer
                key="team0"
                team={team}
                totalPickCount={0}
                pickCount={0}
                banInterval={0}
                hide={false}
                phase={0}
                getUserSelected={() => {}}
                notNego={() => {}}
                updateTeam={() => {}}
            />
        );
        team.addMember(new User('testuserid', 'Test User', false));
        expect(team.members.length).toBe(1);
    });
});