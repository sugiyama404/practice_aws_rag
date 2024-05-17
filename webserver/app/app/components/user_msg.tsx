'use client';

//@ts-ignore
import React from 'react';

interface UserMessgeProps {
    message: string;
}

export const UserMessge = ({ message }: UserMessgeProps) => {
    return (
        <>
            <div className="flex-grow overflow-auto p-1">
                <div className="flex flex-row mb-4">
                    <div className="flex-grow ml-4 bg-gray-200 rounded-lg p-2">
                        <p>{message}</p>
                    </div>
                    <div className="w-10 h-10 bg-red-300 rounded-full flex items-center justify-center mx-3">you</div>
                </div>
            </div>
        </>
    );
};
