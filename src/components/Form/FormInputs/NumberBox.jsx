import { useField, useFormikContext } from 'formik';
import React from 'react';
import AddRequiredText from '../../HelpingComponent/AddRequiredText';
import { thousandSeparatedValue, convertedNumberedValue } from '../../../utils/commonFunctions';

const MAX_ALLOWED_VALUE = "4294967295";

const NumberBox = ({ isException = false, value: initialValue = '', keyUpdate, valueExpr = "id", label, labelClassName = "", extraLabelField, inputClassName, wrapClass = "", placeholder, isRequired, requiredText = "※必須", min, max, handleOnBlurNumber = () => {}, allowNegative = false, ...props }) => {
    const formik = useFormikContext();

    let [field] = useField(props);
    if (field.value === null) {
        field.value = '';
    }
    const { name } = field || {};

    let fieldName = name;
    let fieldValue = field.value

    //check the field is array type or not
    if (/\[.*\]/.test(name)) {
        const match = fieldName.match(/^(.*?)\[\d+\]/);
        const extractedName = match[1];

        fieldName = extractedName;
        field.value = initialValue[keyUpdate];

        if (!isException && !isNaN(initialValue[keyUpdate])) {
            field.value = initialValue[keyUpdate].toLocaleString('en-US');
        }

        fieldValue = field.value;
    }
    else if (!isException && !isNaN(fieldValue)) {
        field.value = fieldValue.toLocaleString('en-US');
    }

    // console.log('my value >>>', fieldValue)
    // console.log('my field >>>', field)

    const isValidNumber = (value) => {
        if (allowNegative) {
            return /^-?\d*(\.\d+)?(e-?\d+)?$/.test(value);
        }
        return /^-?\d+(\.\d+)?(e-?\d+)?$/.test(value);
    }

    const handleOnChangeNumberField = (e) => {
        const { value, name } = e.target || {}
        const isNumberValid = isValidNumber(value);

        if (value == '') {
            updateFieldState(value)
        }
        else if (isNumberValid) {
            let numberVal, isValid;
            if (allowNegative) {
                numberVal = value;
                isValid = true;
            }
            else {
                numberVal = Number(value);
                isValid = false;
            }

            if (min !== undefined && max !== undefined) {
                if ((numberVal >= Number(min) && numberVal <= Number(max)) && (value.length >= String(Number(min)).length && value.length <= String(Number(max)).length)) isValid = true;
            }
            else if (min !== undefined) {
                if (numberVal >= Number(min) && value.length >= String(Number(min)).length) isValid = true;
            }
            else if (max !== undefined) {
                if (numberVal <= Number(max) && value.length <= String(Number(max)).length) isValid = true;
            }
            else if (min === undefined && max === undefined && numberVal <= Number(MAX_ALLOWED_VALUE)) {
                isValid = true;
            }
            // console.log('is valid ->>>>>isNumberValid', isNumberValid);
            // console.log('is valid ->>>>>', isValid);
            // console.log('numberVal->>>>>', numberVal);

            if (isValid) {
                if (isException) updateFieldState(value);
                else updateFieldState(numberVal.toString());
            }
        }
    }

    const handleOnBlurNumberField = (e) => {
        handleOnBlurNumber(e);
        if (isException) return;

        const { value, name } = e.target || {}
        const numericValue = parseFloat(value.replace(/,/g, ''));

        if (!isNaN(numericValue)) {
            const formattedValue = numericValue.toLocaleString('en-US');
            updateFieldState(formattedValue);
        }
        else if (value == '') {
            updateFieldState(value);
        }
    }

    const handleOnFocusNumberField = (e) => {
        if (isException) return;

        const { value, name } = e.target || {}
        const formattedValue = parseFloat(value.replace(/,/g, ''));

        if (!isNaN(formattedValue)) {
            updateFieldState(formattedValue.toString());
        }
    }

    function updateFieldState(value) {
        //For array object type field
        if (typeof initialValue === 'object') {
            const { values = {} } = formik || {};

            let updatedState1 = values[fieldName] || [];
            const indexNo = updatedState1.findIndex(x => x[valueExpr] == initialValue[valueExpr]);
            if (updatedState1[indexNo]) {
                updatedState1[indexNo][keyUpdate] = value;
            }

            field.onChange({ target: { name: fieldName, value: updatedState1 } });
        }
        //For simple object type field
        else {
            field.onChange({ target: { name: fieldName, value: value } });
        }
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

            <input
                className={`${inputClassName} text-black text-right`}
                placeholder={placeholder ?? ''}

                {...field}
                {...props}
                onChange={handleOnChangeNumberField}
                onBlur={handleOnBlurNumberField}
                onFocus={handleOnFocusNumberField}
            />
        </div>
    );
}

export default NumberBox;
