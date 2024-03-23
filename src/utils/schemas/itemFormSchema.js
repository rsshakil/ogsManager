import * as Yup from 'yup';

const itemFormSchema = Yup.object().shape({
    itemTranslates: Yup.array().of(
        Yup.object().shape({
            itemTranslateName: Yup.string().when('itemTranslateJpFlag', {
                is: 1, // Only apply validation when itemTranslateJpFlag is 1
                then: Yup.string().required('Item name is required'),
                otherwise: Yup.string().nullable(), // No validation when flag is not 1
            })
        })
    )
});

export const ITEM_FORM_INITIAL_VALUE = {
    itemImagePath1: '',
    itemImagePath2: '',
    itemImagePath3: '',
    itemStatus: 1,
    itemShippingFlag: 1,
    itemCategoryId: 0,
    itemMemo: "",
    itemAttribute1: "",
    itemAttribute2: "",
    itemAttribute3: "",
    itemAttribute4: "",
    itemAttribute5: "",
    itemAttribute6: "",
    itemAttribute7: "",
    itemAttribute8: "",
    itemTags: [],
    itemTranslates: [],
};

export default itemFormSchema;