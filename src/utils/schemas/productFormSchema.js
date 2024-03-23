import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import {errorMessages} from "../errorMessages";

const itemFormSchema = Yup.object().shape({
    gachaTranslates: Yup.array().of(
        Yup.object().shape({
            gachaTranslateName: Yup.string().when('gachaTranslateJpFlag', {
                is: 1, // Only apply validation when gachaTranslateJpFlag is 1
                then: Yup.string().required('Gacha translateName is required'),
                otherwise: Yup.string().nullable(), // No validation when flag is not 1
            })
        })
    ),
    gachaPrizes: Yup.array()
        .of(
            Yup.object().shape({
                gachaPrizeName: Yup.string().required('Missing gacha prize')
            })
        )
        .test(
            'atLeastOneRegularPrize',
            'At least one regular prize should be present',
            (value) => value.some((item) => item.gachaPrizeType == 0)
        ),

    gachaStartDate: Yup.number()
        .required(`${errorMessages.W_REQUIRED_01('販売期間始端')}`)
        .typeError(errorMessages.W_REQUIRED_01('販売期間始端')),

    gachaEndDate: Yup.number()
        .required(`${errorMessages.W_REQUIRED_01('販売期間終端')}`)
        .typeError(errorMessages.W_REQUIRED_01('販売期間終端'))
});

export const PRODUCT_FORM_INITIAL_VALUE = {
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
    gachaTranslates: [],
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
        },
        {
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
        },
        {
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
        }
    ],
};

export default itemFormSchema;