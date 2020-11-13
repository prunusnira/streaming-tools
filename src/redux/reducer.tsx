
import {RootAction} from './action';

// reducer: 이전 상태와 action을 합쳐 새로운 상태(state)를 만드는 조작
// action에서 정의한 action type을 import
import {SAVEUSER, REMOVEUSER, SETUSERTOKEN, SETTIME} from './action';
// combineReducers: 다수의 reducer를 하나로 합쳐주는 메소드
import {combineReducers} from 'redux';

// Reducer type
export interface TokenState {
    loginname: string,
    clientId: string,
    scope: Array<string>,
    acctok: string,
    time: number
}

// state의 초기값
const defaultTokenState: TokenState = {
    loginname: "",
    clientId: "",
    scope: new Array<string>(),
    acctok: "",
    time: 0
};

// reducer 정의
// 1) default parameter로 state가 undefined일 경우 초기 state를 설정
// 2) default를 제외하고는 Object.assign을 이용해 state를 변경하는 것이 아닌
// state를 복사하여 이를 수정한 객체를 리턴함 (Redux 원칙에 의함)
export function tokenReducer (
        state: TokenState = defaultTokenState,
        action: RootAction): TokenState {
    switch(action.type) {
        case SETUSERTOKEN:
            return Object.assign({}, state, {
                ...state,
                acctok: action.acctok
            });
        case SAVEUSER:
            return Object.assign({}, state, {
                ...state,
                loginname: action.loginname,
                clientId: action.clientId,
                scope: action.scope
            });
        case REMOVEUSER:
            return Object.assign({}, state, {
                ...state,
                loginname: action.loginname,
                clientId: action.clientId,
                scope: action.scope,
                acctok: action.acctok,
                time: action.time
            });
        case SETTIME:
            return Object.assign({}, state, {
                ...state,
                time: action.time
            });
        default:
            return state;
    }
};

// combine: 작성한 reducer를 하나로 합침
export interface StoreState {
    tokenReducer: TokenState
}

const CombinedReducer = combineReducers<StoreState>({
    tokenReducer
});

export default CombinedReducer;