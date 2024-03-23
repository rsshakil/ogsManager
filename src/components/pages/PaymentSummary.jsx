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
import useFetchPaymentSummaryQuery from "../../hooks/useFetchPaymentSummaryQuery";

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


export const paymentTypeLookup = [
    // { id: 1, caption: '全て' },
    { id: 2, caption: '今日' },
    { id: 3, caption: '昨日' },
    { id: 4, caption: '一昨日' },
    { id: 5, caption: '今週' },
    { id: 6, caption: '先週' },
    { id: 7, caption: '今月' },
    { id: 8, caption: '先月' },
    
    
]

export function paymentCellRenderer(cellData) {
    const targetItem = paymentTypeLookup.find(item => item.id === cellData.data.totalType);
    return (
        <div>
            {targetItem?.caption}
        </div>
    );
}


const allPossibleRowFilterLookupData = [
    // { userPaymentHistoryStatus: 1 },
    // { userPaymentHistoryStatus: 2 },
    // { userPaymentHistoryStatus: 3 },
    // { userPaymentHistoryStatus: 4 },
    ...userAllPossibleRowFilterLookupData,
]

export const PaymentSummary = () => {
    const location = useLocation();
    const dataGridRef = useRef(null);
    const { showModal, closeModal, setTableRef } = useModal();
    const elementRef = useRef(null);

    const [displayStateValue, setDisplayState] = useRecoilState(displayState);

    //Query
    const { data: { records:dataSource = [] } = {}, isFetching: isLoading, refetchApi } = useFetchPaymentSummaryQuery(false);
    // const { dataSource, isLoading } = useCustomStore('paymentSummaryId', '/payment-summary', true, allPossibleRowFilterLookupData);
    // const isLoading = false;
    // const dataSource = [
    //     {
    //         totalType:1,
    //         summaryTotal:2000,
    //         summaryEpsilonCredit:2000,
    //         summaryBankTransferManual:2000,
    //         summaryStripeCredit:2000,
    //     },
    //     {
    //         totalType:2,
    //         summaryTotal:2000,
    //         summaryEpsilonCredit:2000,
    //         summaryBankTransferManual:2000,
    //         summaryStripeCredit:2000,
    //     },{
    //         totalType:3,
    //         summaryTotal:2000,
    //         summaryEpsilonCredit:2000,
    //         summaryBankTransferManual:2000,
    //         summaryStripeCredit:2000,
    //     },{
    //         totalType:4,
    //         summaryTotal:2000,
    //         summaryEpsilonCredit:2000,
    //         summaryBankTransferManual:2000,
    //         summaryStripeCredit:2000,
    //     }, {
    //         totalType:5,
    //         summaryTotal:2000,
    //         summaryEpsilonCredit:2000,
    //         summaryBankTransferManual:2000,
    //         summaryStripeCredit:2000,
    //     },
    //     {
    //         totalType:6,
    //         summaryTotal:2000,
    //         summaryEpsilonCredit:2000,
    //         summaryBankTransferManual:2000,
    //         summaryStripeCredit:2000,
    //     },{
    //         totalType:7,
    //         summaryTotal:2000,
    //         summaryEpsilonCredit:2000,
    //         summaryBankTransferManual:2000,
    //         summaryStripeCredit:2000,
    //     },{
    //         totalType:8,
    //         summaryTotal:2000,
    //         summaryEpsilonCredit:2000,
    //         summaryBankTransferManual:2000,
    //         summaryStripeCredit:2000,
    //     }
    // ]
    const [applyFilter, setApplyFilter] = useState('onClick');

    let pagePath = 'payment-summary';
    // let pageName = location.state?.data.name;
    let pageTitle = '売上データ';

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
                            if (dataField === 'totalType')
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
        
        if (e.rowType === 'filter') {
            if (e.rowIndex === 1) {
                if (dataField === "totalType") {
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
        if (e.parentType == 'filterRow' && e.dataField!== 'totalType') {
            e.editorOptions.onFocusOut = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
            e.editorOptions.onEnterKey = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
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
                paging={false}
            >
                <FilterRow  applyFilter={applyFilter} visible={true}/>

                <Column
                    caption=""
                    dataField="totalType"
                    alignment="center"
                    width={120}
                    filter
                    cellRender={paymentCellRenderer}
                >
                    <Lookup
                        dataSource={paymentTypeLookup}
                        valueExpr="id"
                        displayExpr="caption"
                    />
                </Column>
               
                <Column
                    caption="イプシロンクレジット売上"
                    dataField="summaryEpsilonCredit"
                    dataType="number"
                    alignment="right"
                    format="#,##0.##"
                />
                 <Column
                    caption="銀行振込売上（入金）"
                    dataField="summaryBankTransferManual"
                    dataType="number"
                    alignment="right"
                    format="#,##0.##"
                />
                <Column
                    caption="ストライプ売上"
                    dataField="summaryStripeCredit"
                    dataType="number"
                    alignment="right"
                    format="#,##0.##"
                />
                 <Column
                    caption="合計売上"
                    dataField="summaryTotal"
                    dataType="number"
                    alignment="right"
                    format="#,##0.##"
                />
                 <Column
                    caption="計測範囲"
                    dataField="dateFromTo"
                    dataType="string"
                    alignment="center"
                    cssClass="whitespace-pre-wrap"
                />
            </Table>
        </>
    );
};



