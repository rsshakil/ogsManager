import React, { useState } from 'react';
import { GoCalendar } from 'react-icons/go';
import commonConstants from '../../../lib/commonConstants';
import Calendar2 from '../../Calendar/Calendar2';
import DatePicker from '../../DatePicker/DatePicker';
import AddRequiredMark from '../../HelpingComponent/AddRequiredMark';

const DatePickerInput = ({
    label,
    labelClassName,
    datePickerWidth = ' w-[24.25rem]',
    inputClassName,
    valueunset,
    value,
    setDateValue,
    placeholder,
    isRequired,
    clickEventPrevent = false,
    ...props
}) => {
    // date picker
    const [showCalendarDate, setShowCalendarDate] = useState(false);
    return (
        <>
            {label && (
                <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                    {label} {isRequired ? <AddRequiredMark /> : null}
                </label>
            )}
            <div
                className={`flex items-center ${clickEventPrevent ? '' : 'cursor-pointer'} justify-between relative
                border border-solid border-blue-100 ${inputClassName} ${datePickerWidth}`}
                onClick={() => {
                    if (!clickEventPrevent) {
                        setShowCalendarDate(!showCalendarDate);
                    }
                }}
            >
                <input
                    className={`h-8 p-2 outline-none w-full placeholder-gray-300 ${inputClassName} pointer-events-none`}
                    type="text"
                    value={value}
                    {...props}
                    readOnly
                    tabIndex="-1"
                    placeholder={placeholder ? commonConstants.INPUT_PLACEHOLDER_PREFIX_SELECT(placeholder) : ''}
                />
                {!clickEventPrevent && <GoCalendar className="text-right z-10 text-blue-50 mr-2" />}
            </div>

            {showCalendarDate && (
                <Calendar2
                    close={() => {
                        setShowCalendarDate(false);
                    }}
                    setDateValue={setDateValue}
                    components={
                        <DatePicker
                            value={value}
                            setDateValue={setDateValue}
                            setShowCalendar={setShowCalendarDate}
                            notStoreValue={true}
                        />
                    }
                />
            )}
        </>
    );
};
export default DatePickerInput;
