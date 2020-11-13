import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import Ref from '../../data/reference';
import { StoreState } from '../../redux/reducer';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { actionCreator } from '../../redux/action';

interface Props {
    acctok: string,

    // redux
    clientId: string,
    loginName: string,
    scopes: Array<string>,
    Actions: typeof actionCreator
}

class ValidContainer extends Component<Props> {
    componentDidMount() {
        this.reqValidation();
    }

    async reqValidation() {
        axios.get(Ref.URL_VALIDATE, {
            headers: {
                "Authorization": "Bearer "+this.props.acctok
            }
        })
        .then((res: any) => {
            this.props.Actions.saveUserOn(
                res.data.login as string,
                res.data.client_id as string,
                res.data.scopes as Array<string>
            );
            this.props.Actions.setTime(Date.now() / 1000 / 60 / 60);
            window.location.href = Ref.REDIR_URI;
        });
    }

    render() {
        return (
            <Fragment />
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(ValidContainer);