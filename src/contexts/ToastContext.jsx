import React, { createContext, useContext, useState } from 'react';
import Notify from 'devextreme/ui/notify';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {

    const showNotification = (message, type) => {
        Notify({
            message: message,
            maxWidth: 512,
            type: type,
            displayTime: 7500,//3500
            animation: {
                show: {
                    type: 'fade', duration: 400, from: 0, to: 1,
                },
                hide: { type: 'fade', duration: 40, to: 0 },
            },
        }, {
            position: 'bottom right',
            direction: 'up-push',
        });
    }

    const showToast = (message, type = 'info') => {
        //Handle multi toast basically form validation error
        if (Array.isArray(message) && message.length > 0) {
            let currentIndex = 0;
            showNotification(message[currentIndex], type);

            currentIndex++;
            const intervalId = setInterval(() => {
                if (currentIndex < message.length) {
                    showNotification(message[currentIndex], type);
                    currentIndex++;
                } else {
                    clearInterval(intervalId); // Stop the interval
                }
            }, 500);
        }
        //Handle single toast
        else if (message) {
            showNotification(message, type);
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
        </ToastContext.Provider>
    );
};