import React from 'react';
import User from '../../data/user';
import './header.css';

interface Props {
    streamer: User
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
        </header>
    );
}

export default Header;