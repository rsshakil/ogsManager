import { Fragment, useRef, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Button } from "devextreme-react/button";
import TextBox from "../../FormInputs/TextBox";
import InputContainer from "../../FormInputs/InputContainer";
import Section from "../../FormInputs/Section"
import { useExecuteRedisCommandMutation } from "../../../../features/settings/settingsApi";
import redisFormSchema, { REDIS_FORM_INITIAL_VALUE } from "../../../../utils/schemas/redisFormSchema";
import useMutationApiResponse from "../../../../hooks/useMutationApiResponse";
import Loader from "../../../atoms/Loading/TherapistLoader";
import TextAreaInput from "../../FormInputs/TextAreaInput";

export default function RedisManagement({ closeModal }) {
    const formikRef = useRef(null);
    const { trigger } = useMutationApiResponse(redisFormSchema);

    const [executeRedisCommand, { isLoading }] = useExecuteRedisCommandMutation();

    const [redisCommand, setRedisCommand] = useState('');
    const [content, setContent] = useState(undefined);
    // const [successExec, setSuccessExec] = useState(undefined);


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('my values ->>>>>>>>>>>>>>', values)

        const mutatedApi = async (data) => await executeRedisCommand(data);

        const { success, data } = await trigger({ values: values, setSubmitting, mutatedApi, resetForm });

        if (success) {
            setRedisCommand(values.redisCommand);
            setContent(data);
            // setSuccessExec(success);
        }

        console.log('my response is -->', success);
        console.log('my response is --> data', data);
    };

    return (
        <div>
            {(isLoading) && <Loader />}

            <Formik
                innerRef={formikRef}
                initialValues={REDIS_FORM_INITIAL_VALUE}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <Section caption="Redisのキーを入力してください" wrapClass="mt-2">
                            <InputContainer className="space-y-2">
                                <div className="flex flex-row justify-between items-center">
                                    <TextAreaInput name="redisCommand" label="" wrapClass="w-3/4" inputClassName="w-full" height="h-12" />

                                    <Button
                                        type="button"
                                        className='modal-button !w-44 !h-9 !static'
                                        text="実行"
                                        stylingMode="contained"
                                        useSubmitBehavior={true}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                {redisCommand && (
                                    <div className="text-white py-2">Command: {redisCommand}</div>
                                )}
                            </InputContainer>

                            <div className="flex flex-col w-full h-full min-h-screen bg-[#FFFFFF] text-black px-5 py-2">
                                {Array.isArray(content) && content.map(({ success, results }, i) => (
                                    <Fragment key={i}>
                                        <span>Success: {JSON.stringify(success)}</span>

                                        <div className="whitespace-pre-wrap break-all py-2">
                                            <b>Results:</b>{" "} <br></br>
                                            {Array.isArray(results) && <div className="">{results.join('\n')}</div>}
                                            {(!Array.isArray(results) && results) && <div className="w-full">{results}</div>}
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                        </Section>

                        <div>
                            <Button
                                className='w-full modal-button'
                                text="閉じる"
                                type="button"
                                stylingMode="contained"
                                onClick={() => closeModal()}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}