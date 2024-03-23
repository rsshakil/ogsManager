import { Field } from 'formik';
import { useEffect, useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';

const Checkbox = ({ label, labelPosition = "left", value, labelClass = "", inputClass = "", wrapClass = "", borderColor, onInputChange, ...props }) => {
    const [inputValue, setInputValue] = useState(0);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (e) => {
        const checked = Number(e.target.checked);

        setInputValue(checked);
        onInputChange(e);
    };

    return (
        <div className={`checkbox-input cursor-pointer font-normal relative ${wrapClass}`}>
            {label && labelPosition == "left" && <label className={`${labelClass} mr-2`}>{label}</label>}

            <Field type="checkbox" checked={inputValue == 1} onChange={handleInputChange} className={`checkbox-c appearance-none ${inputClass} ${borderColor ? borderColor : ''}`} {...props} />

            {/* <GiCheckMark className="text-2xl absolute left-[2px] text-green-500 bottom-[-2px] text-opacity-0 check-1" /> */}
        </div>
    );
};
export default Checkbox;
