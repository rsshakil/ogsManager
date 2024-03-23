import { useState } from "react";
import { Button } from "devextreme-react/button";
import Section from "../../FormInputs/Section"
import FileInput from "../../FormInputs/FileInput";
import SelectBox from "../../FormInputs/SelectBox";
import InputContainer from "../../FormInputs/InputContainer";
import TextBox from "../../FormInputs/TextBox";
import TextAreaInput from "../../FormInputs/TextAreaInput";
import TagboxInput from "../../FormInputs/TagboxInput";
import FormikField from "../../FormInputs/FormikField";


const itemStatusOptions = [
    { id: 1, caption: "有効" },
    { id: 2, caption: "無効" },
];

const itemShippingFlagOptions = [
    { id: 1, caption: "可能" },
    { id: 0, caption: "不可能" },
];

export default function ItemForm({ values, clone, setFieldValue, setFormValue, isSubmitting, categories = [], tags = [] }) {

    const [error, setError] = useState(false);
    //Formit state update manually
    const handleOnChangeFormikField = (e, key, prevState, setFieldValue, fieldInfo) => {
        const { name, value } = e.target || {};

        let updatedState;
        if (key == "itemTranslates") {
            updatedState = prevState[key]?.map(x => (x.itemTranslateTranslateId == fieldInfo.itemTranslateTranslateId ? { ...x, [name]: value } : { ...x })) || [];
        }
        setFieldValue(key, updatedState);
    }

    function handleImageChange(image = {}) {
        const { location, inputFeildName } = image || {};
        // setFormValue((prevState) => ({
        //     ...prevState,
        //     [inputFeildName]: location || ''
        // }))
        setFieldValue(inputFeildName, location || '');
    }

    return (
        <>
            <Section caption="アイテム画像(#1が抽選結果に使用されます　#2#3は予備です　ファイルタイプによってはプレビュー出来ないものもあります) 画像の比率は63:88で作成してください。それ以外の場合デザインが崩れます。">
                <InputContainer>
                    <div className="flex space-x-3">
                        <FileInput imgPath={values.itemImagePath1}
                            name={`itemImagePath1`}
                            setUploadedImage={handleImageChange}
                            error={error}
                            setError={setError}
                            imageType='horizontal'
                        />
                        <FileInput imgPath={values.itemImagePath2}
                            name={`itemImagePath2`}
                            setUploadedImage={handleImageChange}
                            error={error}
                            setError={setError}
                            imageType='horizontal'
                        />
                        <FileInput imgPath={values.itemImagePath3}
                            name={`itemImagePath3`}
                            setUploadedImage={handleImageChange}
                            error={error}
                            setError={setError}
                            imageType='horizontal'
                        />
                    </div>
                </InputContainer>
            </Section>

            {/* <ErrorMessage name="email" component="div" /> */}

            <Section caption="基本情報">
                <InputContainer className="space-y-2">
                    <SelectBox name="itemStatus" label="アイテム状態(無効にするとランダムに含まれなくなります)" options={itemStatusOptions} inputClassName="w-full" />
                    <SelectBox name="itemShippingFlag" label="発送制限（変更不可）" options={itemShippingFlagOptions} inputClassName="w-full" disabled={!!values.itemId && clone === undefined} />
                    <SelectBox name="itemCategoryId" label="カテゴリ" inputClassName="w-full" options={categories} valueExpr="categoryId" displayExpr="categoryName" />
                    <TagboxInput name="itemTags" label="タグ（32個まで）" inputClassName="w-full" dataSource={tags} selectedTags={values.itemTags} valueExpr="tagId" displayExpr="tagName" />
                </InputContainer>
            </Section>

            <Section caption="アイテム名" wrapClass="mt-10">
                <InputContainer className="space-y-2">
                    {values.itemTranslates.map((x, i) => <FormikField key={i} name="itemTranslateName" value={x.itemTranslateName} onInputChange={(e) => handleOnChangeFormikField(e, 'itemTranslates', values, setFieldValue, x)} label={`${x.translateName}（256文字まで）`} isRequired={x.itemTranslateJpFlag == 1} inputClassName="w-full" />)}
                </InputContainer>
            </Section>

            <Section caption="アイテム説明1" wrapClass="mt-2">
                <InputContainer className="space-y-2">
                    {values.itemTranslates.map((x, i) => <FormikField key={i} type="textarea" name="itemTranslateDescription1" value={x.itemTranslateDescription1} onInputChange={(e) => handleOnChangeFormikField(e, 'itemTranslates', values, setFieldValue, x)} label={`${x.translateName}（1024文字まで）`} inputClassName="w-full h-16" />)}
                </InputContainer>
            </Section>

            <Section caption="アイテム説明2" wrapClass="mt-2">
                <InputContainer className="space-y-2">
                    {values.itemTranslates.map((x, i) => <FormikField key={i} type="textarea" name="itemTranslateDescription2" value={x.itemTranslateDescription2} onInputChange={(e) => handleOnChangeFormikField(e, 'itemTranslates', values, setFieldValue, x)} label={`${x.translateName}（1024文字まで）`} inputClassName="w-full h-16" />)}
                </InputContainer>
            </Section>

            <Section caption="アイテム属性" wrapClass="mt-2">
                <InputContainer className="space-y-2">
                    <TextBox name="itemAttribute1" label="HP（128文字まで）" inputClassName="w-full" />
                    <TextBox name="itemAttribute2" label="エキスパンションマーク/シリーズ名（128文字まで）" inputClassName="w-full" />
                    <TextBox name="itemAttribute3" label="コレクションナンバー/シリアルナンバー（128文字まで）" inputClassName="w-full" />
                    <TextBox name="itemAttribute4" label="レアリティマーク（128文字まで）" inputClassName="w-full" />
                    <TextBox name="itemAttribute5" label="鑑定/ランク" inputClassName="w-full" />
                    <TextBox name="itemAttribute6" label="状態" inputClassName="w-full" />
                    <TextBox name="itemAttribute7" label="その他属性1" inputClassName="w-full" />
                    <TextBox name="itemAttribute8" label="その他属性2" inputClassName="w-full" />
                </InputContainer>
            </Section>

            <Section caption="メモ欄" wrapClass="mt-2">
                <InputContainer className="space-y-2">
                    <TextAreaInput name="itemMemo" label="メモ" inputClassName="w-full" />
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