import { Formik, Form, ErrorMessage } from "formik";
import _ from "lodash";
import { useStoreItemMutation } from "../../../../features/item/itemApi";
import Loader from "../../../atoms/Loading/TherapistLoader";
import { useEffect, useRef, useState } from "react";
import useMutationApiResponse from "../../../../hooks/useMutationApiResponse";
import itemFormSchema, { ITEM_FORM_INITIAL_VALUE } from "../../../../utils/schemas/itemFormSchema";
import ItemForm from "./ItemForm";
import useFetchItemInitQuery from "../../../../hooks/useFetchItemInitQuery";
import { useModal } from "../../../../contexts/ModalContext";


export default function ItemFormCreate({ closeModal, tableRef, createItemModal }) {
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
    ])

    const [formValue, setFormValue] = useState(ITEM_FORM_INITIAL_VALUE);

    //Query
    const { data: { categories = [], tags = [], translates = [] } = {}, isFetching: itemInitLoading, isLoading: itemIniLoading } = useFetchItemInitQuery(refetch);
    //Mutation list
    const [storeItem, { isLoading: storeItemLoading, isError: isStoreItemError }] = useStoreItemMutation();


    //For create
    useEffect(() => {
        resetItemForm();
    }, [categories, translates, createItemModal]);

    const resetItemForm = async () => {
        let updatedState = { ...ITEM_FORM_INITIAL_VALUE };
        if (categories.length > 0) updatedState.itemCategoryId = categories[0].categoryId;
        if (translates.length > 0) {
            updatedState.itemTranslates = translates.map(x => ({
                translateId: x.translateId,
                translateName: x.translateName,
                itemTranslateTranslateId: x.translateId,
                itemTranslateName: "",
                itemTranslateDescription1: "",
                itemTranslateDescription2: "",
                itemTranslateDescription3: "",
                itemTranslateJpFlag: x.translateJpFlag,
            }));
        }
        setFormValue(updatedState)

        formikRef.current.resetForm();
        if (formikRef.current) {
            formikRef.current.setFieldValue(updatedState);
        }

    }

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('my values ->>>>>>>>>>>>>>', values)
        const mutatedApi = async (data) => await storeItem(data);

        const { success } = await trigger({ values, setSubmitting, mutatedApi, resetForm, closeModal });

        if (success) {
            if (tableRef.current) {
                tableRef.current.instance.refresh();
            }
            resetItemForm();
            resetForm();
        }
    };


    return (
        <div>
            {(itemInitLoading || storeItemLoading || itemIniLoading) && <Loader />}

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