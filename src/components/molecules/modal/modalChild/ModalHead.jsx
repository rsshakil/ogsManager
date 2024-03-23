import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { displayState } from "../../../../store/displayState";
import { modalState } from "../../../../store/modalState";



export const ModalHead = ({}) => {
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const navigate = useNavigate();


    //  編集か、作成かの切り替え
    let mode;
    switch (modalStateValue.mode) {
        case 'edit':
            mode = '編集';
        break;
        case 'create':
            mode = '作成';
        break;
        default:
            //any
        break;
    }







    let workName = modalStateValue.data?.name ? modalStateValue.data?.name :'その他業務';
    let expensesName = modalStateValue.data?.name ? modalStateValue.data?.name :'新規経費';
    return (
        <div id="modal-head" className="md:flex items-center justify-between">
            <h2 id="modal-title" className="w-full text-xl font-bold leading-6 text-black text-center py-2">
                {
                    {
                        'PaymentRequestModal': displayStateValue.pageName + '期：' + modalStateValue.data?.therapist_invoice_therapist_name + '様 請求管理',
                        'InvoiceModal': displayStateValue.pageName + '期：' + modalStateValue.data?.member_invoice_member_name + '様 請求管理',
                        'ExpensesModal': expensesName + mode,
                        'WorksModal': workName + mode,
                    }[modalStateValue.modalType]
                }
                </h2>
        </div>
    );
};


