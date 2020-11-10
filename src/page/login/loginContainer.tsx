import React, {Component, Fragment} from 'react';
import Ref from '../../data/reference';

class LoginContainer extends Component {
    componentDidMount() {
        this.reqLogin();
    }

    reqLogin() {
        window.location.href = Ref.URL_LOGIN+
            "?client_id=" + Ref.CLIENT_ID +
            "&redirect_uri=" + Ref.REDIR_URI +
            "&response_type=token" +
            "&scope=user:edit+channel:read:subscriptions+chat:read";
    }

    render() {
        return (
            <Fragment></Fragment>
        );
    }
}

export default LoginContainer;