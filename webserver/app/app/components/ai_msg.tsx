'use client';

//@ts-ignore
import React, { useState, useEffect } from 'react';

interface AiMessgeProps {
    message: string;
}

export const AiMessge = ({ message }: AiMessgeProps) => {
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [refFlag, setrefFlag] = useState(false);

    useEffect(() => {
        if (!message) return;

        const interval = setInterval(() => {
            if (currentCharIndex < message.length) {
                setCurrentCharIndex((prev) => prev + 1);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [message, currentCharIndex]);

    const defaultMessage = 'Thinking...';
    const displayedMessage = message
        ? message.substring(0, currentCharIndex).replace(/\[参考資料\]/g, '<br/>[参考資料]<br/>')
        : defaultMessage;

    return (
        <>
            <div className="flex-grow overflow-auto p-1">
                <div className="flex flex-row mb-4">
                    <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center mx-3">AI</div>
                    <div className="flex-grow ml-4 bg-gray-200 rounded-lg p-2">
                        <p dangerouslySetInnerHTML={{ __html: `<p>${displayedMessage}</p>` }} />
                    </div>
                </div>
            </div>
        </>
    );
};
