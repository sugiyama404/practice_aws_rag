'use client';

//@ts-ignore
import React, { useState } from 'react';
import { AiMessge } from "./ai_msg";
import { UserMessge } from './user_msg';

export const Form = () => {
    const [messages, setMessages] = useState([["ご用件をお聞かせください。", true]]);
    const [newMessage, setNewMessage] = useState('');

    const handleChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newMessage) {
            const newMessages = [...messages, [newMessage, false]];
            setMessages(newMessages);
            setNewMessage('');
        }
    };

    return (
        <>
            <div className="flex-grow overflow-auto p-4">
                {messages.map((message, index) => (
                    <div key={index}>
                        {message[1] ? <AiMessge message={message[0]} /> : <UserMessge message={message[0]} />}
                    </div>
                ))}
            </div>
            <div className="flex flex-row bg-gray-800 py-4 px-2 rounded-b-lg">
                <input
                    type="text"
                    className="flex-grow px-4 py-2 rounded-l-lg"
                    placeholder="メッセージを入力"
                    value={newMessage}
                    onChange={handleChange}
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-r-lg" onClick={handleSubmit}>
                    送信
                </button>
            </div>
        </>
    );
};
