import React, { Component, Fragment } from "react";
import Team from "./team";

interface Props {
    teamNum: number;
}

class TeamListContainer extends Component<Props> {
    team: Team;

    constructor(props: Props) {
        super(props);
        this.team = new Team(props.teamNum);
    }

    render() {
        return (
            <Fragment></Fragment>
        );
    }
}

export default TeamListContainer;