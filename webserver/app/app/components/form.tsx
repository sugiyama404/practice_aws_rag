'use client';

//@ts-ignore
import React, { useState } from 'react';
import { AiMessge } from "./ai_msg";
import { UserMessge } from './user_msg';
import { MessagesState } from '@/types/typing/msg';

export const Form = () => {
    const [messages, setMessages] = useState<MessagesState[]>([]);
    const [newMessage, setNewMessage] = useState('');

    const handleChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newMessage) {
            const message1: MessagesState = {
                message: newMessage,
                flag: false
            };
            const newMessages = [...messages, message1];
            setMessages(newMessages);
            const res = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "user_query": newMessage }),
            });
            const answer = await res.json();
            const message2: MessagesState = {
                message: answer.answer,
                flag: true
            };
            const newMessages2 = [...newMessages, message2];
            setMessages(newMessages2);
            setNewMessage('');
        }
    };

    return (
        <>
            <div className="flex-grow overflow-auto p-4">
                <div className="flex-grow overflow-auto p-1">
                    <div className="flex flex-row mb-4">
                        <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center mx-3">AI</div>
                        <div className="flex-grow ml-4 bg-gray-200 rounded-lg p-2">
                            <p>ご用件をお聞かせください。</p>
                        </div>
                    </div>
                </div>
                {messages.map((message, index) => (
                    <div key={index}>
                        {message.flag ? <AiMessge message={message.message} /> : <UserMessge message={message.message} />}
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
