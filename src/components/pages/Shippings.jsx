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
import ShippingFormEdit from "../Form/forms/shipping/ShippingFormEdit";
import ConfirmationModal from "../Form/forms/shipping/ConfirmationModal";
import SelectBox from "../Form/FormInputs/SelectBox";
import { ActionSheet } from "devextreme-react";
import http from "../../restapi/httpService";
import Loader from "../atoms/Loading/TherapistLoader";
import { useToast } from "../../contexts/ToastContext";
import { addShippingFlag } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { unixTimestampToDateFormat } from "../../utils/commonFunctions";
import UserFormEdit from "../Form/forms/user/UserFormEdit";
import UserPointEdit from "../Form/forms/user/UserPointEdit";
import useFetchCountryInitQuery from "../../hooks/useFetchCountryInitQuery";
import useFetchItemInitQuery from "../../hooks/useFetchItemInitQuery";

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
    { userCollectionStatus: 2 },
    { userCollectionStatus: 5 },
    { userCollectionStatus: 3 },
    { userCollectionStatus: 6 },
    { userCollectionStatus: 4 },
    
    ...userAllPossibleRowFilterLookupData,
]

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

export const Shippings = () => {
    const location = useLocation();
    const {pathname} = location || {};
    const navigate = useNavigate();
    const { showToast } = useToast();
    // const history = useHistory();
    const dataGridRef = useRef(null);
    const elementRef = useRef(null);
    const dispatch = useDispatch();
    const { showModal, closeModal, isModalOpen, setTableRef } = useModal();

    const { data: { categories = [], tags = [] } = {}, isFetching: itemInitLoading } = useFetchItemInitQuery();
    const { data: { countries = [] } = {}, isFetching: userInitLoading, refetchApi } = useFetchCountryInitQuery();
    const { dataSource, isLoading } = useCustomStore('userCollectionId', '/shipping', true, allPossibleRowFilterLookupData);

    const [settingsStateStateValue, setSettingsStateState] = useRecoilState(settingsState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    console.log(settingsStateStateValue);
    const [applyFilter, setApplyFilter] = useState('onClick');

    let pagePath = 'shippings';
    // let pageName = location.state?.data.name;
    let pageTitle = '発送管理';

    const statusLookup = [
        { id: 2, caption: '未対応' },
        { id: 5, caption: "対応中" },
        { id: 3, caption: '発送済' },
        { id: 6, caption: 'キャンセル' },
        { id: 4, caption: "その他" }
    ];

    const generateUserCollectionStatusOptions = (userCollectionStatus) => {

        let filteredStatus = [];
        switch (userCollectionStatus) {
            case 2:
                filteredStatus = statusLookup;
                break;
            case 5:
                filteredStatus = statusLookup.filter((status, i) => i >= 1);
                break;
            case 3:
                filteredStatus = statusLookup.filter((status, i) => i >= 2);
                break;
            case 4:
                filteredStatus = statusLookup.filter((status, i) => i >= 3);
                break;
            case 6:
                filteredStatus = statusLookup.filter((status, i) => i >= 3);
                break;
        }
        return filteredStatus;
    }

    function statusCellRenderer(cellData) {
        const textColor = cellData.value === 2 ? '#FF758F' : ''; // Change the text color for "Disabled" status
        const targetItemStatus = statusLookup.find(item => item.id === cellData.data.userCollectionStatus);
        console.log("cellData.data.userCollectionStatus",cellData.data.userCollectionStatus)
        let getStatusOptionList = generateUserCollectionStatusOptions(Number(cellData.data.userCollectionStatus));
        return (
            <div style={{ color: textColor }}>
                {/* {targetItemStatus?.caption} */}
                <select name="userCollectionStatus" value={`${cellData.data.userCollectionStatus}`} onChange={(e)=>updateShippingStatus(e,cellData)} className={`w-full ${cellData.data.userCollectionStatus == 4?'cursor-default':'cursor-pointer'} customSelectField`} disabled={cellData.data.userCollectionStatus == 4}>
                    {getStatusOptionList.map(opts=><option value={opts?.id}>{opts?.caption}</option>)}
                </select>
            </div>
        );
    }

    const updateShippingStatus = (e,cellData) => {
        e.preventDefault();
        console.log("updateShippingStatus >>e",e)
        console.log("updateShippingStatus >>cellData",cellData)
        console.log("updateShippingStatus",dataGridRef.current);
        const { value } = e.target || "";

        const prevTargetItemStatus = statusLookup.find(item => item.id == cellData.data.userCollectionStatus);
        const targetItemStatus = statusLookup.find(item => item.id == value);

        if(value==3 || value==4 || value==6){
            showModal(`発送確認`, <ConfirmationModal userShippingInfo={cellData} shippingStatus={value} closeModal={closeModal} isModalOpen={isModalOpen} tableRef={dataGridRef} confirmAction={updateUserShippingStatus} cancelAction={cancelModal} confirmationMessage={`${prevTargetItemStatus?.caption}から${targetItemStatus?.caption}に変更します。よろしいですか？`} />);
        }else{
            updateUserShippingStatus(cellData,value)
        }

    }

    function updateCell(rowIndex, dataField, value) {
        dataGridRef.current.instance.cellValue(rowIndex, dataField, value);
    }

    const cancelModal= ()=>{
        closeModal();
        if (dataGridRef.current) {
            dataGridRef.current.instance.refresh();
        }
    }

    const updateUserShippingStatus = async (shippingInfo,shippingStatus) =>{
        console.log("updateShippingStatus >>shippingInfo",shippingInfo)
        console.log("updateShippingStatus >>shippingStatus",shippingStatus)
        let updateAbleObject = {userCollectionStatus:shippingStatus}
        try {
            // setGachaSubmitLoading(true);
            const response = await http.put(`/manager/shipping/${shippingInfo?.data?.userCollectionId}?actionType=2`,updateAbleObject);
            console.log("api response",response);
            const { status } = response;
            
            if (status === 200) {
                const {shippingFlag} = response?.data || {};
                console.log("shippingFlag",shippingFlag);
                const now = unixTimestampToDateFormat(Math.floor(new Date().getTime()/1000));
                console.log("updateTime",now)
                updateCell(shippingInfo?.rowIndex, "userCollectionUpdatedAt", now);//updateDateTimeField
                updateCell(shippingInfo?.rowIndex, "userCollectionStatus", Number(shippingStatus));//updateShippingStatus
                dispatch(addShippingFlag(shippingFlag));
                closeModal();
               
                // if (dataGridRef.current) {
                //     dataGridRef.current.instance.refresh();
                // }
            } else {
                showToast('fail to update shipping status', 'error');
                // setDisabled(false);
            }
        } catch (err) {
            showToast('fail to update shipping status', 'error');
            console.log('error', err)
        }
    }

    useEffect(() => {
        let localCacheData = localStorage.getItem(pathname);
        localCacheData = localCacheData ? JSON.parse(localCacheData) : null;

        if(localCacheData && localCacheData?.pageSize != 300) {
            localCacheData.pageSize = 300;
            localStorage.setItem(pathname, localCacheData);
        }
    }, [])


    useEffect(() => {
        window.history.pushState(null, '', window.location.href);

        if (dataGridRef.current) {
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
                            if (dataField === 'userCollectionStatus' || dataField === 'userDirectionId' || dataField === 'userStatus' || dataField === 'userSMSFlag' || dataField === 'userBillingFlag')
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
            // editAction
            if (dataField === 'shippingEdit') {
                const data = e.data;
                console.log(data, 'data....')
                showModal(`${data.userCollectionTransactionUUID??''}${data.itemTranslateName} 発送申請管理`, <ShippingFormEdit userCollectionId={data?.userCollectionId} closeModal={closeModal} tableRef={dataGridRef} />);
            }

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
                if (dataField === "userCollectionStatus" || dataField === "userStatus" || dataField === "userDirectionId" || dataField === "countryName" || dataField === "itemTags" || dataField === 'userSMSFlag' || dataField === 'userBillingFlag') {
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
                if(e.element.querySelector('.dx-apply-button')) e.element.querySelector('.dx-apply-button').click();
            };
            e.editorOptions.onEnterKey = function () {
                if(e.element.querySelector('.dx-apply-button')) e.element.querySelector('.dx-apply-button').click();
            };
        }
        if ((e.parentType === "dataRow" || e.parentType === "filterRow")) {
            if(["userCollectionStatus", "countryName", "itemTags"].includes(e.dataField)) {
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
            }

            if (e.dataField === "userCollectionStatus") {
                e.editorOptions.dataSource = statusLookup;
                e.editorOptions.displayExpr = "caption";
                e.editorOptions.valueExpr = "id";
            }
            else if (e.dataField === "countryName") {
                e.editorOptions.dataSource = countries;
                e.editorOptions.displayExpr = "countryName";
                e.editorOptions.valueExpr = "countryId";
            }
            else if(e.dataField === "itemTags") {
                e.editorOptions.dataSource = tags;
                e.editorOptions.displayExpr = "tagName";
                e.editorOptions.valueExpr = "tagId";
            }
        }
        
    };

    const dateCellRender = (e) => {
        console.log("dateRender",e)
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
                itemsPerPage={300}
            >
                <FilterRow  applyFilter={applyFilter} visible={true}/>
                <Column
                    caption="状態"
                    dataType="string"
                    dataField="userCollectionStatus"
                    alignment="center"
                    width={120}
                    // filter
                    cellRender={statusCellRenderer}
                    cssClass="tag-box"
                />
                    {/* <Lookup
                        dataSource={statusLookup}
                        valueExpr="id"
                        displayExpr="caption"
                    /> */}
                {/* </Column> */}
                <Column
                    caption="申請日時"
                    dataField="userCollectionRequestAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="ID"
                    dataField="userId"
                    alignment="right"
                    width={80}
                />
                <Column
                    caption="申請ユーザー"
                    dataField="userEmail"
                    width={160}
                />
                <Column
                    caption="まとめて発送ID"
                    dataField="userCollectionTransactionUUID"
                    width={240}
                />
                <Column
                    caption="アイテム名[日本語]"
                    dataField="itemTranslateName"
                    cssClass="min-w-200px"
                />
                <Column
                    caption="ポイント"
                    dataField="userCollectionPoint"
                    dataType="number"
                    alignment="right"
                    format="#,##0.##"
                    width={100}
                />
                <Column
                    caption="編集日時"
                    dataField="userCollectionUpdatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="発送日時"
                    dataField="userCollectionShippedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="アイテムの取得日時"
                    dataField="userCollectionCreatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="シリアルナンバー"
                    dataField="itemAttribute3"
                    width={100}
                />
                <Column
                    caption="タグ"
                    dataField="itemTags"
                    width={300}
                    allowSorting={false}
                    cssClass="tag-box"
                />
                <Column
                    caption="送付先名称"
                    dataField="userCollectionShippingName"
                    width={100}
                />
                <Column
                    caption="送付先名称カウント"
                    dataField="userShippingNameCount"
                    width={50}
                />
                <Column
                    caption="郵便番号"
                    dataField="userCollectionShippingZipcode"
                    width={100}
                />
                <Column
                    caption="郵便番号カウント"
                    dataField="userShippingZipcodeCount"
                    width={50}
                />
                <Column
                    caption="都道府県(⚠️旧住所)"
                    dataField="userCollectionShippingAddress"
                    width={100}
                />
                <Column
                    caption="市区町村+町名番地の結合"
                    dataField="userCollectionShippingAddress23"
                    width={200}
                />
                <Column
                    caption="市区町村+町名番地カウント"
                    dataField="userShippingAddress23Count"
                    width={50}
                />
                <Column
                    caption="建物名部屋番号"
                    dataField="userCollectionShippingAddress4"
                    width={100}
                />
                <Column
                    caption="配送先電話番号国コード"
                    dataField="userCollectionShippingTelCountryCode"
                    width={60}
                />
                <Column
                    caption="配送先電話番号"
                    dataField="userCollectionShippingTel"
                    width={150}
                />
                <Column
                    caption="配送先電話番号カウント"
                    dataField="userShippingTelCount"
                    width={50}
                />
                <Column
                    caption="登録IP"
                    dataField="userRegistIPAddress"
                    width={120}
                />
                <Column
                    caption="登録IPカウント"
                    dataField="userRegistIPCount"
                    width={50}
                />
                {/* Need to add userShippingIp column */}
                <Column
                    caption="SMS番号"
                    dataField="userSMSTelNoFormat"
                    width={150}
                />
                <Column
                    type="buttons"
                    caption="編集"
                    dataField="shippingEdit"
                    alignment="center"
                    width={60}
                    allowFiltering={false}
                    cssClass='cursor-pointer'
                >
                    <Button>
                        <EditIcon classNames="inline fill-white" />
                    </Button>
                </Column>

                {/* User related columns comes from user-list */}
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
                    caption="紹介人数"
                    dataField="referralCount"
                    width={80}
                    alignment="right"
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
                    caption="SMS認証時間"
                    dataField="userSMSAuthenticatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={160}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="カードホルダー名"
                    dataField="cardHolderName"
                    width={250}
                />

                <Column
                    type="buttons"
                    caption="ユーザー編集"
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



