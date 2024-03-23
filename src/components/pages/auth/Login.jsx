import { useRef, useState } from "react";
import { Button } from "devextreme-react/button";
import { Formik, Form, ErrorMessage } from "formik";
import InputContainer from "../../Form/FormInputs/InputContainer";
import TextBox from "../../Form/FormInputs/TextBox";
import loginFormSchema, { LOGIN_FORM_INITIAL_VALUE } from "../../../utils/schemas/loginFormSchema";
import { useLoginMutation } from "../../../features/auth/authApi";
import Loader from "../../atoms/Loading/TherapistLoader";
import { useNavigate } from 'react-router-dom';
import PasswordWithEye from "../../Form/FormInputs/PasswordWithEye";

export default function Login() {
    let navigate = useNavigate();
    const formikRef = useRef(null);

    const [apiError, setApiError] = useState('');

    const [login, { isLoading, isError }] = useLoginMutation();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setApiError('');

        console.log('my values ->>>>>>>>>>>>>>', values)

        setSubmitting(true);
        const { data, error } = await login(values);
        setSubmitting(false);

        if (!error) {
            resetForm();
            navigate('/products');
        }
        else {
            const { data: { message } = {} } = error || {};
            setApiError(message);
        }
    };

    return (
        <>
            {isLoading && <Loader />}

            <div className="w-full">
                <div className="flex flex-nowrap justify-center bg-red-400 h-8">
                    <div className="flex text-center">
                        <div className="leading-8 text-center text-white font-bold max-w-[640px] truncate">
                            <span className="text-base w-auto">ログイン</span>
                        </div>
                    </div>
                </div>

                <div className="flex content justify-center min-h-full overlay scroll-bar">
                    <div className="page960-body min-w-[960px]">
                        <div className="p-2">
                            <Formik
                                innerRef={formikRef}
                                initialValues={LOGIN_FORM_INITIAL_VALUE}
                                validationSchema={loginFormSchema}
                                validateOnBlur={false}
                                validateOnChange={false}
                                onSubmit={handleSubmit}
                                enableReinitialize={true}
                            >
                                {({ values, setFieldValue, isSubmitting }) => (
                                    <Form>
                                        <InputContainer className="">
                                            <TextBox name="accountId" label="ID" inputClassName="w-full" />
                                            <ErrorMessage name="accountId" component="div" className="text-sm text-[#FF758F]" />
                                        </InputContainer>

                                        <InputContainer className="">
                                            <PasswordWithEye name="password" label="パスワード" inputClassName="w-full" />
                                            <ErrorMessage name="password" component="div" className="text-sm text-[#FF758F]" />
                                        </InputContainer>

                                        <div className="mt-20">
                                            <span className={`form-error text-sm text-[#FF758F] ${apiError ? 'visible' : 'invisible'}`}>{apiError}</span>

                                            <Button
                                                type="submit"
                                                className='modal-button !w-full !static'
                                                text="ログイン"
                                                stylingMode="contained"
                                                useSubmitBehavior={true}
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}