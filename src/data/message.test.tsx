import Message from "./message";

describe('메시지 생성 및 설정 값 테스트', () => {
    it('메시지 생성', () => {
        const msg = new Message('id', 'name', 'message');
        expect(msg.getMessage()).toEqual('message');
    });

    it('메시지 날짜 테스트', () => {
        const msg = new Message('id', 'name', 'message');
        expect(msg.getTime()).toMatch(
            new RegExp(msg.getFormatDate(new Date()).split(" ")[0]+"*")
        );
    });
});

describe('메시지 밴 테스트', () => {
    const msg = new Message('id', 'name', 'message');
    
    it('밴 테스트', () => {
        msg.setBan();
        expect(msg.getBanStatus()).toBe(true);
    });
    
    it('언밴 테스트', () => {
        msg.undoBan();
        expect(msg.getBanStatus()).toBe(false);
    });
});