import { useField } from 'formik';
import React, { forwardRef } from 'react';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

import AddRequiredText from '../../HelpingComponent/AddRequiredText';

const TextBox = forwardRef(
    ({ label, labelClassName = "", inputClassName, extraLabelField, wrapClass = "", placeholder, isRequired, requiredText = "※必須", isDeletable = false, deleteField = () => { }, dataContent = {}, ...props }, ref) => {
        const [field] = useField(props);
        if (field.value === null) {
            field.value = '';
        }

        return (
            <div className={`${wrapClass}`}>
                {label && (
                    <div className='flex justify-between'>
                        <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                            {label} {isRequired ? <AddRequiredText requiredText={requiredText} /> : null}
                        </label>

                        {extraLabelField}
                    </div>
                )}

                <input ref={ref} className={`${inputClassName} text-black`} placeholder={placeholder ?? ''} {...field} {...props} />
                {isDeletable && (
                    <AiOutlineClose fill='#000' color="#000" className="absolute top-2 right-2 cursor-pointer h-[22px] w-[22px] z-50" onClick={(e) => deleteField(e, dataContent)} style={{ zIndex: 9999, right: "10px", top: "28px" }} />
                )}
            </div>
        );
    }
);

export default TextBox;
