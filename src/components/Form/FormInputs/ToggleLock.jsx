import { useField } from 'formik';
import AddRequiredMark from '../../HelpingComponent/AddRequiredMark';
const ToggleLock = ({ label, labelClassName, inputClassName, textLeft, textRight, isRequired, ...props }) => {
    const [field] = useField(props);
    if (field.value === null) {
        field.value = '';
    }

    return (
        <>
            <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                {label} {isRequired ? <AddRequiredMark /> : null}
            </label>
            <label className="switchWrapper">
                <input type="checkbox" className="switchInput" id={props.id || props.name} {...field} {...props} />
                <div className="switchDisplay" before={textLeft} after={textRight}>
                    <div className="switchStatus centerPlace"></div>
                    <div className="switchBall"></div>
                </div>
            </label>
        </>
    );
};
export default ToggleLock;
