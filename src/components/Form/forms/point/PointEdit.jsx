import { Formik, Form } from "formik";
import { Button } from "devextreme-react/button";
import Loader from "../../../atoms/Loading/TherapistLoader";
import React, { useEffect, useRef, useState } from "react";
import useMutationApiResponse from "../../../../hooks/useMutationApiResponse";
import { useModal } from "../../../../contexts/ModalContext";
import Section from "../../FormInputs/Section";
import InputContainer from "../../FormInputs/InputContainer";
import TextAreaInput from '../../FormInputs/TextAreaInput';

import NumberBox from "../../FormInputs/NumberBox";
import SelectBox from "../../FormInputs/SelectBox";
import TextBox from "../../FormInputs/TextBox";

import useFetchQuery from "../../../../hooks/useFetchQuery";
import { Column,Lookup } from "devextreme-react/data-grid";
import Table from "../../../ui/Table";
import { useCreatePointHistoryMutation } from "../../../../features/point/pointApi";
import useCustomStore from "../../../../hooks/useCustomStore";
import { ValueErrorBar } from "devextreme-react/chart";
import {unixTimestampToDateFormat } from "../../../../utils/commonFunctions";

const isDefaultOptions = [
    {id: 1, caption:"○"},
    {id: 0, caption:""}
]
const paymentStatusOptions = [
    { id: 1, caption: "購入・支払い済み" },
    { id: 2, caption: "購入だけ" },
];

export default function PointEdit({ paymentHistoryId, userId, userPaymentHistoryMemo="", closeModal, tableRef }) {
    const formikRef = useRef();
    const { isModalOpen: refetch } = useModal();

    const { trigger } = useMutationApiResponse("");

    const [formValue, setFormValue] = useState({
        pointHistoryPoint: 0,
        pointHistoryPaymentValue: 0,
        pointHistoryUserId: userId,
        pointHistoryUserPaymentHistoryId: paymentHistoryId,
        userPaymentHistoryStatus: 2,
        userPaymentHistoryMemo:userPaymentHistoryMemo
    });

    //Query
    const { dataSource, isLoading, restData } = useCustomStore('pointHistoryId', `/payment-history/${paymentHistoryId}`, false, [], refetch);

    //Mutation list
    const [createPointHistory, { isLoading: updateLoading }] = useCreatePointHistoryMutation();
    console.log("restData", restData)
    const { paymentHistoryData = [], shippingData = [], userInfo=[] } = restData
    //For edit
    useEffect(() => {
        if (!isLoading) {
            const formData = {
                pointHistoryPoint: 0,
                pointHistoryPaymentValue: 0,
                pointHistoryUserId: userId,
                pointHistoryUserPaymentHistoryId: paymentHistoryId,
                userPaymentHistoryMemo:userPaymentHistoryMemo
            }

            setFormValue(formData);

            if (formikRef.current) {
                formikRef.current.resetForm();
                formikRef.current.setFieldValue(formData);
            }
        }
        

    }, [isLoading]);

    useEffect(() => {
        if(paymentHistoryData && paymentHistoryData.length>0){
            setFormValue((prevState) => ({
                ...prevState,
                ...paymentHistoryData[0],
                totalPaymentAmount:parseInt(paymentHistoryData[0].totalPaymentAmount?paymentHistoryData[0].totalPaymentAmount:0)
            }));
        }
        if(userInfo && userInfo.length>0){
            setFormValue((prevState) => ({
                ...prevState,
                ...userInfo[0],
                currentPoint:parseInt(userInfo[0].currentPoint)
            }));
        }
        
    }, [restData]);


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('my valus >>>>', values);
        const {pointHistoryPoint, userPaymentHistoryStatus, pointHistoryPaymentValue} = values || {};
        console.log('my valus >>>>', userPaymentHistoryStatus);

        const mutatedApi = async (data) => await createPointHistory(data);
        const { success } = await trigger({ values, setSubmitting, mutatedApi, resetForm, closeModal });

        if (success) {
            if (tableRef.current) {
                tableRef.current.instance.refresh();
            }
        }
    };

    const dateCellRender = (e) => {
        console.log("dateRender",e)
        if (e.data[e.column.dataField] !== 0) return e.text;
    }


    return (
        <div className={`point-edit-wrapper ${formValue.userPaymentHistoryStatus==2 ? 'three-buttons' : ''}`}>
            {(isLoading || updateLoading) && <Loader />}

            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form >
                        <Section caption="" wrapClass="mb-[10px]">
                            <InputContainer className="space-y-2">
                                <NumberBox allowNegative={true} disabled={formValue.userPaymentHistoryStatus==1} name="pointHistoryPoint" label="付与ポイント" inputClassName="w-full" />
                                <NumberBox allowNegative={true} disabled={formValue.userPaymentHistoryStatus==1} name="pointHistoryPaymentValue" label="入金額" inputClassName="w-full" />
                            </InputContainer>
                        </Section>

                        <Section caption="付与ポイント履歴" wrapClass="mb-[30px]">
                            <Table
                                dataSource={dataSource}
                                // onCellClick={handleOnCellClick}
                                // onCellPrepared={onCellPrepared}
                                paging={false}
                                sort={false}
                                rowFilter={false}
                                className="user-edit-form"
                            >
                                <Column
                                    caption="付与ポイント"
                                    dataField="pointHistoryPoint"
                                    allowFiltering={false}
                                    format="#,##0.##"
                                    dataType="number"
                                    alignment="right"
                                />
                                <Column
                                    caption="入金額"
                                    dataField="pointHistoryPaymentValue"
                                    allowFiltering={false}
                                    format="#,##0.##"
                                    dataType="number"
                                    alignment="right"
                                />
                                <Column
                                    caption="決済時間"
                                    allowFiltering={false}
                                    dataField="pointHistoryPointAt"
                                    dataType="datetime"
                                    format="yyyy/MM/dd HH:mm"
                                    alignment="center"
                                    cellRender={dateCellRender}
                                />
                            </Table>
                        </Section>

                        <Section caption="購入情報" wrapClass="mb-[30px]">
                        <InputContainer className="space-y-2">
                            <TextBox disabled value={paymentStatusOptions.find(opt=>opt.id==values?.userPaymentHistoryStatus)?.caption} name="userPaymentHistoryStatus" label="現在の状態" inputClassName="w-full" />
                            <NumberBox disabled="true" name="pointPrice" label="購入金額" inputClassName="w-full" />
                            <TextBox disabled value={unixTimestampToDateFormat(Math.floor(values?.userPaymentHistoryCreatedAt/1000), true)} name="userPaymentHistoryCreatedAt" label="購入日時" inputClassName="w-full" />
                            <NumberBox disabled="true" name="totalPaymentAmount" label="合計入金額" inputClassName="w-full" />
                        </InputContainer>
                        </Section>


                        <Section caption="ユーザー情報" wrapClass="mb-[30px]">
                        <InputContainer className="space-y-2">
                            <TextBox disabled value={unixTimestampToDateFormat(Math.floor(values?.userCreatedAt/1000), true)} name="userCreatedAt" label="登録日時" inputClassName="w-full" />
                            <TextBox disabled value={unixTimestampToDateFormat(Math.floor(values?.userPointLastPurchaseAt/1000), true)} name="userPointLastPurchaseAt" label="最終購入日時" inputClassName="w-full" />
                            <TextBox disabled value={unixTimestampToDateFormat(Math.floor(values?.userPointLastGachaAt/1000), true)} name="userPointLastGachaAt" label="最終パック実行日時" inputClassName="w-full" />
                            <TextBox disabled value={unixTimestampToDateFormat(Math.floor(values?.userLastActiveAt/1000), true)} name="userLastActiveAt" label="セッション更新日時" inputClassName="w-full" />
                            
                            <NumberBox disabled="true" name="currentPoint" label="現在pt" inputClassName="w-full" />
                            <NumberBox disabled="true" name="userPointPurchaseCount" label="累計購入回数" inputClassName="w-full" />
                            <NumberBox disabled="true" name="userPointPurchaseValue" label="累計購入（入金）金額" inputClassName="w-full" />
                            <NumberBox disabled="true" name="userPointPurchaseValueManualBank" label="累計購入（入金）金額　銀行振込" inputClassName="w-full" />
                            
                        </InputContainer>
                            
                        </Section>


                        <Section caption="発送住所" wrapClass="mb-[30px]">
                            {shippingData.map(shipping=>(<>
                                <InputContainer className="space-y-2 pb-10">
                                    
                                    {shipping?.userShippingPriorityFlag==1 && <TextBox disabled value="○" name="userShippingName" label="デフォ" inputClassName="w-full" />}
                                    
                                    <TextBox disabled value={shipping?.userShippingName} name="userShippingName" label="名前" inputClassName="w-full" />
                                    <TextBox disabled value={shipping?.userShippingZipcode} name="userShippingZipcode" label="〒" inputClassName="w-full" />
                                    <TextBox disabled value={shipping?.userShippingAddress} name="userShippingAddress" label="都道府県" inputClassName="w-full" />
                                    <TextBox disabled value={shipping?.userShippingAddress2} name="userShippingAddress2" label="市区町村" inputClassName="w-full" />
                                    <TextBox disabled value={shipping?.userShippingAddress3} name="userShippingAddress3" label="町名・番地" inputClassName="w-full" />
                                    <TextBox disabled value={shipping?.userShippingAddress4} name="userShippingAddress4" label="建物名/ビル名等" inputClassName="w-full" />
                                    <TextBox disabled value={shipping?.userShippingTelCountryCode} name="userShippingTelCountryCode" label="TEL国" inputClassName="w-full" />
                                    <TextBox disabled value={shipping?.userShippingTel} name="userShippingTel" label="TEL" inputClassName="w-full" />
                                </InputContainer>
                            </>))}
                            
                        </Section>

                        <Section caption="メモ欄" wrapClass="mt-16">
                            <InputContainer className="space-y-2">
                                <TextAreaInput name="userPaymentHistoryMemo" disabled={formValue.userPaymentHistoryStatus==1} label="メモ" inputClassName="w-full" />
                            </InputContainer>
                        </Section>

                        <div className="modal-footer">
                            <div className="flex flex-col">
                            <div>
                            ポイントを付与せず処理を完了させるにはポイントを0のまま「ポイント決済＋完了」を実行してください。<br></br>
                            ポイント決済を完了すると、ユーザーの累計購入回数が1上がり、売り上げに計上されます。<br></br>
                            累計購入回数を上げたくない場合は、処理を完了せずポイント決済のみを実行してください。
                            </div>

                            <Button
                                className='w-full mt-20 modal-button3'
                                text='決済の複製（決済が完了していた場合にポイントを付与する際に利用してください）'
                                type="submit"
                                stylingMode="contained"
                                useSubmitBehavior={true}
                                disabled={isSubmitting}
                                onClick={() => setFieldValue('userPaymentHistoryStatus', 3)}//3 means make duplicate payment
                            />
                            {formValue.userPaymentHistoryStatus==2 && (<>
                                <Button
                                    className='w-full mt-5 modal-button2'
                                    text='ポイント決済のみ（処理は完了しません）'
                                    type="button"
                                    stylingMode="contained"
                                    useSubmitBehavior={true}
                                    disabled={isSubmitting}
                                    onClick={() => setFieldValue('userPaymentHistoryStatus', 2)}
                                />

                                <Button
                                    className='w-full mt-5 modal-button1'
                                    text='ポイント決済＋完了（これ以上ポイント決済ができなくなります）'
                                    type="button"
                                    stylingMode="contained"
                                    useSubmitBehavior={true}
                                    disabled={isSubmitting}
                                    onClick={() => setFieldValue('userPaymentHistoryStatus', 1)}
                                />
                            </>) }
                            
                            </div>
                        </div>
                    </Form>   
                )}
            </Formik>
        </div>
    )
}