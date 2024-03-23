import * as Yup from 'yup';
import { errorMessages } from '../errorMessages';
import { gachaPriceFieldLabelMapper, keyTypeMapper } from '../../components/Form/forms/gacha/GachaFormEdit';
let gachaLuckyNumber1Value = "";
let gachaLuckyNumber2Value = "";
let gachaLuckyNumber3Value = "";
let gachaLuckyNumber4Value = "";
let gachaLuckyNumber5Value = "";
let gachaLuckyNumber6Value = "";
let gachaLuckyNumber7Value = "";
let gachaLastOneValue = 0;
const gachaFormSchema = Yup.object().shape({
    gachaTotalCount: Yup.string()
        .required(errorMessages.W_REQUIRED_01('総数'))
        .min(0, errorMessages.W_BETWEEN_01('未使用在庫', 0, 200000))
        .max(200000, errorMessages.W_BETWEEN_01('未使用在庫', 0, 200000))
        .when('gachaEmissionTotalCount', {
            is: (gachaEmissionTotalCount) => gachaEmissionTotalCount !== undefined,
            then: Yup.string().test(
                'same',
                'gachaEmissionTotalCount and gachaTotalCount should be the same',
                function (value) {
                    const { gachaEmissionTotalCount, gachaTotalCount } = this.parent || {};
                    return gachaEmissionTotalCount == gachaTotalCount;
                }
            ),
        }),

    gachaSinglePoint: Yup.string()
        .required(errorMessages.W_REQUIRED_01('単発販売pt'))
        .min(0, errorMessages.W_BETWEEN_01('未使用在庫', 0, 9999999))
        .max(9999999, errorMessages.W_BETWEEN_01('未使用在庫', 0, 9999999)),

    gachaConosecutiveCount: Yup.string()
        .required(errorMessages.W_REQUIRED_01('連続数'))
        .min(0, errorMessages.W_BETWEEN_01('未使用在庫', 0, 999))
        .max(999, errorMessages.W_BETWEEN_01('未使用在庫', 0, 999)),

    gachaConosecutivePoint: Yup.string()
        .required(errorMessages.W_REQUIRED_01('連続販売pt'))
        .min(0, errorMessages.W_BETWEEN_01('未使用在庫', 0, 9999999))
        .max(9999999, errorMessages.W_BETWEEN_01('未使用在庫', 0, 9999999)),

    gachaLimitOncePerDay: Yup.string()
        .required(errorMessages.W_REQUIRED_01('一人あたりの1日の回数制限'))
        .min(0, errorMessages.W_BETWEEN_01('未使用在庫', 0, 200000))
        .max(200000, errorMessages.W_BETWEEN_01('未使用在庫', 0, 200000)),

    gachaLimitOnce: Yup.string()
        .required(errorMessages.W_REQUIRED_01('一人あたりの総回数制限'))
        .min(0, errorMessages.W_BETWEEN_01('未使用在庫', 0, 200000))
        .max(200000, errorMessages.W_BETWEEN_01('未使用在庫', 0, 200000)),

    gachaLimitEveryonePerDay: Yup.string()
        .required(errorMessages.W_REQUIRED_01('一日当たりの総消化数制限'))
        .min(0, errorMessages.W_BETWEEN_01('未使用在庫', 0, 200000))
        .max(200000, errorMessages.W_BETWEEN_01('未使用在庫', 0, 200000)),

    gachaAllRestCount: Yup.string()
        .required(errorMessages.W_REQUIRED_01('残り全部引く指定枚数'))
        .max(999, '999以下で指定してください'),

    gachaLimitCount: Yup.string()
        .required(errorMessages.W_REQUIRED_01('天井数'))
        .min(0, errorMessages.W_BETWEEN_01('未使用在庫', 0, 200000))
        .max(200000, errorMessages.W_BETWEEN_01('未使用在庫', 0, 200000)),

    gachaLuckyNumber1: Yup.string()
        .nullable()
        .transform((value, originalValue) => (originalValue === '' ? null : value))
        .matches(/^[0-9]{1}$/, errorMessages.W_BETWEEN_01('未使用在庫', '0', '9'))
        .test('gachaLuckyNumber1Value', 'assign value to variable', (value) => {
            gachaLuckyNumber1Value = value;
            return true;
        }),

    gachaLuckyNumber2: Yup.string()
        .nullable()
        .transform((value, originalValue) => (originalValue === '' ? null : value))
        .matches(/^[0-9]{2}$/, errorMessages.W_BETWEEN_01('未使用在庫', '00', '99'))
        .test('gachaLuckyNumber2Value', 'assign value to variable', (value) => {
            gachaLuckyNumber2Value = value;
            return true;
        }),

    gachaLuckyNumber3: Yup.string()
        .nullable()
        .transform((value, originalValue) => (originalValue === '' ? null : value))
        .matches(/^[0-9]{3}$/, errorMessages.W_BETWEEN_01('未使用在庫', '000', '999'))
        .test('gachaLuckyNumber3Value', 'assign value to variable', (value) => {
            gachaLuckyNumber3Value = value;
            return true;
        }),

    gachaLuckyNumber4: Yup.string()
        .nullable()
        .transform((value, originalValue) => (originalValue === '' ? null : value))
        .matches(/^[0-9]{4}$/, errorMessages.W_BETWEEN_01('未使用在庫', '0000', '9999'))
        .test('gachaLuckyNumber4Value', 'assign value to variable', (value) => {
            gachaLuckyNumber4Value = value;
            return true;
        }),

    gachaLuckyNumber5: Yup.string()
        .nullable()
        .transform((value, originalValue) => (originalValue === '' ? null : value))
        .matches(/^[0-9]{5}$/, errorMessages.W_BETWEEN_01('未使用在庫', '00000', '99999'))
        .test('gachaLuckyNumber5Value', 'assign value to variable', (value) => {
            gachaLuckyNumber5Value = value;
            return true;
        }),

    gachaLuckyNumber6: Yup.string()
        .nullable()
        .transform((value, originalValue) => (originalValue === '' ? null : value))
        .matches(/^[0-9]{6}$/, errorMessages.W_BETWEEN_01('未使用在庫', '000000', '999999'))
        .test('gachaLuckyNumber6Value', 'assign value to variable', (value) => {
            gachaLuckyNumber6Value = value;
            return true;
        }),

    gachaLuckyNumber7: Yup.string()
        .nullable()
        .transform((value, originalValue) => (originalValue === '' ? null : value))
        .matches(/^[0-9]{7}$/, errorMessages.W_BETWEEN_01('未使用在庫', '0000000', '9999999'))
        .test('gachaLuckyNumber7Value', 'assign value to variable', (value) => {
            gachaLuckyNumber7Value = value;
            return true;
        }),

    gachaLastOneFlag:Yup.string()
        .nullable()
        .test('gachaLastOneValue', 'assign value to variable', (value) => {
            gachaLastOneValue = value;
            return true;
        }),
    gachaPrizes: Yup.array().of(
        Yup.object().shape({
            gachaPrizePoint: Yup.string()
                .test(
                    'required',
                    '',
                    function (value) {
                        const { gachaPrizePoint, gachaPrizeType } = this.parent || {};

                        if (gachaPrizePoint == undefined || gachaPrizePoint == "") {
                            return new Yup.ValidationError(
                                errorMessages.W_REQUIRED_01(gachaPriceFieldLabelMapper[gachaPrizeType] + keyTypeMapper['awardPoint']),
                                null,
                                'gachaPrizePoint'
                            );
                        }
                        return true;
                    }),
            gachaPrizeEmissionsCount: Yup.string()
                .test(
                    'required',
                    '',
                    function (value) {
                        const { gachaPrizeEmissionsCount, gachaPrizeType } = this.parent || {};

                        if (gachaPrizeEmissionsCount == undefined || gachaPrizeEmissionsCount == "") {
                            return new Yup.ValidationError(
                                errorMessages.W_REQUIRED_01(gachaPriceFieldLabelMapper[gachaPrizeType] + keyTypeMapper['emissionCount']),
                                null,
                                'gachaPrizeEmissionsCount'
                            );
                        }
                        return true;
                }),
/*
            gachaPrizeSetItem: Yup.array().nullable()
                .test('required','',
                    function (value) {
                        console.log("item value",value);
                        console.log("item validation",this.parent);
                        const { gachaPrizeSetItem, gachaPrizeType, gachaPrizeSetVideo } = this.parent || {};//get object
                        console.log("gachaPrizeSetItem",gachaPrizeSetItem);
                        console.log("gachaPrizeType",gachaPrizeType);
                        //is it last one or kiriban?
                        switch(gachaPrizeType){
                            case 2://its lastOne
                                if (gachaLastOneValue==1) {
                                    if(!gachaPrizeSetItem || gachaPrizeSetItem.length==0){
                                        return new Yup.ValidationError(
                                            "賞のアイテム設定を確認してください",
                                            null,
                                            'gachaPrizeSetItem'
                                        );
                                    }else if(!gachaPrizeSetVideo || gachaPrizeSetVideo.length==0){
                                        return new Yup.ValidationError(
                                            "抽選動画設定を確認してください",
                                            null,
                                            'gachaPrizeSetVideo'
                                        );
                                    }
                                }
                            break;
                            case 3://its a kiriban of "7桁キリ番賞";
                                if (gachaLuckyNumber7Value!=="" && gachaLuckyNumber7Value!==null) {
                                    if(!gachaPrizeSetItem || gachaPrizeSetItem.length==0){
                                        return new Yup.ValidationError(
                                            "賞のアイテム設定を確認してください",
                                            null,
                                            'gachaPrizeSetItem'
                                        );
                                    }else if(!gachaPrizeSetVideo || gachaPrizeSetVideo.length==0){
                                        return new Yup.ValidationError(
                                            "抽選動画設定を確認してください",
                                            null,
                                            'gachaPrizeSetVideo'
                                        );
                                    }
                                }
                            break;
                            case 4://its a kiriban of "6桁キリ番賞";
                                if (gachaLuckyNumber6Value!=="" && gachaLuckyNumber6Value!==null) {
                                    if(!gachaPrizeSetItem || gachaPrizeSetItem.length==0){
                                        return new Yup.ValidationError(
                                            "賞のアイテム設定を確認してください",
                                            null,
                                            'gachaPrizeSetItem'
                                        );
                                    }else if(!gachaPrizeSetVideo || gachaPrizeSetVideo.length==0){
                                        return new Yup.ValidationError(
                                            "抽選動画設定を確認してください",
                                            null,
                                            'gachaPrizeSetVideo'
                                        );
                                    }
                                }
                            break;
                            case 5://its a kiriban of "5桁キリ番賞";
                                if (gachaLuckyNumber5Value!=="" && gachaLuckyNumber5Value!==null) {
                                    if(!gachaPrizeSetItem || gachaPrizeSetItem.length==0){
                                        return new Yup.ValidationError(
                                            "賞のアイテム設定を確認してください",
                                            null,
                                            'gachaPrizeSetItem'
                                        );
                                    }else if(!gachaPrizeSetVideo || gachaPrizeSetVideo.length==0){
                                        return new Yup.ValidationError(
                                            "抽選動画設定を確認してください",
                                            null,
                                            'gachaPrizeSetVideo'
                                        );
                                    }
                                }
                            break;
                            case 6://its a kiriban of "4桁キリ番賞";
                                if (gachaLuckyNumber4Value!=="" && gachaLuckyNumber4Value!==null) {
                                    if(!gachaPrizeSetItem || gachaPrizeSetItem.length==0){
                                        return new Yup.ValidationError(
                                            "賞のアイテム設定を確認してください",
                                            null,
                                            'gachaPrizeSetItem'
                                        );
                                    }else if(!gachaPrizeSetVideo || gachaPrizeSetVideo.length==0){
                                        return new Yup.ValidationError(
                                            "抽選動画設定を確認してください",
                                            null,
                                            'gachaPrizeSetVideo'
                                        );
                                    }
                                }
                            break;
                            case 7://its a kiriban of "3桁キリ番賞";
                                if (gachaLuckyNumber3Value!=="" && gachaLuckyNumber3Value!==null) {
                                    if(!gachaPrizeSetItem || gachaPrizeSetItem.length==0){
                                        return new Yup.ValidationError(
                                            "賞のアイテム設定を確認してください",
                                            null,
                                            'gachaPrizeSetItem'
                                        );
                                    }else if(!gachaPrizeSetVideo || gachaPrizeSetVideo.length==0){
                                        return new Yup.ValidationError(
                                            "抽選動画設定を確認してください",
                                            null,
                                            'gachaPrizeSetVideo'
                                        );
                                    }
                                }
                            break;
                            case 8://its a kiriban "2桁キリ番賞";
                                if (gachaLuckyNumber2Value!=="" && gachaLuckyNumber2Value!==null) {
                                    if(!gachaPrizeSetItem || gachaPrizeSetItem.length==0){
                                        return new Yup.ValidationError(
                                            "賞のアイテム設定を確認してください",
                                            null,
                                            'gachaPrizeSetItem'
                                        );
                                    }else if(!gachaPrizeSetVideo || gachaPrizeSetVideo.length==0){
                                        return new Yup.ValidationError(
                                            "抽選動画設定を確認してください",
                                            null,
                                            'gachaPrizeSetVideo'
                                        );
                                    }
                                }
                            break;
                            case 9://its a kiriban of "1桁キリ番賞";
                                if (gachaLuckyNumber1Value!=="" && gachaLuckyNumber1Value!==null) {
                                    if(!gachaPrizeSetItem || gachaPrizeSetItem.length==0){
                                        return new Yup.ValidationError(
                                            "賞のアイテム設定を確認してください",
                                            null,
                                            'gachaPrizeSetItem'
                                        );
                                    }else if(!gachaPrizeSetVideo || gachaPrizeSetVideo.length==0){
                                        return new Yup.ValidationError(
                                            "抽選動画設定を確認してください",
                                            null,
                                            'gachaPrizeSetVideo'
                                        );
                                    }
                                }
                            break;
                            default:
                                return true;
                            break;
                        }
                        return true;
                    }),
*/
        })
    ),
});


export const GACHA_FORM_INITIAL_VALUE = {
    gachaTotalCount: 1,
    gachaLoopFlag: 0,
    gachaSinglePoint: '',
    gachaConosecutiveCount: 10,
    gachaConosecutivePoint: '',
    gachaLimitOncePerDay: '',
    gachaLimitOnce: "",
    gachaLimitEveryonePerDay: "",
    gachaAllRestCount: 0,
    gachaLimitCount: 0,
    gachaLastOneFlag: 0,
    gachaLuckyNumber1: "",
    gachaLuckyNumber1MatchFlag: 0,
    gachaLuckyNumber2: "",
    gachaLuckyNumber2MatchFlag: 0,
    gachaLuckyNumber3: "",
    gachaLuckyNumber3MatchFlag: 0,
    gachaLuckyNumber4: "",
    gachaLuckyNumber4MatchFlag: 0,
    gachaLuckyNumber5: "",
    gachaLuckyNumber5MatchFlag: 0,
    gachaLuckyNumber6: "",
    gachaLuckyNumber6MatchFlag: 0,
    gachaLuckyNumber7: "",
    gachaLuckyNumber7MatchFlag: 0,
    gachaPrizes: [],
    gachaMemo: "",
    gachaEmissionTotalCount: 0,
};

export default gachaFormSchema;