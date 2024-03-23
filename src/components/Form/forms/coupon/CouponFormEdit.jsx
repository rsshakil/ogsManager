import { Formik, Form, ErrorMessage } from "formik";
import Loader from "../../../atoms/Loading/TherapistLoader";
import { useEffect, useRef, useState } from "react";
import { useModal } from "../../../../contexts/ModalContext";
import { unixTimestampToDateFormat } from "../../../../utils/commonFunctions";
import useMutationApiResponse from "../../../../hooks/useMutationApiResponse";
import CouponForm from "./CouponForm";
import {useUpdateCouponMutation} from "../../../../features/coupon/couponApi";
import couponFormSchema from "../../../../utils/schemas/couponFormSchema";
import useFetchCouponQuery from "../../../../hooks/useFetchCouponQuery";

export default function CouponFormEdit({ couponId, closeModal, tableRef }) {
    const formikRef = useRef();
    const { isModalOpen: refetch } = useModal();

    const { trigger } = useMutationApiResponse(couponFormSchema, ["couponCode", "couponName"]);

    const [formValue, setFormValue] = useState([]);

    //Query list
    const { data: { records }, isLoading: detailLoading } = useFetchCouponQuery(couponId, refetch);

    //Mutation list
    const [updateShipping, { isLoading, isError: isUpdateShippingError }] = useUpdateCouponMutation();

    //For create
    useEffect(() => {
        resetItemForm().then(r => {
            if (records) {
                records.userCollectionRequestAt = unixTimestampToDateFormat(records.userCollectionRequestAt);
            }
        });
    }, [records, detailLoading]);

    const resetItemForm = async () => {
        if (!detailLoading && records) {
            setFormValue(records);
            if (formikRef.current) {
                formikRef.current.resetForm();
                formikRef.current.setFieldValue(records);
            }
        }
    }

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('my values ->>>>>>>>>>>>>>', values);

        const mutatedApi = async (data) => await updateShipping({ couponId, data });
        const { success } = await trigger({ values, setSubmitting, mutatedApi, resetForm, closeModal });
        if (success) {
            if (tableRef.current) {
                tableRef.current.instance.refresh();
            }
        }
    };


    return (
        <div>
            {(detailLoading || isLoading) && <Loader />}

            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <CouponForm
                            values={values}
                            setFieldValue={setFieldValue}
                            setFormValue={setFormValue}
                            isSubmitting={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}