import User from "../../../data/user";
import Team from "./team";

describe('팀 생성 및 기본 속성 변경 테스트', () => {
    const team = new Team(10, 'Team Test');

    it('생성자로 생성 후 팀 정보 확인', () => {
        expect(team.getName()).toEqual('Team Test');
        expect(team.getTeamNum()).toBe(10);
    });

    it('팀 명 및 번호 변경 테스트', () => {
        team.setName('Change Name Test');
        team.setTeamNum(100);
        expect(team.getName()).toEqual('Change Name Test');
        expect(team.getTeamNum()).toBe(100);
    });
});

describe('팀 인원 추가 삭제 테스트', () => {
    const team = new Team(1, 'Test Team');

    it('인원 추가 테스트', () => {
        team.addMember(new User('testuserid', 'Test User', false));
        expect(team.getMembers().length).toBe(1);
    });

    it('인원 획득 테스트', () => {
        const mem = team.getMember('testuserid');
        expect(mem!!.getUserId()).toEqual('testuserid');
    });

    it('인원 목록 테스트', () => {
        expect(team.getMembers().length).toBe(1);
    });

    it('인원 삭제 테스트', () => {
        team.removeMember('testuserid');
        expect(team.getMembers().length).toBe(0);
    });
});

describe('팀원 선택유무 검사', () => {
    const team = new Team(1, 'Test Team');
    team.addMember(new User('testuserid', 'Test User', false));

    it('선택가능 확인', () => {
        expect(team.checkPickable('testuserid')).toBe(false);
    });

    it('선택여부 변경 후 확인', () => {
        team.getMember('testuserid')?.setPicked();
        expect(team.checkPickable('testuserid')).toBe(true);
    });
});