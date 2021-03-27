import User from "../../../data/user";
import Team from "./team";

describe('팀 인원 추가 삭제 테스트', () => {
    const team = new Team(1, 'Test Team');

    it('인원 추가 테스트', () => {
        team.addMember(new User('testuserid', 'Test User', false));
        expect(team.members.length).toBe(1);
    });

    it('인원 삭제 테스트', () => {
        team.removeMember('testuserid');
        expect(team.members.length).toBe(0);
    });
});