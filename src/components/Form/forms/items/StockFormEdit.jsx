import { Formik, Form, ErrorMessage } from "formik";
import _ from "lodash";
import { useUpdateItemStockMutation } from "../../../../features/item/itemApi";
import Loader from "../../../atoms/Loading/TherapistLoader";
import {useEffect, useRef, useState} from "react";
import useMutationApiResponse from "../../../../hooks/useMutationApiResponse";
import TextBox from "../../FormInputs/TextBox";
import Section from "../../FormInputs/Section";
import InputContainer from "../../FormInputs/InputContainer";
import { Button } from "devextreme-react/button";
import TextAreaInput from "../../FormInputs/TextAreaInput";
import useFetchItemQuery from "../../../../hooks/useFetchItemQuery";
import { useModal } from "../../../../contexts/ModalContext";
import NumberBox from "../../FormInputs/NumberBox";


const STOCK_FORM_INITIAL_VALUE = {
    itemStockUnsetCount: 0,
    itemStockGachaCount: 0,
    itemStockCollectionCount: 0,
    itemStockShippingRequestCount: 0,
    itemStockShippedCount: 0,
    itemStockMemo: ''
}

export default function StockFormEdit({ itemId, closeModal, tableRef }) {
    const { isModalOpen: refetch } = useModal();
    const formikRef = useRef();

    const { trigger } = useMutationApiResponse("", ['itemStockMemo']);

    const [formValue, setFormValue] = useState(STOCK_FORM_INITIAL_VALUE);

    //Query
    const { data: { records }, isLoading: itemDetailLoading } = useFetchItemQuery(itemId, refetch);
    //Mutation
    const [updateItemStock, { isLoading: updateItemStockLoading, isError: isUpdateItemStockError }] = useUpdateItemStockMutation();

    //For edit
    useEffect(() => {
        if (itemId && !itemDetailLoading && records) {
            let itemStockData = _.pick(records, [
                'itemStockUnsetCount',
                'itemStockGachaCount',
                'itemStockCollectionCount',
                'itemStockShippingRequestCount',
                'itemStockShippedCount',
                'itemStockMemo'
            ]);
            setFormValue({ ...STOCK_FORM_INITIAL_VALUE, ...itemStockData });

            if (formikRef.current) {
                formikRef.current.resetForm();
                formikRef.current.setFieldValue(records);
            }
        }
    }, [itemId, records]);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('my values ->>>>>>>>>>>>>>', values)
        const mutatedApi = async (data) => await updateItemStock({ itemId, data: data });
        const { success } = await trigger({ values, setSubmitting, mutatedApi, resetForm, closeModal });
        if (success) {
            if (tableRef.current) {
                tableRef.current.instance.refresh();
            }
        }
    };


    return (
        <div>
            {(itemDetailLoading || updateItemStockLoading) && <Loader />}

            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <Section caption="在庫情報" wrapClass="mt-2">
                            <br />
                            <InputContainer className="space-y-2">
                                <NumberBox min="0" max="999999" isRequired={true} name="itemStockUnsetCount" label="未使用在庫(999,999以上で無制限となります)" inputClassName="w-full" />
                                <TextBox name="itemStockGachaCount" label="商品セット中(読み取り専用)" inputClassName="w-full text-right" disabled={true} />
                                <TextBox name="itemStockCollectionCount" label="ユーザー所蔵中(読み取り専用)" inputClassName="w-full text-right" disabled={true} />
                                <TextBox name="itemStockShippingRequestCount" label="発送申請中(読み取り専用)" inputClassName="w-full text-right" disabled={true} />
                                <TextBox name="itemStockShippedCount" label="発送済み(読み取り専用)" inputClassName="w-full text-right" disabled={true} />
                            </InputContainer>
                        </Section>

                        <Section caption="メモ欄" wrapClass="mt-2">
                            <InputContainer className="space-y-2">
                                <TextAreaInput name="itemStockMemo" label="メモ" placeholder="メモを入力してください" inputClassName="w-full" />
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
                    </Form>
                )}
            </Formik>
        </div>
    )
}