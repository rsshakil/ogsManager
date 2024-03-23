import React, { useRef, useState, useEffect, Suspense } from "react";
import Modal from 'react-modal'
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../../store/modalState";
import { displayState } from "../../../store/displayState";
import { modalBodyData } from "../../../store/modalBodyData";
import { ModalHead } from "./modalChild/ModalHead";
import PaymentRequestModalBody from "./modalChild/PaymentRequestModalBody";
import InvoiceModalBody from "./modalChild/InvoiceModal";
import ExpensesModalBody from "./modalChild/ExpensesModalBody";
import WorksModalBody from "./modalChild/WorksModal";
import Loader from "../../atoms/Loading/TherapistLoader";
import http from '../../../restapi/httpService';
import _ from "lodash";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import '../../Form/FormInputs/inputStyle.css'
import { set, setMonth } from "date-fns";
//  Modalのスタイル
const customStyles = {
    overlay: {
        // position: "fixed",
        // top: 0,
        // left: 0,
        zIndex: 20,
        backgroundColor: "rgba(0,0,0,0.70)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        border: 'none',
        maxHeight: '100%',
    }
};


const BaseModal = () => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [modalStateValueTemp, setModalStateTemp] = useRecoilState(modalState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('エラーがおきました');
    const navigate = useNavigate();

    ///////////////mamiya////////////
    const regex = /^[A-Z\uFF61-\uFF9F\0-\9]+$/;
    const processing = useRef(false);
    const paymentB = modalStateValue.modalType == 'PaymentRequestModal' && modalStateValue.data.therapist_invoice_status == 3 ? true : modalStateValue.modalType == 'InvoiceModal' && modalStateValue.data.member_invoice_status == 2 ? true : false;

    /////////////////////////////////
    const [modalButtonState, setModalButtonState] = useState(false);
    console.log('paymentB', paymentB);
    console.log('modalButtonState', modalButtonState);
    /*const buttonTitle = modalStateValue.modalType == 'InvoiceModal' && modalButtonState == true ? 'アーカイブ済み(領収証の領収日のみ変更可能)'
        : modalStateValue.modalType == 'PaymentRequestModal' && modalButtonState == true ? '管理者承認済み' : '';*/
    let buttonTitle = '';
    if (modalStateValue.modalType == 'InvoiceModal' && modalButtonState == true) {
        buttonTitle = 'アーカイブ済み(領収証の領収日のみ変更可能)';
    }
    else if (modalStateValue.modalType == 'PaymentRequestModal' && modalButtonState == true) {
        if (modalStateValue.data.therapist_invoice_status == 3) {
            // Admin approved
            buttonTitle = '管理者承認済み';
        }
        else if (modalStateValue.data.therapist_invoice_status == 4) {
            // Billing expired
            buttonTitle = '請求期限切れ';
        }
    }


    useEffect(() => {
        setModalButtonState(paymentB)
    }, [paymentB])
    //  念の為全部閉じる
    function closeModal() {
        setModalState((prevState) => ({
            ...prevState,
            BaseModalOpen: false,
            modalType: '',
            mode: "edit",
            data: {}
        }))
    }

    //  modeごとに使用する文言をスイッチする
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
   
    
    useEffect(() => {
        window.addEventListener('popstate', () => {
            console.log('backbutton modalStateValue',modalStateValue)
            console.log('backbutton clicked',modalStateValue.BaseModalOpen)
                console.log('User clicked back button');
                closeModal();
        },{once:true});
        console.log('dedect ', modalStateValue);
        if (window.performance) {
            if (performance.navigation.type == 1) {
                console.log("This page is reloaded");
                closeModal();
            } else {
                console.log( "This page is not reloaded");
            }
          }
    }, [])
    function updateModalButtonState(status) {
        console.log('modalbuttonStatusssss', status);
        setModalButtonState(status)
    }
    console.log('modalButtonState', modalButtonState);
    function handleOnChange(e, formData) {
        console.log('e formValue', e);
        console.log('e formData', formData);
        let { name, value } = e.target;

        if (name == 'member_invoice_advance_amount' || name == 'member_invoice_adjustment_amount' || name == 'therapist_invoice_adjustment_amount_including_tax' || name == 'business_unit_price') {
            value = value.replace(/\s+/g, '')
            value = value.replace(/,/g, '');
            value = value.replace(/¥/g, '');
        }
        console.log('name', name);
        console.log('value', value);
        // console.log('modalStateValue',modalStateValue);
        setModalState((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                [name]: value
            }
        }))

        if (modalStateValue.modalType == 'PaymentRequestModal' && name == 'therapist_invoice_adjustment_amount_including_tax') {
            let sumationOfTotalBusinessTemp = formData?.businessItemList && formData?.businessItemList.length > 0 && formData?.businessItemList.reduce(function (acc, obj) { return acc + parseInt(obj.therapist_business_total_price_excluding_tax??0); }, 0);
            let sumationOfTotalExpensesTemp = formData?.expensesItemList && formData?.expensesItemList.length > 0 && formData?.expensesItemList.reduce(function (acc, obj) { return acc + parseInt(obj.expensesPriceExcludingTax??0); }, 0);
            console.log('sumationOfTotalBusinessTemp',sumationOfTotalBusinessTemp);
            console.log('sumationOfTotalExpensesTemp',sumationOfTotalExpensesTemp);
            let withHoldingIncomeTax = -(parseInt(formData?.therapist_invoice_withholding_income_tax ?? 0));
            withHoldingIncomeTax = Math.sign(withHoldingIncomeTax) === -1 ? withHoldingIncomeTax * -1 : withHoldingIncomeTax;
            console.log('formData?.therapist_invoice_total_rehabilitation_price_excluding_tax', formData?.therapist_invoice_total_rehabilitation_price_excluding_tax);
            console.log('value', value);
            console.log('withHoldingIncomeTax', withHoldingIncomeTax);
            console.log('formData?.therapist_invoice_total_consumption_tax', formData?.therapist_invoice_total_consumption_tax);

            let totalPayableAmount = parseInt(formData?.therapist_invoice_total_rehabilitation_price_excluding_tax ?? 0) + parseInt(value==''?0:value) + parseInt(formData?.therapist_invoice_total_consumption_tax?formData?.therapist_invoice_total_consumption_tax:0) + parseInt(sumationOfTotalBusinessTemp?sumationOfTotalBusinessTemp:0) + parseInt(sumationOfTotalExpensesTemp ?sumationOfTotalExpensesTemp:0)-withHoldingIncomeTax;
            console.log('totalPayableAmount',totalPayableAmount);
            setModalState((prevState) => ({
                ...prevState,
                data: {
                    ...prevState.data,
                    therapist_invoice_total_payment: totalPayableAmount
                }
            }))
        }

        if (modalStateValue.modalType == 'PaymentRequestModal' && (name == 'therapist_invoice_visit_unit_price_including_tax' || name == 'therapist_invoice_intervention_unit_price_including_tax')) {
            let sumationValue = 0;
            let rehabTotalExcludingValue = 0;
            let rehabTotalIncludingValue = 0;
            let updateKey = '';
            let exCludingKey = '';
            let exCludingTotalKey = '';
            let rehabTotalIncludingTaxKey = 'therapist_invoice_total_rehabilitation_price_including_tax';
            let rehabTotalExcludingTaxKey = 'therapist_invoice_total_rehabilitation_price_excluding_tax';
            let exCludingKeyValue = 0;
            let exCludingTotalKeyValue = 0;
            // Get tax rate from session storage
            const taxRate = JSON.parse(sessionStorage.getItem('taxRate'));
            console.log(taxRate, 'taxRate=======>')

            if (name == 'therapist_invoice_visit_unit_price_including_tax') {
                let numVisits = formData?.therapist_invoice_number_of_visits ?? 0;
                sumationValue = parseInt(value==''?0:value) * numVisits;
                exCludingKeyValue = parseInt(value==''?0:value) - Math.trunc(parseInt(value==''?0:value) / taxRate.consumptionTaxRate);
                exCludingTotalKeyValue = exCludingKeyValue * numVisits;
                rehabTotalIncludingValue = sumationValue + parseInt(formData?.therapist_invoice_total_intervention_price_including_tax ?? 0)
                rehabTotalExcludingValue = exCludingTotalKeyValue + parseInt(formData?.therapist_invoice_total_intervention_price_excluding_tax ?? 0);

                updateKey = 'therapist_invoice_total_visit_price_including_tax';
                exCludingKey = 'therapist_invoice_visit_unit_price_excluding_tax';
                exCludingTotalKey = 'therapist_invoice_total_visit_price_excluding_tax';

                //rehabTotal = parseInt(sumationValue)+parseInt(formData?.therapist_invoice_total_rehabilitation_price_excluding_tax??0)+parseInt(formData?.therapist_invoice_intervention_unit_price_excluding_tax??0)+parseInt(formData?.therapist_invoice_total_visit_price_excluding_tax??0);
            }
            if (name == 'therapist_invoice_intervention_unit_price_including_tax') {
                let rehabilitationTimes = formData?.therapist_invoice_rehabilitation_time ?? 0;
                sumationValue = parseInt(value==''?0:value) * rehabilitationTimes;
                exCludingKeyValue = parseInt(value==''?0:value) - Math.trunc(parseInt(value==''?0:value) / taxRate.consumptionTaxRate);
                exCludingTotalKeyValue = exCludingKeyValue * rehabilitationTimes;
                rehabTotalIncludingValue = sumationValue + parseInt(formData?.therapist_invoice_total_visit_price_including_tax ?? 0)
                rehabTotalExcludingValue = exCludingTotalKeyValue + parseInt(formData?.therapist_invoice_total_visit_price_excluding_tax ?? 0);
                updateKey = 'therapist_invoice_total_intervention_price_including_tax';
                exCludingKey = 'therapist_invoice_intervention_unit_price_excluding_tax';
                exCludingTotalKey = 'therapist_invoice_total_intervention_price_excluding_tax';
                // rehabTotal = parseInt(sumationValue)+parseInt(formData?.therapist_invoice_total_rehabilitation_price_excluding_tax??0)+parseInt(formData?.therapist_invoice_visit_unit_price_excluding_tax??0)+parseInt(formData?.therapist_invoice_total_visit_price_excluding_tax??0);;
            }
            let withHoldingTax = -(Math.trunc(rehabTotalExcludingValue * taxRate.withholdingTaxRate));
            // withHoldingTax = Math.sign(withHoldingTax) === -1 ? withHoldingTax * -1:withHoldingTax
            let sumationOfTotalBusiness = formData?.businessItemList && formData?.businessItemList.length > 0 && formData?.businessItemList.reduce(function (acc, obj) { return acc + parseInt(obj.therapist_business_total_price_excluding_tax??0); }, 0);
            let sumationOfTotalExpenses = formData?.expensesItemList && formData?.expensesItemList.length > 0 && formData?.expensesItemList.reduce(function (acc, obj) { return acc + parseInt(obj.expensesPriceExcludingTax??0); }, 0);
            let totalBill = parseInt(rehabTotalExcludingValue) + parseInt(formData?.therapist_invoice_adjustment_amount_including_tax ? formData?.therapist_invoice_adjustment_amount_including_tax:0) + parseInt(formData?.therapist_invoice_total_consumption_tax ?formData?.therapist_invoice_total_consumption_tax:0) + parseInt(sumationOfTotalBusiness ?sumationOfTotalBusiness:0) + parseInt(sumationOfTotalExpenses ?sumationOfTotalExpenses:0)-parseInt(withHoldingTax);

            setModalState((prevState) => ({
                ...prevState,
                data: {
                    ...prevState.data,
                    [updateKey]: sumationValue,
                    [exCludingKey]: exCludingKeyValue,
                    [exCludingTotalKey]: exCludingTotalKeyValue,
                    [rehabTotalIncludingTaxKey]: rehabTotalIncludingValue,
                    [rehabTotalExcludingTaxKey]: rehabTotalExcludingValue,
                    therapist_invoice_withholding_income_tax: withHoldingTax,
                    therapist_invoice_total_payment: totalBill
                }
            }))
        }

        if (modalStateValue.modalType == 'InvoiceModal' && (name == 'member_invoice_visit_unit_price_60min' || name == 'member_invoice_visit_unit_price_30min' || name == 'member_invoice_travel_expenses')) {
            let member_invoice_total_travel_expenses_var = parseInt(formData?.member_invoice_total_travel_expenses ?? 0);
            if (name == 'member_invoice_travel_expenses') {
                member_invoice_total_travel_expenses_var = parseInt(formData?.member_invoice_number_of_travel_used ?? 0) * value;
            }

            let member_invoice_total_price_30min_var = parseInt(formData?.member_invoice_total_price_30min ?? 0);
            if (name == 'member_invoice_visit_unit_price_30min') {
                member_invoice_total_price_30min_var = parseInt(formData?.member_invoice_number_of_visits_30min ?? 0) * value;
            }
            let member_invoice_total_price_60min_var = parseInt(formData?.member_invoice_total_price_60min ?? 0);
            let member_invoice_visit_unit_price_90min_var = parseInt(formData?.member_invoice_visit_unit_price_90min ?? 0);
            let member_invoice_total_price_90min_var = parseInt(formData?.member_invoice_total_price_90min ?? 0);
            if (name == 'member_invoice_visit_unit_price_60min') {
                member_invoice_total_price_60min_var = parseInt(formData?.member_invoice_number_of_visits_60min ?? 0) * value;
                member_invoice_visit_unit_price_90min_var = Math.trunc(value * 1.5);
                member_invoice_total_price_90min_var = parseInt(formData?.member_invoice_number_of_visits_90min ?? 0) * member_invoice_visit_unit_price_90min_var;
            }

            let member_invoice_rehabilitation_price_var = member_invoice_total_price_30min_var + member_invoice_total_price_60min_var + member_invoice_total_price_90min_var;
            let member_invoice_total_payment_var = member_invoice_rehabilitation_price_var + parseInt(formData?.member_invoice_advance_amount ?? 0) + parseInt(formData?.member_invoice_adjustment_amount ?? 0) + parseInt(member_invoice_total_travel_expenses_var ?? 0);
            setModalState((prevState) => ({
                ...prevState,
                data: {
                    ...prevState.data,
                    member_invoice_visit_unit_price_90min: member_invoice_visit_unit_price_90min_var,
                    member_invoice_total_price_30min: member_invoice_total_price_30min_var,
                    member_invoice_total_price_60min: member_invoice_total_price_60min_var,
                    member_invoice_total_price_90min: member_invoice_total_price_90min_var,
                    member_invoice_rehabilitation_price: member_invoice_rehabilitation_price_var,
                    member_invoice_total_travel_expenses: member_invoice_total_travel_expenses_var,
                    member_invoice_total_payment: member_invoice_total_payment_var
                }
            }))
        }
        if (modalStateValue.modalType == 'InvoiceModal' && (name == 'member_invoice_advance_amount' || name == 'member_invoice_adjustment_amount')) {
            let member_invoice_advance_amount_var = name == 'member_invoice_advance_amount' ? parseInt(value==''?0:value) : parseInt(formData?.member_invoice_advance_amount==''?0:formData?.member_invoice_advance_amount);
            let member_invoice_adjustment_amount_var = name == 'member_invoice_adjustment_amount' ? parseInt(value==''?0:value) : parseInt(formData?.member_invoice_adjustment_amount==''?0:formData?.member_invoice_adjustment_amount);
            let totalPayment = parseInt(member_invoice_advance_amount_var) + parseInt(member_invoice_adjustment_amount_var) + parseInt(formData?.member_invoice_rehabilitation_price ?? 0) + parseInt(formData?.member_invoice_total_travel_expenses ?? 0);

            setModalState((prevState) => ({
                ...prevState,
                data: {
                    ...prevState.data,
                    member_invoice_total_payment: totalPayment
                }
            }))
        }
        // お支払い方法が変更された場合
        /////////////////////////mamiya///////////////////////////
        if (modalStateValue.modalType == 'InvoiceModal' && name == 'member_invoice_payment_method') {
            console.log("😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡", modalStateValue.data)

            let strDate = String(modalStateValue.data.member_invoice_month);
            console.log("😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡", strDate)
            let tempDate = new Date(strDate.substring(0, 4), strDate.substring(4), "01");

            // let tempDate  = new Date(strDate.setMonth(1).setDate(20));
            console.log("😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡 tempDate", tempDate)
            // console.log("😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡 tempDate 08",tempDate.setDate
            // // 案１
            // if (value == 1) {
            //     strDate = 170000000;
            // } else if (value == 2) {
            //     strDate = 160000000;
            // }
            // 案２
            if (value === "1") {
                tempDate = new Date(strDate.substring(0, 4), strDate.substring(4), "01");
                tempDate.setDate(27);
                strDate = Math.floor(tempDate.getTime() / 1000);
                console.log("😡😡😡😡😡😡😡😡💦💦😡😡😡😡😡 tempDate20", tempDate)
            } else if (value === "2") {
                tempDate = new Date(strDate.substring(0, 4), strDate.substring(4), "01");
                tempDate.setDate(20);
                strDate = Math.floor(tempDate.getTime() / 1000);
                console.log("😡😡😡😡😡😡😡💦💦💦💦😡😡😡😡 tempDate27", tempDate)
                // strDate = 1600000000;
            }
            // // 案３
            // try {
            //     value = parseInt(value);
            // } catch (e) {
            //     // nop
            // }
            // if (value === 1) {
            //     strDate = 170000000;
            // } else if (value === 2) {
            //     strDate = 160000000;
            // }

            // // 案４
            // switch (value) {
            //     case 1:
            //         console.log("------A");
            //         strDate = 1700000000;
            //     break;
            //     case 2:
            //         console.log("------B");
            //         strDate = 1600000000;
            //     break;
            //     default:
            //         alert("一致しない")
            //         console.log("------C");
            //         //any
            //     break;
            // }
            console.log("😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡💦", strDate)

            setModalState((prevState) => ({
                ...prevState,
                data: {
                    ...prevState.data,
                    // member_invoice_receipt_datetime: 1700000000
                    member_invoice_receipt_datetime: strDate
                }
            }))
        }
        setError(false);

    }

    //TODO　後で消す
    // function handleOnChangePaymentMethod(e) { 
    //     console.log("💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦")
    //     console.log('e formValue', e);
    //     let { name, value } = e.target;

    //     console.log('name',name);
    //     console.log('value', value);
    //     // console.log('modalStateValue',modalStateValue);
    //     setModalState((prevState) => ({
    //         ...prevState,
    //         data: {
    //             ...prevState.data,
    //             [name]:value
    //         }
    //     }))
    //     setError(false);
    // }
    async function submitData(e) {
        ////////////mamiya///////////
        if (processing.current) return;
        processing.current = true;
        /////////////////////////////
        setLoading(true);
        try {
            console.log('submit Event', e);
            let actionUrl;
            let navigateUrl;
            switch (modalStateValue.modalType) {
                case 'ExpensesModal':
                    actionUrl = '/expenses';
                    navigateUrl = '/expenses';
                    if (modalStateValue.mode == 'edit') {
                        actionUrl = '/expenses/' + modalStateValue.data.expenses_id;
                    }
                    if (modalStateValue.data.expenses_name == '') {
                        setError(true);
                        setErrorMessage('経費名を入力してください');
                        setLoading(false);
                        return false;
                    } else {
                        setError(false);
                    }
                    break;
                case 'WorksModal':
                    actionUrl = '/businesses';
                    navigateUrl = '/works';
                    if (modalStateValue.mode == 'edit') {
                        actionUrl = '/businesses/' + modalStateValue.data.business_id;
                    }
                    if (modalStateValue.data.business_name == '') {
                        setError(true);
                        setErrorMessage('業務名を入力してください')
                        setLoading(false);
                        return false;
                    } else {
                        setError(false);
                    }
                    break;
                case 'PaymentRequestModal':
                    actionUrl = '/invoice-update';
                    navigateUrl = '/payment-request-detail';
                    if (modalStateValue.mode == 'edit') {
                        actionUrl = '/invoice-update/' + modalStateValue.data.therapist_invoice_id;
                    }
                    // console.log("✋✋✋✋✋✋✋✋✋✋✋✋✋✋✋✋✋[" + modalStateValue.data.therapist_invoice_bank_account_holder.match(regex)+ "]")
                    // console.log("✋✋✋✋✋✋✋✋✋✋✋✋✋✋✋✋✋[" + String(modalStateValue.data.therapist_invoice_bank_account_holder).match(regex) +  "]")
                    ///////////////////////mamiya////////////////////

                    if (modalStateValue.data.therapist_invoice_bank_account_holder) {
                        if (modalStateValue.data.therapist_invoice_bank_account_holder.match(regex) === null) {
                            setError(true);
                            setErrorMessage('口座名義は半角で入力してください')
                            setLoading(false);
                            return false;
                        } else {
                            setError(false);
                            processing.current = false;
                        }
                    }
                    break;
                // therapist_invoice_bank_account_holder
                case 'InvoiceModal':
                    actionUrl = '/member-invoice-update';
                    navigateUrl = '/invoice-detail';
                    if (modalStateValue.mode == 'edit') {
                        actionUrl = '/member-invoice-update/' + modalStateValue.data.member_invoice_id;
                    }

                    // if (modalStateValue.data.business_name == '') {
                    //     setError(true);
                    //     setErrorMessage('業務名を入力してください')
                    //     setLoading(false);
                    //     return false;
                    // } else { 
                    //     setError(false); 
                    // }
                    break;
                default:
                    // nop
                    processing.current = false;
                    console.log("予期しないモーダルタイプが指定されています");
                    break;
            }
            if (!error) {
                try {
                    let response;
                    if (modalStateValue.mode == 'create') {
                        response = await http.post(actionUrl, modalStateValue.data);
                    } else if (modalStateValue.mode == 'edit') {
                        response = await http.put(actionUrl, modalStateValue.data);
                    }
                    const { status } = response || '';
                    if (status == 200) {
                        setLoading(false);
                        closeModal();
                        navigate(navigateUrl);
                    } else {
                        console.log('invalid formData');
                    }
                    console.log("✋✋✋response", response);

                    setLoading(false);
                } catch (err) {
                    setLoading(false);
                    console.log('err', err);
                    setError(true);
                    setErrorMessage('エラーが発生しました')
                    // } finally {
                    //     processing.current = false;
                }
            }
        } catch (err2) {
            console.log("✋✋✋✋ エラーです", err2)
        } finally {
            processing.current = false;
        }
        //
    }
    console.log('modalStateValue', modalStateValue);
    return (
        <div>

            <Modal
                isOpen={modalStateValue.BaseModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel=""
            >

                <div id="modal-wrap" className="flex flex-col justify-center items-center rounded-md px-4">
                    {/* 768以上で余白発生 */}
                    <div id="modal-contents" className="w-[calc(100vw_-_40px)] bg-white md:w-176">
                        {/* モーダル上部のタイトル */}
                        
                        <ModalHead />
                        {/* モーダルの中身 */}
                        {
                            {
                                'PaymentRequestModal': <PaymentRequestModalBody formData={modalStateValue.data} handleOnChange={handleOnChange} updateModalButtonState={updateModalButtonState} />,
                                'InvoiceModal': <InvoiceModalBody formData={modalStateValue.data} handleOnChange={handleOnChange} updateModalButtonState={updateModalButtonState} />,
                                'ExpensesModal': <ExpensesModalBody formData={modalStateValue.data} handleOnChange={handleOnChange} updateModalButtonState={updateModalButtonState} />,
                                'WorksModal': <WorksModalBody formData={modalStateValue.data} handleOnChange={handleOnChange} updateModalButtonState={updateModalButtonState} />,
                            }[modalStateValue.modalType]
                        }
                    </div>
                </div>
                
                {error && <p className="w-full text-right pr-2" style={{ color: '#ff4b00' }}>{errorMessage}</p>}
                <div id="modal-footer" className="flex items-center flex-row w-full relative bg-white p-0 divide-x">
                {loading && <Loader top='-250px' />}
                    {modalButtonState === true ? (
                        <button className="
                       font-bold
                       cursor-default
                       relative
                       rounded-md
                       w-full
                       h-12
                       flex
                       items-center
                       justify-center
                       text-xl
                       text-black
                       my-4
                       mx-4
                       bg-arrow-bg-disable
                       hover:bg-arrow-bg-disable
                       focus:bg-arrow-bg-disable
                       active:bg-arrow-bg-disable
                       disabled:bg-arrow-bg-disable
                       focus:outline-none
                       active:outline-none
                       active:shadow-inner
                       disabled:shadow-inner
                       ">
                            {buttonTitle}
                        </button>
                    ) : (
                        <button onClick={(e) => submitData()} className="
                        font-bold
                        relative
                        rounded-md
                        w-full
                        h-12
                        flex
                        items-center
                        justify-center
                        text-xl
                        text-white
                        my-4
                        mx-4
                        bg-arrow-blue-nomal
                        hover:bg-arrow-blue-hover
                        focus:bg-arrow-blue-hover
                        active:bg-arrow-blue-active
                        disabled:bg-blue-100
                        focus:outline-none
                        active:outline-none
                        active:shadow-inner
                        disabled:text-blue-300
                        disabled:shadow-inner
                        ">
                            保存
                        </button>
                    )}

                </div>
            </Modal>
        </div>
    );
}

export default BaseModal;