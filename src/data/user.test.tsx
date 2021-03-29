import Message from "./message";
import User from "./user";

describe('사용자 생성 및 기본 특성 가져오기 테스트', () => {
    it('사용자 생성 테스트', () => {
        const user = new User('testuser', 'testname', true);
        expect(user.getUserName()).toEqual('testname');
        expect(user.getUserId()).toEqual('testuser');
        expect(user.isSubscriber()).toEqual(true);
    });
});

describe('네트워크로 가져오는 항목 테스트 (네트워크 연결제외)', () => {
    it('프로필 이미지 URL 테스트', () => {
        const user = new User('testuser', 'testname', true);
        expect(user.getProfileUrl()).toEqual('');

        user.setProfileUrl('https://random-url');
        expect(user.getProfileUrl()).toEqual('https://random-url');
    });
});

describe('선택 테스트', () => {
    const user = new User('testuser', 'testname', true);
    it('선택 여부 확인 (선택전)', () => {
        expect(user.isPicked()).toBe(false);
    });

    it('선택 및 임의의 메시지 추가', () => {
        user.updateLastMessage(new Message('testuser', 'testname', 'random message'));
        user.setPicked();

        expect(user.isPicked()).toBe(true);
        expect(user.getLastMessage().getMessage()).toBe('random message');
    });
});