import { useField } from 'formik';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import AddRequiredMark from '../../HelpingComponent/AddRequiredMark';
import AddRequiredText from '../../HelpingComponent/AddRequiredText';

const SelectBox = ({ label, labelClassName, inputClassName, wrapClass = "", border = 'border', isRequired, requiredText, options = [], valueExpr = "id", displayExpr = "caption", ...props }) => {
    const [field] = useField(props);
    if (field.value === null) {
        field.value = '';
    }
    return (
        <div className={`${wrapClass}`}>
            <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                {label} {isRequired ? <AddRequiredText requiredText={requiredText} /> : null}
            </label>

            <select className={` ${inputClassName} ${border} text-black`} {...field} {...props}>
                {options.map(x => <option key={x[valueExpr]} value={x[valueExpr]}>{x[displayExpr]}</option>)}
            </select>
        </div>
    );
};
export default SelectBox;
