import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "devextreme-react/button";
import Section from "../../FormInputs/Section"
import FileInput from "../../FormInputs/FileInput";
import SelectBox from "../../FormInputs/SelectBox";
import InputContainer from "../../FormInputs/InputContainer";
import TextBox from "../../FormInputs/TextBox";
import TextAreaInput from "../../FormInputs/TextAreaInput";
import TagboxInput from "../../FormInputs/TagboxInput";
import FormikField from "../../FormInputs/FormikField";
import { DateBox } from 'devextreme-react';
import { locale } from 'devextreme/localization';
import TreeListCustom from "../../../shared/TreeListCustom";
import GridListCustom from "../../../shared/GridListCustom";
import DataGrid, {
    Column, RowDragging, Scrolling, Lookup, Sorting,
  } from 'devextreme-react/data-grid';
import { useRecoilState } from "recoil";
import _ from "lodash";
import { v4 as uuid } from 'uuid';
import { AiOutlinePlus,AiOutlineClose,AiFillPlusCircle } from 'react-icons/ai';
import BlockSelectBox from '../../../Form/FormInputs/BlockSelectBox';
import AddRequiredText from "../../../HelpingComponent/AddRequiredText";
import {unixTimestampToDateFormat} from "../../../../utils/commonFunctions";


const gachaStatusOptions = [
    { id: 1, caption: "表示" },
    { id: 2, caption: "非表示" },
    { id: 3, caption: "エラー" },
];

const gachaDirectionIdOptions = [
    { id: 1, caption: "本番" },
    { id: 2, caption: "裏サイト" },
];

const gachaSoldOutFlagOptions = [
    { id: 1, caption: "表示" },
    { id: 0, caption: "非表示" },
];

const gachaViewFlagOptions = [
    { id: 1, caption: "表示" },
    { id: 0, caption: "非表示" },
];

const gachaRemainingDisplayFlagOptions = [
    { id: 1, caption: "表示する" },
    { id: 0, caption: "表示しない" },
];

const gachaCarouselFlagOptions = [
    { id: 0, caption: "表示しない" },
    { id: 1, caption: "表示する" },
];

const itemStatusOptions = [
    { id: 1, caption: "有効" },
    { id: 2, caption: "無効" },
];

export default function ProductForm({ values, clone, setFieldValue, setFormValue, isSubmitting, categories = [], tags = [], genres=[] }) {
    // LOCAL DECLARATION START
    locale('ja-JP')
    
    const [error, setError] = useState(false);

    const [gachaItemPrizes, setGachaItemPrizes] = useState(generateGachaPrizePriority([...values.gachaPrizes]));
    const [resetTagResorce, setResetTagResorce] = useState(gachaItemPrizes?gachaItemPrizes.filter(item => item.newItem == 1):[]);
    console.log('gachaItemPrizes',gachaItemPrizes);
        console.log('values.gachaPrizes',values.gachaPrizes);
    const buttonType = 'button', options = {};
    const dateBoxConfig = {
        acceptCustomValue: false,
        min: new Date(2023, 0, 1),
        max: new Date(2050, 0, 1),
    };
    
    useEffect(() => {
        const newTasks = [...values.gachaPrizes];
        setGachaItemPrizes(generateGachaPrizePriority([...newTasks]));
        let resetTagList = newTasks && newTasks.length>0 && newTasks.filter(item => item.newItem == 1);
        if (resetTagList) {
            setResetTagResorce([...resetTagList]);  
        }
    }, [values.gachaPrizes]);
    //Formit state update manually
    const handleOnChangeFormikField = (e, key, prevState, setFieldValue, fieldInfo) => {
        const { name, value } = e.target || {};

        let updatedState;
        if (key == "gachaTranslates") {
            updatedState = prevState[key]?.map(x => (x.gachaTranslateTranslateId == fieldInfo.gachaTranslateTranslateId ? { ...x, [name]: value } : { ...x })) || [];
            setFieldValue(key, updatedState);
        }
       
    }

    // calendar change
    const onValueChangedHandleSD = (e,key) => {
        console.log('e.value', e);
        if (typeof e.value !== 'undefined') {
            let dateValues = e.value ? new Date(e.value).getTime() : null;
            //setBroadcastScheduleDatetime(dateValues);
            setFieldValue(key, dateValues);
        }
    },
    // option change
    onOptionChanged = (e) => {
        if (e.name === 'text' && e.value !== '') {}
    };
    
    function onReorder(e) {
        const visibleRows = e.component.getVisibleRows();
        const newTasks = [...gachaItemPrizes];
        let sourceData = newTasks && newTasks.filter(x=>e.itemData.gachaPrizeId==x.gachaPrizeId);
        console.log('souce data',sourceData);
        sourceData = sourceData && sourceData[0];
        const toIndex = newTasks.findIndex((item) => item.gachaPrizeId === visibleRows[e.toIndex].data.gachaPrizeId);
        const fromIndex = newTasks.findIndex((item) => item.gachaPrizeId === sourceData.gachaPrizeId);
    
        newTasks.splice(fromIndex, 1);
        newTasks.splice(toIndex, 0, sourceData);
        
        setGachaItemPrizes(generateGachaPrizePriority([...newTasks]))
        setFieldValue('gachaPrizes',[...newTasks])
    }

    
    const addMoreButton = () => {
            const {
                buttonTitle = '新規追加',
                buttonIcon = (
                    <AiFillPlusCircle onClick={(e) => addNewItem(e, handleOnClick)} className="h-[22px] w-[22px] z-10 absolute cursor-pointer" style={{right:"60px"}} />
                ),
                handleOnClick = () => {},
            } = options || '';

            return (
                <div
                    className="mt-4 flex justify-end align-middle relative items-center bg-blue-25text-blue-100 h-[32px]"
                >
                    {buttonIcon}
                    <button
                        type="button"
                        onClick={(e) => addNewItem(e, handleOnClick)}
                        className="mx-1 border-none cursor-pointer"
                    >
                        {buttonTitle}
                    </button>
                </div>
            );
    };
    // Add more button section
    function addNewItem(e, callBackFunc = () => {}) {
        const newItem = {
            gachaPrizeId: uuid(),
            gachaPrizeType: 0,
            gachaPrizeName: "自由作成賞",
            gachaLabel:"",
            newItem: 1
        };
        const newTasks = [...gachaItemPrizes, newItem];
        setGachaItemPrizes(generateGachaPrizePriority([...newTasks]));
        setFieldValue('gachaPrizes',[...newTasks]);
        let resetItem = newTasks && newTasks.filter(i => i.newItem == 1);
        setResetTagResorce([...resetItem]);
    }
    const removeField = (e,row) => {
        console.log('removeField field', e)
        console.log('removeField row', row)
        const newTasks = [...gachaItemPrizes];
        let filterItems = newTasks.filter(item => item.gachaPrizeId != row.gachaPrizeId);
        setGachaItemPrizes(generateGachaPrizePriority([...filterItems]));

        setFieldValue('gachaPrizes', [...filterItems]);
        let resetItem = filterItems && filterItems.filter(i => i.newItem == 1);
        setResetTagResorce([...resetItem]);
        //deleteRestLimit
        let existingSeletedResetPrize = values.gachaLimitResetPrize;
        if (existingSeletedResetPrize && existingSeletedResetPrize.includes(row.gachaPrizeId)) {
            existingSeletedResetPrize = existingSeletedResetPrize.filter(x => x != row.gachaPrizeId);
            setFieldValue('gachaLimitResetPrize', [...existingSeletedResetPrize])
        }
    };
    
    const updateGachaPrize = (e, row) => {
        //console.log('xxxxxx1');
        const { name, value } = e.target || '';
        //console.log('updateGachaPrize field', e)
        //console.log('updateGachaPrize row', row)
        let updatedState;
        if(row){
            let existingGachaPrizeList = [...gachaItemPrizes];
            updatedState = existingGachaPrizeList && existingGachaPrizeList.map(x => (x.gachaPrizeId == row.gachaPrizeId ? { ...x, [name]: value,gachaLabel:value } : { ...x })) || [];
            setGachaItemPrizes(generateGachaPrizePriority([...updatedState]))
            setFieldValue('gachaPrizes',[...updatedState])
            if (row.newItem==1) {
                let resetItem = updatedState && updatedState.filter(i => i.newItem == 1);
                setResetTagResorce([...resetItem]);
            }
        }
    };
    const displayDateBoxValue = (v,k)=>{
        //console.log('dddddd',v[k]);
        return v[k]?v[k]:null;
    }


    function generateGachaPrizePriority(gachaPrizes = []) {
        let reversedGachaPrizes = _.reverse(gachaPrizes);

        console.log("desc ordered > gachaPrizes list", reversedGachaPrizes);
        const priorityThresholdValue = 100 / (reversedGachaPrizes.length - 1);

        for (let i = 0; i < reversedGachaPrizes.length; i++) {
            let priorityValue = Math.round(i * priorityThresholdValue);
            reversedGachaPrizes[i].priority = priorityValue;
        }

      return _.reverse(reversedGachaPrizes);
    }

    const dragCellTemplate = (data) => {
       return <span class="dx-datagrid-drag-icon"></span>
    };

    return (
        <>
            <Section caption="基本情報">
                <InputContainer>
                    <div className="space-y-2">
                        {/* if got status =3 display error warning */}
                        {/* <SelectBox name="gachaStatus" label="表示状態(非表示にするとユーザーページに表示されません。残数が0または期間外の場合、売り切れ表示の状態に依存します)" options={gachaStatusOptions} inputClassName="w-full" /> */}
                        <SelectBox name="gachaDirectionId" label="商品の表示先（変更不可）" options={gachaDirectionIdOptions} inputClassName="w-full" disabled={!!values.gachaId && !clone} />
                        <SelectBox name="gachaViewFlag" label="売り切れ前表示状態(非表示にするとユーザーページに表示されません。残数が0または期間外の場合、売り切れ表示の状態に依存します)" options={gachaViewFlagOptions} inputClassName="w-full" />
                        <SelectBox name="gachaSoldOutFlag" label="売り切れ後表示状態" options={gachaSoldOutFlagOptions} inputClassName="w-full" />
                        <SelectBox name="gachaCategoryId" label="カテゴリー（変更不可）" options={categories} valueExpr="categoryId" displayExpr="categoryName" inputClassName="w-full" disabled={!!values.gachaId && !clone} />
                        <SelectBox name="gachaGenreId" label="ジャンル" options={genres} valueExpr="genreId" displayExpr="genreName" inputClassName="w-full" />
                        <InputContainer>
                            <label className="text-blue-100">表示開始日時（指定しない場合販売開始日時に表示されます。表示状態が非表示の場合開始日時を過ぎても表示されません）</label>
                            <div className="dx-field-value w-[100%] bg-blue-25 border border-blue-100 text-blue-50 ellipsis cursor-pointer devExtreameDateTimePicker cdx-DateBox">
                                <DateBox
                                    name='gachaPostStartDate'
                                    value={displayDateBoxValue(values,'gachaPostStartDate')}
                                    min={dateBoxConfig.min}
                                    max={dateBoxConfig.max}
                                    acceptCustomValue={dateBoxConfig.acceptCustomValue}
                                    onValueChanged={(e)=>onValueChangedHandleSD(e,'gachaPostStartDate')}
                                    placeholder='表示開始日時'
                                    showClearButton={true}
                                    showTodayButton={true}
                                    openOnFieldClick={true}
                                    applyButtonText="OK"
                                    applyValueMode="useButtons"
                                    type="datetime"
                                    onOptionChanged={onOptionChanged}
                                    width="100% !important"
                                />
                            </div>
                        </InputContainer>

                        <InputContainer>
                            <label className="text-blue-100">販売期間(販売開始日時まで表示されません。販売終了後は表示状態、売り切れ表示の状態に依存します) <AddRequiredText /></label>
                            <div className="flex">
                            <div className="dx-field-value bg-blue-25 border border-blue-100 text-blue-50 ellipsis cursor-pointer devExtreameDateTimePicker cdx-DateBox">
                                <DateBox
                                    name='gachaStartDate'
                                    value={displayDateBoxValue(values,'gachaStartDate')}
                                    min={dateBoxConfig.min}
                                    max={dateBoxConfig.max}
                                    acceptCustomValue={dateBoxConfig.acceptCustomValue}
                                    onValueChanged={(e)=>onValueChangedHandleSD(e,'gachaStartDate')}
                                    placeholder='販売期間始端'
                                    showClearButton={true}
                                    showTodayButton={true}
                                    openOnFieldClick={true}
                                    applyButtonText="OK"
                                    applyValueMode="useButtons"
                                    type="datetime"
                                    onOptionChanged={onOptionChanged}
                                />
                            </div>
                                
                                <div className="flex-initial w-8 dateBoxSeparator"> 〜 </div>
                            <div className="dx-field-value bg-blue-25 border border-blue-100 text-blue-50 ellipsis cursor-pointer devExtreameDateTimePicker cdx-DateBox">
                                <DateBox
                                    name='gachaEndDate'
                                    value={displayDateBoxValue(values,'gachaEndDate')}
                                    min={dateBoxConfig.min}
                                    max={dateBoxConfig.max}
                                    acceptCustomValue={dateBoxConfig.acceptCustomValue}
                                    onValueChanged={(e)=>onValueChangedHandleSD(e,'gachaEndDate')}
                                    placeholder='販売期間終端'
                                    showClearButton={true}
                                    showTodayButton={true}
                                    openOnFieldClick={true}
                                    applyButtonText="OK"
                                    applyValueMode="useButtons"
                                    type="datetime"
                                    onOptionChanged={onOptionChanged}
                                />
                            </div>
                            </div>
                        </InputContainer>
                        {/* need one more selection */}
                        <SelectBox name="gachaRemainingDisplayFlag" label="残数表示(毎日一回パックなど残数を非表示にしたい時)" options={gachaRemainingDisplayFlagOptions} inputClassName="w-full" />

                        <SelectBox name="gachaCarouselFlag" label="カルーセル表示(並び順は表示順管理に依存します)" options={gachaCarouselFlagOptions} valueExpr="id" displayExpr="caption" inputClassName="w-full" />
                        <TextBox disabled value={unixTimestampToDateFormat(values.gachaCreatedAt, true)} name="gachaCreatedAt" label="登録日時" inputClassName="w-full" />
                        <TextBox disabled value={unixTimestampToDateFormat(values.gachaUpdatedAt, true)} name="gachaUpdatedAt" label="編集日時" inputClassName="w-full" />
                        <TextBox disabled value={unixTimestampToDateFormat(values.gachaBuiltedAt, true)} name="gachaBuiltedAt" label="シナリオ構築日時" inputClassName="w-full" />
                    </div>
                </InputContainer>
            </Section>

            <Section caption="商品名" wrapClass="mt-10">
                <InputContainer className="space-y-2">
                    {values && values.gachaTranslates && values.gachaTranslates.map((x, i) => <FormikField key={i} name="gachaTranslateName" value={x?.gachaTranslateName} onInputChange={(e) => handleOnChangeFormikField(e, 'gachaTranslates', values, setFieldValue, x)} label={`${x.translateName}（256文字まで）`} isRequired={x.gachaTranslateJpFlag == 1} labelColor={`#FF758F`} inputClassName="w-full" />)}
                </InputContainer>
            </Section>

            <Section caption="商品説明(詳細ページ・headに使用されます)" wrapClass="mt-2">
                <InputContainer className="space-y-2">
                    {values && values.gachaTranslates &&values.gachaTranslates.map((x, i) => <FormikField key={i} type="textarea" name="gachaTranslateDescription" value={x?.gachaTranslateDescription} onInputChange={(e) => handleOnChangeFormikField(e, 'gachaTranslates', values, setFieldValue, x)} label={`${x.translateName}（1024文字まで）`} inputClassName="w-full h-16" />)}
                </InputContainer>
            </Section>

            <Section caption="商品ページサムネイル画像(一覧で使用されます　ファイルタイプによってはプレビュー出来ないものもあります)" wrapClass="mt-10">
                <InputContainer className="space-y-2">
                    <div className="flex flex-wrap gap-4 content-between">
                        {values && values.gachaTranslates && values.gachaTranslates.map((x, i) => <FormikField key={i} type="file" imageType='vertical' name="gachaTranslateImageMain" value={x?.gachaTranslateImageMain} onInputChange={(e) => handleOnChangeFormikField(e, 'gachaTranslates', values, setFieldValue, x)} label={`${x.translateName}`} inputClassName="" />)}
                    </div>
                </InputContainer>
            </Section>

            <Section caption="商品画像(縦長の商品詳細説明画像　ファイルタイプによってはプレビュー出来ないものもあります)" wrapClass="mt-2">
                <InputContainer className="space-y-2">
                    <div className="flex flex-wrap gap-4 content-between">
                        {values && values.gachaTranslates && values.gachaTranslates.map((x, i) => <FormikField key={i} type="file" imageType='horizontal' name="gachaTranslateImageDetail" value={x?.gachaTranslateImageDetail} onInputChange={(e) => handleOnChangeFormikField(e, 'gachaTranslates', values, setFieldValue, x)} label={`${x.translateName}`} inputClassName="" />)}
                    </div>
                </InputContainer>
            </Section>
            
             {/* need to implement dragable inputbox */}

             <Section caption="賞設定(上から優先して動画を再生します　おまけを付与するかどうかはパックの設定で行えます　確定後の場合、変更しても無効です)">
                <InputContainer className="space-y-2 dragableinputArea">
                <DataGrid
                    dataSource={gachaItemPrizes}
                    showBorders={false}
                    showColumnHeaders={false}
                    showColumnLines={false}
                    showRowLines={false}
                    paging={false}
                >

                    {/*<Column
                        caption=""
                        dataField="priority"
                        allowSorting={false}
                        alignment="center"
                        cssClass="!align-middle"
                        width={60}
                    />*/}

                    <Column type="drag" width={60} cellRender={dragCellTemplate} />

                    <RowDragging
                        allowReordering={true}
                        onReorder={onReorder}
                        showDragIcons={true}
                    />

                    {/* <Column
                        caption=""
                        dataField="priority"
                        allowSorting={false}
                        alignment="center"
                        cssClass="!align-middle"
                        width={60}
                    /> */}
                    
                    <Column
                        cellComponent={(data) =>
                        <FormikField key={data.data.key.gachaPrizeId} name='gachaPrizeName' value={data.data.key.gachaPrizeName} onInputChange={(e) => handleOnChangeFormikField(e, 'gachaPrizes', values, setFieldValue, data.data.key)} label={`${data.data.key.newItem ? data.data.key.gachaPrizeName : data.data.key.gachaLabel}`} labelClassName="drabgleLabel" inputClassName="w-full customDragAbleInput"
                            onBlur={(e)=>{
                                updateGachaPrize(e,data.data.key)
                            }}
                            isDeletable={data.data.key.newItem==1}
                            wrapClass="relative"
                            dataContent={data.data.key}
                            deleteField={removeField}
                        />
                        // <TextBox name={data.data.key.gachaPrizeId}
                        // isDeletable={data.data.key.newItem==1}
                        // value={data.data.key.gachaPrizeName}
                        // wrapClass="relative"
                        // onBlur={(e)=>{
                        //     updateGachaPrize(e,data.data.key)
                        // }}
                        // label={`${data.data.key.newItem?data.data.key.gachaPrizeName:data.data.key.gachaLabel}`}
                        // dataContent={data.data.key}
                        // labelClassName="drabgleLabel"
                        // inputClassName="w-full customDragAbleInput"
                        // deleteField={removeField}
                        // />
                        }
                    />
                </DataGrid>
                { addMoreButton() }
                </InputContainer>
            </Section>

            <Section caption="天井リセット">
                <InputContainer className="space-y-2">
                    <TagboxInput name="gachaLimitResetPrize" label="天井をリセットする賞（シナリオ確定後に編集しないでください）" isCheckboxShow={true} inputClassName="w-full" dataSource={resetTagResorce} selectedTags={values.gachaLimitResetPrize} valueExpr="gachaPrizeId" displayExpr="gachaPrizeName" />
                </InputContainer>
            </Section>

            <Section caption="ボーナス賞除外">
                <InputContainer className="space-y-2">
                    <TagboxInput name="gachaBonusExcludePrize" label="ボーナス賞と被ったら再設定を行う賞" isCheckboxShow={true} inputClassName="w-full" dataSource={resetTagResorce} selectedTags={values.gachaBonusExcludePrize} valueExpr="gachaPrizeId" displayExpr="gachaPrizeName" />
                </InputContainer>
            </Section>

            <Section caption="メモ欄" wrapClass="mt-2">
                <InputContainer className="space-y-2">
                    <TextAreaInput name="gachaMemo" label="メモ" inputClassName="w-full" />
                </InputContainer>
            </Section>

           

            <div>
                <Button
                    className='w-full mt-20 modal-button'
                    text={`${clone ? '複製' : '保存'}`}
                    type="submit"
                    stylingMode="contained"
                    useSubmitBehavior={true}
                    disabled={isSubmitting}
                />
            </div>
        </>
    )
}