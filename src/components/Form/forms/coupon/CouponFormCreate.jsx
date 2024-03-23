import { Formik, Form, ErrorMessage } from "formik";
import Loader from "../../../atoms/Loading/TherapistLoader";
import { useEffect, useRef, useState } from "react";
import useMutationApiResponse from "../../../../hooks/useMutationApiResponse";
import { useModal } from "../../../../contexts/ModalContext";
import CouponForm from "./CouponForm";
import couponFormSchema, {COUPON_FORM_INITIAL_VALUE} from "../../../../utils/schemas/couponFormSchema";
import {useStoreCouponMutation, useUpdateCouponMutation} from "../../../../features/coupon/couponApi";


export default function CouponFormCreate({ closeModal, tableRef, createItemModal }) {
    const formikRef = useRef();
    const { isModalOpen: refetch } = useModal();

    const { trigger } = useMutationApiResponse(couponFormSchema, ["couponCode", "couponName"])

    const [formValue, setFormValue] = useState(COUPON_FORM_INITIAL_VALUE);

    //Mutation list
    const [storeCoupon, { isLoading, isError: isStoreItemError }] = useStoreCouponMutation();


    //For create
    useEffect(() => {
        resetForm();
    }, [createItemModal]);

    const resetForm = async () => {
        let updatedState = { ...COUPON_FORM_INITIAL_VALUE };
        setFormValue(updatedState)

        formikRef.current.resetForm();
        if (formikRef.current) {
            formikRef.current.setFieldValue(updatedState);
        }

    }

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('my values ->>>>>>>>>>>>>>', values)
        const mutatedApi = async (data) => await storeCoupon(data);

        const { success } = await trigger({ values, setSubmitting, mutatedApi, resetForm, closeModal });

        if (success) {
            if (tableRef.current) {
                tableRef.current.instance.refresh();
            }
            resetForm();
            resetForm();
        }
    };


    return (
        <div>
            {isLoading && <Loader />}

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