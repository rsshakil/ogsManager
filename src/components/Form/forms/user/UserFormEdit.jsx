import { Formik, Form } from "formik";
import { Button } from "devextreme-react/button";
import Loader from "../../../atoms/Loading/TherapistLoader";
import React, { useEffect, useRef, useState } from "react";
import useMutationApiResponse from "../../../../hooks/useMutationApiResponse";
import { useModal } from "../../../../contexts/ModalContext";
import Section from "../../FormInputs/Section";
import InputContainer from "../../FormInputs/InputContainer";
import SelectBox from "../../FormInputs/SelectBox";
import TextAreaInput from "../../FormInputs/TextAreaInput";
import NumberBox from "../../FormInputs/NumberBox";
import {unixTimestampToDateFormat } from "../../../../utils/commonFunctions";
import userFormSchema, {USER_FORM_INITIAL_VALUE} from "../../../../utils/schemas/userFormSchema";
import TextBox from "../../FormInputs/TextBox";
import useFetchUserQuery from "../../../../hooks/useFetchUserQuery";
import { Column, Button as DataGridButton ,Lookup } from 'devextreme-react/data-grid';
import { useUpdateUserMutation } from "../../../../features/user/userApi";
import UserCollections from "./UserCollections";
import ImageIcon from "../../../atoms/icons/ImageIcon";
import paperAirPlaneIcon from "../../../atoms/img/paper-airplane.svg";
import userIcon from "../../../atoms/img/user2.svg";
import logIcon from "../../../atoms/img/log.svg";
import mailIcon from "../../../atoms/img/mail.svg";
import telIcon from "../../../atoms/img/tel.svg";
import ipIcon from "../../../atoms/img/ip.svg";
import piIcon from "../../../atoms/img/pi.svg";
import fingerPrintIcon from "../../../atoms/img/finger-print.svg";


const userStatusOptions = [
    { id: 1, caption: "有効" },
    { id: 2, caption: "無効" }
]
const userBillFlagOptions = [
    { id: 0, caption: "無効" },
    { id: 1, caption: "有効" }
]
const userTestUserFlagOptions = [
    { id: 0, caption: "通常ユーザー" },
    { id: 1, caption: "テストユーザー" }
]
const directionIdOptions = [
    { id: 1, caption: "本番" },
    { id: 2, caption: "裏サイト" },
];
const userSMSFlagOptions = [
    { id: 1, caption: "認証済み" },
    { id: 0, caption: "未認証" },
];
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
const paymentHistoryStatusLookup = [
    { id: 1, caption: '成功' },
    { id: 3, caption: '決済開始' },
    { id: 4, caption: '決済失敗' },
    { id: 9, caption: 'ブロック済み' },
    { id: 10, caption: '不信請求' },
    { id: 11, caption: '返金済み' }
]
const smsHistoryStatusLookup = [
    { id: 1, caption: 'SMS認証' },
    { id: 2, caption: '購入認証' },
    { id: 3, caption: '発送認証' },
    { id: 4, caption: 'SMS認証返信' },
    { id: 5, caption: '購入認証返信' },
    { id: 6, caption: '発送認証返信' }
]

export default function UserFormEdit({ userId, closeModal, tableRef }) {
    const formikRef = useRef();
    const { isModalOpen: refetch } = useModal();

    const { trigger } = useMutationApiResponse(userFormSchema, ["userMemo"]);

    const [formValue, setFormValue] = useState(USER_FORM_INITIAL_VALUE);

    //Query
    const { data: { records }, isLoading: userDetailLoading } = useFetchUserQuery(userId, refetch);

    //Mutation list
    const [updateUser, { isLoading: updateUserLoading }] = useUpdateUserMutation();


    //For edit
    useEffect(() => {
        if (!userDetailLoading && records) {
            setFormValue(records);

            if (formikRef.current) {
                formikRef.current.resetForm();
                formikRef.current.setFieldValue(records);
            }
        }
    }, [userDetailLoading, records]);


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const mutatedApi = async (data) => await updateUser({ userId, data });

        const { success } = await trigger({ values, setSubmitting, mutatedApi, resetForm, closeModal });

        if (success) {
            if (tableRef.current) {
                tableRef.current.instance.refresh();
            }
        }
    };

    const dateCellRender = (e) => {
        if (e.data[e.column.dataField] !== 0) return e.text;
    }

    return (
        <div>
            {(userDetailLoading || updateUserLoading) && <Loader />}

            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <Section caption="基本情報" wrapClass="">
                            <InputContainer className="space-y-2">
                                <TextBox disabled name="userId" label="ユーザーID" inputClassName="w-full" />
                                <SelectBox name="userDirectionId" label="ユーザーの表示先（変更不可）" options={directionIdOptions} inputClassName="w-full" disabled="true" />
                                <TextBox disabled name="userUUID" label="UUID" inputClassName="w-full" />
                                <SelectBox name="userStatus" label="アカウント状態(無効にするとログイン不能になります)" options={userStatusOptions} inputClassName="w-full" />
                                <SelectBox name="userBillingFlag" label="課金状態(無効にすると課金不能になります)" options={userBillFlagOptions} inputClassName="w-full" />
                                <TextBox disabled name="countryName" label="地域" inputClassName="w-full" />
                                <TextBox disabled name="userEmail" label="ログインメールアドレス" inputClassName="w-full" />
                                {/* <TextBox disabled type="password" name="userPassword" label="ログインパスワード" inputClassName="w-full" /> */}

                                <div className="">
                                    <label>SMS番号</label>
                                    <InputContainer>
                                        <div className="flex">
                                            <div className="w-1/6 mr-4">
                                                <TextBox disabled name="userSMSTelLanguageCCValue" value={`${values?.userSMSFlag==1?values?.userSMSTelLanguageCCValue:""}`} label="" inputClassName="w-full" />
                                            </div>
                                            <div className="w-5/6">
                                                <TextBox disabled name="userSMSTelNo" value={`${values?.userSMSFlag==1?values?.userSMSTelNo:""}`} label="" inputClassName="w-full" />
                                            </div>
                                        </div>
                                    </InputContainer>
                                </div>
                                <TextBox disabled name="referralCount" label="紹介人数" inputClassName="w-full" />
                                
                                <SelectBox name="userSMSFlag" label="SMS認証状態" options={userSMSFlagOptions} inputClassName="w-full" disabled="true" />
                                <TextBox disabled name="userRegistIPAddress" label="登録IPアドレス" inputClassName="w-full" />
                                <TextBox disabled name="languageName" label="言語" inputClassName="w-full" />
                                <TextBox disabled name="userAFCode" label="アフィリエイトコード" inputClassName="w-full" />
                                <TextBox disabled name="userInvitationCode" label="紹介者コード" inputClassName="w-full" />
                                <SelectBox name="userTestUserFlag" label="テストユーザー" options={userTestUserFlagOptions} inputClassName="w-full" />
                            </InputContainer>
                        </Section>

                        <Section caption="ポイント情報" wrapClass="mt-[15px]">
                            <InputContainer className="space-y-2">
                                <NumberBox disabled name="userPointNowPoint" label="保有ポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointUsagePoint" label="累積消費ポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointExchangePoint" label="累積還元ポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointPurchasePoint" label="累積購入ポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointPurchasePointStripeCredit" label="累計購入stripeクレジットポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointPurchasePointStripeBank" label="累計購入stripe銀行振込ポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointPurchasePointEpsilonCredit" label="累計購入イプシロンクレジットポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointPurchasePointEpsilonBank" label="累計購入イプシロン銀行振込ポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointPurchasePointEpsilonPaypay" label="累計購入イプシロンPayPayポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointPurchasePointPaypay" label="累計購入PayPayポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointPurchasePointManualBank" label="累計購入銀行振込ポイント" inputClassName="w-full" />
                                 {/* new point display  */}
                                <NumberBox disabled name="userPointCouponPoint" label="累計クーポンポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointPresentPoint" label="累計プレゼントポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointSystemAdditionPoint" label="累計システム加算ポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointSystemSubtractionPoint" label="累計システム減算ポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointLostPoint" label="累計消失ポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointShippingPoint" label="累計発送ポイント" inputClassName="w-full" />
                                <NumberBox disabled name="userPointShippingRefundPoint" label="累計発送還元ポイント" inputClassName="w-full" />
                                {/* new point display  */}
                                <NumberBox disabled name="userPointPurchaseCount" label="累積購入回数" inputClassName="w-full" />
                                <NumberBox disabled name="userCollectionCount" label="保有数" inputClassName="w-full" />
                                <NumberBox disabled name="remainingConvertablePoint" label="コレクションポイント" inputClassName="w-full" />
                                <TextBox disabled value={unixTimestampToDateFormat(values.userPointLastPurchaseAt, true)} name="userPointLastPurchaseAt" label="最終決済日時" inputClassName="w-full" />
                            </InputContainer>
                        </Section>

                        <Section caption="LOG">
                            <InputContainer className="space-y-2">
                                <TextBox disabled value={unixTimestampToDateFormat(values.userCreatedAt, true)} name="userCreatedAt" label="登録日時" inputClassName="w-full" />
                                <TextBox disabled value={unixTimestampToDateFormat(values.userUpdatedAt, true)} name="userUpdatedAt" label="編集日時" inputClassName="w-full" />
                                <TextBox disabled value={unixTimestampToDateFormat(values.userLastLoginAt, true)} name="userLastLoginAt" label="最終ログイン日時" inputClassName="w-full" />
                                <TextBox disabled value={unixTimestampToDateFormat(values.userPointLastGachaAt, true)} name="userPointLastGachaAt" label="最終パック実行日時" inputClassName="w-full" />
                                <TextBox disabled value={unixTimestampToDateFormat(values.userLastActiveAt, true)} name="userLastActiveAt" label="セッション更新日時" inputClassName="w-full" />
                                <TextBox disabled value={unixTimestampToDateFormat(values.userSMSAuthenticatedAt, true)} name="userSMSAuthenticatedAt" label="SMS認証時間" inputClassName="w-full" />
                            </InputContainer>
                        </Section>

                        <UserCollections label="コレクション" userId={userId} type="collection">
                            <Column
                                caption="獲得日時"
                                dataField="userCollectionCreatedAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cellRender={dateCellRender}
                            />
                            <Column
                                caption="発送依頼期限"
                                dataField="userCollectionExpiredAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cellRender={dateCellRender}
                            />
                            <Column
                                caption="アイテム"
                                dataField="itemTranslateName"
                                allowSorting={false}
                            />
                            <Column
                                caption="pt"
                                dataField="userCollectionPoint"
                                width={120}
                                allowSorting={false}
                                format="#,##0.##"
                            />
                        </UserCollections>

                        <UserCollections label="発送申請中" userId={userId} type="shipping_await">
                            <Column
                                caption="発送申請日時"
                                dataField="userCollectionRequestAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cellRender={dateCellRender}
                            />
                            <Column
                                caption="アイテム"
                                dataField="itemTranslateName"
                                allowSorting={false}
                            />
                            <Column
                                    caption="pt"
                                    dataField="userCollectionPoint"
                                    width={120}
                                    allowSorting={false}
                                    format="#,##0.##"
                            />
                        </UserCollections>

                        <UserCollections label="発送済" userId={userId} type="shipping_complete">
                            <Column
                                caption="発送対応日時"
                                dataField="userCollectionShippedAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cellRender={dateCellRender}
                            />
                            <Column
                                caption="アイテム"
                                dataField="itemTranslateName"
                                allowSorting={false}
                            />
                            <Column
                                    caption="pt"
                                    dataField="userCollectionPoint"
                                    width={120}
                                    allowSorting={false}
                                    format="#,##0.##"
                            />
                        </UserCollections>

                        <UserCollections keyId="userPresentId" label="プレゼントBOX" userId={userId} type="present">
                            <Column
                                    caption="発行日"
                                    dataField="userPresentCreatedAt"
                                    dataType="datetime"
                                    format="yyyy/MM/dd HH:mm"
                                    alignment="center"
                                    width={160}
                                    allowSorting={false}
                                    cellRender={dateCellRender}
                            />
                            <Column
                                    caption="使用期限"
                                    dataField="userPresentExpiredAt"
                                    dataType="datetime"
                                    format="yyyy/MM/dd HH:mm"
                                    alignment="center"
                                    width={160}
                                    allowSorting={false}
                                    cellRender={dateCellRender}
                            />
                            <Column
                                    caption="プレゼント名"
                                    dataField="presentName"
                                    allowSorting={false}
                            />
                            <Column
                                    caption="pt"
                                    dataField="presentPoint"
                                    width={120}
                                    allowSorting={false}
                                    format="#,##0.##"
                            />
                            <Column
                                    caption="使用日時"
                                    dataField="userPresentUsedAt"
                                    dataType="datetime"
                                    format="yyyy/MM/dd HH:mm"
                                    alignment="center"
                                    width={160}
                                    allowSorting={false}
                                    cellRender={dateCellRender}
                            />
                        </UserCollections>

                        <UserCollections label="購入履歴（ストライプ）" keyId="userPaymentHistoryId" userId={userId} type="payment_history">
                            <Column
                                caption="実行日時"
                                dataField="userPaymentHistoryCreatedAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cellRender={dateCellRender}
                            />
                            <Column
                                caption="pt"
                                dataField="userPaymentHistoryPaymentPoint"
                                allowSorting={false}
                                width={116}
                                format="#,##0.##"
                            />
                            <Column
                                caption="ステータス"
                                dataField="userPaymentHistoryStatus"
                                allowSorting={false}
                                alignment="center"
                                width={100}
                            >
                                <Lookup
                                    dataSource={paymentHistoryStatusLookup}
                                    valueExpr="id"
                                    displayExpr="caption"
                                />
                            </Column>
                            <Column
                                type="buttons"
                                caption="PI"
                                dataField="paymentHistoryPIAction"
                                alignment="center"
                                width={60}
                                allowFiltering={false}
                                cssClass='cursor-pointer'
                            >
                                <DataGridButton>
                                    <ImageIcon icon={piIcon} />
                                </DataGridButton>
                            </Column>
                            <Column
                                type="buttons"
                                caption="IP"
                                dataField="paymentHistoryIPAction"
                                alignment="center"
                                width={60}
                                allowFiltering={false}
                                cssClass='cursor-pointer'
                            >
                                <DataGridButton>
                                    <ImageIcon icon={ipIcon} />
                                </DataGridButton>
                            </Column>
                            <Column
                                type="buttons"
                                caption="TEL"
                                dataField="paymentHistoryTelAction"
                                alignment="center"
                                width={60}
                                allowFiltering={false}
                                cssClass='cursor-pointer'
                            >
                                <DataGridButton>
                                    <ImageIcon icon={telIcon} />
                                </DataGridButton>
                            </Column>
                            <Column
                                type="buttons"
                                caption="UID"
                                dataField="paymentHistoryUIDAction"
                                alignment="center"
                                width={60}
                                allowFiltering={false}
                                cssClass='cursor-pointer'
                            >
                                <DataGridButton>
                                    <ImageIcon icon={userIcon} />
                                </DataGridButton>
                            </Column>
                            <Column
                                type="buttons"
                                caption="ID"
                                dataField="paymentHistoryIDAction"
                                alignment="center"
                                width={60}
                                allowFiltering={false}
                                cssClass='cursor-pointer'
                            >
                                <DataGridButton>
                                    <ImageIcon icon={paperAirPlaneIcon} />
                                </DataGridButton>
                            </Column>
                            <Column
                                type="buttons"
                                caption="LOG"
                                dataField="paymentHistoryLogAction"
                                alignment="center"
                                width={60}
                                allowFiltering={false}
                                cssClass='cursor-pointer'
                            >
                                <DataGridButton>
                                    <ImageIcon icon={logIcon} />
                                </DataGridButton>
                            </Column>
                            <Column
                                type="buttons"
                                caption="FP"
                                dataField="paymentHistoryCardFingerPrintAction"
                                alignment="center"
                                width={60}
                                allowFiltering={false}
                                cssClass='cursor-pointer'
                            >
                                <DataGridButton>
                                    <ImageIcon icon={fingerPrintIcon} />
                                </DataGridButton>
                            </Column>
                            <Column
                                type="buttons"
                                caption="MAIL"
                                dataField="paymentHistoryMailAction"
                                alignment="center"
                                width={60}
                                allowFiltering={false}
                                cssClass='cursor-pointer'
                            >
                                <DataGridButton>
                                    <ImageIcon icon={mailIcon} />
                                </DataGridButton>
                            </Column>
                            {/* <Column
                                caption="AFコード"
                                dataField="userPaymentHistoryAFCode"
                                allowSorting={false}
                                width={130}
                                cssClass='cursor-pointer'
                            />
                            <Column
                                caption="招待コード"
                                dataField="userPaymentHistoryInvitationCode"
                                allowSorting={false}
                                width={130}
                                cssClass='cursor-pointer'
                            /> */}
                        </UserCollections>

                        <UserCollections label="購入履歴（イプシロン）" keyId="userPaymentHistoryId" userId={userId} type="payment_history_epsilon">
                            <Column
                                caption="作成日時"
                                dataField="userPaymentHistoryCreatedAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cssClass='cursor-pointer'
                                cellRender={dateCellRender}
                            />
                            <Column
                                caption="開始日時"
                                dataField="userPaymentHistoryPaymentStartedAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cssClass='cursor-pointer'
                                cellRender={dateCellRender}
                            />
                            <Column
                                caption="３D開始日時"
                                dataField="userPaymentHistory3DSecureStartedAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cssClass='cursor-pointer'
                                cellRender={dateCellRender}
                            />
                            <Column
                                caption="完了日時"
                                dataField="userPaymentHistoryPaymentFinishedAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cssClass='cursor-pointer'
                                cellRender={dateCellRender}
                            />
                            <Column
                                caption="ステータス"
                                dataField="userPaymentHistoryStatus"
                                alignment="center"
                                width={60}
                                filter
                            >
                                <Lookup
                                    dataSource={paymentStatusOptions}
                                    valueExpr="id"
                                    displayExpr="caption"
                                />
                            </Column>
                            <Column
                                caption="購入pt"
                                dataField="userPaymentHistoryPaymentPoint"
                                allowSorting={false}
                                width={116}
                                cssClass='cursor-pointer'
                                format="#,##0.##"
                            />
                            <Column
                                caption="カード番号"
                                dataField="userPaymentHistoryCardNo"
                                allowSorting={false}
                                width={200}
                                cssClass='cursor-pointer'
                            />
                            <Column
                                caption="カード有効期限"
                                dataField="userPaymentHistoryCardExpired"
                                allowSorting={false}
                                width={130}
                                cssClass='cursor-pointer'
                            />
                            <Column
                                caption="CVC"
                                dataField="userPaymentHistoryCardCVC"
                                allowSorting={false}
                                width={80}
                                cssClass='cursor-pointer'
                            />
                            <Column
                                caption="カード名義人"
                                dataField="userPaymentHistoryCardHolderName"
                                allowSorting={false}
                                width={200}
                                cssClass='cursor-pointer'
                            />
                            <Column
                                caption="IP1"
                                dataField="userPaymentHistoryIPAddress1"
                                allowSorting={false}
                                width={160}
                                cssClass='cursor-pointer'
                            />
                            <Column
                                caption="IP2"
                                dataField="userPaymentHistoryIPAddress2"
                                allowSorting={false}
                                width={160}
                                cssClass='cursor-pointer'
                            />
                            <Column
                                caption="IP3"
                                dataField="userPaymentHistoryIPAddress3"
                                allowSorting={false}
                                width={160}
                                cssClass='cursor-pointer'
                            />
                        </UserCollections>

                        <UserCollections label="購入履歴（銀行振込アナログ）" keyId="userPaymentHistoryId" userId={userId} type="payment_history_banktransfer">
                            <Column
                                caption="購入日時"
                                dataField="userPaymentHistoryCreatedAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cssClass='cursor-pointer'
                                cellRender={dateCellRender}
                            />
                            <Column
                                caption="支払日時"
                                dataField="userPaymentHistoryFinishedAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cssClass='cursor-pointer'
                                cellRender={dateCellRender}
                            />
                            <Column
                                caption="購入金額"
                                dataField="userPaymentHistoryPaymentPoint"
                                allowSorting={false}
                                width={116}
                                cssClass='cursor-pointer'
                                format="#,##0.##"
                            />
                            <Column
                                caption="入金額"
                                dataField="pointHistoryPaymentValue"
                                allowSorting={false}
                                width={116}
                                cssClass='cursor-pointer'
                                format="#,##0.##"
                            />
                            
                            <Column
                                caption="付与pt"
                                dataField="pointHistoryPoint"
                                allowSorting={false}
                                width={116}
                                cssClass='cursor-pointer'
                                format="#,##0.##"
                            />
                            <Column
                                caption="決済者名"
                                dataField="userPaymentHistoryPayerName"
                                allowSorting={false}
                                width={200}
                                cssClass='cursor-pointer'
                            />
                            <Column
                                caption="決済者電話番号"
                                dataField="userPaymentHistoryPayerTelNo"
                                allowSorting={false}
                                width={130}
                                cssClass='cursor-pointer'
                            />
                            <Column
                                caption="決済者メールアドレス"
                                dataField="userPaymentHistoryPayerMail"
                                allowSorting={false}
                                width={200}
                                cssClass='cursor-pointer'
                            />
                            <Column
                                caption="購入時IP"
                                dataField="userPaymentHistoryIPAddress1"
                                allowSorting={false}
                                width={160}
                                cssClass='cursor-pointer'
                            />
                        </UserCollections>

                        <UserCollections keyId="userCouponId" label="クーポン利用履歴" userId={userId} type="coupon">
                            <Column
                                caption="利用日時"
                                dataField="userCouponCreatedAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cellRender={dateCellRender}
                            />
                            <Column
                                caption="クーポン名"
                                dataField="couponName"
                                allowSorting={false}
                            />
                            <Column
                                caption="クーポンコード"
                                dataField="couponCode"
                                allowSorting={false}
                            />
                            <Column
                                caption="pt"
                                dataField="couponPoint"
                                allowSorting={false}
                                width={116}
                                cssClass='cursor-pointer'
                                format="#,##0.##"
                            />
                        </UserCollections>

                        <UserCollections
                            keyId="userFriendUserId"
                            label={`友達紹介履歴　SMS認証時間：${values?.userSMSFlag == 1 ? unixTimestampToDateFormat(values.userSMSAuthenticatedAt, true) : '未認証'}`}
                            userId={userId}
                            type="user_friends"
                        >
                            <Column
                                caption="登録日時"
                                dataField="userCreatedAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cellRender={dateCellRender}
                            />
                            <Column
                                caption="id"
                                dataField="userFriendUserId"
                                allowSorting={false}
                            />
                            <Column
                                caption="メールアドレス"
                                dataField="userEmail"
                                allowSorting={false}
                            />
                            <Column
                                caption="SMS認証時間"
                                dataField="userSMSAuthenticatedAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cellRender={dateCellRender}
                            />
                        </UserCollections>

                        <UserCollections keyId="userShippingId" label="発送住所" userId={userId} type="shipping_address">
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
                        </UserCollections>

                        <UserCollections keyId="userSmsHistoryId" label="ユーザーSMS" userId={userId} type="user_sms">
                            <Column
                                caption="タイプ"
                                dataField="userSmsHistoryType"
                                alignment="center"
                                width={120}
                                allowSorting={false}
                                >
                                <Lookup
                                    dataSource={smsHistoryStatusLookup}
                                    valueExpr="id"
                                    displayExpr="caption"
                                />
                            </Column>
                            <Column
                                caption="状態"
                                dataField="userSmsHistoryStatus"
                                alignment="center"
                                width={100}
                                allowSorting={false}
                            />
                             <Column
                                caption="SMS番号"
                                dataField="userSmsHistoryTellNo"
                                allowSorting={false}
                            />
                            <Column
                                caption="国番号"
                                dataField="userSmsHistoryTellCountryCode"
                                allowSorting={false}
                            />
                            <Column
                                caption="OTP"
                                dataField="userSmsHistoryOtp"
                                alignment="center"
                                width={120}
                                allowSorting={false}
                            />
                            <Column
                                caption="作成日時"
                                dataField="userSmsHistoryCreatedAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cellRender={dateCellRender}
                            />
                            <Column
                                caption="有効日時"
                                dataField="userSmsHistoryExpiredAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowSorting={false}
                                cellRender={dateCellRender}
                            />
                        </UserCollections>

                        <Section caption="メモ欄" wrapClass="mt-10">
                            <InputContainer className="space-y-2">
                                <TextAreaInput name="userMemo" label="メモ" inputClassName="w-full" />
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