import React, { Component } from 'react';
import { connect } from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { actionCreator } from '../redux/action';
import { StoreState } from '../redux/reducer';
import MainPage from './inner/main';

import LoginContainer from './login/loginContainer';
import ValidContainer from './login/validContainer';

interface IMatchProps {
    access_token: string,
    scope: string,
    token_type: string
}

interface Props {
    // redux
    clientId: string,
    loginName: string,
    scopes: Array<string>,
    acctok: string,
    Actions: typeof actionCreator
}

class IndexContainer extends Component<RouteComponentProps<IMatchProps> & Props> {
    getTokenData(hash: string): Map<string, string> {
        const hashvars: string[] = hash.split("#")[1].split("&");
        const map = new Map<string, string>();
        for(const s of hashvars) {
            const val:string[] = s.split("=");
            if(val.length == 2) {
                map.set(val[0], val[1]);
            }
        }
        return map;
    }

    render() {
        // redux에 데이터가 있는지 확인
        if(this.props.loginName === null || this.props.loginName === undefined || this.props.loginName === "") {
            if(this.props.location.hash === "") {
                return <LoginContainer />
            }
            else {
                const parsed = this.getTokenData(this.props.location.hash);
                this.props.Actions.saveAccToken(parsed.get("access_token")!);
                // access token으로 validate
                return <ValidContainer
                    acctok={parsed.get("access_token")!} />
            }
        }
        else {
            return (
                <MainPage />
            );
        }
    }
}

const mapStateToProps = (state: StoreState) => {
    return {
        scopes: state.tokenReducer.scope,
        loginName: state.tokenReducer.loginname,
        clientId: state.tokenReducer.clientId
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    Actions: bindActionCreators(actionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer);