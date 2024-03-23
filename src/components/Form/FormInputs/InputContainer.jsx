import React from 'react';
//this container will be used to wrap any input field(i.e. text, select, check, radio, textarea)
const InputContainer = ({ children, className }) => {
    return (
        <div className={`flex flex-col ${className} mb-4`} >
            {children}
        </div>
    );
};

export default InputContainer;