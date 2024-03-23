import { useField } from 'formik';

const TextAreaInput = ({ label, labelClassName, inputClassName, wrapClass = "", height = "h-32", placeholder, ...props }) => {
    let [field] = useField(props);
    if (field.value === null) {
        field.value = '';
    }
    return (
        <div className={`${wrapClass}`}>
            <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                {label}
            </label>
            <textarea
                className={`${height} p-2 text-black hover:outline-1 active:outline-2 focus:outline-2 hover:outline-offset-0 active:outline-offset-2 focus:outline-offset-2 hover:outline-[#145c8f] active:outline-[#145c8f] focus:outline-[#145c8f] focus:transition-all focus:duration-200 focus:ease-in outline-none border border-solid border-blue-100 width-full placeholder-gray-300 ${inputClassName}`}
                placeholder={placeholder ? placeholder : ''}
                {...field}
                {...props}
            />
        </div>
    );
};

export default TextAreaInput;
