import * as Yup from 'yup';
import {errorMessages} from "../errorMessages";
import RegularExpression from "../regularExpression";

const couponFormSchema = Yup.object().shape({
    couponName: Yup.string()
        .required(errorMessages.W_REQUIRED_01('クーポン名'))
        .min(4, errorMessages.W_BETWEEN_01('クーポン名', 4, 32))
        .max(32, errorMessages.W_BETWEEN_01('クーポン名', 4, 32)),

    couponCode: Yup.string()
        .required(errorMessages.W_REQUIRED_01('クーポンコード'))
        .min(8, errorMessages.W_BETWEEN_01('クーポンコード', 8, 64))
        .max(64, errorMessages.W_BETWEEN_01('クーポンコード', 8, 64))
        .matches(RegularExpression.couponValidation, errorMessages.W_CHECK('クーポンコード')),

    couponStartDate: Yup.number()
        .required(`${errorMessages.W_REQUIRED_01('販売期間始端')}`)
        .typeError(errorMessages.W_REQUIRED_01('販売期間始端')),

    couponEndDate: Yup.number()
        .required(`${errorMessages.W_REQUIRED_01('販売期間終端')}`)
        .typeError(errorMessages.W_REQUIRED_01('販売期間終端'))
        .when('couponStartDate', (couponStartDate, schema) => {
            return couponStartDate
                ? schema.min(couponStartDate, `${errorMessages.W_REQUIRED_01('販売期間終端')}は販売期間始端より後の日付である必要があります。`)
                : schema;
        }),

    couponLimitCount: Yup.number()
        .required(errorMessages.W_REQUIRED_01('利用上限数'))
        .typeError(errorMessages.W_REQUIRED_01('利用上限数'))
        .min(1, errorMessages.W_BETWEEN_01('利用上限数', 1, 9999999))
        .max(9999999, errorMessages.W_BETWEEN_01('利用上限数', 1, 9999999)),

    couponPoint: Yup.number()
        .required(errorMessages.W_REQUIRED_01('付与pt数'))
        .typeError(errorMessages.W_REQUIRED_01('付与pt数'))
        .min(1, errorMessages.W_BETWEEN_01('付与pt数', 1, 9999999))
        .max(9999999, errorMessages.W_BETWEEN_01('付与pt数', 1, 9999999)),
});

export const COUPON_FORM_INITIAL_VALUE = {
    couponName: '',
    couponCode: '',
    couponStatus: 1,
    couponStartDate: Date.now(),
    couponEndDate: new Date().setDate(new Date().getDate() + 14),
    couponLimitCount: 1,
    couponPoint: 1
};

export default couponFormSchema;