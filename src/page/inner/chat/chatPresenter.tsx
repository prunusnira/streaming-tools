import React, { Fragment } from "react";

import './chat.css';

interface Props {
    username: string
}

function ChatPresenter(props: Props) {
    const baseUrl: string = "https://www.twitch.tv/embed/";
    const baseUrl2: string = "/chat?parent=banpick.nira.one";

    return (
        <iframe
            frameBorder="0"
            src={baseUrl+props.username+baseUrl2}
            className="chat" />
    );
}

export default ChatPresenter;