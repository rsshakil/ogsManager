import React from 'react';
import './ToggleButton.css';

const ToggleButton = ({ isOn, handleToggle, title1, title2, label }) => {
    return (
        <>
            <label className="text-blue-100" htmlFor="">
                {label}
            </label>
            <input
                checked={isOn}
                onChange={handleToggle}
                className="toggle-checkbox border-all"
                id={`toggle-new`}
                type="checkbox"
            />
            <label style={{ background: isOn && '#6BD543' }} className="toggle-label border-all" htmlFor={`toggle-new`}>
                <span
                    className={`toggle-button`}
                    style={{
                        borderLeft: isOn && '2px solid #145C8F',
                        borderRight: isOn || '2px solid #145C8F',
                    }}
                >
                    ||||
                </span>
                <span>{title1}</span>
                <span>{title2}</span>
            </label>
        </>
    );
};

export default ToggleButton;
