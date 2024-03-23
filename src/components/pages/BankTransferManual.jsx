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
    { id: 1, caption: '完了' },
    { id: 2, caption: '振込待ち' },
    { id: 3, caption: '未決済' },
    { id: 4, caption: '決済失敗' },
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


export const BankTransferManual = () => {
    const location = useLocation();
    const dataGridRef = useRef(null);
    const { showModal, closeModal, setTableRef } = useModal();
    const elementRef = useRef(null);

    const [displayStateValue, setDisplayState] = useRecoilState(displayState);

    //Query
    const { data: { countries = [] } = {}, isFetching: userInitLoading, refetchApi } = useFetchCountryInitQuery(false);
    const { dataSource, isLoading } = useCustomStore('userPaymentHistoryId', '/payment-history', true, allPossibleRowFilterLookupData);

    const [applyFilter, setApplyFilter] = useState('onClick');

    let pagePath = 'payment-history';
    // let pageName = location.state?.data.name;
    let pageTitle = '銀行振込（アナログ）';

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
            if (dataField === 'pointEdit') {
                const data = e.data;
                showModal(`銀行振込決済処理 [${data?.userPaymentHistoryPayerName}]`, <PointEdit paymentHistoryId={data?.userPaymentHistoryId} userId={data?.userPaymentHistoryUserId} userPaymentHistoryMemo={data?.userPaymentHistoryMemo} closeModal={closeModal} tableRef={dataGridRef} />);
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

                <Column
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
                </Column>

                <Column
                    caption="状態"
                    dataField="userPaymentHistoryStatusCaption"
                    alignment="center"
                    width={60}
                    cssClass="tag-box"
                >
                </Column>
                
                <Column
                    caption="振込人名(フルネーム)"
                    dataField="userPaymentHistoryPayerName"
                    width={160}
                />
                <Column
                    caption="お客様の電話番号"
                    dataField="userPaymentHistoryPayerTelNo"
                    width={160}
                />
                <Column
                    caption="お客様のメールアドレス"
                    dataField="userPaymentHistoryPayerMail"
                    width={160}
                />
                <Column
                    caption="購入金額"
                    dataField="userPaymentHistoryPaymentPoint"
                    dataType="number"
                    alignment="right"
                    width={100}
                    format="#,##0.##"
                />
               <Column
                    caption="購入日時"
                    dataField="userPaymentHistoryCreatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />

                {/* User related data column */}
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
                    caption="最終決済日時"
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
                />
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



