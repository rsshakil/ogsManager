import { Formik, Form } from "formik";
import { Button } from "devextreme-react/button";
import Loader from "../../../atoms/Loading/TherapistLoader";
import React, { useEffect, useRef, useState } from "react";
import useMutationApiResponse from "../../../../hooks/useMutationApiResponse";
import { useModal } from "../../../../contexts/ModalContext";
import Section from "../../FormInputs/Section";
import InputContainer from "../../FormInputs/InputContainer";
import NumberBox from "../../FormInputs/NumberBox";
import useFetchQuery from "../../../../hooks/useFetchQuery";
import {useUpdateUserPointMutation} from "../../../../features/user/userPointApi";

export default function UserPointEdit({ userId, closeModal, tableRef }) {
    const formikRef = useRef();
    const { isModalOpen: refetch } = useModal();

    const { trigger } = useMutationApiResponse("");

    const [formValue, setFormValue] = useState({
        currentPoint: 0,
        interventionPoint: 0
    });

    //Query
    const { dataSource, isLoading } = useFetchQuery(`/manager/point/${userId}`, refetch);

    //Mutation list
    const [updateUserPoint, { isLoading: updateLoading }] = useUpdateUserPointMutation();


    //For edit
    useEffect(() => {
        if (!isLoading && dataSource) {
            setFormValue(dataSource);

            if (formikRef.current) {
                formikRef.current.resetForm();
                formikRef.current.setFieldValue('currentPoint', dataSource.currentPoint);
                formikRef.current.setFieldValue('interventionPoint', 0);
            }
        }
    }, [isLoading, dataSource]);


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        if (values.interventionPoint === 0) {
            closeModal();
            return;
        }

        const mutatedApi = async (data) => await updateUserPoint({ userId, data });
        const { success } = await trigger({ values, setSubmitting, mutatedApi, resetForm, closeModal });

        if (success) {
            if (tableRef.current) {
                tableRef.current.instance.refresh();
            }
        }
    };


    return (
        <div>
            {(isLoading || updateLoading) && <Loader />}

            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <Section caption="ユーザーポイント情報" wrapClass="mb-[30px]">
                            <InputContainer className="space-y-2">
                                <NumberBox disabled name="currentPoint" label="現在のポイント" inputClassName="w-full" />
                                <NumberBox allowNegative={true} name="interventionPoint" label="介入ポイント（減らす場合は「-」を先頭につけてください。現在以上のポイントを減らすと0になります。）" inputClassName="w-full" />
                            </InputContainer>
                        </Section>

                        <div>
                            <Button
                                className='w-full mt-20 modal-button'
                                text='保存'
                                type="submit"
                                stylingMode="contained"
                                useSubmitBehavior={true}
                                disabled={isSubmitting}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}