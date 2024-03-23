import { useField } from 'formik';
import AddRequiredMark from '../../HelpingComponent/AddRequiredMark';

const Note = ({ label, labelClassName, inputClassName, placeholder, isRequired, height = 'h-32', ...props }) => {
    const [field] = useField(props);
    if (field.value === null) {
        field.value = '';
    }

    return (
        <>
            {label && <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                {label} {isRequired ? <AddRequiredMark /> : null}
            </label>}

            <textarea
                className={`${height}  ${inputClassName}`}
                placeholder={placeholder??'メモ'}
                {...field}
                {...props}
            />
        </>
    );
};

export default Note;
