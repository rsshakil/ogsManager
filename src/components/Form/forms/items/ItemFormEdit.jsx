import { Formik, Form, ErrorMessage } from "formik";
import _ from "lodash";
import { useStoreItemMutation, useUpdateItemMutation } from "../../../../features/item/itemApi";
import Loader from "../../../atoms/Loading/TherapistLoader";
import { useEffect, useRef, useState } from "react";
import useMutationApiResponse from "../../../../hooks/useMutationApiResponse";
import itemFormSchema, { ITEM_FORM_INITIAL_VALUE } from "../../../../utils/schemas/itemFormSchema";
import ItemForm from "./ItemForm";
import useFetchItemQuery from "../../../../hooks/useFetchItemQuery";
import useFetchItemInitQuery from "../../../../hooks/useFetchItemInitQuery";
import { useModal } from "../../../../contexts/ModalContext";


export default function ItemFormEdit({ itemId, clone, closeModal, tableRef }) {
    const formikRef = useRef();
    const { isModalOpen: refetch } = useModal();

    const { trigger } = useMutationApiResponse(itemFormSchema, [
        "itemMemo",
        "itemAttribute1", 
        "itemAttribute2", 
        "itemAttribute3",
        "itemAttribute4",
        "itemAttribute5",
        "itemAttribute6",
        "itemAttribute7",
        "itemAttribute8",
        "itemTranslateName",
        "itemTranslateDescription1",
        "itemTranslateDescription2",
        "itemTranslateDescription3",
    ]);

    const [formValue, setFormValue] = useState(ITEM_FORM_INITIAL_VALUE);

    //Query
    const { data: { categories = [], tags = [] } = {}, isLoading: itemInitLoading } = useFetchItemInitQuery(refetch);
    const { data: { records }, isLoading: itemDetailLoading } = useFetchItemQuery(itemId, refetch);

    //Mutation list
    const [storeItem, { isLoading: storeItemLoading, isError: isStoreItemError }] = useStoreItemMutation();
    const [updateItem, { isLoading: updateItemLoading, isError: isUpdateItemError }] = useUpdateItemMutation();

    //For edit
    useEffect(() => {
        if (!itemDetailLoading && records) {
            setFormValue(records);

            if (formikRef.current) {
                formikRef.current.resetForm();
                formikRef.current.setFieldValue(records);
            }
        }
    }, [itemDetailLoading, records]);


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const mutatedApi = async (data) => clone ? await storeItem(data) : await updateItem({ itemId, data });

        const { success } = await trigger({ values, setSubmitting, mutatedApi, resetForm, closeModal });

        if (success) {
            if (tableRef.current) {
                tableRef.current.instance.refresh();
            }
        }
    };


    return (
        <div>
            {(itemInitLoading || itemDetailLoading || updateItemLoading || storeItemLoading) && <Loader />}

            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <ItemForm
                            values={values}
                            clone={clone}
                            setFieldValue={setFieldValue}
                            setFormValue={setFormValue}
                            isSubmitting={isSubmitting}
                            categories={categories}
                            tags={tags}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}