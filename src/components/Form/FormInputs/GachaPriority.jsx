import React from 'react';
//this container will be used to wrap any input field(i.e. text, select, check, radio, textarea)
const GachaPriority = ({ gachaPrize = {} }) => {
    const { priority = '' } = gachaPrize
    return (
        <div className="p-3 w-[50px]">
            { priority }
        </div>
    );
};

export default GachaPriority;