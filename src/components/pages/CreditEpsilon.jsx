import React, { useRef, useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { settingsState } from "../../store/settingsState";
import { displayState } from "../../store/displayState";
import {useModal} from "../../contexts/ModalContext";
import {Button, Column, FilterRow, Lookup} from "devextreme-react/data-grid";
import Table from "../ui/Table";
import EditIcon from "../atoms/icons/EditIcon";
import useCustomStore from "../../hooks/useCustomStore";
import useFetchCountryInitQuery from "../../hooks/useFetchCountryInitQuery";
import UserFormEdit from "../Form/forms/user/UserFormEdit";
import UserPointEdit from "../Form/forms/user/UserPointEdit";
import PointEdit from "../Form/forms/point/PointEdit";
import { ja } from "../../store/errorMessage/ja";

import { 
    statusLookup as userStatusLookup, 
    statusCellRenderer as userStatusCellRenderer, 
    allPossibleRowFilterLookupData as userAllPossibleRowFilterLookupData,
    smsLookup, 
    smsCellRenderer,
    userSMSTelNoCellRenderer,
    userBillingFlagLookup,
    userBillingFlagCellRenderer,
} from "./Users";


const allPossibleRowFilterLookupData = [
    // { userPaymentHistoryStatus: 1 },
    // { userPaymentHistoryStatus: 2 },
    // { userPaymentHistoryStatus: 3 },
    // { userPaymentHistoryStatus: 4 },
    ...userAllPossibleRowFilterLookupData,
]


 const statusLookup = [
    { id: 1, caption: '決済完了' },
    { id: 3, caption: '決済開始' },
    { id: 4, caption: '3DS失敗' },
    { id: 5, caption: '3DS開始' },
    { id: 6, caption: '認証失敗' },
    { id: 7, caption: '決済完了（3DSなし）' },
    { id: 8, caption: 'トークン発行失敗' },
]

 function statusCellRenderer(cellData) {
    const textColor = cellData.value === 4 ? '#FF758F' : ''; // Change the text color for "Disabled" status
    const targetItemStatus = statusLookup.find(item => item.id === cellData.data.userStatus);
    return (
        <div style={{ color: textColor }}>
            {targetItemStatus?.caption}
        </div>
    );
}


export const CreditEpsilon = () => {
    const location = useLocation();
    const dataGridRef = useRef(null);
    const { showModal, closeModal, setTableRef } = useModal();
    const elementRef = useRef(null);

    const [displayStateValue, setDisplayState] = useRecoilState(displayState);

    //Query
    const { data: { countries = [] } = {}, isFetching: userInitLoading, refetchApi } = useFetchCountryInitQuery(false);
    const { dataSource, isLoading } = useCustomStore('userPaymentHistoryId', '/payment-history-epsilon-credit', true, allPossibleRowFilterLookupData);

    const [applyFilter, setApplyFilter] = useState('onClick');

    let pagePath = 'payment-history-epsilon-credit';
    // let pageName = location.state?.data.name;
    let pageTitle = 'クレジット（イプシロン）';

    useEffect(() => {
        window.history.pushState(null, '', window.location.href);
        if (dataGridRef.current) {
            refetchApi();
            dataGridRef.current.instance.refresh();
        }
        setDisplayState((prevState) => ({
            ...prevState,
            pageTitle: pageTitle,
            pagePath: pagePath,
            // pageName: pageName,
        }))
    }, [location]);

    useEffect(() => {
        if (dataGridRef.current) {
            setTableRef(dataGridRef);
        }
    }, [dataGridRef])

    useEffect(() => {
        if (elementRef.current) {
            // Get the filter row element
            const filterRowElement = dataGridRef.current.instance.element().querySelector('.dx-datagrid-filter-row');

            if (filterRowElement) {
                const dataField = elementRef.current.column.dataField;
                // Find the editor elements within the filter row
                const filterCols = filterRowElement.querySelectorAll('.dx-datagrid-filter-row td');
                filterCols.forEach((filterCol, columnIndex) => {
                    // Do something with each editor element (e.g., log its value)
                    if (columnIndex === elementRef.current.columnIndex) {
                        const editorElement = filterCol.querySelector('.dx-texteditor-input');
                        console.log(editorElement, 'editorElement')
                        if (editorElement) {
                            if (dataField === 'userStatus' || dataField === 'userDirectionId' || dataField === 'userSMSFlag' || dataField === 'userBillingFlag')
                            {
                                if (editorElement.hasAttribute('aria-controls')) {
                                    editorElement.focus();
                                }
                                else {
                                    editorElement.click();
                                }
                            }
                            else {
                                if (applyFilter === 'onClick') {
                                    editorElement.focus();
                                }
                                else {
                                    editorElement.click();
                                }
                            }
                        }
                    }
                });
            }
        }
    }, [applyFilter])

    const handleOnCellClick = (e) => {
        //console.log('handleColumnClick e ', e)
        const { dataField } = e.column || {};
        
        if (e.rowType === 'data') {
            // point edit
            const pointEditModalOpenColumns = [
                'userPointNowPoint', 'userPointUsagePoint', 'userPointExchangePoint', 'userPointPurchasePoint',
                'userPointPurchaseCount', 'userPointSystemAdditionPoint', 'userPointCouponPoint', 'userPointPresentPoint',
                'userPointSystemSubtractionPoint', 'userPointLostPoint', 'userPointShippingPoint', 'userPointShippingRefundPoint',
                'userPointPurchasePointStripeCredit', 'userPointPurchasePointStripeBank', 'userPointPurchasePointEpsilonCredit',
                'userPointPurchasePointEpsilonBank', 'userPointPurchasePointEpsilonPaypay', 'userPointPurchasePointPaypay',
                'userPointPurchasePointManualBank'
            ];

            if (pointEditModalOpenColumns.includes(dataField)){
                const data = e.data;
                showModal(`${data.userEmail} ユーザー情報編集`, <UserPointEdit userId={data?.userId} closeModal={closeModal} tableRef={dataGridRef} />);
            }
            // editAction
            if (dataField === 'userEdit') {
                const data = e.data;
                showModal(`${data.userEmail} ユーザー情報編集`, <UserFormEdit userId={data?.userPaymentHistoryUserId} closeModal={closeModal} tableRef={dataGridRef} />);
            }
        }
        else if (e.rowType === 'filter') {
            if (e.rowIndex === 1) {
                if (dataField === "userStatus" || dataField === "userDirectionId" || dataField === "countryName" || dataField === 'userSMSFlag' || dataField === 'userBillingFlag' || dataField == 'userPaymentHistoryStatusCaption') {
                    setApplyFilter('auto');
                } else {
                    setApplyFilter('onClick');
                }
                // last filtered element ref set
                elementRef.current = e;
            }
        }
    }

    const onEditorPreparing = (e) => {
        if (e.parentType == 'filterRow' && e.dataField !== "userStatus" && e.dataField !== "userDirectionId" && e.dataField !== 'userSMSFlag' && e.dataField !== 'userBillingFlag') {
            e.editorOptions.onFocusOut = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
            e.editorOptions.onEnterKey = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
        }

        if ((e.parentType === "dataRow" || e.parentType === "filterRow")) {
            if (e.dataField === "userPaymentHistoryStatusCaption" || e.dataField === "countryName") {
                e.editorName = "dxTagBox";
                e.editorOptions.selectAllText = "すべてを選択";
                e.editorOptions.allowFilter = false;
                e.editorOptions.showSelectionControls = true;
                e.editorOptions.height = 30;
                e.editorOptions.dropDownOptions = {
                    minWidth: 220,
                };
                e.editorOptions.value = e.value || [];
                e.editorOptions.applyValueMode = "useButtons";
                e.editorOptions.onValueChanged = function (args) {
                    e.setValue(args.value);
                };

                if (e.dataField === "countryName") {
                    e.editorOptions.dataSource = countries;
                    e.editorOptions.displayExpr = "countryName";
                    e.editorOptions.valueExpr = "countryId";
                }
                else if(e.dataField === "userPaymentHistoryStatusCaption") {
                    e.editorOptions.dataSource = statusLookup;
                    e.editorOptions.displayExpr = "caption";
                    e.editorOptions.valueExpr = "id";
                }
            }
        }
    };

    const dateCellRender = (e) => {
        if (e.data[e.column.dataField] !== 0) return e.text;
    }

    const errorMessageCellRender = (e) => {
        if (e.row.data.userPaymentHistoryErrorCode){
            return ja[e.row.data.userPaymentHistoryErrorCode]?ja[e.row.data.userPaymentHistoryErrorCode]:"クレジットカードの決済に失敗しました。";
        }else{
            return "";
        }
    }

    return (
        <>
            <Table
                className="non-editable-table"
                isLoading={isLoading}
                dataSource={dataSource}
                dataGridRef={dataGridRef}
                onCellClick={handleOnCellClick}
                onEditorPreparing={onEditorPreparing}
                allowColumnResizing={true}
                allowColumnReordering={true}
                stateStoring={true}
            >
                <FilterRow  applyFilter={applyFilter} visible={true}/>

                {/* <Column
                    type="buttons"
                    caption="編集"
                    dataField="pointEdit"
                    alignment="center"
                    width={60}
                    allowFiltering={false}
                    cssClass='cursor-pointer'
                >
                    <Button>
                        <EditIcon classNames="inline fill-white" />
                    </Button>
                </Column> */}

                <Column
                    type="buttons"
                    caption="編集"
                    dataField="userEdit"
                    alignment="center"
                    width={60}
                    allowFiltering={false}
                    cssClass='cursor-pointer'
                >
                    <Button>
                        <EditIcon classNames="inline fill-white" />
                    </Button>
                </Column>


                <Column
                    caption="注文番号"
                    dataField="userPaymentHistoryId"
                    width={80}
                />
                <Column
                    caption="ユーザーID"
                    dataField="userPaymentHistoryUserId"
                    width={80}
                />

                <Column
                    caption="状態"
                    dataField="userPaymentHistoryStatusCaption"
                    alignment="center"
                    width={200}
                    cssClass="tag-box"
                />
                
                <Column
                    caption="エラーコード"
                    dataField="userPaymentHistoryErrorCode"
                    width={120}
                />
                <Column
                    caption="エラーメッセージ"
                    dataField="userPaymentHistoryErrorMessage"
                    width={320}
                    cellRender={errorMessageCellRender}
                    allowFiltering={false}
                />
                <Column
                    caption="ログインメール"
                    dataField="userEmail"
                    width={240}
                />
                <Column
                    caption="購入額"
                    dataField="pointPrice"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />
                <Column
                    caption="購入pt"
                    dataField="userPaymentHistoryPaymentPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />
                <Column
                    caption="決済開始日時"
                    dataField="userPaymentHistoryCreatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="認証開始日時"
                    dataField="userPaymentHistoryPaymentStartedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="3DS開始日時"
                    dataField="userPaymentHistory3DSecureStartedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="決済完了日時"
                    dataField="userPaymentHistoryPaymentFinishedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="カード番号"
                    dataField="userPaymentHistoryCardNo"
                    width={160}
                />
                <Column
                    caption="有効期限"
                    dataField="userPaymentHistoryCardExpired"
                    width={80}
                />
                <Column
                    caption="CVC"
                    dataField="userPaymentHistoryCardCVC"
                    width={80}
                />
                <Column
                    caption="名義人"
                    dataField="userPaymentHistoryCardHolderName"
                    width={160}
                />
                <Column
                    caption="カードブランド"
                    dataField="userPaymentHistoryCardBrand"
                    width={160}
                />
                <Column
                    caption="カード発行会社"
                    dataField="userPaymentHistoryCardCompany"
                    width={160}
                />
                <Column
                    caption="登録時IP"
                    dataField="userRegistIPAddress"
                    width={160}
                />
                <Column
                    caption="決済開始IP"
                    dataField="userPaymentHistoryIPAddress1"
                    width={160}
                />
                <Column
                    caption="3DS開始IP"
                    dataField="userPaymentHistoryIPAddress2"
                    width={160}
                />
                <Column
                    caption="決済完了IP"
                    dataField="userPaymentHistoryIPAddress3"
                    width={160}
                />
                <Column
                    caption="配送先氏名"
                    dataField="userShippingName"
                    width={640}
                />
                <Column
                    caption="コレクションpt合計"
                    dataField="userCollectionMyCollectionPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />
                <Column
                    caption="発送申請中pt合計"
                    dataField="userCollectionRequestPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />
                <Column
                    caption="発送済みpt合計"
                    dataField="userCollectionShippingPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />
                <Column
                    caption="ユーザー登録日時"
                    dataField="userCreatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="SMS"
                    dataField="userSMSTelNoFormat"
                    width={160}
                />
                <Column
                    caption="カード:IP数"
                    dataField="userCardCommontIPAddressCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />
                <Column
                    caption="カード:ユーザー数"
                    dataField="userCardCommonUserIdCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />
                <Column
                    caption="カード:決済総額"
                    dataField="userCardPaymentPointTotal"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />
                <Column
                    caption="ID:IP数"
                    dataField="userIdCommontIPAddressCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />

                <Column
                    caption="ID:決済数"
                    dataField="userIdPaymentCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />
                <Column
                    caption="ID:決済総額"
                    dataField="userIdPaymentPointTotal"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />
                <Column
                    caption="ID:カード数"
                    dataField="userIdCommonCardNoCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />



                <Column
                    caption="最終パック実行日時"
                    dataField="userPointLastGachaAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="最終決済日時"
                    dataField="userPointLastPurchaseAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="セッション更新日時"
                    dataField="userLastActiveAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="SMS認証日時"
                    dataField="userSMSAuthenticatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="保有pt"
                    dataField="userPointNowPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計消費pt"
                    dataField="userPointUsagePoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計還元pt"
                    dataField="userPointExchangePoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入pt"
                    dataField="userPointPurchasePoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入stripeクレジットpt"
                    dataField="userPointPurchasePointStripeCredit"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入stripe銀行振込pt"
                    dataField="userPointPurchasePointStripeBank"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入イプシロンクレジットpt"
                    dataField="userPointPurchasePointEpsilonCredit"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入イプシロン銀行振込pt"
                    dataField="userPointPurchasePointEpsilonBank"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入イプシロンPayPaypt"
                    dataField="userPointPurchasePointEpsilonPaypay"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入PayPaypt"
                    dataField="userPointPurchasePointPaypay"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入銀行振込pt"
                    dataField="userPointPurchasePointManualBank"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計クーポンpt"
                    dataField="userPointCouponPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計プレゼントpt"
                    dataField="userPointPresentPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計システム加算pt"
                    dataField="userPointSystemAdditionPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計システム減算pt"
                    dataField="userPointSystemSubtractionPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計消失pt"
                    dataField="userPointLostPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計発送pt"
                    dataField="userPointShippingPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計発送還元pt"
                    dataField="userPointShippingRefundPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入回数"
                    dataField="userPointPurchaseCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="保有アイテム"
                    dataField="userCollectionCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />
                 <Column
                    caption="コレクションpt"
                    dataField="remainingConvertablePoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />
                {/* 
                <Column
                    caption="購入金額"
                    dataField="userPaymentHistoryPaymentPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />

                <Column
                    caption="ユーザー状態"
                    dataField="userStatus"
                    alignment="center"
                    width={60}
                    filter
                    cellRender={userStatusCellRenderer}
                >
                    <Lookup
                        dataSource={userStatusLookup}
                        valueExpr="id"
                        displayExpr="caption"
                    />
                </Column>
                <Column
                    caption="地域"
                    dataField="countryName"
                    alignment="center"
                    width={120}
                    cssClass="tag-box"
                >
                </Column>
                <Column
                    caption="ID"
                    dataField="userId"
                    width={80}
                    alignment="right"
                />
                <Column
                    caption="紹介人数"
                    dataField="referralCount"
                    width={80}
                    alignment="right"
                />
                <Column
                    caption="ログインメール"
                    dataField="userEmail"
                    width={240}
                />
                <Column
                    caption="SMS認証"
                    dataField="userSMSFlag"
                    alignment="center"
                    width={60}
                    filter
                    cellRender={smsCellRenderer}
                >
                    <Lookup
                        dataSource={smsLookup}
                        valueExpr="id"
                        displayExpr="caption"
                    />
                </Column>
                <Column
                    caption="SMS"
                    dataField="userSMSTelNo"
                    width={150}
                    cellRender={userSMSTelNoCellRenderer}
                />
                <Column
                    caption="送付先[名]"
                    dataField="userShippingName"
                    width={160}
                />
                <Column
                    caption="送付先[〠]"
                    dataField="userShippingZipcode"
                    width={80}
                />
                <Column
                    caption="送付先[都道府県]"
                    dataField="userShippingAddress"
                />
                <Column
                    caption="送付先[市区町村]"
                    dataField="userShippingAddress2"
                />
                <Column
                    caption="送付先[町名・番地]"
                    dataField="userShippingAddress3"
                />
                <Column
                    caption="送付先[建物名/ビル名等]"
                    dataField="userShippingAddress4"
                />
                <Column
                    caption="送付先[TEL国]"
                    dataField="userShippingTelCountryCode"
                />
                <Column
                    caption="送付先[TEL]"
                    dataField="userShippingTel"
                    width={100}
                />
                <Column
                    caption="保有pt"
                    dataField="userPointNowPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計消費pt"
                    dataField="userPointUsagePoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計還元pt"
                    dataField="userPointExchangePoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入pt"
                    dataField="userPointPurchasePoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入stripeクレジットpt"
                    dataField="userPointPurchasePointStripeCredit"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入stripe銀行振込pt"
                    dataField="userPointPurchasePointStripeBank"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入イプシロンクレジットpt"
                    dataField="userPointPurchasePointEpsilonCredit"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入イプシロン銀行振込pt"
                    dataField="userPointPurchasePointEpsilonBank"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入イプシロンPayPaypt"
                    dataField="userPointPurchasePointEpsilonPaypay"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入PayPaypt"
                    dataField="userPointPurchasePointPaypay"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入銀行振込pt"
                    dataField="userPointPurchasePointManualBank"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計クーポンpt"
                    dataField="userPointCouponPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計プレゼントpt"
                    dataField="userPointPresentPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計システム加算pt"
                    dataField="userPointSystemAdditionPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計システム減算pt"
                    dataField="userPointSystemSubtractionPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計消失pt"
                    dataField="userPointLostPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計発送pt"
                    dataField="userPointShippingPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計発送還元pt"
                    dataField="userPointShippingRefundPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="累計購入回数"
                    dataField="userPointPurchaseCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />
                <Column
                    caption="保有アイテム"
                    dataField="userCollectionCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />
                 <Column
                    caption="コレクションpt"
                    dataField="remainingConvertablePoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />
                <Column
                    caption="最終パック実行日時"
                    dataField="userPointLastGachaAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="最終購入日時"
                    dataField="userPointLastPurchaseAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="登録日時"
                    dataField="userCreatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="セッション更新"
                    dataField="userLastActiveAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="最終ログイン"
                    dataField="userLastLoginAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="課金"
                    dataField="userBillingFlag"
                    alignment="center"
                    width={100}
                    filter
                    cellRender={userBillingFlagCellRenderer}
                >
                    <Lookup
                        dataSource={userBillingFlagLookup}
                        valueExpr="id"
                        displayExpr="caption"
                    />
                </Column>
                <Column
                    caption="UUID"
                    dataField="userUUID"
                    width={160}
                />
                <Column
                    caption="IP"
                    dataField="userRegistIPAddress"
                    width={160}
                />
                <Column
                    caption="AF"
                    dataField="userAFCode"
                    width={160}
                />
                <Column
                    caption="紹介者コード"
                    dataField="userInvitationCode"
                    width={160}
                />
                <Column
                    caption="言語"
                    dataField="languageName"
                    width={160}
                />
                <Column
                    caption="SMS認証時間"
                    dataField="userSMSAuthenticatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                /> */}
                {/* <Column
                    type="buttons"
                    caption="編集"
                    dataField="userEdit"
                    alignment="center"
                    width={60}
                    allowFiltering={false}
                    cssClass='cursor-pointer'
                >
                    <Button>
                        <EditIcon classNames="inline fill-white" />
                    </Button>
                </Column> */}
            </Table>
        </>
    );
};



