'use client';

//@ts-ignore
import React from 'react';

interface AiMessgeProps {
    message: string;
}

export const AiMessge = ({ message }: AiMessgeProps) => {
    return (
        <>
            <div className="flex-grow overflow-auto p-1">
                <div className="flex flex-row mb-4">
                    <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center mx-3">AI</div>
                    <div className="flex-grow ml-4 bg-gray-200 rounded-lg p-2">
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </>
    );
};
