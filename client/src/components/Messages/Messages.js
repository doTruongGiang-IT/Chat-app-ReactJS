import React from 'react';
import './Messages.css';
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';

const Messages = ({messages, name}) => {
    return (
        <ScrollToBottom className="messages">
            {
                messages.map((message, index) => {
                    return <Message key={index} message={message} name={name} />
                })
            }
        </ScrollToBottom>
    )
}

export default Messages;
