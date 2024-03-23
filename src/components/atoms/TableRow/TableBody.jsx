import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { displayState } from "../../../store/displayState";
import { tableStructure } from "../../../store/tableStructure";
import { tableBodyData } from "../../../store/tableBodyData";
import { Holidays } from "../../../store/holidaysData";
import { modalState } from "../../../store/modalState";
import { columnSettingsData } from "../../../store/columnSettingsData";
import Pdf from "../../atoms/img/Pdf.svg";
import reload from "../img/reload.svg";
import http from '../../../restapi/httpService';
import _ from "lodash";
import Loader from "../../atoms/Loading/TherapistLoader";
import { TableHeader } from "../../atoms/TableRow/TableHeader";           
import { pageLoaderState } from "../../../store/pageLoaderState";
    

export const TableBody = ({}) => {
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
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
    switch (displayStateValue.pagePath) {
        case 'payment-request':
            document.title = 'セラピスト様請求管理';
            ColumnStyleObject = tableStructureObject.PaymentRequest;
            TableBodyObject = tableBodyDataObject.PaymentRequest;
            onClickFunction = (data) => pageTransition({'path':'/payment-request-detail', data});
        break;
        case 'payment-request-detail':
            document.title = 'セラピスト様請求詳細設定';
            ColumnStyleObject = tableStructureObject.PaymentRequestDetail;
            TableBodyObject = tableBodyDataObject.PaymentRequestDetail;
            onClickFunction = (data) => openModal({'type':'PaymentRequestModal', 'mode':'edit', data});
        break;
        case 'invoice':
            document.title = '会員様請求管理';
            ColumnStyleObject = tableStructureObject.Invoice;
            TableBodyObject = tableBodyDataObject.Invoice;
            onClickFunction = (data) => pageTransition({'path':'/invoice-detail', data});
        break;
        case 'invoice-detail':
            document.title = '会員様請求詳細設定';
            ColumnStyleObject = tableStructureObject.InvoiceDetail;
            TableBodyObject = tableBodyDataObject.InvoiceDetail;
            onClickFunction = (data) => openModal({'type':'InvoiceModal', 'mode':'edit', data});
        break;
        case 'expenses':
            document.title = '経費管理';
            ColumnStyleObject = tableStructureObject.Expenses;
            TableBodyObject = tableBodyDataObject.Expenses;
            onClickFunction = (data) => openModal({'type':'ExpensesModal', 'mode':'edit', data});
        break;
        case 'works':
            document.title = '業務管理';
            ColumnStyleObject = tableStructureObject.Works;
            TableBodyObject = tableBodyDataObject.Works;
            onClickFunction = (data) => openModal({'type':'WorksModal', 'mode':'edit', data});
        break;


        default:
            //any
        break;
    }
    //  ColumnStyleの生成
    const ColumnStyleArray = ColumnStyleObject?.gridTemplateColumns.map(
        function (item) {
            let type = item.type
            let style = columnSsettings[type]
            // console.log("[ColumnStyleArrayFromType]", columnSsettings[type])
            return style;
        })
    // const ColumnStyle = {gridTemplateColumns: ColumnStyleArray.join(' '),minWidth:'100%'}
    const ColumnStyle = {gridTemplateColumns: ColumnStyleArray.join(' ')}
    // console.log("[ColumnStyle]",ColumnStyle)


    const pdfDownload = async (e, rowName, pdfStatus) => {
        // Pdf exist
        if (pdfStatus) {
            e.stopPropagation();
            console.log('pdf-download....');
            const invoiceMonth = rowName.replace(/年|月/g, '');
            console.log(invoiceMonth, 'invoiceMonth');
            let data = {};
            data['invoiceMonth'] = invoiceMonth;

            try {
                setLoading(true);
                const response = await http.get('/download-pdf/' + invoiceMonth);
                if (response && response.data && response.data.downloadUrl) {
                    //console.log(response.data.downloadUrl, 'downloadUrl');

                    // Create a temporary download link
                    const downloadLink = document.createElement('a');
                    //downloadLink.download = 'archive.zip'; // Set the desired file name
                    downloadLink.href = response.data.downloadUrl;

                    // Programmatically click the download link to trigger the download
                    downloadLink.click();
                }
            } catch (err) {
                // Handle the error
                if (err.response && err.response.status === 504) {
                    // Display an alert for timeout 504 error
                    alert('通信がタイムアウトしたためダウンロードが完了しませんでした');
                } else {
                    console.log('Error:', err);
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const generatePdf = async (e, rowName, pdfStatus) => {
        // Pdf exist
        if (pdfStatus) {
            e.stopPropagation();
            console.log('generate-pdf');
            const invoiceMonth = rowName.replace(/年|月/g, '');
            console.log(invoiceMonth, 'invoiceMonth');
            let data = {};
            data['invoiceMonth'] = invoiceMonth;

            try {
                setLoading(true);
                const response = await http.post('/regenerate-pdf', data);
                console.log('response', response);
            } catch (err) {
                // Handle the error
                if (err.response && err.response.status === 504) {
                    // Display an alert for timeout 504 error
                    alert('通信タイムアウトのため生成が完了しませんでした');
                } else {
                    console.log('Error:', err);
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const getIcons = (pdfStatus, TableBody) => {
        return (
            <>
                <button
                    onClick={(e) => pdfDownload(e, TableBody.rowName, pdfStatus)}
                    className="
                        font-bold
                        z-10
                        w-1/2
                        h-full
                        items-center
                        justify-center
                        text-base
                        text-white
                        bg-transparent
                        disabled:bg-blue-100
                        focus:outline-none
                        active:outline-none
                        disabled:text-blue-300
                        disabled:shadow-inner
                        divide-slate-400
                    "
                >
                    { pdfStatus ?
                        <img className="
                                mx-auto
                                h-5
                                w-5
                            "
                             src={`${[Pdf]}`}
                        />
                    : ''}
                </button>

                <button
                    onClick={(e) => generatePdf(e, TableBody.rowName, pdfStatus)}
                    className="
                        font-bold
                        z-10
                        w-1/2
                        h-full
                        items-center
                        justify-center
                        text-base
                        text-white
                        bg-transparent
                        disabled:bg-blue-100
                        focus:outline-none
                        active:outline-none
                        disabled:text-blue-300
                        disabled:shadow-inner
                        border-l-[1px] border-slate-400
                    "
                >
                    { pdfStatus ?
                        <img className="
                                mx-auto
                                h-5
                                w-5
                            "
                             src={`${[reload]}`}
                        />
                    : ''}
                </button>
            </>
        )
    }

    let leftBorder;
    let rowValue={};
    let cellColor;
    let cellValue;
    let data ;
    return (
        <>
            {loading && <Loader />}
            
            {!loading && TableBodyObject && TableBodyObject.length>0 && <TableHeader />}

            {!loading && TableBodyObject && TableBodyObject.length>0 && TableBodyObject.map((TableBody, index) => {
                return (
                    <>
                        {/* 行の出力 */}
                        <div 
                            onClick={() => onClickFunction(TableBody)}
                            data-row-index={index}
                            data-row-order={TableBody.rowOrder}
                            data-row-id={TableBody.id}
                            className={`
                                ${RowClass}
                                ${index % 2 == 0 ? 'bg-ogs-row-odd' : 'bg-ogs-row-even'}
                                `}
                            style={ColumnStyle} >
                                {TableBody.rowValue.map((row) => {

                                    //  この列の設定の取得
                                    const columnStructure = ColumnStyleObject.gridTemplateColumns.find(item => item.columnOrder === row.columnOrder);
                                    // console.log("😢😢😢😢😢😢😢😢😢😢😢😢😢😢columnStructure", columnStructure)
                                    //  この列のデータ型の取得
                                    const dataType = columnStructure.dataType;
                                    // console.log(dataType);

                                    //  この列の左にボーダーが必要かどうか取得
                                    const leftBorder = columnStructure.leftBorder ? '!border-l-2' : '';
                                    // console.log(leftBorder);

                                    //  この列の右に影が必要かどうか取得
                                    const rightShadow = columnStructure.rightShadow ? 'right-shadow' : '';
                                    // console.log(leftBorder);

                                    //  この列はstickyかどうか取得
                                    const isSticky = columnStructure.isSticky ? 'sticky z-10' : '';
                                    // console.log(isSticky);

                                    //  この列の追加class取得
                                    const addCellClass = columnStructure.addCellClass;
                                    // console.log(addCellClass);

                                    // if(typeof row.cellValue === 'number'){
                                    //     // Number型の場合は変換なしで返す
                                    //     cellValue = row.cellValue.toLocaleString()
                                    //     //  0以上であれば元のセルカラーのままにする
                                    //     cellColor =  row.cellValue < 0 ? 'text-arrow-red' : cellColor;
                                    // }

                                    ////////////////////////////////////////////////////////
                                    ////////////////////////////////////////////////////////
                                    //  文字色決定フロー[1]
                                    //  この列の文字色を取得
                                    //  後からセルの色指定があれば上書きされます
                                    cellColor = columnStructure.columnColor;
                                    // console.log("[cellColor from columnColor]",cellColor);

                                    //  文字色決定フロー[2]
                                    //  このセルの文字色を取得
                                    //  後からマイナスの色指定があれば上書きされます
                                    cellColor = row.cellColor ? row.cellColor : cellColor;
                                    // console.log("[cellColor from row.cellColor]",cellColor);
                                    //  文字色決定フロー[3]
                                    //  ナンバー型かどうかでセルの値をフォーマットする
                                    if(typeof row.cellValue === 'number'){
                                        // Number型の場合は変換なしで返す
                                        cellValue = row.cellValue.toLocaleString()
                                        //  0以上であれば元のセルカラーのままにする
                                        cellColor =  row.cellValue < 0 ? 'text-arrow-red' : cellColor;
                                    }else{
                                        cellValue = row.cellValue
                                    }
                                    //  文字色決定フロー[4]
                                    //  停止とかのカラムであれば停止の時に赤くなるようにする
                                    cellColor = columnStructure.type == 'status' ? 'text-arrow-red' : cellColor;
                                    // console.log("[cellColor from status]",cellColor);
                                    //
                                    //
                                    ////////////////////////////////////////////////////////
                                    ////////////////////////////////////////////////////////
                                    if(dataType === 'currency'){
                                       
                                        cellValue = "¥ " + row.cellValue.toLocaleString()
                                    }
                                    //////////////////////////////////currency/////////////間宮作業中
                                    return (
                                        // セルの出力
                                        <div
                                            data-column-index={index}
                                            data-column-order={row.columnOrder}
                                            data-column-type={columnStructure.type}
                                            data-column-dataType={columnStructure.dataType}
                                            data-row-order={TableBody.rowOrder}
                                            data-row-id={TableBody.id}
                                            className={`
                                                ${columnStructure.type == 'icon' ? CellClass.replace('py-2', '').replace('px-1', '') : CellClass}
                                                ${dataType}
                                                ${leftBorder}
                                                ${isSticky}
                                                ${addCellClass}
                                                ${rightShadow}
                                                ${cellColor}
                                            `}
                                            >
                                            {
                                                {
                                                    'string': cellValue,
                                                    'currency': cellValue,
                                                    'number': cellValue,
                                                    'icon': getIcons(TableBody.pdfStatus, TableBody)
                                                }[columnStructure.dataType]
                                            }
                                        </div>
                                );
                            })}
                        </div>
                    </>
                );
          })}
        </>
    );
};


