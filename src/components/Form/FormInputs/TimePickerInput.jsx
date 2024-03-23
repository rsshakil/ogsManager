import { useField } from 'formik';
import React, { useState } from 'react';
import { GoClock } from 'react-icons/go';
import Calendar2 from '../../Calendar/Calendar2';
import AddRequiredMark from '../../HelpingComponent/AddRequiredMark';
import TimesPicker from '../../TimePicker/TimesPicker';

const TimePickerInput = ({
    label,
    labelClassName,
    inputClassName,
    value,
    setTimeValue,
    timePickerWidth = 'w-[10.25rem]',
    className,
    placeholder,
    isRequired,
    ...props
}) => {
    const [showTimePicker, setShowTimePicker] = useState();
    return (
        <>
            {label && (
                <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                    {label} {isRequired ? <AddRequiredMark /> : null}
                </label>
            )}
            <div
                className={`flex items-center cursor-pointer justify-between relative
                 border ${timePickerWidth} border-solid border-blue-100 bg-blue-25 ${className}`}
                onClick={() => {
                    setShowTimePicker(!showTimePicker);
                }}
            >
                <input
                    className={`h-8 p-2 outline-none w-full placeholder-gray-300 pointer-events-none ${inputClassName}`}
                    type="text"
                    value={value}
                    readOnly
                    tabIndex="-1"
                    placeholder={placeholder ? placeholder : ''}
                    {...props}
                />
                <GoClock className="text-right z-10 text-blue-50 mr-2" />
            </div>

            {showTimePicker && (
                <Calendar2
                    className="w-[392px] h-[112px]"
                    close={() => {
                        setShowTimePicker(false);
                    }}
                    setDateValue={setTimeValue}
                    components={
                        <TimesPicker
                            setDateValue={setTimeValue}
                            setShowCalendar={setShowTimePicker}
                            notStoreValue={true}
                            value={value}
                        />
                    }
                />
            )}
        </>
    );
};
export default TimePickerInput;
