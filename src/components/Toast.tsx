// src/components/Toast.tsx
import React from 'react';

interface ToastProps {
    message: string;
    type: 'error' | 'success' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
    return (
        <div className={`toast toast-${type}`}>
            <p>{message}</p>
        </div>
    );
};

export default Toast;
