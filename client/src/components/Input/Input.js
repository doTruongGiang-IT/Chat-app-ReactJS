import React from 'react';
import './Input.css';
import sendIcon from '../../icons/sendIcon4.svg';

const Input = ({message, setMessage, sendMessage}) => {
    return (
        <form className="form">
            <input type="text" className="input" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key==="Enter" ? sendMessage(e) : null} />
            <button className="sendButton" onClick={(e) => sendMessage(e)}><img src={sendIcon} alt="send" /></button>
        </form>
    )
}

export default Input;