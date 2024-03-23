import React, { useRef, useState, useEffect, Suspense } from "react";

import { Form, Formik } from 'formik';
import _ from 'lodash';
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../../../store/modalState";
import { displayState } from "../../../../store/displayState";
import { NumericFormat } from 'react-number-format';
import InputContainer from "../../../Form/FormInputs/InputContainer";

import SelectBox from "../../../Form/FormInputs/SelectBox";
import TextBox from "../../../Form/FormInputs/TextBox";
import Note from "../../../Form/FormInputs/Note";
import { GiConsoleController } from "react-icons/gi";
import { MenuButtonSub } from "../../../atoms/buttons/MenuButtonSub";
import Download from "../../../atoms/img/Download.svg";
///////////////////////間宮////////////////////////
import { useNavigate } from "react-router-dom";
import http from '../../../../../src/restapi/httpService';


const PaymentRequestModalBody = ({ formData, handleOnChange = () => { }, updateModalButtonState = () => { } }) => {

  const [isDropDownDissable, setIsDropDownDissable] = useState(false);
  const [invoiceStatusOptions, setInvoiceStatusOptions] = useState([
      { value: 1, text: '未請求' },
      { value: 2, text: '管理者承認待ち' },
      { value: 3, text: '管理者承認済み' }
  ]);
  const [modalStateValue, setModalState] = useRecoilState(modalState);
  const [displayStateValue, setDisplayState] = useRecoilState(displayState);
  const range = (from, to, step) => [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);
  ;

  const amountRange = range(0, 10000, 100);
  const MAX_LIMIT = 9999999;
  let indexOfExpenses = 0;
  let indexOfBuiness = 0;
  console.log('formData', formData);
  useEffect(() => {
    // Disable form fields
    const disabledStatus = [3,4];
    setIsDropDownDissable(disabledStatus.includes(formData.therapist_invoice_status) ? true : false)
    console.log('isDropDownDissable', isDropDownDissable);

    if (formData.therapist_invoice_status == 4) {
      setInvoiceStatusOptions([
        { value: 1, text: '未請求' },
        { value: 2, text: '管理者承認待ち' },
        { value: 3, text: '管理者承認済み' },
        { value: 4, text: '請求期限切れ' }
      ]);
    }
  }, [])
  console.log('isDropDownDissableisDropDownDissable', isDropDownDissable);
  updateModalButtonState(isDropDownDissable)

  let rehabilationSumationTotal = parseInt(formData?.therapist_invoice_total_visit_price_excluding_tax) + parseInt(formData?.therapist_invoice_total_intervention_price_excluding_tax);
  let adjustmentMoney = parseInt(formData?.therapist_invoice_adjustment_amount_including_tax==''?0:formData?.therapist_invoice_adjustment_amount_including_tax);
  let businessTotalSouceTaxTotal = {
    "businessTotal": 0,
    "businessSourceTaxTotal": 0,
  }
  let expensesTotalSourceTaxTotal = {
    "totalExpenses": 0,
    "totalExpensesSourceTax": 0,
  }
  formData?.businessItemList && formData?.businessItemList.length > 0 && formData?.businessItemList.reduce((sum, businessItem) => {

    businessTotalSouceTaxTotal["businessTotal"] += parseInt(businessItem?.therapist_business_total_price_excluding_tax);
    businessTotalSouceTaxTotal["businessSourceTaxTotal"] += parseInt(businessItem?.therapist_business_total_price_including_tax) - parseInt(businessItem?.therapist_business_total_price_excluding_tax);
    return sum;
  }, businessTotalSouceTaxTotal);
  console.log('businessTotalSouceTaxTotal', businessTotalSouceTaxTotal);
  formData?.expensesItemList && formData?.expensesItemList.length > 0 && formData?.expensesItemList.reduce((sum, expenseItem) => {

    expensesTotalSourceTaxTotal["totalExpenses"] += parseInt(expenseItem?.expensesPriceExcludingTax);
    expensesTotalSourceTaxTotal["totalExpensesSourceTax"] += parseInt(expenseItem?.expensesPrice) - parseInt(expenseItem?.expensesPriceExcludingTax);
    return sum;

  }, expensesTotalSourceTaxTotal);
  console.log('totalExpenses', expensesTotalSourceTaxTotal);
  let totalExpenses = expensesTotalSourceTaxTotal?.totalExpenses ?? 0;
  let businessTotal = businessTotalSouceTaxTotal?.businessTotal ?? 0;

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

  /////////////////間宮////////////////
  // const navigate = useNavigate();

  function convertDateTimeYearMonth(timestamp) {
    timestamp = timestamp.toString();
    return timestamp.substring(0, 4) + "年" + timestamp.substring(4) + "月";
  }
  function getCurrentDateTime() {
    const date = new Date();
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Tokyo'
    };
    const dateTimeString = date.toLocaleString('ja-JP', options);
    return dateTimeString.replace(/\//g, '-');
  }

  async function downloadCSV(apiUrl) {
    //console.log('pageParam', displayStateValue?.pageParam);
    //console.log('formData', formData);
    console.log('apiUrl', apiUrl);
    let expenseItemCount = 0;
    formData?.expensesItemList && formData?.expensesItemList.length > 0 && formData?.expensesItemList.map((expenseItem) => {
      if (expenseItem?.expensesPriceExcludingTax != 0) {
        expenseItemCount++
      }
    });
    if (expenseItemCount < 1) {
      alert('経費なしのためダウンロードできませんでした');
      return;
    }

    try {
      //  setLoading(true);
      const response = await http.get('/' + apiUrl + '/' + formData.therapist_invoice_id);
      console.log("😢😢😢😢😢😢😢response", response);
      if (response) {
        console.log('API typeof',typeof response.data.csvData);
        console.log('API success',response.data.csvData);
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(response.data.csvData);
        hiddenElement.target = '_blank';

        //provide the name for the CSV file to be downloaded
        hiddenElement.download = `${convertDateTimeYearMonth(displayStateValue.pageParam)}期_セラピスト_${formData.therapist_invoice_therapist_name}様請求一覧_${getCurrentDateTime()}.csv`;
        hiddenElement.click();
      }
      //setLoading(false);
    } catch (err) {
      //error not implemented yet
      console.log('😢😢😢😢😢😢😢Field err', err);
    } finally {
      // processing.current = false;
      //setLoading(false);
    }
  }



  let labelClass = "text-black font-bold text-base pt-2 px-1 block flex";
  let h3Class = "border-l-8 border-arrow-green text-lg font-bold leading-6 text-black text-left py-2 px-2 flex";
  let blockClass = "w-full py-4";
  let gridTemplateColumns = { gridTemplateColumns: 'minmax(8rem,auto) 3.5rem 3.5rem 6rem 6rem 6rem' };
  return (
    <>
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

              <SelectBox
                label={`請求ステータス`}
                name={`therapist_invoice_status`}
                labelClassName={`${labelClass}`}
                inputClassName={`w-full bg-arrow-bg-used ${isDropDownDissable?'cursor-default':'cursor-pointer'}`}
                onChange={handleOnChange}
                disabled={isDropDownDissable}
              >
                {
                  invoiceStatusOptions.map(option => (
                    <option value={option.value}>{option.text}</option>
                  ))
                }
              </SelectBox>


              <InputContainer className={`amount-input`}>
                <label data-id="labelClass " for="" className={`${labelClass}`}>管理者入力調整額<p className="font-normal text-sm my-auto">(税込)</p></label>
                <NumericFormat isAllowed={(values) => {

                  const { floatValue, value, formattedValue } = values;
                  console.log('floatValue', floatValue);
                  console.log('value', value);
                  console.log('values', values);
                  console.log('floatValue', value.length)

                  if (Math.sign(floatValue) === -1) {
                    return value.length < 9;
                  } else {
                    return value.length < 8;
                  }
                }} className='w-full text-right' disabled={isDropDownDissable} name='therapist_invoice_adjustment_amount_including_tax' onBlur={(e) => handleOnChange(e, formData)} placeholder='' value={parseInt(formData.therapist_invoice_adjustment_amount_including_tax)} allowLeadingZeros={false} thousandSeparator="," />

              </InputContainer>


            </div>
            <div className={`${blockClass}`}>
              <h3 className={`${h3Class}`}>セラピスト単価設定<p className="font-normal text-sm my-auto">(アーカイブ済みの請求には影響しません)</p></h3>

              <SelectBox
                label={`加算単価`}
                isRequired={true}
                requiredText={`(税込)`}
                name={`therapist_invoice_visit_unit_price_including_tax`}
                labelClassName={`${labelClass}`}
                inputClassName={`w-full text-right bg-arrow-bg-used ${isDropDownDissable?'cursor-default':'cursor-pointer'}`}
                onChange={(e) => handleOnChange(e, formData)}
                disabled={isDropDownDissable}
              >
                {amountRange.map((n, i) => (
                  <option key={i} value={n}>
                    {n.toLocaleString()}
                  </option>
                ))}
              </SelectBox>

              <SelectBox
                label={`リハビリ介入単価`}
                isRequired={true}
                requiredText={`(税込)`}
                name={`therapist_invoice_intervention_unit_price_including_tax`}
                labelClassName={`${labelClass}`}
                inputClassName={`w-full text-right bg-arrow-bg-used ${isDropDownDissable?'cursor-default':'cursor-pointer'}`}
                onChange={(e) => handleOnChange(e, formData)}
                disabled={isDropDownDissable}
              >
                {amountRange.map((n, i) => (
                  <option key={i} value={n}>
                    {n.toLocaleString()}
                  </option>
                ))}
              </SelectBox>

            </div>
            <div className={`${blockClass}`}>
              <h3 className={`${h3Class}`}>セラピスト基本設定<p className="font-normal text-sm my-auto">(アーカイブ済みの請求には影響しません)</p></h3>

              <TextBox label="登録番号"
                labelClassName={labelClass}
                inputClassName='w-full'
                name='therapist_invoice_invoice_number'
                onBlur={(e) => handleOnChange(e)}
                placeholder='登録番号を入力してください'
                maxLength="20"
                disabled={isDropDownDissable}
                type="text" />

              <TextBox label="銀行名"
                labelClassName={labelClass}
                inputClassName='w-full'
                name='therapist_invoice_bank_name'
                onBlur={(e) => handleOnChange(e)}
                placeholder='銀行名を入力してください'
                maxLength="20"
                disabled={isDropDownDissable}
                type="text" />

              <TextBox label="支店名"
                labelClassName={labelClass}
                inputClassName='w-full'
                name='therapist_invoice_bank_branch_name'
                onBlur={(e) => handleOnChange(e)}
                placeholder='支店名を入力してください'
                maxLength="20"
                disabled={isDropDownDissable}
                type="text" />

              <SelectBox
                label={`口座種別`}
                name={`therapist_invoice_bank_account_type`}
                labelClassName={`${labelClass}`}
                inputClassName={`w-full bg-arrow-bg-used ${isDropDownDissable?'cursor-default':'cursor-pointer'}`}
                onChange={handleOnChange}
                disabled={isDropDownDissable}
              >
                <option value="1" hidden="">普通</option>
                <option value="2" hidden="">当座</option>
                <option value="3" hidden="">貯蓄</option>
              </SelectBox>


              <TextBox label="口座番号"
                labelClassName={labelClass}
                inputClassName='w-full'
                name='therapist_invoice_bank_account_number'
                onBlur={(e) => handleOnChange(e)}
                placeholder='口座番号を入力してください'
                min="0"
                onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                disabled={isDropDownDissable}
                type="number" />

              <TextBox label="口座名義"
                labelClassName={labelClass}
                inputClassName='w-full'
                name='therapist_invoice_bank_account_holder'
                onBlur={(e) => handleOnChange(e)}
                placeholder='口座名義を入力してください'
                maxLength="32"
                disabled={isDropDownDissable}
                type="text" />


            </div>
            <div className={`${blockClass}`}>
              <h3 className={`${h3Class}`}>リハビリテーション報酬</h3>
              <div className="mt-2 divide-x divide-slate-400 grid border-2 border-black" style={gridTemplateColumns}>
                <div className="bg-arrow-blue-header text-white text-center font-bold 品目 ">品目</div>
                <div className="bg-arrow-blue-header text-white text-center font-bold 数量 ">数量</div>
                <div className="bg-arrow-blue-header text-white text-center font-bold 単位 ">単位</div>
                <div className="bg-arrow-blue-header text-white text-center font-bold 単価 ">単価</div>
                <div className="bg-arrow-blue-header text-white text-center font-bold col-span-2 合計 ">合計</div>

                <div className="bg-arrow-gray-odd px-1 品目 text-left items-center grid">加算件数</div>
                <div className="bg-arrow-gray-odd px-1 数量 font-DroidSans text-center items-center grid">{formData?.therapist_invoice_number_of_visits}</div>
                <div className="bg-arrow-gray-odd px-1 単位 text-center items-center grid">件</div>
                <div className="">
                  <div className="bg-arrow-gray-odd px-1 単価 currency font-DroidSans">¥ {parseInt(formData?.therapist_invoice_visit_unit_price_including_tax).toLocaleString()}</div>
                  <div className="bg-arrow-gray-odd px-1 単価 currency font-DroidSans">¥ {parseInt(formData?.therapist_invoice_visit_unit_price_excluding_tax).toLocaleString()}</div>
                </div>
                <div className="col-span-2">
                  <div className="bg-arrow-gray-odd px-1 合計 currency font-DroidSans ">¥ {parseInt(formData?.therapist_invoice_total_visit_price_including_tax).toLocaleString()}</div>
                  <div className="bg-arrow-gray-odd px-1 合計 currency font-DroidSans ">¥ {parseInt(formData?.therapist_invoice_total_visit_price_excluding_tax).toLocaleString()}</div>
                </div>

                <div className="bg-arrow-gray-even  px-1 品目 text-left items-center grid">リハビリ介入報酬</div>
                <div className="bg-arrow-gray-even  px-1 数量 font-DroidSans text-center items-center grid">{formData?.therapist_invoice_rehabilitation_time}</div>
                <div className="bg-arrow-gray-even  px-1 単位 text-center items-center grid">時間</div>
                <div className="">
                  <div className="bg-arrow-gray-even px-1 単価 currency font-DroidSans">¥ {parseInt(formData?.therapist_invoice_intervention_unit_price_including_tax).toLocaleString()}</div>
                  <div className="bg-arrow-gray-even px-1 単価 currency font-DroidSans">¥ {parseInt(formData?.therapist_invoice_intervention_unit_price_excluding_tax).toLocaleString()}</div>
                </div>
                <div className="col-span-2">
                  <div className="bg-arrow-gray-even px-1 合計 currency font-DroidSans ">¥ {parseInt(formData?.therapist_invoice_total_intervention_price_including_tax).toLocaleString()}</div>
                  <div className="bg-arrow-gray-even px-1 合計 currency font-DroidSans ">¥ {parseInt(formData?.therapist_invoice_total_intervention_price_excluding_tax).toLocaleString()}</div>
                </div>

              </div>
            </div>
            <div className={`${blockClass}`}>
              <h3 className={`${h3Class}`}>その他業務</h3>
              <div className="mt-2 divide-x divide-slate-400 grid border-2 border-black" style={gridTemplateColumns}>
                <div className="bg-arrow-blue-header text-white text-center font-bold 品目 ">品目</div>
                <div className="bg-arrow-blue-header text-white text-center font-bold 数量 ">数量</div>
                <div className="bg-arrow-blue-header text-white text-center font-bold 単位 ">単位</div>
                <div className="bg-arrow-blue-header text-white text-center font-bold 単価 ">単価</div>
                <div className="bg-arrow-blue-header text-white text-center font-bold col-span-2 合計 ">合計</div>

                {formData?.businessItemList && formData?.businessItemList.length > 0 && formData?.businessItemList.map((businessItem, i) => {
                  let scheduleCourseCalc = businessItem?.businessCourse;
                  if (scheduleCourseCalc > 0) {
                    indexOfBuiness++;

                  return (
                    <>
                      <div className={`bg-arrow-gray-${indexOfBuiness % 2 ? 'odd' : 'even'} px-1 品目 text-left items-center grid`}>{businessItem?.businessName}</div>
                      <div className={`bg-arrow-gray-${indexOfBuiness % 2 ? 'odd' : 'even'} px-1 数量 font-DroidSans text-center items-center grid`}>{scheduleCourseCalc.toFixed(1).replace(/\.0+$/,'')}</div>
                      <div className={`bg-arrow-gray-${indexOfBuiness % 2 ? 'odd' : 'even'} px-1 単位 text-center items-center grid`}>時間</div>

                      <div className="">
                        <div className={`bg-arrow-gray-${indexOfBuiness % 2 ? 'odd' : 'even'} px-1 単価 currency font-DroidSans`}>¥ {parseInt(businessItem?.therapist_business_unit_price_including_tax).toLocaleString()}</div>
                        <div className={`bg-arrow-gray-${indexOfBuiness % 2 ? 'odd' : 'even'} px-1 単価 currency font-DroidSans`}>¥ {parseInt(businessItem?.therapist_business_unit_price_excluding_tax).toLocaleString()}</div>
                      </div>

                      <div className="col-span-2">
                        <div className={`bg-arrow-gray-${indexOfBuiness % 2 ? 'odd' : 'even'} px-1 合計 currency font-DroidSans`}>¥ {parseInt(businessItem?.therapist_business_total_price_including_tax).toLocaleString()}</div>
                        <div className={`bg-arrow-gray-${indexOfBuiness % 2 ? 'odd' : 'even'} px-1 合計 currency font-DroidSans`}>¥ {parseInt(businessItem?.therapist_business_total_price_excluding_tax).toLocaleString()}</div>
                      </div>
                      </>)
                    }
                })}


              </div>
            </div>

            <div className={`${blockClass}`}>
              <div className="flex justify-between">
                <h3 className={`${h3Class}`}>経費</h3>



                {/* //////////////////////////間宮///////////////////////// */}
                <MenuButtonSub className="flex-none" type="modal" pathname='' icon={Download} onClick={() => downloadCSV("therapist-expenses-csv-download")}>CSV</MenuButtonSub>




              </div>

              <div className="mt-2 divide-x divide-slate-400 grid border-2 border-black" style={gridTemplateColumns}>
                <div className="bg-arrow-blue-header text-white text-center font-bold 品目 col-span-4">品目</div>
                <div className="bg-arrow-blue-header text-white text-center font-bold 合計 col-span-2">合計</div>
                {
                
                  formData?.expensesItemList && formData?.expensesItemList.length > 0 && formData?.expensesItemList.map((expenseItem, i) => {
                    if (expenseItem?.expensesPriceExcludingTax != 0) {
                      indexOfExpenses++;
                  return (
                    <>
                      <div className={`bg-arrow-gray-${indexOfExpenses % 2 ? 'odd' : 'even'} py-1 px-1 品目 col-span-4 text-left items-center grid`}>{expenseItem?.expensesName}</div>

                      <div className="col-span-2">
                        <div className={`bg-arrow-gray-${indexOfExpenses % 2 ? 'odd' : 'even'} px-1 税抜合計 currency font-DroidSans `}>¥ {parseInt(expenseItem?.expensesPrice).toLocaleString()}</div>
                        <div className={`bg-arrow-gray-${indexOfExpenses % 2 ? 'odd' : 'even'} px-1 税込合計 currency font-DroidSans `}>¥ {parseInt(expenseItem?.expensesPriceExcludingTax).toLocaleString()}</div>
                      </div>
                        </>)
                      
                  }
                })}


              </div>
            </div>

            <div className={`${blockClass}`}>
              <h3 className={`${h3Class}`}>集計</h3>
              <div className="mt-2 divide-x divide-slate-400 grid border-2 border-black" style={gridTemplateColumns}>
                <div className="bg-arrow-blue-header text-white text-center font-bold 品目 col-span-4">科目</div>
                <div className="bg-arrow-blue-header text-white text-center font-bold 税込合計 col-span-2">合計</div>

                <div className="bg-arrow-gray-odd py-1 px-1 品目 col-span-4">リハビリテーション報酬</div>
                <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans col-span-2">¥ {parseInt(rehabilationSumationTotal).toLocaleString()}</div>

                <div className="bg-arrow-gray-even py-1 px-1 品目 col-span-4">その他業務</div>
                <div className="bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans col-span-2">¥ {parseInt(businessTotal).toLocaleString()}</div>

                <div className="bg-arrow-gray-odd py-1 px-1 品目 col-span-4">経費</div>
                <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans col-span-2">¥ {parseInt(totalExpenses).toLocaleString()}</div>

                <div className="bg-arrow-gray-even py-1 px-1 品目 col-span-4">管理者入力調整額</div>
                <div className={`bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans ${adjustmentMoney!=0 && Math.sign(adjustmentMoney)===-1?'text-red-600':''} col-span-2`}>¥ {parseInt(adjustmentMoney).toLocaleString()}</div>

                <div className="bg-arrow-gray-odd py-1 px-1 品目 col-span-4">{`消費税(${formData?.therapist_invoice_consumption_tax_rate}%)`}</div>
                <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans col-span-2">¥ {parseInt(formData?.therapist_invoice_total_consumption_tax ?? 0).toLocaleString()}</div>

                <div className="bg-arrow-gray-even py-1 px-1 品目 col-span-4">源泉所得税</div>
                <div className={`bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans ${formData?.therapist_invoice_withholding_income_tax!=0?'text-red-600':''} col-span-2`}>¥ {Math.sign(formData?.therapist_invoice_withholding_income_tax) === -1 || formData?.therapist_invoice_withholding_income_tax==0?'':'-'}{parseInt(formData?.therapist_invoice_withholding_income_tax ?? 0).toLocaleString()}</div>
              </div>
            </div>
            <div className={`${blockClass}`}>
              <div className="my-4 grid border-b-2 border-black text-4xl font-bold" style={gridTemplateColumns}>
                <div className=" text-black text-left 品目 col-span-2 pl-8">合計請求額</div>
                <div className=" text-black text-right 税込合計 col-span-4 currency font-DroidSans pr-8">¥ {parseInt(formData?.therapist_invoice_total_payment ?? 0).toLocaleString()}</div>
              </div>
            </div>
            <div className={`${blockClass}`}>
              <h3 className={`${h3Class}`}>メモ</h3>
              <div className="mt-2 ">
                <Note
                  inputClassName='w-full resize-none text-justify'
                  name='therapist_invoice_memo'
                  onBlur={(e) => handleOnChange(e)}
                  placeholder='メモを入力してください'
                  rows="8" cols="33"
                  disabled={isDropDownDissable}
                  type="textarea" />
              </div>
            </div>
          </Form></Formik>
      </div>
    </>
  );
}


export default PaymentRequestModalBody;