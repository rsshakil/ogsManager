import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
import { encode, decode } from 'js-base64';

// const { persistAtom } = recoilPersist({
//   key: 'recoil-persist', // this key is using to store data in local storage
//   storage: sessionStorage, // configurate which stroage will be used to store the data
// })

// 20230110 add'js-base64
const localStorageBase64 = () => {
	return {
		setItem: (key, value) => {
			sessionStorage.setItem(encode(key), encode(value))
		},
		getItem: (key) => {
			const getItem = sessionStorage.getItem(encode(key))
			return getItem && decode(getItem) || {}
		},
		clear: () => {
			sessionStorage.clear()
		},
	}
}
const { persistAtom } = recoilPersist({ key: 'recoil-persist', storage: localStorageBase64() })

export const tableBodyData = atom({
	key: 'tableBodyData',
	default: {
		PaymentRequest: [
			{
				"rowOrder": 1,
				"id": 1,
				"rowName": '2023年10月',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "2023年10月", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": 245, "cellColor": "" },
					{ "columnOrder": 3, "cellValue": 1, "cellColor": "" },
					{ "columnOrder": 4, "cellValue": 4, "cellColor": "" },
					{ "columnOrder": 5, "cellValue": 4200000, "cellColor": "" },
					{ "columnOrder": 6, "cellValue": 100, "cellColor": "" },
					{ "columnOrder": 7, "cellValue": 564021, "cellColor": "" },
					{ "columnOrder": 8, "cellValue": 0, "cellColor": "" },
					{ "columnOrder": 9, "cellValue": 4764121, "cellColor": "" },
					{ "columnOrder": 10, "cellValue": 423477, "cellColor": "" },
					{ "columnOrder": 11, "cellValue": 5187598, "cellColor": "" },
					{ "columnOrder": 12, "cellValue": 4658252, "cellColor": "" },
					{ "columnOrder": 13, "cellValue": 529347, "cellColor": "" },
					{ "columnOrder": 14, "cellValue": 486417, "cellColor": "" },
					{ "columnOrder": 15, "cellValue": 4701182, "cellColor": "" },
				]
			},
			{
				"rowOrder": 2,
				"id": 2,
				"rowName": '2023年09月',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "2023年09月", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": 231, "cellColor": "" },
					{ "columnOrder": 3, "cellValue": 0, "cellColor": "" },
					{ "columnOrder": 4, "cellValue": 1, "cellColor": "" },
					{ "columnOrder": 5, "cellValue": 3920000, "cellColor": "" },
					{ "columnOrder": 6, "cellValue": 25800, "cellColor": "" },
					{ "columnOrder": 7, "cellValue": 32456, "cellColor": "" },
					{ "columnOrder": 8, "cellValue": 2500, "cellColor": "" },
					{ "columnOrder": 9, "cellValue": 3975756, "cellColor": "" },
					{ "columnOrder": 10, "cellValue": 353401, "cellColor": "" },
					{ "columnOrder": 11, "cellValue": 4329157, "cellColor": "" },
					{ "columnOrder": 12, "cellValue": 3887406, "cellColor": "" },
					{ "columnOrder": 13, "cellValue": 441751, "cellColor": "" },
					{ "columnOrder": 14, "cellValue": 405925, "cellColor": "" },
					{ "columnOrder": 15, "cellValue": 3923232, "cellColor": "" },
				]
			},
			{
				"rowOrder": 3,
				"id": 3,
				"rowName": '2023年08月',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "2023年08月", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": 217, "cellColor": "" },
					{ "columnOrder": 3, "cellValue": 0, "cellColor": "" },
					{ "columnOrder": 4, "cellValue": 0, "cellColor": "" },
					{ "columnOrder": 5, "cellValue": 3750000, "cellColor": "" },
					{ "columnOrder": 6, "cellValue": 4524, "cellColor": "" },
					{ "columnOrder": 7, "cellValue": 932451, "cellColor": "" },
					{ "columnOrder": 8, "cellValue": 3000, "cellColor": "" },
					{ "columnOrder": 9, "cellValue": 4689975, "cellColor": "" },
					{ "columnOrder": 10, "cellValue": 416887, "cellColor": "" },
					{ "columnOrder": 11, "cellValue": 5106862, "cellColor": "" },
					{ "columnOrder": 12, "cellValue": 4585753, "cellColor": "" },
					{ "columnOrder": 13, "cellValue": 521108, "cellColor": "" },
					{ "columnOrder": 14, "cellValue": 478846, "cellColor": "" },
					{ "columnOrder": 15, "cellValue": 4628015, "cellColor": "" },


				]
			},
			{
				"rowOrder": 4,
				"id": 4,
				"rowName": '2023年07月',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "2023年07月", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": 203, "cellColor": "" },
					{ "columnOrder": 3, "cellValue": 0, "cellColor": "" },
					{ "columnOrder": 4, "cellValue": 0, "cellColor": "" },
					{ "columnOrder": 5, "cellValue": 2129871, "cellColor": "" },
					{ "columnOrder": 6, "cellValue": 1029182, "cellColor": "" },
					{ "columnOrder": 7, "cellValue": 657543, "cellColor": "" },
					{ "columnOrder": 8, "cellValue": 82765, "cellColor": "" },
					{ "columnOrder": 9, "cellValue": 1291, "cellColor": "" },
					{ "columnOrder": 10, "cellValue": 12876, "cellColor": "" },
					{ "columnOrder": 11, "cellValue": 109, "cellColor": "" },
					{ "columnOrder": 12, "cellValue": 67542, "cellColor": "" },
					{ "columnOrder": 13, "cellValue": 3002, "cellColor": "" },
					{ "columnOrder": 14, "cellValue": 3241, "cellColor": "" },
					{ "columnOrder": 15, "cellValue": 1827612, "cellColor": "" },

				]
			},
		],
		PaymentRequestDetail: [
			{
				"rowOrder": 1,
				"id": 1,
				"rowName": '青木　涼介',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "1", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": "無", "cellColor": "" },
					{ "columnOrder": 3, "cellValue": "TD0001", "cellColor": "" },
					{ "columnOrder": 4, "cellValue": "青木　涼介", "cellColor": "" },
					{ "columnOrder": 5, "cellValue": 1500, "cellColor": "" },
					{ "columnOrder": 6, "cellValue": 20, "cellColor": "" },
					{ "columnOrder": 7, "cellValue": 4500, "cellColor": "" },
					{ "columnOrder": 8, "cellValue": 50, "cellColor": "" },
					{ "columnOrder": 9, "cellValue": 900, "cellColor": "" },
					{ "columnOrder": 10, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 11, "cellValue": 500, "cellColor": "" },
					{ "columnOrder": 12, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 13, "cellValue": 970, "cellColor": "" },
					{ "columnOrder": 14, "cellValue": 5, "cellColor": "" },
					{ "columnOrder": 15, "cellValue": 1030, "cellColor": "" },
					{ "columnOrder": 16, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 17, "cellValue": 830, "cellColor": "" },
					{ "columnOrder": 18, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 19, "cellValue": 600, "cellColor": "" },
					{ "columnOrder": 20, "cellValue": 700, "cellColor": "" },
					{ "columnOrder": 21, "cellValue": 120, "cellColor": "" },
					{ "columnOrder": 22, "cellValue": 3000, "cellColor": "" },
					{ "columnOrder": 23, "cellValue": 246409, "cellColor": "" },
					{ "columnOrder": 24, "cellValue": 0, "cellColor": "" },
					{ "columnOrder": 25, "cellValue": 246409, "cellColor": "" },
					{ "columnOrder": 26, "cellValue": 25158, "cellColor": "" },
					{ "columnOrder": 27, "cellValue": 221251, "cellColor": "" },
					{ "columnOrder": 28, "cellValue": "2023/03/09 11:13", "cellColor": "" },
				]
			},
			{
				"rowOrder": 2,
				"id": 2,
				"rowName": '田中　百合子',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "2", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": "有", "cellColor": "" },
					{ "columnOrder": 3, "cellValue": "TD0002", "cellColor": "" },
					{ "columnOrder": 4, "cellValue": "田中　百合子", "cellColor": "" },
					{ "columnOrder": 5, "cellValue": 1500, "cellColor": "" },
					{ "columnOrder": 6, "cellValue": 20, "cellColor": "" },
					{ "columnOrder": 7, "cellValue": 4500, "cellColor": "" },
					{ "columnOrder": 8, "cellValue": 50, "cellColor": "" },
					{ "columnOrder": 9, "cellValue": 900, "cellColor": "" },
					{ "columnOrder": 10, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 11, "cellValue": 500, "cellColor": "" },
					{ "columnOrder": 12, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 13, "cellValue": 970, "cellColor": "" },
					{ "columnOrder": 14, "cellValue": 5, "cellColor": "" },
					{ "columnOrder": 15, "cellValue": 1030, "cellColor": "" },
					{ "columnOrder": 16, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 17, "cellValue": 830, "cellColor": "" },
					{ "columnOrder": 18, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 19, "cellValue": 600, "cellColor": "" },
					{ "columnOrder": 20, "cellValue": 700, "cellColor": "" },
					{ "columnOrder": 21, "cellValue": 120, "cellColor": "" },
					{ "columnOrder": 22, "cellValue": 3000, "cellColor": "" },
					{ "columnOrder": 23, "cellValue": 246409, "cellColor": "" },
					{ "columnOrder": 24, "cellValue": 0, "cellColor": "" },
					{ "columnOrder": 25, "cellValue": 246409, "cellColor": "" },
					{ "columnOrder": 26, "cellValue": 25158, "cellColor": "" },
					{ "columnOrder": 27, "cellValue": 221251, "cellColor": "" },
					{ "columnOrder": 28, "cellValue": "2023/03/09 11:13", "cellColor": "" },
					// {"columnOrder": 1, "cellValue": "○", "cellColor": "text-arrow-red"},
					// {"columnOrder": 2, "cellValue": "TD0010", "cellColor": "text-arrow-red"},
					// {"columnOrder": 3, "cellValue": "田中　百合子", "cellColor": "text-arrow-red"},
					// {"columnOrder": 4, "cellValue": 7500, "cellColor": ""},
					// {"columnOrder": 5, "cellValue": 63, "cellColor": ""},
					// {"columnOrder": 6, "cellValue": 54500, "cellColor": ""},
					// {"columnOrder": 7, "cellValue": 9500, "cellColor": ""},
					// {"columnOrder": 8, "cellValue": 95, "cellColor": ""},
					// {"columnOrder": 9, "cellValue": 883500, "cellColor": ""},
					// {"columnOrder": 10, "cellValue": 100, "cellColor": ""},
					// {"columnOrder": 11, "cellValue": 88, "cellColor": ""},
					// {"columnOrder": 12, "cellValue": 8709, "cellColor": ""},
					// {"columnOrder": 13, "cellValue": 700, "cellColor": ""},
					// {"columnOrder": 14, "cellValue": 55, "cellColor": ""},
					// {"columnOrder": 15, "cellValue": 9500, "cellColor": ""},
					// {"columnOrder": 16, "cellValue": 7970, "cellColor": ""},
					// {"columnOrder": 17, "cellValue": 5, "cellColor": ""},
					// {"columnOrder": 18, "cellValue": 4850, "cellColor": ""},
					// {"columnOrder": 19, "cellValue": 9030, "cellColor": ""},
					// {"columnOrder": 20, "cellValue": 3, "cellColor": ""},
					// {"columnOrder": 21, "cellValue": 3090, "cellColor": ""},
					// {"columnOrder": 22, "cellValue": 8830, "cellColor": ""},
					// {"columnOrder": 23, "cellValue": 3, "cellColor": ""},
					// {"columnOrder": 24, "cellValue": 12490, "cellColor": ""},
					// {"columnOrder": 25, "cellValue": 950, "cellColor": ""},
					// {"columnOrder": 26, "cellValue": 3, "cellColor": ""},
					// {"columnOrder": 27, "cellValue": 92850, "cellColor": ""},
					// {"columnOrder": 28, "cellValue": 735480, "cellColor": ""},
					// {"columnOrder": 29, "cellValue": 2400, "cellColor": ""},
					// {"columnOrder": 30, "cellValue": 5400, "cellColor": ""},
					// {"columnOrder": 31, "cellValue": 18400, "cellColor": ""},
					// {"columnOrder": 32, "cellValue": 336280, "cellColor": ""},
					// {"columnOrder": 33, "cellValue": 336280, "cellColor": ""},
					// {"columnOrder": 34, "cellValue": 4130, "cellColor": ""},
					// {"columnOrder": 35, "cellValue": 2000, "cellColor": ""},
					// {"columnOrder": 36, "cellValue": 652000, "cellColor": ""},
					// {"columnOrder": 37, "cellValue": 0, "cellColor": ""},
					// {"columnOrder": 38, "cellValue": 911421, "cellColor": ""},
					// {"columnOrder": 39, "cellValue": "2023/03/09 11:13", "cellColor": ""},

				]
			},
			{
				"rowOrder": 3,
				"id": 3,
				"rowName": '遠藤　涼介',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "3", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": "無", "cellColor": "" },
					{ "columnOrder": 3, "cellValue": "TD0003", "cellColor": "" },
					{ "columnOrder": 4, "cellValue": "遠藤　涼介", "cellColor": "" },
					{ "columnOrder": 5, "cellValue": 1500, "cellColor": "" },
					{ "columnOrder": 6, "cellValue": 20, "cellColor": "" },
					{ "columnOrder": 7, "cellValue": 4500, "cellColor": "" },
					{ "columnOrder": 8, "cellValue": 50, "cellColor": "" },
					{ "columnOrder": 9, "cellValue": 900, "cellColor": "" },
					{ "columnOrder": 10, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 11, "cellValue": 500, "cellColor": "" },
					{ "columnOrder": 12, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 13, "cellValue": 970, "cellColor": "" },
					{ "columnOrder": 14, "cellValue": 5, "cellColor": "" },
					{ "columnOrder": 15, "cellValue": 1030, "cellColor": "" },
					{ "columnOrder": 16, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 17, "cellValue": 830, "cellColor": "" },
					{ "columnOrder": 18, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 19, "cellValue": 600, "cellColor": "" },
					{ "columnOrder": 20, "cellValue": 700, "cellColor": "" },
					{ "columnOrder": 21, "cellValue": 120, "cellColor": "" },
					{ "columnOrder": 22, "cellValue": 3000, "cellColor": "" },
					{ "columnOrder": 23, "cellValue": 246409, "cellColor": "" },
					{ "columnOrder": 24, "cellValue": 0, "cellColor": "" },
					{ "columnOrder": 25, "cellValue": 246409, "cellColor": "" },
					{ "columnOrder": 26, "cellValue": 25158, "cellColor": "" },
					{ "columnOrder": 27, "cellValue": 221251, "cellColor": "" },
					{ "columnOrder": 28, "cellValue": "2023/03/09 11:13", "cellColor": "" },
					// {"columnOrder": 1, "cellValue": "", "cellColor": ""},
					// {"columnOrder": 2, "cellValue": "TD0011", "cellColor": ""},
					// {"columnOrder": 3, "cellValue": "遠藤　涼介", "cellColor": ""},
					// {"columnOrder": 4, "cellValue": 7500, "cellColor": ""},
					// {"columnOrder": 5, "cellValue": 63, "cellColor": ""},
					// {"columnOrder": 6, "cellValue": 54500, "cellColor": ""},
					// {"columnOrder": 7, "cellValue": 9500, "cellColor": ""},
					// {"columnOrder": 8, "cellValue": 95, "cellColor": ""},
					// {"columnOrder": 9, "cellValue": 883500, "cellColor": ""},
					// {"columnOrder": 10, "cellValue": 100, "cellColor": ""},
					// {"columnOrder": 11, "cellValue": 88, "cellColor": ""},
					// {"columnOrder": 12, "cellValue": 8709, "cellColor": ""},
					// {"columnOrder": 13, "cellValue": 700, "cellColor": ""},
					// {"columnOrder": 14, "cellValue": 55, "cellColor": ""},
					// {"columnOrder": 15, "cellValue": 9500, "cellColor": ""},
					// {"columnOrder": 16, "cellValue": 7970, "cellColor": ""},
					// {"columnOrder": 17, "cellValue": 5, "cellColor": ""},
					// {"columnOrder": 18, "cellValue": 4850, "cellColor": ""},
					// {"columnOrder": 19, "cellValue": 9030, "cellColor": ""},
					// {"columnOrder": 20, "cellValue": 3, "cellColor": ""},
					// {"columnOrder": 21, "cellValue": 3090, "cellColor": ""},
					// {"columnOrder": 22, "cellValue": 8830, "cellColor": ""},
					// {"columnOrder": 23, "cellValue": 3, "cellColor": ""},
					// {"columnOrder": 24, "cellValue": 12490, "cellColor": ""},
					// {"columnOrder": 25, "cellValue": 950, "cellColor": ""},
					// {"columnOrder": 26, "cellValue": 3, "cellColor": ""},
					// {"columnOrder": 27, "cellValue": 92850, "cellColor": ""},
					// {"columnOrder": 28, "cellValue": 735480, "cellColor": ""},
					// {"columnOrder": 29, "cellValue": 2400, "cellColor": ""},
					// {"columnOrder": 30, "cellValue": 5400, "cellColor": ""},
					// {"columnOrder": 31, "cellValue": 18400, "cellColor": ""},
					// {"columnOrder": 32, "cellValue": 336280, "cellColor": ""},
					// {"columnOrder": 33, "cellValue": 336280, "cellColor": ""},
					// {"columnOrder": 34, "cellValue": 4130, "cellColor": ""},
					// {"columnOrder": 35, "cellValue": 2000, "cellColor": ""},
					// {"columnOrder": 36, "cellValue": 652000, "cellColor": ""},
					// {"columnOrder": 37, "cellValue": 0, "cellColor": ""},
					// {"columnOrder": 38, "cellValue": 911421, "cellColor": ""},
					// {"columnOrder": 39, "cellValue": "2023/03/09 11:13", "cellColor": ""},
				]
			},
			{
				"rowOrder": 4,
				"id": 4,
				"rowName": '上飯田　五右衛門',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "4", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": "有", "cellColor": "" },
					{ "columnOrder": 3, "cellValue": "TD0004", "cellColor": "" },
					{ "columnOrder": 4, "cellValue": "上飯田　五右衛門", "cellColor": "" },
					{ "columnOrder": 5, "cellValue": 1500, "cellColor": "" },
					{ "columnOrder": 6, "cellValue": 20, "cellColor": "" },
					{ "columnOrder": 7, "cellValue": 4500, "cellColor": "" },
					{ "columnOrder": 8, "cellValue": 50, "cellColor": "" },
					{ "columnOrder": 9, "cellValue": 900, "cellColor": "" },
					{ "columnOrder": 10, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 11, "cellValue": 500, "cellColor": "" },
					{ "columnOrder": 12, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 13, "cellValue": 970, "cellColor": "" },
					{ "columnOrder": 14, "cellValue": 5, "cellColor": "" },
					{ "columnOrder": 15, "cellValue": 1030, "cellColor": "" },
					{ "columnOrder": 16, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 17, "cellValue": 830, "cellColor": "" },
					{ "columnOrder": 18, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 19, "cellValue": 600, "cellColor": "" },
					{ "columnOrder": 20, "cellValue": 700, "cellColor": "" },
					{ "columnOrder": 21, "cellValue": 120, "cellColor": "" },
					{ "columnOrder": 22, "cellValue": 3000, "cellColor": "" },
					{ "columnOrder": 23, "cellValue": 246409, "cellColor": "" },
					{ "columnOrder": 24, "cellValue": 0, "cellColor": "" },
					{ "columnOrder": 25, "cellValue": 246409, "cellColor": "" },
					{ "columnOrder": 26, "cellValue": 25158, "cellColor": "" },
					{ "columnOrder": 27, "cellValue": 221251, "cellColor": "" },
					{ "columnOrder": 28, "cellValue": "2023/03/09 11:13", "cellColor": "" },
					// {"columnOrder": 1, "cellValue": "", "cellColor": ""},
					// {"columnOrder": 2, "cellValue": "TD0012", "cellColor": ""},
					// {"columnOrder": 3, "cellValue": "上飯田　五右衛門", "cellColor": ""},
					// {"columnOrder": 4, "cellValue": 7500, "cellColor": ""},
					// {"columnOrder": 5, "cellValue": 63, "cellColor": ""},
					// {"columnOrder": 6, "cellValue": 54500, "cellColor": ""},
					// {"columnOrder": 7, "cellValue": 9500, "cellColor": ""},
					// {"columnOrder": 8, "cellValue": 95, "cellColor": ""},
					// {"columnOrder": 9, "cellValue": 883500, "cellColor": ""},
					// {"columnOrder": 10, "cellValue": 100, "cellColor": ""},
					// {"columnOrder": 11, "cellValue": 88, "cellColor": ""},
					// {"columnOrder": 12, "cellValue": 8709, "cellColor": ""},
					// {"columnOrder": 13, "cellValue": 700, "cellColor": ""},
					// {"columnOrder": 14, "cellValue": 55, "cellColor": ""},
					// {"columnOrder": 15, "cellValue": 9500, "cellColor": ""},
					// {"columnOrder": 16, "cellValue": 7970, "cellColor": ""},
					// {"columnOrder": 17, "cellValue": 5, "cellColor": ""},
					// {"columnOrder": 18, "cellValue": 4850, "cellColor": ""},
					// {"columnOrder": 19, "cellValue": 9030, "cellColor": ""},
					// {"columnOrder": 20, "cellValue": 3, "cellColor": ""},
					// {"columnOrder": 21, "cellValue": 3090, "cellColor": ""},
					// {"columnOrder": 22, "cellValue": 8830, "cellColor": ""},
					// {"columnOrder": 23, "cellValue": 3, "cellColor": ""},
					// {"columnOrder": 24, "cellValue": 12490, "cellColor": ""},
					// {"columnOrder": 25, "cellValue": 950, "cellColor": ""},
					// {"columnOrder": 26, "cellValue": 3, "cellColor": ""},
					// {"columnOrder": 27, "cellValue": 92850, "cellColor": ""},
					// {"columnOrder": 28, "cellValue": 735480, "cellColor": ""},
					// {"columnOrder": 29, "cellValue": 2400, "cellColor": ""},
					// {"columnOrder": 30, "cellValue": 5400, "cellColor": ""},
					// {"columnOrder": 31, "cellValue": 18400, "cellColor": ""},
					// {"columnOrder": 32, "cellValue": 336280, "cellColor": ""},
					// {"columnOrder": 33, "cellValue": 336280, "cellColor": ""},
					// {"columnOrder": 34, "cellValue": 4130, "cellColor": ""},
					// {"columnOrder": 35, "cellValue": 2000, "cellColor": ""},
					// {"columnOrder": 36, "cellValue": 652000, "cellColor": ""},
					// {"columnOrder": 37, "cellValue": 0, "cellColor": ""},
					// {"columnOrder": 38, "cellValue": 911421, "cellColor": ""},
					// {"columnOrder": 39, "cellValue": "2023/03/09 11:13", "cellColor": ""},
				]
			},
		],
		Invoice: [
			{
				"rowOrder": 1,
				"id": 1,
				"rowName": '2023年10月',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "2023年10月", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": 216, "cellColor": "" },
					{ "columnOrder": 3, "cellValue": 145234, "cellColor": "" },
					{ "columnOrder": 4, "cellValue": 4200000, "cellColor": "" },
					{ "columnOrder": 5, "cellValue": 3454, "cellColor": "" },
					{ "columnOrder": 6, "cellValue": 254000, "cellColor": "" },
					{ "columnOrder": 7, "cellValue": 3254000, "cellColor": "" },
					{ "columnOrder": 8, "cellValue": 'Pdf', "cellColor": "" },
				]
			},
			{
				"rowOrder": 2,
				"id": 2,
				"rowName": '2023年09月',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "2023年09月", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": 220, "cellColor": "" },
					{ "columnOrder": 3, "cellValue": 91823, "cellColor": "" },
					{ "columnOrder": 4, "cellValue": 1726518, "cellColor": "" },
					{ "columnOrder": 5, "cellValue": 1555, "cellColor": "" },
					{ "columnOrder": 6, "cellValue": 154050, "cellColor": "" },
					{ "columnOrder": 7, "cellValue": 554050, "cellColor": "" },
					{ "columnOrder": 8, "cellValue": 'Pdf', "cellColor": "" },
				]
			},
			{
				"rowOrder": 3,
				"id": 3,
				"rowName": '2023年08月',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "2023年08月", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": 113, "cellColor": "" },
					{ "columnOrder": 3, "cellValue": 22310, "cellColor": "" },
					{ "columnOrder": 4, "cellValue": 9817263, "cellColor": "" },
					{ "columnOrder": 5, "cellValue": 10, "cellColor": "" },
					{ "columnOrder": 6, "cellValue": 272653, "cellColor": "" },
					{ "columnOrder": 7, "cellValue": 5272653, "cellColor": "" },
					{ "columnOrder": 8, "cellValue": 'Pdf', "cellColor": "" },
				]
			},
			{
				"rowOrder": 4,
				"id": 4,
				"rowName": '2023年07月',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "2023年07月", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": 210, "cellColor": "" },
					{ "columnOrder": 3, "cellValue": 15230, "cellColor": "" },
					{ "columnOrder": 4, "cellValue": 2129871, "cellColor": "" },
					{ "columnOrder": 5, "cellValue": 51231, "cellColor": "" },
					{ "columnOrder": 6, "cellValue": 1029182, "cellColor": "" },
					{ "columnOrder": 7, "cellValue": 9129182, "cellColor": "" },
					{ "columnOrder": 8, "cellValue": 'Pdf', "cellColor": "" },
				]
			},
		],
		InvoiceDetail: [
			{
				"rowOrder": 1,
				"id": 1,
				"rowName": '青木　涼介',
				"rowValue": [
					/////////////////////////////////////////////////
					{ "columnOrder": 1, "cellValue": "1", "cellColor": "" },
					//////////////////////////////////////////////追加
					{ "columnOrder": 2, "cellValue": "青木　涼介", "cellColor": "" },

					{ "columnOrder": 3, "cellValue": 3500, "cellColor": "" },
					{ "columnOrder": 4, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 5, "cellValue": 74500, "cellColor": "" },

					{ "columnOrder": 6, "cellValue": 5500, "cellColor": "" },
					{ "columnOrder": 7, "cellValue": 6, "cellColor": "" },
					{ "columnOrder": 8, "cellValue": 64500, "cellColor": "" },

					{ "columnOrder": 9, "cellValue": 9500, "cellColor": "" },
					{ "columnOrder": 10, "cellValue": 12, "cellColor": "" },
					{ "columnOrder": 11, "cellValue": 34500, "cellColor": "" },
					/////////////////////////////////////////////////
					{ "columnOrder": 12, "cellValue": 9500, "cellColor": "" },
					{ "columnOrder": 13, "cellValue": 12, "cellColor": "" },
					{ "columnOrder": 14, "cellValue": 34500, "cellColor": "" },
					//////////////////////////////////////////////追加





					{ "columnOrder": 15, "cellValue": 4200000, "cellColor": "" },
					{ "columnOrder": 16, "cellValue": 254000, "cellColor": "" },
					{ "columnOrder": 17, "cellValue": 254000, "cellColor": "" },

					{ "columnOrder": 18, "cellValue": '2023/03/09 11:13', "cellColor": "" },
				]
			},
			{
				"rowOrder": 2,
				"id": 2,
				"rowName": 'ニコニコホーム',
				"rowValue": [
					/////////////////////////////////////////////////
					{ "columnOrder": 1, "cellValue": "2", "cellColor": "" },
					//////////////////////////////////////////////追加
					{ "columnOrder": 2, "cellValue": "ニコニコホーム", "cellColor": "" },

					{ "columnOrder": 3, "cellValue": 4000, "cellColor": "" },
					{ "columnOrder": 4, "cellValue": 3, "cellColor": "" },
					{ "columnOrder": 5, "cellValue": 12500, "cellColor": "" },

					{ "columnOrder": 6, "cellValue": 5000, "cellColor": "" },
					{ "columnOrder": 7, "cellValue": 6, "cellColor": "" },
					{ "columnOrder": 8, "cellValue": 75000, "cellColor": "" },

					{ "columnOrder": 9, "cellValue": 9000, "cellColor": "" },
					{ "columnOrder": 10, "cellValue": 1, "cellColor": "" },
					{ "columnOrder": 11, "cellValue": 9000, "cellColor": "" },

					/////////////////////////////////////////////////
					{ "columnOrder": 12, "cellValue": 9000, "cellColor": "" },
					{ "columnOrder": 13, "cellValue": 1, "cellColor": "" },
					{ "columnOrder": 14, "cellValue": 9000, "cellColor": "" },
					//////////////////////////////////////////////追加

					{ "columnOrder": 15, "cellValue": 145234, "cellColor": "" },
			
					{ "columnOrder": 16, "cellValue": 890167, "cellColor": "" },

					{ "columnOrder": 17, "cellValue": 134514, "cellColor": "" },
					{ "columnOrder": 18, "cellValue": '2023/03/09 11:13', "cellColor": "" },
				]
			},
		],
		Expenses: [
			{
				"rowOrder": 1,
				"id": 1,
				"rowName": '交通費',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "交通費", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": "コウツウヒ", "cellColor": "" },
					{ "columnOrder": 3, "cellValue": "●", "cellColor": "" },
					{ "columnOrder": 4, "cellValue": "●", "cellColor": "" },
					{ "columnOrder": 5, "cellValue": "停止", "cellColor": "" },
					{ "columnOrder": 6, "cellValue": '2023/03/09 11:13', "cellColor": "" },
				]
			},
			{
				"rowOrder": 2,
				"id": 2,
				"rowName": '駐車場代',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "駐車場代", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": "AAちゅうしゃ", "cellColor": "" },
					{ "columnOrder": 3, "cellValue": "●", "cellColor": "" },
					{ "columnOrder": 4, "cellValue": "", "cellColor": "" },
					{ "columnOrder": 5, "cellValue": "", "cellColor": "" },
					{ "columnOrder": 6, "cellValue": '2023/11/29 01:03', "cellColor": "" },

				]
			},
			{
				"rowOrder": 3,
				"id": 3,
				"rowName": '打ち合わせ喫茶店',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "打ち合わせ喫茶店", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": "※A&&&", "cellColor": "" },
					{ "columnOrder": 3, "cellValue": "", "cellColor": "" },
					{ "columnOrder": 4, "cellValue": "", "cellColor": "" },
					{ "columnOrder": 5, "cellValue": "", "cellColor": "" },
					{ "columnOrder": 6, "cellValue": '2023/05/22 09:01', "cellColor": "" },
				]
			},
			{
				"rowOrder": 4,
				"id": 4,
				"rowName": '電気代',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "電気代", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": "DENKIDAI", "cellColor": "" },
					{ "columnOrder": 3, "cellValue": "●", "cellColor": "" },
					{ "columnOrder": 4, "cellValue": "", "cellColor": "" },
					{ "columnOrder": 5, "cellValue": "", "cellColor": "" },
					{ "columnOrder": 6, "cellValue": '2024/09/09 15:08', "cellColor": "" },
				]
			},
			{
				"rowOrder": 5,
				"id": 5,
				"rowName": '会員様への返金',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "会員様への返金", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": "ｶｲｲﾝｻﾏﾍﾉﾍ", "cellColor": "" },
					{ "columnOrder": 3, "cellValue": "", "cellColor": "" },
					{ "columnOrder": 4, "cellValue": "", "cellColor": "" },
					{ "columnOrder": 5, "cellValue": "", "cellColor": "" },
					{ "columnOrder": 6, "cellValue": '2024/12/09 18:04', "cellColor": "" },
				]
			},
			{
				"rowOrder": 6,
				"id": 6,
				"rowName": '切手代',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "切手代", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": "T0001", "cellColor": "" },
					{ "columnOrder": 3, "cellValue": "", "cellColor": "" },
					{ "columnOrder": 4, "cellValue": "●", "cellColor": "" },
					{ "columnOrder": 5, "cellValue": "停止", "cellColor": "" },
					{ "columnOrder": 6, "cellValue": '2023/06/22 10:07', "cellColor": "" },
				]
			},

		],
		Works: [
			{
				"rowOrder": 1,
				"id": 1,
				"rowName": 'MTG',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "MTG", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": "ミーティング", "cellColor": "" },
					{ "columnOrder": 3, "cellValue": 0, "cellColor": "" },
					{ "columnOrder": 4, "cellValue": 0, "cellColor": "" },
					{ "columnOrder": 5, "cellValue": "●", "cellColor": "" },
					{ "columnOrder": 6, "cellValue": "●", "cellColor": "" },
					{ "columnOrder": 7, "cellValue": "停止", "cellColor": "" },
					{ "columnOrder": 8, "cellValue": '2023/03/09 11:13', "cellColor": "" },
				]
			},
			{
				"rowOrder": 2,
				"id": 2,
				"rowName": '撮影[通常]',
				"rowValue": [
					{ "columnOrder": 1, "cellValue": "撮影[通常]", "cellColor": "" },
					{ "columnOrder": 2, "cellValue": "1サツエイ", "cellColor": "" },
					{ "columnOrder": 3, "cellValue": 0, "cellColor": "" },
					{ "columnOrder": 4, "cellValue": 0, "cellColor": "" },
					{ "columnOrder": 5, "cellValue": "●", "cellColor": "" },
					{ "columnOrder": 6, "cellValue": "●", "cellColor": "" },
					{ "columnOrder": 7, "cellValue": "", "cellColor": "" },
					{ "columnOrder": 8, "cellValue": '2023/03/09 11:13', "cellColor": "" },
				]
			},

		],

	},
	effects_UNSTABLE: [persistAtom]
})
