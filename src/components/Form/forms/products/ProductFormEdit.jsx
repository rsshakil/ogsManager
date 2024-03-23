import {Form, Formik} from "formik";
import _ from "lodash";
import {useStoreProductMutation, useUpdateProductMutation} from "../../../../features/product/productApi";
import Loader from "../../../atoms/Loading/TherapistLoader";
import {useEffect, useRef, useState} from "react";
import useMutationApiResponse from "../../../../hooks/useMutationApiResponse";
import productFormSchema, {PRODUCT_FORM_INITIAL_VALUE} from "../../../../utils/schemas/productFormSchema";
import ProductForm from "./ProductForm";
import useFetchProductInitQuery from "../../../../hooks/useFetchProductInitQuery";
import {useModal} from "../../../../contexts/ModalContext";
import useFetchProductQuery from "../../../../hooks/useFetchProductQuery";


export default function ProductFormEdit({ cloneProduct = false, gachaId, closeModal, tableRef, createItemModal }) {
    const formikRef = useRef();
    const { isModalOpen: refetch } = useModal();
    const { trigger } = useMutationApiResponse(productFormSchema, ["gachaMemo", "gachaTranslateName", "gachaTranslateDescription", "gachaPrizeName"])

    const [formValue, setFormValue] = useState(PRODUCT_FORM_INITIAL_VALUE);

    //Query list
    const { data: { categories = [], genres = [], tags = [], translates = [] } = {}, isFetching: itemInitLoading } = useFetchProductInitQuery(refetch);
    const { data: { records }, isLoading: productDetailLoading } = useFetchProductQuery(gachaId, refetch);

    //Mutation list
    const [storeProduct, { isLoading: storeProductLoading, isError: isStoreProductError }] = useStoreProductMutation();
    const [updateProduct, { isLoading: updateProductLoading, isError: isUpdateProductError }] = useUpdateProductMutation();


    //For edit
    useEffect(() => {
        if (!productDetailLoading && records) {
            console.log('records............', records);
            records.gachaPrizes = _.sortBy(records.gachaPrizes, 'gachaPrizeOrder');

            setFormValue(records);

            if (formikRef.current) {
                formikRef.current.resetForm();
                formikRef.current.setFieldValue(records);
            }
        }
    }, [productDetailLoading, records]);


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        if (!values.gachaPostStartDate) values.gachaPostStartDate = values.gachaStartDate;
        setFormValue(values);
        console.log('my values ->>>>>>>>>>>>>>', values)
        const mutatedApi = async (data) => cloneProduct ? await storeProduct(data) : await updateProduct({ gachaId, data });

        const { success } = await trigger({ values, setSubmitting, mutatedApi, resetForm, closeModal });

        if (success) {
            if (tableRef.current) {
                tableRef.current.instance.refresh();
            }
        }
    };


    return (
        <div>
            {(itemInitLoading || storeProductLoading || productDetailLoading || updateProductLoading) && <Loader />}

            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <ProductForm
                            values={values}
                            setFieldValue={setFieldValue}
                            setFormValue={setFormValue}
                            isSubmitting={isSubmitting}
                            categories={categories}
                            tags={tags}
                            genres={genres}
                            clone={cloneProduct}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}