import { useEffect, useState } from "react";
import { Button } from "devextreme-react/button";
import Section from "../../FormInputs/Section"
import FileInput from "../../FormInputs/FileInput";
import SelectBox from "../../FormInputs/SelectBox";
import InputContainer from "../../FormInputs/InputContainer";
import TextBox from "../../FormInputs/TextBox";
import TextAreaInput from "../../FormInputs/TextAreaInput";

export default function ShippingForm({ values, clone, setFieldValue, setFormValue, isSubmitting, userCollectionStatus }) {

    const [error, setError] = useState(false);

    return (
        <>
            <Section caption="基本情報">
                <InputContainer>
                    <div className="space-y-2">
                        <SelectBox name="userCollectionStatus" label="状態 （未対応→対応中→発送済み又はその他の順で変更できます。発送済みからその他に変更できますが、その他から戻すことはできません。)" options={userCollectionStatus} valueExpr="id" displayExpr="caption" inputClassName="w-full" disabled={values.userCollectionStatus === 4} />
                        <TextBox name="userCollectionRequestAt" label="申請日時" inputClassName="w-full" disabled={true} />
                        <TextBox name="userEmail" label="申請ユーザー" inputClassName="w-full" disabled={true} />
                        <TextBox name="userCollectionTransactionUUID" label="まとめて発送ID" inputClassName="w-full" disabled={true} />
                        <TextBox name="itemTranslateName" label="申請アイテム" inputClassName="w-full" disabled={true} />
                    </div>
                </InputContainer>
            </Section>

            <Section caption="送付先情報">
                <InputContainer>
                    <div className="space-y-2">
                        <TextBox name="userShippingName" label="送付先名称" inputClassName="w-full" disabled={true} />
                        <TextBox name="userShippingZipcode" label="郵便番号" inputClassName="w-full" disabled={true} />
                        <TextBox name="userShippingAddress" label="都道府県" inputClassName="w-full" disabled={true} />
                        <TextBox name="userShippingAddress2" label="市区町村" inputClassName="w-full" disabled={true} />
                        <TextBox name="userShippingAddress3" label="町名・番地" inputClassName="w-full" disabled={true} />
                        <TextBox name="userShippingAddress4" label="建物名/ビル等" inputClassName="w-full" disabled={true} />
                        <div className="">
                            <label>電話番号</label>
                            <InputContainer>
                                <div className="flex">
                                    <div className="w-1/6 mr-4">
                                        <TextBox disabled name="userShippingTelCountryCode" label="" inputClassName="w-full" />
                                    </div>
                                    <div className="w-5/6">
                                        <TextBox disabled name="userShippingTel" label="" inputClassName="w-full" />
                                    </div>
                                </div>
                            </InputContainer>
                        </div>
                    </div>
                </InputContainer>
            </Section>

            <Section caption="アイテム情報">
                <InputContainer>
                    <div className="flex space-x-3 disabled_file_input">
                        <FileInput imgPath={values.itemImagePath1}
                            name={`itemImagePath1`}
                            error={error}
                            setError={setError}
                            disabled={true}
                        />
                        <FileInput imgPath={values.itemImagePath2}
                            name={`itemImagePath2`}
                            error={error}
                            setError={setError}
                        />
                        <FileInput imgPath={values.itemImagePath3}
                            name={`itemImagePath3`}
                            error={error}
                            setError={setError}
                        />
                    </div>
                    <div className="space-y-2">
                        <TextBox name="categoryTranslateName" label="カテゴリー" inputClassName="w-full" disabled={true} />
                        <TextBox name="tagName" label="タグ" inputClassName="w-full" disabled={true} />
                        <TextBox name="itemTranslateName" label="アイテム名(日本語)" inputClassName="w-full" disabled={true} />
                        <TextAreaInput name="itemTranslateDescription1" label="アイテム説明1(日本語)" inputClassName="w-full" disabled={true} />
                        <TextAreaInput name="itemTranslateDescription2" label="アイテム説明2(日本語)" inputClassName="w-full" disabled={true} />
                        <TextBox name="itemAttribute1" label="HP" inputClassName="w-full" disabled={true} />
                        <TextBox name="itemAttribute2" label="エキスパンションマーク/シリーズ名" inputClassName="w-full" disabled={true} />
                        <TextBox name="itemAttribute3" label="コレクションナンバー/シリアルナンバー" inputClassName="w-full" disabled={true} />
                        <TextBox name="itemAttribute4" label="レアリティマーク" inputClassName="w-full" disabled={true} />
                        <TextBox name="itemAttribute5" label="鑑定/ランク" inputClassName="w-full" disabled={true} />
                        <TextBox name="itemAttribute6" label="状態" inputClassName="w-full" disabled={true} />
                        <TextBox name="itemAttribute7" label="その他属性1" inputClassName="w-full" disabled={true} />
                        <TextBox name="itemAttribute8" label="その他属性2" inputClassName="w-full" disabled={true} />
                        <TextAreaInput name="itemMemo" label="メモ" inputClassName="w-full" disabled={true} />
                    </div>
                </InputContainer>
            </Section>

            <Section caption="メモ欄" wrapClass="mt-2">
                <InputContainer className="space-y-2">
                    <TextAreaInput name="userCollectionMemo" label="メモ" inputClassName="w-full" />
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