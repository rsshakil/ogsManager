import { Formik, Form, ErrorMessage } from "formik";
import _ from "lodash";
import { useStoreProductMutation } from "../../../../features/product/productApi";
import Loader from "../../../atoms/Loading/TherapistLoader";
import { useEffect, useRef, useState } from "react";
import useMutationApiResponse from "../../../../hooks/useMutationApiResponse";
import productFormSchema from "../../../../utils/schemas/productFormSchema";
import ProductForm from "./ProductForm";
import useFetchProductInitQuery from "../../../../hooks/useFetchProductInitQuery";
import { v4 as uuid } from 'uuid';


export default function ProductFormCreate({ closeModal, tableRef, createItemModal }) {
    const formikRef = useRef();
    const PRODUCT_FORM_INITIAL_VALUE_DEFAULT = {
        gachaDirectionId: 1,
        gachaViewFlag: 1,
        gachaStatus: 1,
        gachaSoldOutFlag: 0,
        gachaCategoryId: "",
        gachaGenreId: "",
        gachaPostStartDate: null,
        gachaStartDate: new Date().setDate(new Date().getDate() + 7),
        gachaEndDate: new Date().setFullYear(new Date().getFullYear() + 1),
        gachaRemainingDisplayFlag: 1,
        gachaMemo: "",
        gachaLimitResetPrize: [],
        gachaBonusExcludePrize: [],
        // gachaTranslates: [],
        gachaPrizes: [
            {
                gachaPrizeId: uuid(),
                gachaPrizeType: 1,
                gachaPrizeName: "天井賞",
                gachaLabel: "[おまけ]天井賞",
                newItem: 0
            },
            {
                gachaPrizeId: uuid(),
                gachaPrizeType: 2,
                gachaPrizeName: "ラストワン賞",
                gachaLabel: "[おまけ]ラストワン賞",
                newItem: 0
            },
            // {
            //     gachaPrizeId: uuid(),
            //     gachaPrizeType: 3,
            //     gachaPrizeName: "7桁キリ番賞",
            //     gachaLabel: "[おまけ]7桁キリ番賞",
            //     newItem: 0
            // },
            {
                gachaPrizeId: uuid(),
                gachaPrizeType: 4,
                gachaPrizeName: "6桁キリ番賞",
                gachaLabel: "[おまけ]6桁キリ番賞",
                newItem: 0
            }, {
                gachaPrizeId: uuid(),
                gachaPrizeType: 5,
                gachaPrizeName: "5桁キリ番賞",
                gachaLabel: "[おまけ]5桁キリ番賞",
                newItem: 0
            },
            {
                gachaPrizeId: uuid(),
                gachaPrizeType: 6,
                gachaPrizeName: "4桁キリ番賞",
                gachaLabel: "[おまけ]4桁キリ番賞",
                newItem: 0
            }, {
                gachaPrizeId: uuid(),
                gachaPrizeType: 7,
                gachaPrizeName: "3桁キリ番賞",
                gachaLabel: "[おまけ]3桁キリ番賞",
                newItem: 0
            },
            {
                gachaPrizeId: uuid(),
                gachaPrizeType: 8,
                gachaPrizeName: "2桁キリ番賞",
                gachaLabel: "[おまけ]2桁キリ番賞",
                newItem: 0
            },
            {
                gachaPrizeId: uuid(),
                gachaPrizeType: 9,
                gachaPrizeName: "1桁キリ番賞",
                gachaLabel: "[おまけ]1桁キリ番賞",
                newItem: 0
            },
            {
                gachaPrizeId: uuid(),
                gachaPrizeType: 0,
                gachaPrizeName: "自由作成賞",
                gachaLabel: "自由作成賞",
                newItem: 1
            }
        ],
    };
    const { trigger } = useMutationApiResponse(productFormSchema, ["gachaMemo", "gachaTranslateName", "gachaTranslateDescription", "gachaPrizeName"])

    const [formValue, setFormValue] = useState(PRODUCT_FORM_INITIAL_VALUE_DEFAULT);

    //Query list
    const { data: { categories = [], genres = [], tags = [], translates = [] } = {}, isFetching: itemInitLoading } = useFetchProductInitQuery();
    //Mutation list
    const [storeProduct, { isLoading: storeProductLoading, isError: isStoreProductError }] = useStoreProductMutation();


    //For create
    useEffect(() => {
        resetGachaForm();
    }, [categories, translates, genres, createItemModal]);

    const resetGachaForm = async () => {
        let updatedState = { ...PRODUCT_FORM_INITIAL_VALUE_DEFAULT };
        console.log('updatedState new created', updatedState);
        if (categories.length > 0) updatedState.gachaCategoryId = categories[0].categoryId;
        if (genres.length > 0) updatedState.gachaGenreId = genres[0].genreId;
        if (translates.length > 0) {
            updatedState.gachaTranslates = translates.map(x => ({
                translateId: x.translateId,
                translateName: x.translateName,
                gachaTranslateTranslateId: x.translateId,
                gachaTranslateName: "",
                gachaTranslateDescription: "",
                gachaTranslateImageMain: "",
                gachaTranslateImageDetail: "",
                gachaTranslateJpFlag: x.translateJpFlag,
            }));
        }
        setFormValue(updatedState)

        formikRef.current.resetForm();
        if (formikRef.current) {
            formikRef.current.setFieldValue(updatedState);
        }

    }

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        if (!values.gachaPostStartDate) values.gachaPostStartDate = values.gachaStartDate;
        console.log('my values ->>>>>>>>>>>>>>', values)
        const mutatedApi = async (data) => await storeProduct(data);
        console.log('my values after ->>>>>>>>>>>>>>', values)
        const { success } = await trigger({ values, setSubmitting, mutatedApi, resetForm, closeModal });

        if (success) {
            if (tableRef.current) {
                tableRef.current.instance.refresh();
            }
            resetGachaForm();
            resetForm();
        }
    };


    return (
        <div>
            {(itemInitLoading || storeProductLoading) && <Loader />}

            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form >
                        <ProductForm
                            values={values}
                            setFieldValue={setFieldValue}
                            setFormValue={setFormValue}
                            isSubmitting={isSubmitting}
                            categories={categories}
                            tags={tags}
                            genres={genres}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}