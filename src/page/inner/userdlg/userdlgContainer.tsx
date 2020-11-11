import React from "react";
import { Component } from "react";
import User from "../../../data/user";
import UserDlgPresenter from "./userdlgPresenter";

interface Props {
    user: User|null,
    chat: string[],
    display: boolean,
    close: () => void
}

class UserDlgContainer extends Component<Props> {
    render() {
        return (
            <UserDlgPresenter
                user={this.props.user}
                chat={this.props.chat}
                display={this.props.display}
                close={this.props.close} />
        )
    }
}

export default UserDlgContainer