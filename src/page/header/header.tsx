import React from 'react';
import { Button } from 'reactstrap';
import User from '../../data/user';
import './header.css';

interface Props {
    streamer: User,
    tokenReset: () => void
}

function Header(props: Props) {
    return (
        <header className="header d-flex align-items-center">
            <div className="flex-fill text-center">
                Twitch BanPicker
            </div>
            <div className="flex-fill text-center">
                <img
                    alt="streamer-profileimg"
                    className="profile-image"
                    src={props.streamer.getProfileUrl()} />
                <b>{props.streamer.getUserName()}</b> ({props.streamer.getUserId()})
            </div>
            <div className="flex-fill text-right">
                <Button
                    color="danger"
                    className="reset-btn"
                    onClick={props.tokenReset}>
                    계정 토큰 리셋
                </Button>
            </div>
        </header>
    );
}

export default Header;