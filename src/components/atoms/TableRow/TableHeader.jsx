import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { displayState } from "../../../store/displayState";
import { tableStructure } from "../../../store/tableStructure";
import { columnSettingsData } from "../../../store/columnSettingsData";


export const TableHeader = ({}) => {
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [tableStructureObject, setTableStructure] = useRecoilState(tableStructure);
    const [columnSettingsDataObject, setColumnSettingsData] = useRecoilState(columnSettingsData);
    ///////////////////////////////////////////
    //  初期値の設定
    ///////////////////////////////////////////
    //  [初期値]カラムの構造
    let ColumnStyleObject ={};
    //  [初期値]ヘッダーのClass
    let HeaderClass = columnSettingsDataObject.headerClass;
    //  [初期値]セルのClass
    let CellClass = columnSettingsDataObject.headerCellClass;
    ///////////////////////////////////////////


    //  カラム幅の格納
    const columnSsettings = columnSettingsDataObject;

    //  ページごとにColumnStyleObjectをスイッチする
    switch (displayStateValue.pagePath) {
        case 'payment-request':
            ColumnStyleObject = tableStructureObject.PaymentRequest;
        break;
        case 'payment-request-detail':
            ColumnStyleObject = tableStructureObject.PaymentRequestDetail;
        break;
        case 'invoice':
            ColumnStyleObject = tableStructureObject.Invoice;
        break;
        case 'invoice-detail':
            ColumnStyleObject = tableStructureObject.InvoiceDetail;
        break;
        case 'expenses':
            ColumnStyleObject = tableStructureObject.Expenses;
        break;
        case 'works':
            ColumnStyleObject = tableStructureObject.Works;
        break;

        case 'invoiceLayout':
            ColumnStyleObject = tableStructureObject.InvoiceLayout;
        break;



        default:
            //any
        break;
    }
    //  ColumnStyleの生成
    const ColumnStyleArray = ColumnStyleObject.gridTemplateColumns.map(
        function (item) {
            let type = item.type
            let style = columnSsettings[type]
            // console.log("[ColumnStyleArrayFromType]", columnSsettings[type])
            return style;
        })
    const ColumnStyle = {gridTemplateColumns: ColumnStyleArray.join(' ')}
    // console.log("[ColumnStyle]",ColumnStyle)


    return (
        <div id="table-header" className={`${HeaderClass}`} style={ColumnStyle} >
            {ColumnStyleObject.headerStructure.map((ColumnStyle) => (
                <div
                    data-header-column-order={`${ColumnStyle.headerColumnOrder}`}
                    data-header-row={`${ColumnStyle.tableHeaderRow}`}
                    className={`
                        ${CellClass}
                        ${ColumnStyle.rowSpan}
                        ${ColumnStyle.colSpan}
                        ${ColumnStyle.addCellClass}
                        ${ColumnStyle.leftBorder ? '!border-l-2' : ''}
                        ${ColumnStyle.isSticky ? 'sticky z-10 ' : ''}
                        ${ColumnStyle.rightShadow ? 'right-shadow' : ''}
                        ${ColumnStyle.rowSpan ? 'py-4' : ''}
                        ${ColumnStyle.colSpan ? 'border-b' : ''}
                        `} 
                >
                    {ColumnStyle.headerText}
                </div>
            ))}
        </div>
    );
};


