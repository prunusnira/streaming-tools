// action: 어떤 변화가 일어나야 할지 알려주는 객체
// 액션 자체는 그냥 객체임
// 액션은 스토어에 데이터를 넣는 유일한 방법

// action 타입 정의
export const SAVEUSER = 'SAVEUSER';
export const REMOVEUSER = 'REMOVEUSER';
export const SETUSERTOKEN = 'SETUSERTOKEN';

export interface ActionUserInfo {
}

interface SetUserTokenAction {
    type: typeof SETUSERTOKEN,
    acctok: string
}

interface SaveUserAction {
    type: typeof SAVEUSER,
    loginname: string,
    clientId: string,
    scope: Array<string>
}

interface RemoveUserAction {
    type: typeof REMOVEUSER,
    loginname: string,
    clientId: string,
    scope: Array<string>,
    acctok: string
}

export type RootAction =
    SaveUserAction
    | RemoveUserAction
    | SetUserTokenAction;

// action 정의
// 액션이 dispatch에 의해 store로 전달되면
// store 내의 reducer에 의해 store에 저장됨
function saveAccToken(tok: string) {
    return {
        type: SETUSERTOKEN,
        acctok: tok
    }
}

function saveUserOn(
    name: string, id: string, sc: Array<string>): SaveUserAction {
    return {
        type: SAVEUSER,
        loginname: name,
        clientId: id,
        scope: sc
    }
}

function removeUserOn(): RemoveUserAction {
    return {
        type: REMOVEUSER,
        loginname: "",
        clientId: "",
        scope: new Array<string>(),
        acctok: ""
    }
}

// 액션생산자: 액션을 만드는 함수 혹은 변수
// 나중에 dispatch를 해야 액션을 보낸다
export const actionCreator = {
    saveUserOn,
    removeUserOn,
    saveAccToken
};