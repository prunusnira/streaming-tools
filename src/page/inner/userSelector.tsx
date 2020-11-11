import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";
import User from "../../data/user";

interface Props {
    teamOneMembers: Array<User>,
    teamTwoMembers: Array<User>,
    getUserSelected: (user: User) => void
}

class UserSelector extends Component<Props> {
    selectUser = (team: number) => {
        console.log(this.props.teamOneMembers.length);
        console.log(this.props.teamTwoMembers.length);

        let arr = new Array<User>();

        switch(team) {
            case 0:
                arr = arr.concat(this.props.teamOneMembers, this.props.teamTwoMembers);
                break;
            case 1:
                arr = arr.concat(this.props.teamOneMembers);
                break;
            case 2:
                arr = arr.concat(this.props.teamTwoMembers);
                break;
        }

        // 현재 목록에서 유저 선택
        let randVal = Math.floor(Math.random() * arr.length);
        if(randVal == arr.length) randVal--;

        console.log(arr.length);
        console.log(randVal);
        console.log(arr[randVal]);

        this.props.getUserSelected(arr[randVal]);
    }

    render() {
        return (
            <Fragment>
                <Button onClick={() => this.selectUser(1)}>Select From Team 1</Button>
                <Button onClick={() => this.selectUser(2)}>Select From Team 2</Button>
                <Button onClick={() => this.selectUser(0)}>Select From All</Button>
            </Fragment>
        );
    }
}

export default UserSelector;