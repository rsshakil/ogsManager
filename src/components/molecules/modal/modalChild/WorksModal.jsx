import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../../../store/modalState";
import { Form, Formik } from "formik";
import SelectBox from "../../../Form/FormInputs/SelectBox";
import TextBox from "../../../Form/FormInputs/TextBox";
import InputContainer from "../../../Form/FormInputs/InputContainer";
import Note from "../../../Form/FormInputs/Note";
import { NumericFormat } from 'react-number-format';




const WorksModalBody = ({formData, handleOnChange =()=>{}}) => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    //  念の為全部閉じる
    function closeModal() {
        setModalState((prevState) => ({
            ...prevState,
            ExpensesModal: false,
            WorksModal: false,
            PaymentRequestModal: false,
            InvoiceModal: false,
            mode: "edit",
            data: {}


        }))
    }
    const MAX_LIMIT = 9999999;

    const bgColor = formData.business_status==1? "bg-arrow-bg-used" : "bg-arrow-bg-stop";
    ///////////////////////////////////    間宮追加    /////////////////////////





    //  値が渡って来ればそのアイテムの編集
    let labelClass = "text-black font-bold text-base pt-2 px-1 block flex";
    let blockClass = "w-full py-4";
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

                        <TextBox label="業務名"
                            labelClassName={labelClass}
                            isRequired={true}
                            requiredText={`(必須)`}
                            inputClassName='w-full'
                            name='business_name'
                            onBlur={(e) => handleOnChange(e)}
                            placeholder='業務名を入力してください'
                            maxLength="32" 
                            type="text" />

                        <TextBox label="フリガナ"
                            labelClassName={labelClass}
                            isRequired={true}
                            requiredText={`※並び順に影響します(空欄 > 記号 > 数字 > 英字 > かな > カナ の順に並びます)`}
                            inputClassName='w-full'
                            name='business_name_kana'
                            onBlur={(e) => handleOnChange(e)}
                            placeholder='フリガナを入力してください'
                            maxLength="32" 
                            type="text" />
                    {/* <InputContainer className={`amount-input`}>
                        <TextBox label="60分単価"
                            labelClassName={labelClass}
                            isRequired={true}
                            requiredText={`(税抜)`}
                            inputClassName='w-full text-right'
                            name='business_unit_price'
                            onBlur={(e) => handleOnChange(e)}
                            placeholder='60分単価を入力してください'
                            min="0" 
                            max="9999999" 
                            onInput={(e) => (e.target.value = e.target.value.slice(0, 7))} 
                            type="number" />
                    </InputContainer> */}
                        <InputContainer className={`amount-input`}>
                        <label data-id="labelClass" for="" className={`${labelClass}`}>60分単価<p className="font-normal text-sm my-auto">(税込)</p></label>
<NumericFormat isAllowed={(values) => {
    const { floatValue,value } = values;
    console.log('values',values);
    console.log('floatValue', value.length)
    if (Math.sign(floatValue) === -1) {
        return value.length < 9;
    } else {
        return value.length < 8;
    }
  }} className='w-full text-right' name='business_unit_price' onBlur={(e) => handleOnChange(e)} placeholder='' value={parseInt(formData.business_unit_price)} allowLeadingZeros={false} allowNegative={false} thousandSeparator="," />
                        </InputContainer>
                            <SelectBox
                                label={"状態"}
                                labelClassName={labelClass}
                                inputClassName={`w-full cursor-pointer content ${bgColor}`}
                                name='business_status'
                                onChange={(e) => handleOnChange(e)}>
                                    <option value="1">使用中</option>
                                    <option value="2">停止中</option>
                        </SelectBox>

                        <TextBox label="最終更新日時"
                            labelClassName={labelClass}
                            inputClassName='w-full bg-arrow-bg-readonly'
                            name='business_update'
                            disabled
                            type="text" />


            </div>





            <div className={`${blockClass}`}>
                
                        <Note label="メモ"
                            labelClassName={labelClass}
                            inputClassName='w-full resize-none text-justify'
                            name='business_memo'
                            onBlur={(e) => handleOnChange(e)}
                            placeholder='メモを入力してください'
                            rows="8" cols="33"
                            type="textarea" />        

            </div>

                </Form>
                </Formik>


        </div>
    );
}

export default WorksModalBody;