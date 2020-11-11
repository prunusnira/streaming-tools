import React, { Component, Fragment } from "react";
import Team from "./team";
import TeamListPresenter from "./teamlistPresenter";

interface Props {
    team: Team;
}

class TeamListContainer extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <TeamListPresenter
                teamNum={this.props.team.teamNum}
                userlist={this.props.team.members} />
        );
    }
}

export default TeamListContainer;