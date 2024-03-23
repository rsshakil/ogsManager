import { Formik, Form, ErrorMessage } from "formik";
import Loader from "../../../atoms/Loading/TherapistLoader";
import { useEffect, useRef, useState } from "react";
import ShippingForm from "./ShippingForm";
import { useModal } from "../../../../contexts/ModalContext";
import useFetchShippingQuery from "../../../../hooks/useFetchShippingQuery";
import { unixTimestampToDateFormat } from "../../../../utils/commonFunctions";
import useMutationApiResponse from "../../../../hooks/useMutationApiResponse";
import { useUpdateShippingMutation } from "../../../../features/shipping/shippingApi";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { addShippingFlag } from "../../../../features/auth/authSlice";

export default function ShippingFormEdit({ userCollectionId, closeModal, tableRef }) {
    const formikRef = useRef();
    const dispatch = useDispatch();

    const { isModalOpen: refetch } = useModal();
    const { trigger } = useMutationApiResponse(null, ["userCollectionMemo"]);

    const [formValue, setFormValue] = useState([]);
    const [userCollectionStatus, setUserCollectionStatus] = useState();

    //Query list
    const { data: { records }, isLoading: shippingDetailLoading } = useFetchShippingQuery(userCollectionId, refetch);

    //Mutation list
    const [updateShipping, { isLoading: updateShippingLoading, isError: isUpdateShippingError }] = useUpdateShippingMutation();

    //For create
    useEffect(() => {
        resetItemForm().then(r => {
            if (records) {
                records.userCollectionRequestAt = unixTimestampToDateFormat(records.userCollectionRequestAt);
            }
        });

        if (records) {
            generateUserCollectionStatusOptions(records);
        }

    }, [records, shippingDetailLoading]);

    const resetItemForm = async () => {
        if (!shippingDetailLoading && records) {
            setFormValue(records);
            if (formikRef.current) {
                formikRef.current.resetForm();
                formikRef.current.setFieldValue(records);
            }
        }
    }

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('my values ->>>>>>>>>>>>>>', values);
        //execute only when shipped flag is 3 and statusFromFlag 2 0r 5 #113982
        if (values.userCollectionStatus==3 && (records.userCollectionStatus==2 || records.userCollectionStatus==5)) {
            if(!window.confirm('商品を発送済みにしようとしています。よろしいですか？')){
                console.log("stop saving process");
                return false;
            }
        }

        values = _.pick(values, ['userCollectionStatus', 'userCollectionMemo']);
        console.log("values", values)

        const mutatedApi = async (data) => await updateShipping({ userCollectionId, data });
        const { success, data } = await trigger({ values, setSubmitting, mutatedApi, resetForm, closeModal });
        if (success) {
            const {shippingFlag} = data || {};
            dispatch(addShippingFlag(shippingFlag));

            if (tableRef.current) {
                tableRef.current.instance.refresh();
            }
        }
    };

    const generateUserCollectionStatusOptions = (records) => {
        const userCollectionStatusOptions = [
            { id: 2, caption: "未対応" },
            { id: 5, caption: "対応中" },
            { id: 3, caption: "発送済" },
            { id: 6, caption: "キャンセル（在庫は元に戻ります）" },
            { id: 4, caption: "その他（在庫は元に戻りません）" }
        ]

        let filteredStatus = [];
        switch (records.userCollectionStatus) {
            case 2:
                filteredStatus = userCollectionStatusOptions;
                break;
            case 5:
                filteredStatus = userCollectionStatusOptions.filter((status, i) => i >= 1);
                break;
            case 3:
                filteredStatus = userCollectionStatusOptions.filter((status, i) => i >= 2);
                break;
            case 4:
                filteredStatus = userCollectionStatusOptions.filter((status, i) => i >= 3);
                break;
            case 6:
                filteredStatus = userCollectionStatusOptions.filter((status, i) => i >= 3);
                break;
        }
        setUserCollectionStatus(filteredStatus);
    }

    return (
        <div>
            {(shippingDetailLoading || updateShippingLoading) && <Loader />}

            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <ShippingForm
                            values={values}
                            setFieldValue={setFieldValue}
                            setFormValue={setFormValue}
                            isSubmitting={isSubmitting}
                            userCollectionStatus={userCollectionStatus}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}