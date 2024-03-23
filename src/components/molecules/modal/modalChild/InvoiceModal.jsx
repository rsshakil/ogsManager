
import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../../../store/modalState";
import { displayState } from "../../../../store/displayState";
import { Holidays } from "../../../../store/holidaysData";
import { NumericFormat } from 'react-number-format';
import InputContainer from "../../../Form/FormInputs/InputContainer";

//////////////////////////間宮追加/////////////////////////////
// import DatePicker, { registerLocale } from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import ja from "date-fns/locale/ja";
import FinancialAdminDatePicker from "../../../Form/FormInputs/FinancialAdminDatePicker";
//////////////////////////////////////////////////////////////

import SelectBox from "../../../Form/FormInputs/SelectBox";
import TextBox from "../../../Form/FormInputs/TextBox";
import Note from "../../../Form/FormInputs/Note";


// let data;





const InvoiceModalBody = ({formData, handleOnChange =()=>{}, updateModalButtonState = () => { }}) => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [holidaysStateValue, setHolidaysState] = useRecoilState(Holidays);
    console.log("確認holidaysStateValue", holidaysStateValue)
    const range = (from, to, step) => [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);
    ;
        const amountRange = range(5000, 15000, 100);
        const unitRange = range(0, 5000, 50);
    console.log('formData', formData);
    
    const MAX_LIMIT = 9999999;
    ////////////////////////間宮追加///////////////////////////
    // const initialDate = new Date()
    // registerLocale('ja', ja)

    // const [startDate, setStartDate] = useState(initialDate)

    // const handleChange = (date, e) => {
    //     // console.log("確認date",date)
    //     setStartDate(date)
    // }
    // //　祝日を赤くする
    // const holidayClassName = (date, e) => {
    //     console.log("確認date",date)

    //     if (holidaysStateValue.includes(date.getTime())) {
    //         console.log('この日は祝日dateに存在します')
    //         return "isHoliday"
    //       }
    // }
    ////////////////////////mamiya/////////////////////////////

    ///////////////////////////////////////////////////////////

    //  念の為全部閉じる
    function closeModal() {
        setModalState((prevState) => ({
            ...prevState,
            ExpensesModal: false,
            WorksModal: false,
            PaymentRequestModal: false,
            InvoiceModal: false,
            mode: "edit",
            data: {
                name: "",
                id: ''
            }
        }))
    }
/*initialize var*/
    let member_invoice_number_of_visits_30min = parseInt(formData?.member_invoice_number_of_visits_30min);
    let member_invoice_number_of_visits_60min = parseInt(formData?.member_invoice_number_of_visits_60min);
    let member_invoice_number_of_visits_90min = parseInt(formData?.member_invoice_number_of_visits_90min);
    let member_invoice_visit_unit_price_30min = parseInt(formData?.member_invoice_visit_unit_price_30min);
    let member_invoice_visit_unit_price_60min = parseInt(formData?.member_invoice_visit_unit_price_60min);
    let member_invoice_visit_unit_price_90min = parseInt(formData?.member_invoice_visit_unit_price_90min);
    let visitUnitPrice30 = parseInt(formData?.member_invoice_total_price_30min??0);
    let visitUnitPrice60 = parseInt(formData?.member_invoice_total_price_60min??0);
    let visitUnitPrice90 = parseInt(formData?.member_invoice_total_price_90min??0);
    let member_invoice_number_of_travel_used = parseInt(formData?.member_invoice_number_of_travel_used);
    let member_invoice_travel_expenses = parseInt(formData?.member_invoice_travel_expenses??0);
    let member_invoice_transport_unit_priceTotal = parseInt(formData?.member_invoice_total_travel_expenses??0);
    let rehabilationTotal = parseInt(formData?.member_invoice_rehabilitation_price??0);
    let totalAmount = parseInt(formData?.member_invoice_total_payment??0);
    const inv_status = formData?.member_invoice_status;
    // let member_invoice_receipt_datetime = parseInt(formData?.member_invoice_receipt_datetime);
    let member_invoice_receipt_datetime = formData?.member_invoice_receipt_datetime;
console.log("💦💦💦💦💦💦💦💦💦💦💦💦💦💦💦", member_invoice_receipt_datetime)

    /*initialize var*/
    let labelClass = "text-black font-bold text-base pt-2 px-1 block flex";
    let h3Class = "border-l-8 border-arrow-green text-lg font-bold leading-6 text-black text-left py-2 px-2 flex";
    let blockClass = "w-full py-4";
    let gridTemplateColumns = { gridTemplateColumns: 'minmax(8rem,auto) 3.5rem 3.5rem 6rem 6rem 6rem' };
    return (
        <div id="modal-body" className="flex flex-col bg-white md:min-h-[320px] sm:min-h-[180px] min-h-[120px]">
            <Formik
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            initialValues={formData}
                >
                    
                <Form>
            <div className={`${blockClass}`}>
                <h3 className={`${h3Class}`}>管理者調整項目</h3>

            {/* <TextBox label="立替金"
                labelClassName={labelClass}
                inputClassName='w-full'
                name='member_invoice_advance_amount'
                        onBlur={(e) => handleOnChange(e)}
                        placeholder='金額を入力してください'
                        defaultValue={parseInt(formData.member_invoice_advance_amount).toLocaleString()}
                type="text" /> */}
                         <InputContainer className={`amount-input`}>
<label data-id="labelClass" for="" className={`${labelClass}`}>立替金</label>
<NumericFormat isAllowed={(values) => {
    const { floatValue, value } = values;
    console.log('inv_status',inv_status);
    console.log('values',values);
    console.log('floatValue', value.length)
    if (Math.sign(floatValue) === -1) {
        return value.length < 9;
    } else {
        return value.length < 8;
    }
  }} className='w-full text-right' disabled={formData?.member_invoice_status==2} name='member_invoice_advance_amount' onBlur={(e) => handleOnChange(e,formData)} placeholder='' value={parseInt(formData.member_invoice_advance_amount)} allowLeadingZeros={false} allowNegative thousandSeparator="," />
</InputContainer>
                {/* <TextBox label="管理者入力調整額"
                            labelClassName={labelClass}
                            isRequired={true}
                            requiredText={`(税込)`}
                    inputClassName='w-full'
                    name='member_invoice_adjustment_amount'
                    onBlur={(e) => handleOnChange(e)}
                    placeholder='管理者入力調整額を入力してください'
                    type="number" /> */}
                        <InputContainer className={`amount-input`}>
<label data-id="labelClass" for="" className={`${labelClass}`}>管理者入力調整額<p className="font-normal text-sm my-auto">(税込)</p></label>
                        <NumericFormat isAllowed={(values) => {
                            const { floatValue,value } = values;
                            console.log('values',values);
                            console.log('floatValue', value.length)
                            if (Math.sign(floatValue) === -1) {
                                return value.length < 9;
                            } else {
                                return value.length < 8;
                            }
   // return floatValue < MAX_LIMIT;
  }} className='w-full text-right' disabled={formData?.member_invoice_status==2} name='member_invoice_adjustment_amount' onBlur={(e) => handleOnChange(e,formData)} placeholder='' value={parseInt(formData.member_invoice_adjustment_amount)} allowLeadingZeros={false} allowNegative thousandSeparator="," />
</InputContainer>
                
                <label data-id="labelClass" for="" className={`${labelClass}`}>領収日</label>
                    {/* <FinancialAdminDatePicker name={`member_invoice_receipt_datetime`} value={ formData?.member_invoice_receipt_datetime } /> */}
                    <FinancialAdminDatePicker name={`member_invoice_receipt_datetime`} value={ member_invoice_receipt_datetime } updateModalButtonState={updateModalButtonState} />
                {/* ///////////////////////間宮DatPicker追加////////////////////// */}
                {/* <div class="fake-input">
                  
                <img src="/calendar-icon.png" width="25"/>
                
                <DatePicker
                    type="date" id="" className="w-full cursor-pointer" aria-label="" name="" defaultValue=""
                    locale="ja"
                    dateFormatCalendar="yyyy年 MM月"
                    dateFormat="yyyy年MM月dd日(E)"
                    selected={startDate}
                    onChange={handleChange}
                    onFocus={e => e.target.blur()}
                    dayClassName={holidayClassName}
                />            
                </div> */}

            </div>



            <div className={`${blockClass}`}>
                <h3 className={`${h3Class}`}>訪問会員様設定<p className="font-normal text-sm my-auto">(アーカイブ済みの請求には影響しません)</p></h3>
                <SelectBox
                    label={`30分単価`}
                    name={`member_invoice_visit_unit_price_30min`}
                    labelClassName={`${labelClass}`}
                    inputClassName={`w-full text-right bg-arrow-bg-used ${formData?.member_invoice_status==2?'cursor-default':'cursor-pointer'}`}
                    onChange={(e) => handleOnChange(e, formData)}
                    disabled={formData?.member_invoice_status==2}
                >
                    {amountRange.map((n,i) => (
                        <option key={i} value={n}>
                            {n.toLocaleString()}
                        </option>
                    ))}
                </SelectBox>
                <SelectBox
                    label={`60分単価`}
                    isRequired={true}
                    requiredText={`(90分単価は1.5倍)`}
                    name={`member_invoice_visit_unit_price_60min`}
                    labelClassName={`${labelClass}`}
                    inputClassName={`w-full text-right bg-arrow-bg-used ${formData?.member_invoice_status==2?'cursor-default':'cursor-pointer'}`}
                    onChange={(e) => handleOnChange(e, formData)}
                    disabled={formData?.member_invoice_status==2}
                >
                    {amountRange.map((n,i) => (
                        <option key={i} value={n}>
                            {n.toLocaleString()}
                        </option>
                    ))}
                </SelectBox>
                        
                <SelectBox
                    label={`出張交通費`}
                    name={`member_invoice_travel_expenses`}
                    labelClassName={`${labelClass}`}
                    inputClassName={`w-full text-right bg-arrow-bg-used ${formData?.member_invoice_status==2?'cursor-default':'cursor-pointer'}`}
                    onChange={(e) => handleOnChange(e, formData)}
                    disabled={formData?.member_invoice_status==2}
                >
                    {unitRange.map((n,i) => (
                        <option key={i} value={n}>
                            {n.toLocaleString()}
                        </option>
                    ))}
                </SelectBox>

                <SelectBox
                //////////////////////////////////////////////////////////////
                    label={`お支払い方法`} 
                    isRequired={true}
                    requiredText={`(変更すると領収日がリセットされます)`}
                    name={`member_invoice_payment_method`}
                    labelClassName={`${labelClass}`}
                    inputClassName={`w-full bg-arrow-bg-used ${formData?.member_invoice_status==2?'cursor-default':'cursor-pointer'}`}
                    onChange={handleOnChange}
                    disabled={formData?.member_invoice_status==2}
                    // onChange={(e) => handleOnChange(e)}
                    // onChange={handleOnChangePaymentMethod}
                >
                    <option value="1" hidden="">銀行振込</option>
                    <option value="2" hidden="">口座引落</option>
                </SelectBox>
                

            </div>
            <div className={`${blockClass}`}>
                <h3 className={`${h3Class}`}>リハビリテーション料金</h3>
                <div className="mt-2 divide-x divide-slate-400 grid border-2 border-black" style={gridTemplateColumns}>
                    <div className="bg-arrow-blue-header text-white text-center font-bold 品目 ">品目</div>
                    <div className="bg-arrow-blue-header text-white text-center font-bold 数量 ">数量</div>
                    <div className="bg-arrow-blue-header text-white text-center font-bold 単位 ">単位</div>
                    <div className="bg-arrow-blue-header text-white text-center font-bold 税込単価 ">税込単価</div>
                    <div className="bg-arrow-blue-header text-white text-center font-bold col-span-2 税込合計 ">税込合計</div>


                    <div className="bg-arrow-gray-odd py-1 px-1 品目">30分</div>
                    <div className="bg-arrow-gray-odd py-1 px-1 数量 font-DroidSans text-center">{member_invoice_number_of_visits_30min}</div>
                    <div className="bg-arrow-gray-odd py-1 px-1 単位 text-center">回</div>
                    <div className="bg-arrow-gray-odd py-1 px-1 税込単価 currency font-DroidSans">¥ {member_invoice_visit_unit_price_30min.toLocaleString()}</div>
                    <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans col-span-2">¥ {visitUnitPrice30.toLocaleString()}</div>



                    <div className="bg-arrow-gray-even py-1 px-1 品目">60分</div>
                    <div className="bg-arrow-gray-even py-1 px-1 数量 font-DroidSans text-center">{member_invoice_number_of_visits_60min}</div>
                    <div className="bg-arrow-gray-even py-1 px-1 単位 text-center">回</div>
                    <div className="bg-arrow-gray-even py-1 px-1 税込単価 currency font-DroidSans">¥ {member_invoice_visit_unit_price_60min.toLocaleString()}</div>
                    <div className="bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans col-span-2">¥ {visitUnitPrice60.toLocaleString()}</div>


                    <div className="bg-arrow-gray-odd py-1 px-1 品目">90分</div>
                    <div className="bg-arrow-gray-odd py-1 px-1 数量 font-DroidSans text-center">{member_invoice_number_of_visits_90min}</div>
                    <div className="bg-arrow-gray-odd py-1 px-1 単位 text-center">回</div>
                    <div className="bg-arrow-gray-odd py-1 px-1 税込単価 currency font-DroidSans">¥ {member_invoice_visit_unit_price_90min.toLocaleString()}</div>
                    <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans col-span-2">¥ {visitUnitPrice90.toLocaleString()}</div>

                </div>
            </div>

            <div className={`${blockClass}`}>
                <h3 className={`${h3Class}`}>出張交通費</h3>
                <div className="mt-2 divide-x divide-slate-400 grid border-2 border-black" style={gridTemplateColumns}>
                    <div className="bg-arrow-blue-header text-white text-center font-bold 品目 ">品目</div>
                    <div className="bg-arrow-blue-header text-white text-center font-bold 数量 ">数量</div>
                    <div className="bg-arrow-blue-header text-white text-center font-bold 単位 ">単位</div>
                    <div className="bg-arrow-blue-header text-white text-center font-bold 税込単価 ">税込単価</div>
                    <div className="bg-arrow-blue-header text-white text-center font-bold col-span-2 税込合計 ">税込合計</div>


                    <div className="bg-arrow-gray-odd py-1 px-1 品目">出張交通費</div>
                    <div className="bg-arrow-gray-odd py-1 px-1 数量 font-DroidSans text-center">{member_invoice_number_of_travel_used}</div>
                    <div className="bg-arrow-gray-odd py-1 px-1 単位 text-center">回</div>
                    <div className="bg-arrow-gray-odd py-1 px-1 税込単価 currency font-DroidSans">¥ {member_invoice_travel_expenses.toLocaleString()}</div>
                    <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans col-span-2">¥ {member_invoice_transport_unit_priceTotal.toLocaleString()}</div>
                </div>
            </div>



            <div className={`${blockClass}`}>
                <h3 className={`${h3Class}`}>集計</h3>
                <div className="mt-2 divide-x divide-slate-400 grid border-2 border-black" style={gridTemplateColumns}>
                    <div className="bg-arrow-blue-header text-white text-center font-bold 品目 col-span-4">科目</div>
                    <div className="bg-arrow-blue-header text-white text-center font-bold 税込合計 col-span-2">合計</div>

                    <div className="bg-arrow-gray-odd py-1 px-1 品目 col-span-4">リハビリテーション料金</div>
                            <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans col-span-2">¥ { rehabilationTotal.toLocaleString()}</div>

                    <div className="bg-arrow-gray-even py-1 px-1 品目 col-span-4">出張交通費</div>
                            <div className="bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans col-span-2">¥ { member_invoice_transport_unit_priceTotal.toLocaleString()}</div>

                    <div className="bg-arrow-gray-odd py-1 px-1 品目 col-span-4">立替金</div>
                            <div className={`bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans ${formData?.member_invoice_advance_amount && Math.sign(formData?.member_invoice_advance_amount)===-1?'text-red-600':''} col-span-2`}>¥ { parseInt(formData?.member_invoice_advance_amount==''?0:formData?.member_invoice_advance_amount).toLocaleString()}</div>

                    <div className="bg-arrow-gray-even py-1 px-1 品目 col-span-4">管理者入力調整額</div>
                            <div className={`bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans ${formData?.member_invoice_adjustment_amount && Math.sign(formData?.member_invoice_adjustment_amount)===-1?'text-red-600':''} col-span-2`}>¥ { parseInt(formData?.member_invoice_adjustment_amount==''?0:formData?.member_invoice_adjustment_amount).toLocaleString()}</div>

                </div>
            </div>
            <div className={`${blockClass}`}>
                <div className="my-4 grid border-b-2 border-black text-4xl font-bold" style={gridTemplateColumns}>
                    <div className=" text-black text-left 品目 col-span-2 pl-8">合計請求額</div>
                            <div className=" text-black text-right 税込合計 col-span-4 currency font-DroidSans pr-8">¥ { totalAmount.toLocaleString()}</div>
                </div>
            </div>
            <div className={`${blockClass}`}>
                <h3 className={`${h3Class}`}>メモ</h3>
                    <div className="mt-2 ">
                        <Note 
                            inputClassName='w-full resize-none text-justify'
                            name='member_invoice_memo'
                                onBlur={(e) => handleOnChange(e)}
                                disabled={formData?.member_invoice_status==2}
                            placeholder='メモを入力してください'
                            rows="8" cols="33"
                            type="textarea" /> 
                   
                    </div>
            </div>


            </Form></Formik>

        </div>
    );
}

export default InvoiceModalBody;