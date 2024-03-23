import { useField } from 'formik';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import AddRequiredMark from '../../HelpingComponent/AddRequiredMark';

const PasswordWithEye = ({ label = "", labelClassName = "", inputClassName = "", wrapClass = "", placeholder = '', isRequired = false, ...props }) => {
    const [field] = useField(props);
    if (field.value === null) {
        field.value = '';
    }
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`${wrapClass}`}>
            {label && (
                <label htmlFor={props.id || props.name} className={`${labelClassName} ${isRequired ? 'inline-flex' : ''}`}>
                    {label} {isRequired ? <AddRequiredMark /> : null}
                </label>
            )}

            <div className="flex justify-between">
                <input
                    className={`${inputClassName} text-black`}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder={placeholder}
                    {...field}
                    {...props}
                />
                <span className="eyeStyle" onClick={() => setShowPassword(prevState => !prevState)}>
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
            </div>
        </div>
    );
};

export default PasswordWithEye;
