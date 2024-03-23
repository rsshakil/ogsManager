import React from "react";

export const H3 = (props) => {
    const { children, required, className } = props;
    return (
        <h3 className={`text-base pt-2 font-bold ${required} ${className}`}>
            {children}
        </h3>
    );
};



