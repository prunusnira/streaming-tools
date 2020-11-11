import React, { Fragment } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import User from '../../../data/user';
import './teamlist.css';

interface Props {
    teamNum: number,
    userlist: Array<User>
}

function TeamListPresenter(props: Props) {
    return (
        <Fragment>
            <Card className='teamlist'>
                <CardHeader>
                    TEAM {(function() { return props.teamNum})()}
                </CardHeader>
                <CardBody>
                    {
                        props.userlist.map(v => {
                            return v.name+" ("+v.id+")";
                        })
                    }
                </CardBody>
            </Card>
        </Fragment>
    );
}

export default TeamListPresenter;