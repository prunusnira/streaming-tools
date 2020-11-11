import React from 'react';
import './header.css';

interface Props {
    loginName: string
}

function Header(props: Props) {
    return (
        <header className="header">
            <section>
                Twitch LoL-Style BanPicker
            </section>
            <section>
                {props.loginName}
            </section>
        </header>
    );
}

export default Header;