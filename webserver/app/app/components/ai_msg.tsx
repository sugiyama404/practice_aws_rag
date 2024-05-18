'use client';

//@ts-ignore
import React, { useState, useEffect } from 'react';

interface AiMessgeProps {
    message: string;
}

export const AiMessge = ({ message }: AiMessgeProps) => {
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentCharIndex < message.length) {
                setCurrentCharIndex((prev) => prev + 1);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [message]);

    return (
        <>
            <div className="flex-grow overflow-auto p-1">
                <div className="flex flex-row mb-4">
                    <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center mx-3">AI</div>
                    <div className="flex-grow ml-4 bg-gray-200 rounded-lg p-2">
                        <p>{message.substring(0, currentCharIndex)}</p>
                    </div>
                </div>
            </div>
        </>
    );
};
