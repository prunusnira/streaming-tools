import React, { Fragment } from 'react';
import ChatPresenter from './chatPresenter';

function ChatContainer() {

    return (
        <Fragment>
            <ChatPresenter
                username="prunusnira" />
        </Fragment>
    );
}

export default ChatContainer;