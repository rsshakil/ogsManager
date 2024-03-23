import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../../../store/modalState";
import { Form, Formik } from "formik";
import SelectBox from "../../../Form/FormInputs/SelectBox";
import TextBox from "../../../Form/FormInputs/TextBox";
import Note from "../../../Form/FormInputs/Note";

const ExpensesModalBody = ({formData, handleOnChange =()=>{}}) => {
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
            data: {
                name: "",
                id: ''
            }
        }))
    }
    
    const bgColor = formData.expenses_status==1? "bg-arrow-bg-used" : "bg-arrow-bg-stop";
    ///////////////////////////////////    間宮追加    /////////////////////////

    console.log('formData',formData);
    //  値が渡って来ればそのアイテムの編集
    let expensesName = modalStateValue.data.name ? modalStateValue.data.name : '新規経費';
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

                        <TextBox label="経費名"
                            labelClassName={labelClass}
                            isRequired={true}
                            requiredText={`(必須)`}
                            inputClassName='w-full'
                            name='expenses_name'
                            onBlur={(e) => handleOnChange(e)}
                            placeholder='経費名を入力してください'
                            maxLength="32" 
                            type="text" />

                        <TextBox label="フリガナ"
                            labelClassName={labelClass}
                            isRequired={true}
                            requiredText={`※並び順に影響します(空欄 > 記号 > 数字 > 英字 > かな > カナ の順に並びます)`}
                            inputClassName='w-full'
                            name='expenses_name_kana'
                            onBlur={(e) => handleOnChange(e)}
                            placeholder='フリガナを入力してください'
                            maxLength="32" 
                            type="text" />
                
            
{/*                         
                        <SelectBox
                                label={"消費税"}
                                labelClassName={labelClass}
                                inputClassName='w-full bg-arrow-bg-used'
                                name='expenses_consumption_tax'
                                onChange={(e) => handleOnChange(e)}>
                                    <option value="1">あり</option>
                                    <option value="0">なし</option>
                        </SelectBox>
                        
                        <SelectBox
                                label={"源泉税"}
                                labelClassName={labelClass}
                                inputClassName='w-full bg-arrow-bg-used'
                                name='expenses_withholding_tax'
                                onChange={(e) => handleOnChange(e)}>
                                    <option value="1">あり</option>
                                    <option value="0">なし</option>
                        </SelectBox> */}
                        
                        <SelectBox
                                label={"状態"}
                                labelClassName={labelClass}
                                inputClassName={`w-full cursor-pointer content ${bgColor}`}
                                name='expenses_status'
                                onChange={(e) => handleOnChange(e)}>
                                    <option value="1">使用中</option>
                                    <option value="2">停止中</option>
                        </SelectBox>

                        <TextBox label="最終更新日時"
                            labelClassName={labelClass}
                            inputClassName='w-full bg-arrow-bg-readonly'
                            name='expenses_update'
                            disabled
                            type="text" />


            </div>





            <div className={`${blockClass}`}>
                
                        <Note label="メモ"
                            labelClassName={labelClass}
                            inputClassName='w-full resize-none text-justify'
                            name='expenses_memo'
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

export default ExpensesModalBody;