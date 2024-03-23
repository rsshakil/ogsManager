import { Formik, Form } from "formik";
import Loader from "../../../atoms/Loading/TherapistLoader";
import React, { useEffect, useRef, useState } from "react";
import { useModal } from "../../../../contexts/ModalContext";
import Section from "../../FormInputs/Section";
import InputContainer from "../../FormInputs/InputContainer";
import SelectBox from "../../FormInputs/SelectBox";
import {Button} from "devextreme-react/button";
import TextBox from "../../FormInputs/TextBox";
import http from "../../../../utils/httpService";

const detailStatusOptions = [
    { id: 1, caption: "ポイント購入（1）" },
    { id: 2, caption: "ポイント利用（ガチャ実行）（2）" },
    { id: 3, caption: "コレクションのポイント化（3）" },
    { id: 4, caption: "カードの保持有効期限切れ（4）" },
    { id: 5, caption: "ポイントの保持有効期限切れ（5）" },
    { id: 6, caption: "プレゼントの実行（6）" },
    { id: 7, caption: "クーポンの実行（7）" },
    { id: 8, caption: "発送申請でポイント減算（8）" },
    { id: 9, caption: "発送完了でポイント返却（9）" },
    { id: 10, caption: "システムでポイント追加（10）" },
    { id: 11, caption: "システムでポイント減算（11）" }
];

const paymentPatternOptions = [
    { id: 1, caption: "Stripeクレジット（1）" },
    { id: 2, caption: "Stripe銀行振込（2）" },
    { id: 3, caption: "Epsilonクレジット（3）" },
    { id: 4, caption: "Epsilon銀行振込（4）" },
    { id: 5, caption: "EpsilonPayPay（5）" },
    { id: 6, caption: "PayPay直接（6）" },
    { id: 7, caption: "直接銀行振込（7）" }
];

export default function ManualPointSqs({ closeModal }) {
    const formikRef = useRef();
    const { isModalOpen: refetch } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const [formValue, setFormValue] = useState({
        userId: null,
        point: null,
        executedAt: null,
        detailStatus: 1,
        paymentPattern: 1
    });

    useEffect(() => {
        formikRef.current.resetForm();
    },[refetch]);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('my values ->>>>>>>>>>>>>>', values);
        if (!values.userId || !values.point || !values.executedAt) {
            return;
        }
        try {
            const response = await http.post('/manager/point-sqs', values);
            console.log('response', response.message)
            if (response.message === 'success') {
                resetForm();
            }
        } catch (error) {
            console.log('error')
        }
    };

    return (
        <div>
            {(isLoading) && <Loader />}

            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <Section caption="SQSデータ">
                            <InputContainer>
                                <div className="space-y-2">
                                    <TextBox
                                        name="userId"
                                        wrapClass="relative"
                                        label="ユーザーID"
                                        labelClassName=""
                                        inputClassName="w-full text-right"
                                        isRequired={true}
                                    />
                                    <TextBox
                                        name="point"
                                        wrapClass="relative"
                                        label="ポイント"
                                        labelClassName=""
                                        inputClassName="w-full text-right"
                                        isRequired={true}
                                    />
                                    <TextBox
                                        name="executedAt"
                                        wrapClass="relative"
                                        label="実行日（unixtimestamp）"
                                        labelClassName=""
                                        inputClassName="w-full text-right"
                                        isRequired={true}
                                    />
                                    <SelectBox
                                        name="detailStatus"
                                        label="ステータス"
                                        options={detailStatusOptions}
                                        valueExpr="id"
                                        displayExpr="caption"
                                        inputClassName="w-full"
                                        isRequired={true}
                                    />
                                    <SelectBox
                                        name="paymentPattern"
                                        label="決済パターン"
                                        options={paymentPatternOptions}
                                        valueExpr="id"
                                        displayExpr="caption"
                                        inputClassName="w-full"
                                        isRequired={true}
                                    />
                                </div>
                            </InputContainer>
                        </Section>

                        <div>
                            <Button
                                className='w-full mt-20 modal-button2'
                                text="実行"
                                type="submit"
                                stylingMode="contained"
                                useSubmitBehavior={true}
                                disabled={isSubmitting}
                            />
                            <Button
                                className='w-full mt-20 modal-button3'
                                text="閉じる"
                                stylingMode="contained"
                                useSubmitBehavior={false}
                                onClick={closeModal}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}