
import { Field } from 'formik';
import AddRequiredText from "../../HelpingComponent/AddRequiredText"
import { useEffect, useState } from 'react';
import FileInput from "../../Form/FormInputs/FileInput";
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

//To take control from Formik this field will be used. State will update manually
export default function FormikField({ type = "text", label, labelColor='#E01329', name, value = "", labelClassName, inputClassName, wrapClass = "", isRequired, requiredText = "※必須", imageType = '', onInputChange, isDeletable = false, deleteField = () => { }, dataContent = {}, ...props }) {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        onInputChange(e);
    };

    function handleImageChange(image = {}) {
        const { location, inputFeildName } = image || {};
        // setFormValue((prevState) => ({
        //     ...prevState,
        //     [inputFeildName]: location || ''
        // }))
        // setFieldValue(inputFeildName, location || '');
        const imgObj = {
            target: {
                name:inputFeildName,
                value:location || '',
            }
        }
        setInputValue(location || '');
        onInputChange(imgObj);
    }

    return (
        <div className={`${wrapClass}`}>
            {type == 'file' && (<>
                <FileInput imgPath={inputValue}
                    name={name}
                    label={label}
                    labelPosition={'center'}
                    imageType={imageType}
                    bucketName={`productimage-ogs-${process.env.REACT_APP_ENVIRONMENT}`}
                    setUploadedImage={handleImageChange}
                    error={error}
                    setError={setError}

                />
            </>)}

            {type != 'file' && (<>
                {label && (
                    <label htmlFor={props.id || name} className={`${labelClassName}`}>
                        {label} {isRequired ? <AddRequiredText labelFontColor={labelColor} requiredText={requiredText} /> : null}
                    </label>
                )}

                {type == "textarea" ? (
                    <Field as="textarea" name={name} value={inputValue} onChange={handleInputChange} className={`${inputClassName} text-black`} {...props} />
                ) : (
                        <>
                        <Field type={type} name={name} value={inputValue} onChange={handleInputChange} className={`${inputClassName} text-black`} {...props} />
                        {isDeletable && (
                            <AiOutlineClose fill='#000' color="#000" className="absolute top-2 right-2 cursor-pointer h-[22px] w-[22px] z-50" onClick={(e) => deleteField(e, dataContent)} style={{ zIndex: 9999, right: "10px", top: "28px" }} />
                            )}
                        </>
                )}
            </>)}


        </div>
    )
}