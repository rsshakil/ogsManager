import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { debugState } from "../../../src/store/debugState";
import { displayState } from "../../store/displayState";
import { elmState } from "../../store/elmState";
import { accessState } from "../../store/accessState";
import { modalState } from "../../store/modalState";
import { modalBodyData } from "../../store/modalBodyData";
import { pageLoadiongState } from "../../store/pageLoadiongState";
import { tableStructure } from "../../store/tableStructure";
import { tableBodyData } from "../../store/tableBodyData";



export const DebugWindow = (props) => {
    const [tableStructureValue, setTableStructur] = useRecoilState(tableStructure);
    const [tableBodyDataValue, setTableBodyData] = useRecoilState(tableBodyData);
    const accessstate = useRecoilValue(accessState);
    const displaystate = useRecoilValue(displayState);
    const debugstate = useRecoilValue(debugState);
    const elmstate = useRecoilValue(elmState);
    const modalstate = useRecoilValue(modalState);
    const modalbodydata = useRecoilValue(modalBodyData);
    const pageLoadiongstate = useRecoilValue(pageLoadiongState);

    ////////////////////////////////
    const tableStructureStatesPaymentRequestGridTemplateColumns = JSON.stringify(tableStructureValue.PaymentRequest.gridTemplateColumns,null, '\t');
    const tableStructureStatesPaymentRequestHeaderStructure = JSON.stringify(tableStructureValue.PaymentRequest.headerStructure,null, '\t');
    const tableStructureStatesPaymentRequestDetailGridTemplateColumns = JSON.stringify(tableStructureValue.PaymentRequestDetail.gridTemplateColumns,null, '\t');
    const tableStructureStatesPaymentRequestDetailHeaderStructure = JSON.stringify(tableStructureValue.PaymentRequestDetail.headerStructure,null, '\t');
    const tableStructureStatesInvoiceGridTemplateColumns = JSON.stringify(tableStructureValue.Invoice.gridTemplateColumns,null, '\t');
    const tableStructureStatesInvoiceHeaderStructure = JSON.stringify(tableStructureValue.Invoice.headerStructure,null, '\t');
    const tableStructureStatesInvoiceDetailGridTemplateColumns = JSON.stringify(tableStructureValue.InvoiceDetail.gridTemplateColumns,null, '\t');
    const tableStructureStatesInvoiceDetailHeaderStructure = JSON.stringify(tableStructureValue.InvoiceDetail.headerStructure,null, '\t');
    const tableStructureStatesExpensesGridTemplateColumns = JSON.stringify(tableStructureValue.Expenses.gridTemplateColumns,null, '\t');
    const tableStructureStatesExpensesHeaderStructure = JSON.stringify(tableStructureValue.Expenses.headerStructure,null, '\t');
    const tableStructureStatesWorksGridTemplateColumns = JSON.stringify(tableStructureValue.Works.gridTemplateColumns,null, '\t');
    const tableStructureStatesWorksHeaderStructure = JSON.stringify(tableStructureValue.Works.headerStructure,null, '\t');
    const tableBodyDataPaymentRequeste = JSON.stringify(tableBodyDataValue.PaymentRequest,null, '\t');
    const tableBodyDataPaymentRequestDetail = JSON.stringify(tableBodyDataValue.PaymentRequestDetail,null, '\t');
    const tableBodyDataInvoice = JSON.stringify(tableBodyDataValue.Invoice,null, '\t');
    const tableBodyDataInvoiceDetail = JSON.stringify(tableBodyDataValue.InvoiceDetail,null, '\t');
    const tableBodyDataExpenses = JSON.stringify(tableBodyDataValue.Expenses,null, '\t');
    const tableBodyDataWorks = JSON.stringify(tableBodyDataValue.Works,null, '\t');

    const modalStates = JSON.stringify(modalstate,null, '\t');

    const modalBodyDataPaymentRequestModal = JSON.stringify(modalbodydata.PaymentRequestModal,null, '\t');
    const modalBodyDataInvoiceModal = JSON.stringify(modalbodydata.InvoiceModal,null, '\t');
    const modalBodyDataExpensesModal = JSON.stringify(modalbodydata.ExpensesModal,null, '\t');
    const modalBodyDataWorksModal = JSON.stringify(modalbodydata.WorksModal,null, '\t');

    const access = JSON.stringify(accessstate,null, '\t');
    const display = JSON.stringify(displaystate,null, '\t');
    const debugStates = JSON.stringify(debugstate,null, '\t');
    const elmstates = JSON.stringify(elmstate,null, '\t');
    const pageLoadiongstates = JSON.stringify(pageLoadiongstate,null, '\t');


    const [clicked, setClicked] = useState(100);
    const menus = [
        { title: "access", content: access },
        { title: "display", content: display },
        { title: "modal", content: modalStates },
        { title: "tableStructure▶︎PaymentRequest▶︎gridTemplateColumn", content: tableStructureStatesPaymentRequestGridTemplateColumns },
        { title: "tableStructure▶︎PaymentRequest▶︎headerStructure", content: tableStructureStatesPaymentRequestHeaderStructure },
        { title: "tableStructure▶︎PaymentRequestDetai▶︎gridTemplateColumn", content: tableStructureStatesPaymentRequestDetailGridTemplateColumns },
        { title: "tableStructure▶︎PaymentRequestDetai▶︎headerStructure", content: tableStructureStatesPaymentRequestDetailHeaderStructure },
        { title: "tableStructure▶︎Invoice▶︎gridTemplateColumn", content: tableStructureStatesInvoiceGridTemplateColumns },
        { title: "tableStructure▶︎Invoice▶︎headerStructure", content: tableStructureStatesInvoiceHeaderStructure },
        { title: "tableStructure▶︎InvoiceDetail▶︎gridTemplateColumn", content: tableStructureStatesInvoiceDetailGridTemplateColumns },
        { title: "tableStructure▶︎InvoiceDetail▶︎headerStructure", content: tableStructureStatesInvoiceDetailHeaderStructure },
        { title: "tableStructure▶︎Expenses▶︎gridTemplateColumn", content: tableStructureStatesExpensesGridTemplateColumns },
        { title: "tableStructure▶︎Expenses▶︎headerStructure", content: tableStructureStatesExpensesHeaderStructure },
        { title: "tableStructure▶︎Works▶︎gridTemplateColumn", content: tableStructureStatesWorksGridTemplateColumns },
        { title: "tableStructure▶︎Works▶︎headerStructure", content: tableStructureStatesWorksHeaderStructure },
        { title: "tableBodyData▶︎PaymentRequeste", content: tableBodyDataPaymentRequeste },
        { title: "tableBodyData▶︎PaymentRequestDetail", content: tableBodyDataPaymentRequestDetail },
        { title: "tableBodyData▶︎Invoice", content: tableBodyDataInvoice },
        { title: "tableBodyData▶︎InvoiceDetail", content: tableBodyDataInvoiceDetail },
        { title: "tableBodyData▶︎Expenses", content: tableBodyDataExpenses },
        { title: "tableBodyData▶︎Works", content: tableBodyDataWorks },

        { title: "modalBodyData▶︎PaymentRequestModal", content: modalBodyDataPaymentRequestModal },
        { title: "modalBodyData▶︎InvoiceModal", content: modalBodyDataInvoiceModal },
        { title: "modalBodyData▶︎ExpensesModal", content: modalBodyDataExpensesModal },
        { title: "modalBodyData▶︎WorksModal", content: modalBodyDataWorksModal },

        { title: "pageLoadiongstates", content: pageLoadiongstates },
        { title: "elmstates", content: elmstates },
        { title: "debugStates", content: debugStates },
    ];
    const handleClick = (index) => {
        if (clicked === index) {
            return setClicked(100);
        }
        setClicked(index);
    };
    const contentEl = useRef();

    // console.log(login);
    return (
        
    <div className="overflow-visible break-all">
        <h3 ><span>-RecoilStoreWindow-</span></h3>
        <ul className="space-y-2">
            {menus.map((menu, index) => (
                <li key={index} >
                    <button
                        className="sticky top-0 bg-white text-black border border-slate-600 hover:bg-slate-200"
                        type="button"
                        onClick={() => handleClick(index)}
                        style={
                            clicked === index
                            ? {
                                width: "100%",
                                textAlign: "left",
                                padding: "0.5rem",
                                position: "sticky",
                                // top: elmStateValue.headerHeight + "px",
                                top: 0
                            }
                            : {
                                width: "100%",
                                textAlign: "left",
                                padding: "0.5rem",
                            }
                        }
                    >
                        {"Recoil->["+menu.title+"]"}
                    </button>
                    <div
                        className="h-max overflow-visible break-all"
                        ref={contentEl}
                        style={
                            clicked === index
                            ? {
                                // height: contentEl.current.scrollHeight,
                                backgroundColor: "#e7d0a9",
                            }
                            : { height: "0px", overflow: "hidden" }
                        }
                    >
                        <p className="whitespace-pre-wrap bg-black text-emerald-300 border-gray-300  block  mt-2 px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid rounded" >
                        {menu.content}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
    );
};
