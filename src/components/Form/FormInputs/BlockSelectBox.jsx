import { useField } from 'formik';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import AddRequiredMark from '../../HelpingComponent/AddRequiredMark';
import { AiOutlinePlus } from 'react-icons/ai';

const BlockSelectBox = ({ label, labelClassName, inputClassName, border = 'border', isRequired, ...props }) => {
    const [field] = useField(props);
    if (field.value === null) {
        field.value = '';
    }

    return (
        <>
            <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                {label} {isRequired ? <AddRequiredMark /> : null}
            </label>
            <div className="flex justify-center align-middle items-center !cursor-pointer text-blue-100">
                <AiOutlinePlus className="h-[22px] w-[22px] z-10 mr-[-24px]" />
                <select
                    className={`h-8 pl-1 py-1 hover:outline-1 active:outline-2 focus:outline-2 hover:outline-offset-0 active:outline-offset-2 focus:outline-offset-2 hover:outline-[#145c8f] 
                    active:outline-[#145c8f] text-center focus:outline-[#145c8f] focus:transition-all focus:duration-200 focus:ease-in
                    cursor-pointer outline-none hover:bg-blue-400 border-solid border-blue-100 w-full ${inputClassName} ${border}`}
                    {...field}
                    {...props}
                />
            </div>
        </>
    );
};
export default BlockSelectBox;
