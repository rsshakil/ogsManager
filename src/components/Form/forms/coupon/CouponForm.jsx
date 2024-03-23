import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "devextreme-react/button";
import Section from "../../FormInputs/Section"
import FileInput from "../../FormInputs/FileInput";
import SelectBox from "../../FormInputs/SelectBox";
import InputContainer from "../../FormInputs/InputContainer";
import TextBox from "../../FormInputs/TextBox";
import TextAreaInput from "../../FormInputs/TextAreaInput";
import {DateBox} from "devextreme-react";
import NumberBox from "../../FormInputs/NumberBox";
import AddRequiredText from "../../../HelpingComponent/AddRequiredText";
import {unixTimestampToDateFormat} from "../../../../utils/commonFunctions";

const couponStatusOptions = [
    { id: 1, caption: "利用可能" },
    { id: 2, caption: "利用停止" }
];

const dateBoxConfig = {
    acceptCustomValue: false,
    min: new Date(2023, 0, 1),
    max: new Date(2050, 0, 1),
};

export default function CouponForm({ values, clone, setFieldValue, setFormValue, isSubmitting }) {

    const [error, setError] = useState(false);


    // calendar change
    const dateBoxValueChangedHandle = (e, key) => {
        console.log('e.value', e);
        if (typeof e.value !== 'undefined') {
            let dateValues = e.value ? new Date(e.value).getTime() : null;
            setFieldValue(key, dateValues);
        }
    }
    // option change
    const dateBoxOnOptionChanged = (e) => {
        if (e.name === 'text' && e.value !== '') {}
    };

    const displayDateBoxValue = (v,k)=>{
        // console.log('dddddd',v[k]);
        return v[k]?v[k]:null;
    }

    return (
        <>
            <Section caption="基本情報">
                <InputContainer>
                    <div className="space-y-2">
                        <TextBox name="couponName" label="クーポン名（４〜32文字　作成後変更不可）" placeholder="クーポン名を入力してください" inputClassName="w-full"
                            isRequired={true}
                            disabled={!!values.couponId}
                        />
                        <TextBox name="couponCode" label="クーポンコード（8〜64文字　数字、英字小文字、記号はアンダースコア、ハイフン、＃が利用可能　空白不可　作成後変更不可）" placeholder="クーポンコードを入力してください" inputClassName="w-full"
                            isRequired={true}
                            disabled={!!values.couponId}
                        />
                        <SelectBox name="couponStatus" label="利用状態(停止にすると利用できなくなります)" options={couponStatusOptions} valueExpr="id" displayExpr="caption" inputClassName="w-full" isRequired={true} />
                        <InputContainer>
                            <label className="text-blue-100">利用期間(日本時間日時　利用期間外での利用はできません) <AddRequiredText /></label>
                            <div className="flex">
                                <div className="dx-field-value bg-blue-25 border border-blue-100 text-blue-50 ellipsis cursor-pointer devExtreameDateTimePicker cdx-DateBox">
                                    <DateBox
                                        name='couponStartDate'
                                        value={displayDateBoxValue(values,'couponStartDate')}
                                        min={dateBoxConfig.min}
                                        max={dateBoxConfig.max}
                                        acceptCustomValue={dateBoxConfig.acceptCustomValue}
                                        onValueChanged={(e)=>dateBoxValueChangedHandle(e,'couponStartDate')}
                                        placeholder='販売期間始端'
                                        showClearButton={true}
                                        showTodayButton={true}
                                        openOnFieldClick={true}
                                        applyButtonText="OK"
                                        applyValueMode="useButtons"
                                        type="datetime"
                                        onOptionChanged={dateBoxOnOptionChanged}
                                    />
                                </div>

                                <div className="flex-initial w-8 dateBoxSeparator"> 〜 </div>
                                <div className="dx-field-value bg-blue-25 border border-blue-100 text-blue-50 ellipsis cursor-pointer devExtreameDateTimePicker cdx-DateBox">
                                    <DateBox
                                        name='couponEndDate'
                                        value={displayDateBoxValue(values,'couponEndDate')}
                                        min={dateBoxConfig.min}
                                        max={dateBoxConfig.max}
                                        acceptCustomValue={dateBoxConfig.acceptCustomValue}
                                        onValueChanged={(e)=>dateBoxValueChangedHandle(e,'couponEndDate')}
                                        placeholder='販売期間終端'
                                        showClearButton={true}
                                        showTodayButton={true}
                                        openOnFieldClick={true}
                                        applyButtonText="OK"
                                        applyValueMode="useButtons"
                                        type="datetime"
                                        onOptionChanged={dateBoxOnOptionChanged}
                                    />
                                </div>
                            </div>
                        </InputContainer>
                        <NumberBox min="1" max="1000000" name="couponLimitCount" label="利用上限人数(1-1,000,000 無限にしたいときは上限を大きくしてください　上限を超えると利用できません)" inputClassName="w-full" isRequired={true} />
                        <NumberBox min="1" max="1000000" name="couponPoint" label="付与pt数(1-1,000,000)" inputClassName="w-full" isRequired={true} disabled={!!values.couponId} />
                        <NumberBox name="totalUseCount" label="使用数" inputClassName="w-full" disabled />
                        <TextBox disabled value={unixTimestampToDateFormat(values.couponCreatedAt, true)} name="couponCreatedAt" label="登録日時" inputClassName="w-full" />
                        <TextBox disabled value={unixTimestampToDateFormat(values.couponUpdatedAt, true)} name="couponUpdatedAt" label="編集日時" inputClassName="w-full" />
                    </div>
                </InputContainer>
            </Section>

            <div>
                <Button
                    className='w-full mt-20 modal-button'
                    text="保存"
                    type="submit"
                    stylingMode="contained"
                    useSubmitBehavior={true}
                    disabled={isSubmitting}
                />
            </div>
        </>
    )
}