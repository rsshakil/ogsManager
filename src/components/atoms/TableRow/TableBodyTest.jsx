import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { displayState } from "../../../store/displayState";
import { dataGridDummyState } from "../../../store/dataGridDummyState";
import { tableStructure } from "../../../store/tableStructure";
import { tableBodyData } from "../../../store/tableBodyData";
import { Holidays } from "../../../store/holidaysData";
import { modalState } from "../../../store/modalState";
import { columnSettingsData } from "../../../store/columnSettingsData";

import http from '../../../restapi/httpService';
import _ from "lodash";
import Loader from "../../atoms/Loading/TherapistLoader";
import { TableHeader } from "../../atoms/TableRow/TableHeader";           
import { pageLoaderState } from "../../../store/pageLoaderState";
import DataGrid, {
    Column, FilterRow, HeaderFilter, Search, SearchPanel, Paging, Sorting, Scrolling, Lookup, FilterPanel,
  } from 'devextreme-react/data-grid';


export const TableBodyTest = ({}) => {
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [dataGridDummyValue, setDataGridDummy] = useRecoilState(dataGridDummyState);
    const [tableStructureObject, setTableStructure] = useRecoilState(tableStructure);
    const [tableBodyDataObject, setTableBodyData] = useRecoilState(tableBodyData);
    const [holidaysDataObject, setHolidaysData] = useRecoilState(Holidays);
    const [columnSettingsDataObject, setColumnSettingsData] = useRecoilState(columnSettingsData);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [loading, setLoading] = useState(true);
    const [pageLoadiongStateValue, setPageLoadiongState] = useRecoilState(pageLoaderState);

    const navigate = useNavigate();
    const location = useLocation();
    console.log('holidaysDataObject',holidaysDataObject);
    ///////////////////////////////////////////
    //  初期値の設定
    ///////////////////////////////////////////
    //  [初期値]カラムの構造
    let ColumnStyleObject ={};
    //  [初期値]テーブルデータの初期値
    let TableBodyObject ={};
    //  [初期値]行のClass
    let RowClass = columnSettingsDataObject.rowClass;
    //  [初期値]セルのClass
    let CellClass = columnSettingsDataObject.cellClass;
    //  ボタン押した時の挙動
    //  ページ遷移とかモーダルを開くとか
    let onClickFunction;
    ///////////////////////////////////////////
    //  カラム幅の格納
    const columnSsettings = columnSettingsDataObject;

    //  モダールのオープンと引数渡す
    function openModal(e) {
        // console.log("[setModalState]", e.key)
        console.log('e.data',e.data);
        let modalType = e.type
        let openMode = e.mode
        let openData = e.data.rowData
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: true,
            modalType: modalType,
            mode : openMode,
            data : openData,
        }))
    }

    //  ページ遷移
    function pageTransition(e) {
        console.log(e, 'eeeeeeeeee')
        // console.log("[setModalState]", e.key)
        console.log('pageParamData', e.data);
        let pagePath = e.path
        let pageName = e.data.name;
        let pageParam = e.data.id;
        if (pagePath=='/payment-request-detail' || pagePath=='/invoice-detail') { 
            pageName = e.data.rowName;
            pageParam = pageName.replace(/年|月/g, ""); 
        }
         
        setDisplayState((prevState) => ({
            ...prevState,
            pageName: pageName,
            pageParam: pageParam
        }))
        navigate(pagePath);
        console.log('pagePath>>>>>>>>', pagePath);
    }

    useEffect(() => {
        console.log('location.pathname',location.pathname);
        if (displayStateValue.pagePath == 'payment-request' && location.pathname == '/') { 
            getPaymentRequestList();
        }
        if (location.pathname == '/payment-request') {
            getHolidayList();
        }
    }, []);

    useEffect(() => {
        console.log('location>>>>',location);
        console.log('displayStateValuepagePath',displayStateValue.pagePath);
        if (location.pathname=='/expenses') { 
            getExpenseList();
        }else if (location.pathname=='/works') { 
            getBusinessList();
        }else if (location.pathname=='/payment-request') { 
            getPaymentRequestList();
        }else if (location.pathname=='/invoice') { 
            getMemberInvoiceList();
        }else if (location.pathname=='/payment-request-detail') { 
            getPaymentRequestDetailList();
        }else if (location.pathname=='/invoice-detail') { 
            getInvoiceDetailList();            
        }
    }, [location]);
    function viewEmptyTable(key) {
        setTableBodyData({
            ...tableBodyDataObject,
            [key]: []
        })
    }
    // getExpenseList
    async function getExpenseList() {
        try {
            setLoading(true);
            const response = await http.get('/expenses');
            console.log("✋✋✋response", response);
            if (response) { 
                let { tableBody, gridTemplateColumns, headerStructure } = response.data.default || [];
                console.log("tableBody", tableBody);
                console.log("gridTemplateColumns", gridTemplateColumns);
                console.log("headerStructure", headerStructure);
                
                setTableStructure((prevState) => ({
                    ...prevState,
                    Expenses: {
                        ...prevState.Expenses,
                        gridTemplateColumns:gridTemplateColumns,
                        headerStructure:headerStructure
                    }
                }))
                
                setTableBodyData({
                    ...tableBodyDataObject,
                    Expenses: tableBody
                })
            } else {
                viewEmptyTable('Expenses');
            }
            setLoading(false);
        } catch (err) {
            console.log('Field err', err);
            viewEmptyTable('Expenses');
            setLoading(false);
        } finally {
            // processing.current = false;
            setLoading(false);
        }
    }
    
    // getBusinessList
    async function getBusinessList() {
        try {
            setLoading(true);
            const response = await http.get('/businesses');
            console.log("✋✋✋response", response);
            if (response) { 
                let { tableBody, gridTemplateColumns, headerStructure } = response.data.default || [];
                console.log("tableBody", tableBody);
                console.log("gridTemplateColumns", gridTemplateColumns);
                console.log("headerStructure", headerStructure);
                
                setTableStructure((prevState) => ({
                    ...prevState,
                    Works: {
                        ...prevState.Works,
                        gridTemplateColumns:gridTemplateColumns,
                        headerStructure:headerStructure
                    }
                }))
                
                setTableBodyData({
                    ...tableBodyDataObject,
                    Works: tableBody
                })
            } else {
                viewEmptyTable('Works');               
            }
            setLoading(false);
        } catch (err) {
            //error not implemented yet
            console.log('Field err', err);
            viewEmptyTable('Works');
            setLoading(false);
        } finally {
            // processing.current = false;
            setLoading(false);
        }
    }
    
    // getPaymentRequestList
    async function getPaymentRequestList() {
        try {
            setLoading(true);
            const response = await http.get('/payment-request');
            console.log("✋✋✋response", response);
            if (response) { 
                let { tableBody, gridTemplateColumns, headerStructure } = response.data.default || [];
                console.log("tableBody", tableBody);
                console.log("gridTemplateColumns", gridTemplateColumns);
                console.log("headerStructure", headerStructure);
                
                setTableStructure((prevState) => ({
                    ...prevState,
                    PaymentRequest: {
                        ...prevState.PaymentRequest,
                        gridTemplateColumns:gridTemplateColumns,
                        headerStructure:headerStructure
                    }
                }))
                
                setTableBodyData({
                    ...tableBodyDataObject,
                    PaymentRequest: tableBody
                })
            } else {
                viewEmptyTable('PaymentRequest');
            }
            setLoading(false);
        } catch (err) {
            //error not implemented yet
            console.log('Field err', err);
            viewEmptyTable('PaymentRequest');
            setLoading(false);
        } finally {
            // processing.current = false;
            setLoading(false);
        }
    }
    
    // getPaymentRequestDetailList
    async function getPaymentRequestDetailList() {
        console.log("getPaymentRequestDetailList");
        try {
            setLoading(true);
            setPageLoadiongState((prevState) => ({
                ...prevState,
                loadingState:true
            }))
            const response = await http.get('/payment-request/'+displayStateValue.pageParam);
            console.log("✋✋✋response", response);
            if (response) {
               
                let { tableBody, gridTemplateColumns, headerStructure } = response.data.default || [];
                console.log("tableBody", tableBody);
                console.log("gridTemplateColumns", gridTemplateColumns);
                console.log("headerStructure", headerStructure);
                
                setTableStructure((prevState) => ({
                    ...prevState,
                    PaymentRequestDetail: {
                        ...prevState.PaymentRequestDetail,
                        gridTemplateColumns:gridTemplateColumns,
                        headerStructure:headerStructure
                    }
                }))
                
                setTableBodyData({
                    ...tableBodyDataObject,
                    PaymentRequestDetail: tableBody
                })

                const { taxRate } = response.data;
                sessionStorage.setItem('taxRate', JSON.stringify(taxRate));
               
                setLoading(false);
               
                console.log('setLoadingOFFF111', loading);
                
            } else {
                viewEmptyTable('PaymentRequestDetail');
            }

            setLoading(false);
            setPageLoadiongState((prevState) => ({
                ...prevState,
                loadingState:false
            }))
        } catch (err) {
            //error not implemented yet
            console.log('Field err', err);
            viewEmptyTable('PaymentRequestDetail');
            setLoading(false);
            setPageLoadiongState((prevState) => ({
                ...prevState,
                loadingState:false
            }))
        } finally {
            // processing.current = false;
            setLoading(false);
            console.log('setLoadingOFFF', loading);
            setPageLoadiongState((prevState) => ({
                ...prevState,
                loadingState:false
            }))
        }
    }
    
    // getInvoiceDetailList
    async function getInvoiceDetailList() {
        try {
            setLoading(true);
            setPageLoadiongState((prevState) => ({
                ...prevState,
                loadingState:true
            }))
            const response = await http.get('/invoice/'+displayStateValue.pageParam);
            // const response = await http.get('/invoice/202307');
            console.log("✋✋✋response", response);
            if (response) { 
               
                let { tableBody, gridTemplateColumns, headerStructure } = response.data.default || [];
                console.log("tableBody", tableBody);
                console.log("gridTemplateColumns", gridTemplateColumns);
                console.log("headerStructure", headerStructure);
                
                setTableStructure((prevState) => ({
                    ...prevState,
                    InvoiceDetail: {
                        ...prevState.InvoiceDetail,
                        gridTemplateColumns:gridTemplateColumns,
                        headerStructure:headerStructure
                    }
                }))
                
                setTableBodyData({
                    ...tableBodyDataObject,
                    InvoiceDetail: tableBody
                })

                setLoading(false);

            } else {
                viewEmptyTable('InvoiceDetail');
            }
            setLoading(false);
            setPageLoadiongState((prevState) => ({
                ...prevState,
                loadingState:false
            }))
        } catch (err) {
            //error not implemented yet
            console.log('Field err', err);
            setLoading(false);
            viewEmptyTable('InvoiceDetail');
            setPageLoadiongState((prevState) => ({
                ...prevState,
                loadingState:false
            }))
        } finally {
            // processing.current = false;
            setLoading(false);
            setPageLoadiongState((prevState) => ({
                ...prevState,
                loadingState:false
            }))
        }
    }
    
    // getMemberInvoiceList
    async function getMemberInvoiceList() {
        try {
            setLoading(true);
            const response = await http.get('/invoice');
            // const response = await http.get('/invoice/202307');
            console.log("✋✋✋response", response);
            if (response) { 
                let { tableBody, gridTemplateColumns, headerStructure } = response.data.default || [];
                console.log("tableBody", tableBody);
                console.log("gridTemplateColumns", gridTemplateColumns);
                console.log("headerStructure", headerStructure);
                
                setTableStructure((prevState) => ({
                    ...prevState,
                    Invoice: {
                        ...prevState.Invoice,
                        gridTemplateColumns:gridTemplateColumns,
                        headerStructure:headerStructure
                    }
                }))
                
                setTableBodyData({
                    ...tableBodyDataObject,
                    Invoice: tableBody
                })
            } else {
                viewEmptyTable('Invoice');
            }
            setLoading(false);
        } catch (err) {
            //error not implemented yet
            console.log('Field err', err);
            viewEmptyTable('Invoice');
            setLoading(false);
        } finally {
            // processing.current = false;
            setLoading(false);
        }
    }
    
    // getHolidayList
    async function getHolidayList() {
        try {
            setLoading(true);
            const response = await http.get('/holiday');
            // const response = await http.get('/invoice/202307');
            console.log("✋✋✋response", response);
            if (response) { 
                let { tableBody } = response.data.default || [];
                console.log("tableBody", tableBody);
                
                
                setHolidaysData({
                    ...holidaysDataObject,
                    holidays:tableBody
                })
            }
            setLoading(false);
        } catch (err) {
            //error not implemented yet
            console.log('Field err', err);
            setLoading(false);
        } finally {
            // processing.current = false;
            setLoading(false);
        }
    }

    //  ページごとに使用するデータをスイッチする


    const lookupDataSourceConfig = {
        store: {
            type: 'array',
            data: [
                { id: 1, name: '有効' },
                { id: 2, name: '無効' },
                // ...
            ],
            key: 'id'
        },
        pageSize: 10,
        paginate: true   
    }

    return (
        <>
            {loading && <Loader />}
            
 
                    <>
                        <DataGrid 
                         id="gridContainer"
                         dataSource={dataGridDummyValue}
                         columnAutoWidth={true}
                         height="100%"
                         rowAlternationEnabled={true}
                         hoverStateEnabled={true}
                         showBorders={false}
                         showRowLines={false}
                        //  showRowLines={false}
                        >
                            <Scrolling columnRenderingMode="virtual" />
                            <Paging enabled={false} />
                            <Sorting mode="multiple" />
                            <FilterRow 
                                visible={true}
                                applyFilter={true} />
                            <Column
                                caption="状態"
                                filterValues={[1, 2]}
                                dataField="Status">

                                <Lookup
                                dataSource={lookupDataSourceConfig}
                                valueExpr="id"
                                displayExpr="name"
                                />
                                
                            </Column>
                            <Column
                                caption="親カテゴリー"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="商品名[日本語]"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="表示開始日時"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="販売開始日時"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="販売終了日時"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="表示順"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="連続数"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="連続pt"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="単発pt"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="総数"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="残数"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="天井数"
                                dataField="personalLimit"
                                dataType="number"
                            />
                            <Column
                                caption="1人総上限"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="1人1日上限"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="全員1日上限"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="キリ番"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="登録/編集日時"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="シナリオ構築"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="シナリオ"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="パック"
                                dataField="BirthDate"
                                dataType="date"
                            />
                            <Column
                                caption="編集"
                                dataField="BirthDate"
                                dataType="date"
                            />
                        </DataGrid>
                    </>

        </>
    );
};


