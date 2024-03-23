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


export const allPossibleRowFilterLookupData = [
    { userStatus: 1, userDirectionId: 1, userSMSFlag: 1, userBillingFlag:1, userTestUserFlag: 1 },
    { userStatus: 2, userDirectionId: 2, userSMSFlag: 0, userBillingFlag:0, userTestUserFlag: 0 }
]

export const statusLookup = [
    { id: 1, caption: '有効' },
    { id: 2, caption: '無効' }
]

export function statusCellRenderer(cellData) {
    const textColor = cellData.value === 2 ? '#FF758F' : ''; // Change the text color for "Disabled" status
    const targetItemStatus = statusLookup.find(item => item.id === cellData.data.userStatus);
    return (
        <div style={{ color: textColor }}>
            {targetItemStatus?.caption}
        </div>
    );
}

const directionLookup = [
    { id: 1, caption: '本番' },
    { id: 2, caption: '裏' }
]

function directionCellRenderer(cellData) {
    const textColor = cellData.value === 2 ? '#FF758F' : ''; // Change the text color for "Disabled" status
    const targetItem = directionLookup.find(item => item.id === cellData.data.userDirectionId);
    return (
        <div style={{ color: textColor }}>
            {targetItem?.caption}
        </div>
    );
}

export const smsLookup = [
    { id: 1, caption: '◯' },
    { id: 0, caption: '' }
]

export function smsCellRenderer(cellData) {
    const textColor = cellData.value === 2 ? '#FF758F' : ''; // Change the text color for "Disabled" status
    const targetItem = smsLookup.find(item => item.id === cellData.data.userSMSFlag);
    return (
        <div>
            {targetItem?.caption}
        </div>
    );
}

export const userBillingFlagLookup = [
    { id: 1, caption: '課金可能' },
    { id: 0, caption: '課金不可' }
]

export function userBillingFlagCellRenderer(cellData) {
    const textColor = cellData.value === 2 ? '#FF758F' : ''; // Change the text color for "Disabled" status
    const targetItem = userBillingFlagLookup.find(item => item.id === cellData.data.userBillingFlag);
    return (
        <div>
            {targetItem?.caption}
        </div>
    );
}

export const userTestUserFlagLookup = [
    { id: 1, caption: '◯' },
    { id: 0, caption: '' }
]

export function userTestUserFlagCellRenderer(cellData) {
    const targetItem = userTestUserFlagLookup.find(item => item.id === cellData.data.userTestUserFlag);
    return (
        <div>
            {targetItem?.caption}
        </div>
    );
}

export function userSMSTelNoCellRenderer(cellData) {
    const textColor = cellData.value === 2 ? '#FF758F' : ''; // Change the text color for "Disabled" status
    const targetItem = cellData.data.userSMSFlag?cellData.data.userSMSTelNo:"";
    return (
        <div>
            {targetItem}
        </div>
    );
}

export const Users = () => {
    const location = useLocation();
    const dataGridRef = useRef(null);
    const { showModal, closeModal, setTableRef } = useModal();
    const elementRef = useRef(null);

    const navigate = useNavigate();
    // const history = useHistory();
    const [settingsStateStateValue, setSettingsStateState] = useRecoilState(settingsState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    //console.log(settingsStateStateValue);

    //Query
    const { data: { countries = [] } = {}, isFetching: userInitLoading, refetchApi } = useFetchCountryInitQuery(false);
    const { dataSource, isLoading } = useCustomStore('userId', '/user', true, allPossibleRowFilterLookupData);

    const [applyFilter, setApplyFilter] = useState('onClick');

    let pagePath = 'users';
    // let pageName = location.state?.data.name;
    let pageTitle = 'ユーザー管理';

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
                            if (dataField === 'userStatus' || dataField === 'userDirectionId' || dataField === 'userSMSFlag' || dataField === 'userBillingFlag' || dataField === 'userTestUserFlag')
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
                showModal(`${data.userEmail} ユーザー情報編集`, <UserFormEdit userId={data?.userId} closeModal={closeModal} tableRef={dataGridRef} />);
            }
        }
        else if (e.rowType === 'filter') {
            if (e.rowIndex === 1) {
                if (dataField === "userStatus" || dataField === "userDirectionId" || dataField === "countryName" || dataField === 'userSMSFlag' || dataField === 'userBillingFlag' || dataField === 'userTestUserFlag') {
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
        if (e.parentType == 'filterRow' && e.dataField !== "userStatus" && e.dataField !== "userDirectionId" && e.dataField !== 'userSMSFlag' && e.dataField !== 'userBillingFlag' && e.dataField !== 'userTestUserFlag') {
            e.editorOptions.onFocusOut = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
            e.editorOptions.onEnterKey = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
        }

        if ((e.parentType === "dataRow" || e.parentType === "filterRow")) {
            if (e.dataField === "countryName") {
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
                    caption="状態"
                    dataField="userStatus"
                    alignment="center"
                    width={60}
                    filter
                    cellRender={statusCellRenderer}
                >
                    <Lookup
                        dataSource={statusLookup}
                        valueExpr="id"
                        displayExpr="caption"
                    />
                </Column>
                <Column
                    caption="面"
                    dataField="userDirectionId"
                    alignment="center"
                    width={60}
                    filter
                    cellRender={directionCellRenderer}
                >
                    <Lookup
                        dataSource={directionLookup}
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
                <Column
                    caption="テスト"
                    dataField="userTestUserFlag"
                    alignment="center"
                    width={60}
                    filter
                    cellRender={userTestUserFlagCellRenderer}
                >
                    <Lookup
                        dataSource={userTestUserFlagLookup}
                        valueExpr="id"
                        displayExpr="caption"
                    />
                </Column>

                <Column
                    caption="累計購入金額"
                    dataField="userPointPurchaseValue"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />

                <Column
                    caption="累計購入stripeクレジット金額"
                    dataField="userPointPurchaseValueStripeCredit"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />

                <Column
                    caption="累計購入stripe銀行振込金額"
                    dataField="userPointPurchaseValueStripeBank"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />

                <Column
                    caption="累計購入イプシロンクレジット金額"
                    dataField="userPointPurchaseValueEpsilonCredit"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />

                <Column
                    caption="累計購入イプシロン銀行振込金額"
                    dataField="userPointPurchaseValueEpsilonBank"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />

                <Column
                    caption="累計購入イプシロンpaypay金額"
                    dataField="userPointPurchaseValueEpsilonPaypay"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />

                <Column
                    caption="累計購入paypay金額"
                    dataField="userPointPurchaseValuePaypay"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />

                <Column
                    caption="累計購入銀行振込金額"
                    dataField="userPointPurchaseValueManualBank"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                    format="#,##0.##"
                />

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
            </Table>
        </>
    );
};



