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
import useFetchQuery from "../../../../hooks/useFetchQuery";
import { Column,Lookup } from "devextreme-react/data-grid";
import Table from "../../../ui/Table";
import { useCreatePointHistoryMutation } from "../../../../features/point/pointApi";
import useCustomStore from "../../../../hooks/useCustomStore";
import { ValueErrorBar } from "devextreme-react/chart";

const paymentStatusOptions = [
    // { id: 1, caption: "成功" },
    // { id: 2, caption: "---" },
    // { id: 3, caption: "作成" },
    // { id: 4, caption: "失敗" },
    // { id: 5, caption: "認証済み" },
    // { id: 6, caption: "認証失敗" },
    // { id: 7, caption: "成功（セキュアなし）" },
    { id: 1, caption: '決済完了' },
    { id: 3, caption: '決済開始' },
    { id: 4, caption: '3DS失敗' },
    { id: 5, caption: '3DS開始' },
    { id: 6, caption: '認証失敗' },
    { id: 7, caption: '決済完了（3DSなし）' },
    { id: 8, caption: 'トークン発行失敗' },
];

export default function PointEdit({ paymentHistoryId, userId, userPaymentHistoryMemo="", closeModal, tableRef }) {
    const formikRef = useRef();
    const { isModalOpen: refetch } = useModal();

    const { trigger } = useMutationApiResponse("");

    const [formValue, setFormValue] = useState({
        pointHistoryPoint: 0,
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

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('my valus >>>>', values);
        const {pointHistoryPoint, userPaymentHistoryStatus} = values || {};

        if(!pointHistoryPoint && userPaymentHistoryStatus == 2) return;

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
        <div>
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
                                <NumberBox allowNegative={true} name="pointHistoryPoint" label="決済ポイント" inputClassName="w-full" />
                            </InputContainer>
                        </Section>

                        <Section caption="決済ポイント履歴" wrapClass="mb-[30px]">
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
                                    caption="決済ポイント"
                                    dataField="pointHistoryPoint"
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
                            <Table
                                dataSource={paymentHistoryData}
                                // onCellClick={handleOnCellClick}
                                // onCellPrepared={onCellPrepared}
                                paging={false}
                                sort={false}
                                rowFilter={false}
                                className="single-data-row-form"
                            >
                                <Column
                                    caption="現在の状態"
                                    dataField="userPaymentHistoryStatus"
                                    allowFiltering={false}
                                >
                                    <Lookup
                                        dataSource={paymentStatusOptions}
                                        valueExpr="id"
                                        displayExpr="caption"
                                    />
                                </Column>
                                <Column
                                    caption="購入金額"
                                    dataField="pointPrice"
                                    allowFiltering={false}
                                    format="#,##0.##"
                                    dataType="number"
                                    alignment="right"
                                />
                                <Column
                                    caption="購入日時"
                                    allowFiltering={false}
                                    dataField="userPaymentHistoryCreatedAt"
                                    dataType="datetime"
                                    format="yyyy/MM/dd HH:mm"
                                    alignment="center"
                                    cellRender={dateCellRender}
                                />
                            </Table>
                        </Section>


                        <Section caption="ユーザー情報" wrapClass="mb-[30px]">
                            <Table
                                dataSource={userInfo}
                                // onCellClick={handleOnCellClick}
                                // onCellPrepared={onCellPrepared}
                                paging={false}
                                sort={false}
                                rowFilter={false}
                                className="single-data-row-form"
                            >
                                
                                <Column
                                    caption="登録日時"
                                    allowFiltering={false}
                                    dataField="userCreatedAt"
                                    dataType="datetime"
                                    format="yyyy/MM/dd HH:mm"
                                    alignment="center"
                                    cellRender={dateCellRender}
                                />
                                
                                <Column
                                    caption="最終購入日時"
                                    allowFiltering={false}
                                    dataField="userPointLastPurchaseAt"
                                    dataType="datetime"
                                    format="yyyy/MM/dd HH:mm"
                                    alignment="center"
                                    cellRender={dateCellRender}
                                />
                                
                                <Column
                                    caption="最終パック実行日時"
                                    allowFiltering={false}
                                    dataField="userPointLastGachaAt"
                                    dataType="datetime"
                                    format="yyyy/MM/dd HH:mm"
                                    alignment="center"
                                    cellRender={dateCellRender}
                                />
                                
                                <Column
                                    caption="セッション更新日時"
                                    allowFiltering={false}
                                    dataField="userLastActiveAt"
                                    dataType="datetime"
                                    format="yyyy/MM/dd HH:mm"
                                    alignment="center"
                                    cellRender={dateCellRender}
                                />

                                <Column
                                    caption="現在pt"
                                    dataField="currentPoint"
                                    allowFiltering={false}
                                    format="#,##0.##"
                                    dataType="number"
                                    alignment="right"
                                />

                                <Column
                                    caption="累積購入回数"
                                    dataField="userPointPurchaseCount"
                                    allowFiltering={false}
                                    format="#,##0.##"
                                    dataType="number"
                                    alignment="right"
                                />

                                <Column
                                    caption="累積購入金額"
                                    dataField="userPointPurchasePoint"
                                    allowFiltering={false}
                                    format="#,##0.##"
                                    dataType="number"
                                    alignment="right"
                                />

                                <Column
                                    caption="累積購入金額　アナログ銀行"
                                    dataField="userPointPurchasePointManualBank"
                                    allowFiltering={false}
                                    format="#,##0.##"
                                    dataType="number"
                                    alignment="right"
                                />

                            </Table>
                        </Section>


                        <Section caption="発送住所" wrapClass="mb-[30px]">
                            <Table
                                dataSource={shippingData}
                                // onCellClick={handleOnCellClick}
                                // onCellPrepared={onCellPrepared}
                                paging={false}
                                sort={false}
                                rowFilter={false}
                                className="user-edit-form"
                            >
                                
                                <Column
                                caption="デフォ"
                                dataField="userShippingPriorityFlag"
                                alignment="center"
                                width={50}
                                allowSorting={false}
                            />
                            <Column
                                caption="名前"
                                dataField="userShippingName"
                                allowSorting={false}
                            />
                            <Column
                                caption="〒"
                                dataField="userShippingZipcode"
                                allowSorting={false}
                            />
                            <Column
                                caption="都道府県"
                                dataField="userShippingAddress"
                                allowSorting={false}
                            />
                            <Column
                                caption="市区町村"
                                dataField="userShippingAddress2"
                                allowSorting={false}
                            />
                            <Column
                                caption="町名・番地"
                                dataField="userShippingAddress3"
                                allowSorting={false}
                            />
                            <Column
                                caption="建物名/ビル名等"
                                dataField="userShippingAddress4"
                                allowSorting={false}
                            />
                            <Column
                                caption="TEL国"
                                dataField="userShippingTelCountryCode"
                                allowSorting={false}
                            />
                            <Column
                                caption="TEL"
                                dataField="userShippingTel"
                                allowSorting={false}
                            />

                            </Table>
                        </Section>

                        <Section caption="メモ欄" wrapClass="mt-16">
                            <InputContainer className="space-y-2">
                                <TextAreaInput name="userPaymentHistoryMemo" label="メモ" inputClassName="w-full" />
                            </InputContainer>
                        </Section>

                        <div>
                            <div>
                            ポイントを付与せず処理を完了させるにはポイントを0のまま「ポイント決済（処理の完了）」を実行してください。
                            </div>
                            <Button
                                className='w-full mt-20 modal-button1'
                                text='ポイント決済のみ（処理は完了しません）'
                                type="submit"
                                stylingMode="contained"
                                useSubmitBehavior={true}
                                disabled={isSubmitting}
                                onClick={() => setFieldValue('userPaymentHistoryStatus', 2)}
                            />

                            <Button
                                className='w-full mt-5 modal-button2'
                                text='ポイント決済（処理の完了）'
                                type="button"
                                stylingMode="contained"
                                useSubmitBehavior={true}
                                disabled={isSubmitting}
                                onClick={() => setFieldValue('userPaymentHistoryStatus', 1)}
                            />
                        </div>
                    </Form>   
                )}
            </Formik>
        </div>
    )
}