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
      const getItem =  sessionStorage.getItem(encode(key))
      return getItem && decode(getItem) || {}
    },
    clear: () => {
      sessionStorage.clear()
    },
  }
}
const { persistAtom } = recoilPersist({ key: 'recoil-persist', storage: localStorageBase64() })

export const modalBodyData = atom({
	key: 'modalBodyData',
	default: {
		PaymentRequestModal: [
			{ 
				"id": 1,
				"lastUpdate" : '2023年10月',
				"adminAdjustItems": {
					"status" : 1,
					"adjustmentAmount" : 98213,
				},
				"unitPriceSettings" : {
					"visitUnitPrice" : 1,
					"rehabilitationUnitPrice" : 1,
				},
				"basicTherapistSettings" : {
					"invoiceNumber" : 1,
					"bankName" : "ニコニコ銀行",
					"bankBranchName" : "スマイル支店",
					"bankAccountType" : 1,
					"bankAccountNumber" : "098234123",
					"bankAccountName" : "リハビリ　タロウ"
				},
				"rehabilitation" : {
					"rehabilitationReward" : {
						"quantity" : 10,
						"unitPrice" : 3500,
						"totalAmountIncludingTax" : 30000,
						"totalAmountExcludingTax" : 27273,
					},
					"visitReward" : {
						"quantity" : 10,
						"unitPrice" : 3500,
						"totalAmountIncludingTax" : 30000,
						"totalAmountExcludingTax" : 27273,
					},
				},
				"work" : {
					"1" : {
						"id" : 1,
						"name" : "MTG",
						"quantity" : 10,
						"unitPrice" : 3500,
						"totalAmountIncludingTax" : 30000,
						"totalAmountExcludingTax" : 27273,
					},
					"2" : {
						"id" : 2,
						"name" : "撮影[通常]",
						"quantity" : 10,
						"unitPrice" : 3500,
						"totalAmountIncludingTax" : 30000,
						"totalAmountExcludingTax" : 27273,
					},
					"3" : {
						"id" : 3,
						"name" : "撮影[特別]",
						"quantity" : 10,
						"unitPrice" : 3500,
						"totalAmountIncludingTax" : 30000,
						"totalAmountExcludingTax" : 27273,
					},
					"4" : {
						"id" : 4,
						"name" : "研修",
						"quantity" : 10,
						"unitPrice" : 3500,
						"totalAmountIncludingTax" : 30000,
						"totalAmountExcludingTax" : 27273,
					},
				},
				"taxableExpenses" : {
					"1" : {
						"id" : 1,
						"name" : "走行距離",
						"totalAmountIncludingTax" : 30000,
						"totalAmountExcludingTax" : 27273,
					},
					"2" : {
						"id" : 2,
						"name" : "立て替え",
						"totalAmountIncludingTax" : 30000,
						"totalAmountExcludingTax" : 27273,
					},
					"3" : {
						"id" : 3,
						"name" : "電車代",
						"totalAmountIncludingTax" : 30000,
						"totalAmountExcludingTax" : 27273,
					},
					"4" : {
						"id" : 4,
						"name" : "駐車場",
						"totalAmountIncludingTax" : 30000,
						"totalAmountExcludingTax" : 27273,
					},
				},
				"untaxableExpenses" : {
					"1" : {
						"id" : 1,
						"name" : "立て替え",
						"totalAmount" : 30000,
					},
					"2" : {
						"id" : 2,
						"name" : "備品購入",
						"totalAmount" : 30000,
					},
					"3" : {
						"id" : 3,
						"name" : "会員へ返金",
						"totalAmount" : 30000,
					},
					"4" : {
						"id" : 4,
						"name" : "手土産",
						"totalAmount" : 30000,
					},
				},
				"totalization" : {
					"rehabilitation" : 30000,
					"work" : 30000,
					"taxableExpenses" : 30000,
					"untaxableExpenses" : 30000,
					"consumptionTax" : 30000,
					"withholdingIncomeTax" : 30000,
					"adjustmentAmount" : 30000,
					"totalBill" : 30000,
				},
				"note" : ""
			},
		],
		InvoiceModal:  [
			{ 
				"id": 1,
				"lastUpdate" : '2023年10月',
				"adminAdjustItems": {
					"paidInsteadAmount" : 1,
					"adjustmentAmount" : 98213,
					"receiptDate" :  "2023-5-6"
				},
				"unitPriceSettings" : {
					"unitPrice30min" : 5000,
					"unitPrice60min" : 8000,
					"transportationExpenses" : 1500,
					"paymentMethod" : 1,
				},
				"rehabilitation" : {
					"_30min" : {
						"quantity" : 10,
						"unitPrice" : 3500,
						"totalAmountIncludingTax" : 30000,
					},
					"_60min" : {
						"quantity" : 10,
						"unitPrice" : 3500,
						"totalAmountIncludingTax" : 30000,
					},
					"_90min" : {
						"quantity" : 10,
						"unitPrice" : 3500,
						"totalAmountIncludingTax" : 30000,
					},
				},
				"totalization" : {
					"rehabilitation" : 30000,
					"paidInstead" : 30000,
					"adjustmentAmount" : 30000,
					"totalBill" : 30000,
				},
				"note" : ""
			},
		],
		ExpensesModal: [
			{ 
				"id": 1,
				"lastUpdate" : '2023年10月',
				"expensesName" : '経費の名前です',
				"expensesNameKane" : 'ケイヒノナマエデス',
				"consumptionTax" : 1,
				"withholdingIncomeTax" : 1,
				"status" : 1,
				"note" : ""
			},
		],
		WorksModal : [
			{ 
				"id": 1,
				"lastUpdate" : '2023年10月',
				"WorksName" : '経費の名前です',
				"WorksNameKane" : 'ケイヒノナマエデス',
				"unitPrice60min" : 3800,
				"consumptionTax" : 1,
				"withholdingIncomeTax" : 1,
				"status" : 1,
				"note" : ""
			},
		],
	},
effects_UNSTABLE: [persistAtom]
})
