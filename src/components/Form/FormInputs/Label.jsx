import { useField } from 'formik';
import React from 'react';

const Label = ({ label, labelClassName, ...props }) => {
    const [field] = useField(props);
    return (
        <>
            {label && (
                <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                    {label}
                </label>
            )}
        </>
    );
};

export default Label;
