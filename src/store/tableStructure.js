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

export const tableStructure = atom({
    key: 'tableStructure',
    default: {
        PaymentRequest: {
            gridTemplateColumns: [
                // { "columnOrder": 1, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 2, "type": "unitPrice", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 3, "type": "unitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 4, "type": "unitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 5, "type": "auto", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 6, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 7, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 8, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 9, "type": "auto", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 10, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 11, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 12, "type": "auto", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 13, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 14, "type": "auto", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // //////////////////////下部カラムを２個追加しました。間宮////////////////////////
                // { "columnOrder": 15, "type": "auto", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 16, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // //////////////////////////////////////////////////////////////////////////////
                // { "columnOrder": 17, "type": "sumTotal", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },

                // { "columnOrder": 1, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "text-center items-center grid", "columnColor": "" },
                // { "columnOrder": 2, "type": "auto", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 3, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 4, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 5, "type": "auto", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 6, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 7, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 8, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 9, "type": "auto", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 10, "type": "auto", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 11, "type": "sumTotal", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 12, "type": "sumTotal", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 13, "type": "sumTotal", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 14, "type": "auto", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 15, "type": "sumTotal", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" }

            ],
            headerStructure: [
                //                 { "headerColumnOrder": 1, "tableHeaderRow":1, "headerText": "集計月", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": false, "rightShadow": false},

                //                 { "headerColumnOrder": 2, "tableHeaderRow":1, "headerText": "請求数", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false},

                //                 { "headerColumnOrder": 3, "tableHeaderRow":1, "headerText": "ステータス", "addCellClass": "", "colSpan": "col-span-2", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false},
                //                 { "headerColumnOrder": 4, "tableHeaderRow":1, "headerText": "リハビリ", "addCellClass": "", "colSpan": "col-span-2", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false},
                //                 { "headerColumnOrder": 5, "tableHeaderRow":1, "headerText": "その他業務", "addCellClass": "", "colSpan": "col-span-2", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false},

                //                 { "headerColumnOrder": 6, "tableHeaderRow":1, "headerText": "課税経費", "addCellClass": "", "colSpan": "col-span-2", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false},

                //                 { "headerColumnOrder": 7, "tableHeaderRow":1, "headerText": "非課税経費", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": false, "rightShadow": false},

                //                 { "headerColumnOrder": 8, "tableHeaderRow":1, "headerText": "消費税", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false},
                //                 { "headerColumnOrder": 9, "tableHeaderRow":1, "headerText": "源泉", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": false, "rightShadow": false},
                //                 { "headerColumnOrder": 10,  "tableHeaderRow":1, "headerText": "調整", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false},
                // //////////////////////////下部カラムを２個追加しました。間宮/////////////////////////
                //                 { "headerColumnOrder": 11, "tableHeaderRow":1, "headerText": "税抜小計", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false},
                //                 { "headerColumnOrder": 12, "tableHeaderRow":1, "headerText": "税込小計", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": false, "rightShadow": false},
                // ///////////////////////////////////////////////////////////////////////////////            
                //                 { "headerColumnOrder": 13,  "tableHeaderRow":1, "headerText": "支払総額", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false},

                //                 { "headerColumnOrder": 14, "tableHeaderRow":2, "headerText": "未請求数", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false},
                //                 { "headerColumnOrder": 15, "tableHeaderRow":2, "headerText": "承認待ち", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false},

                //                 { "headerColumnOrder": 16,  "tableHeaderRow":2, "headerText": "消費税あり", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false},
                //                 { "headerColumnOrder": 17,  "tableHeaderRow":2, "headerText": "消費税なし", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false},

                //                 { "headerColumnOrder": 18,  "tableHeaderRow":2, "headerText": "消費税あり", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false},
                //                 { "headerColumnOrder": 19,  "tableHeaderRow":2, "headerText": "消費税なし", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false},

                //                 { "headerColumnOrder": 20,  "tableHeaderRow":2, "headerText": "消費税あり", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false},
                //                 { "headerColumnOrder": 21,  "tableHeaderRow":2, "headerText": "消費税なし", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false},
                //             ]


                // { "headerColumnOrder": 1, "tableHeaderRow": 1, "headerText": "集計月", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 2, "tableHeaderRow": 1, "headerText": "請求数", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 3, "tableHeaderRow": 1, "headerText": "ステータス", "addCellClass": "", "colSpan": "col-span-2", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 4, "tableHeaderRow": 1, "headerText": "報酬額(税抜)", "addCellClass": "", "colSpan": "col-span-4", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 5, "tableHeaderRow": 1, "headerText": "報酬本体(税抜)", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 6, "tableHeaderRow": 1, "headerText": "消費税額", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 7, "tableHeaderRow": 1, "headerText": "報酬合計(税込)", "addCellClass": "", "colSpan": "col-span-3", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 8, "tableHeaderRow": 1, "headerText": "源泉所得税", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 9, "tableHeaderRow": 1, "headerText": "支払額", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },




                // { "headerColumnOrder": 10, "tableHeaderRow": 2, "headerText": "未請求数", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 11, "tableHeaderRow": 2, "headerText": "承認待ち", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 12, "tableHeaderRow": 2, "headerText": "リハビリ", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 13, "tableHeaderRow": 2, "headerText": "その他業務", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 14, "tableHeaderRow": 2, "headerText": "経費", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 15, "tableHeaderRow": 2, "headerText": "調整額", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 16, "tableHeaderRow": 2, "headerText": "報酬合計", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 17, "tableHeaderRow": 2, "headerText": "うち登録有合計", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 18, "tableHeaderRow": 2, "headerText": "うち登録無合計", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
            ]
        },
        PaymentRequestDetail: {
            gridTemplateColumns: [        
                // { "columnOrder": 1, "type": "symbol", "leftBorder": false, "isSticky": true, "rightShadow": false, "dataType": "string", "addCellClass": "left-[0px] text-center items-center grid", "columnColor": "" },
                // { "columnOrder": 2, "type": "quantity", "leftBorder": false, "isSticky": true, "rightShadow": false, "dataType": "string", "addCellClass": "left-[2rem] text-center items-center grid", "columnColor": "" },
                // { "columnOrder": 3, "type": "id", "leftBorder": false, "isSticky": true, "rightShadow": false, "dataType": "string", "addCellClass": "left-[4.5rem] text-center items-center grid", "columnColor": "" },
                // { "columnOrder": 4, "type": "name", "leftBorder": false, "isSticky": true, "rightShadow": false, "dataType": "string", "addCellClass": "left-[9rem] text-center items-center grid ", "rightShadow": true, "columnColor": "" },

                // { "columnOrder": 5, "type": "unitPrice", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-blue" },
                // { "columnOrder": 6, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "text-arrow-blue" },
                // { "columnOrder": 7, "type": "unitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-blue" },
                // { "columnOrder": 8, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "text-arrow-blue" },


                // { "columnOrder": 9, "type": "unitPrice", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 10, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 11, "type": "unitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 12, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 13, "type": "unitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 14, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 15, "type": "unitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 16, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 17, "type": "unitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 18, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "text-arrow-green" },

                // { "columnOrder": 19, "type": "unitPrice", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-purple" },
                // { "columnOrder": 20, "type": "unitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-purple" },
                // { "columnOrder": 21, "type": "unitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-purple" },
                // { "columnOrder": 22, "type": "sumTotal", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-purple" },

                // { "columnOrder": 23, "type": "sumTotal", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 24, "type": "sumTotal", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 25, "type": "sumTotal", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 26, "type": "sumTotal", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },

                // { "columnOrder": 27, "type": "sumTotal", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 28, "type": "update", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "text-center items-center grid", "columnColor": "" },
                // { "columnOrder": 1, "type": "symbol", "leftBorder": false, "isSticky": true, "rightShadow": false, "dataType": "string", "addCellClass": "left-[0px]", "columnColor": "" },
                // { "columnOrder": 2, "type": "id", "leftBorder": false, "isSticky": true, "rightShadow": false, "dataType": "string", "addCellClass": "left-[2rem]", "columnColor": "" },
                // { "columnOrder": 3, "type": "name", "leftBorder": false, "isSticky": true, "rightShadow": false, "dataType": "string", "addCellClass": "left-[6.5rem] ", "rightShadow": true, "columnColor": "" },

                // { "columnOrder": 4, "type": "unitPrice", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-blue" },
                // { "columnOrder": 5, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "text-arrow-blue" },
                // { "columnOrder": 6, "type": "amount", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-blue" },

                // { "columnOrder": 7, "type": "unitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-blue" },
                // { "columnOrder": 8, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "text-arrow-blue" },
                // { "columnOrder": 9, "type": "amount", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-blue" },

                // { "columnOrder": 10, "type": "unitPrice", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 11, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 12, "type": "amount", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },

                // { "columnOrder": 13, "type": "unitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 14, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 15, "type": "amount", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },

                // { "columnOrder": 16, "type": "unitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 17, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 18, "type": "amount", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },

                // { "columnOrder": 19, "type": "unitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 20, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 21, "type": "amount", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },

                // { "columnOrder": 22, "type": "unitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 23, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 24, "type": "amount", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },

                // { "columnOrder": 25, "type": "unitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 26, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "text-arrow-green" },
                // { "columnOrder": 27, "type": "amount", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-green" },

                // { "columnOrder": 28, "type": "subTotal", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },

                // { "columnOrder": 29, "type": "price", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-purple" },
                // { "columnOrder": 30, "type": "price", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-purple" },
                // { "columnOrder": 31, "type": "price", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-purple" },

                // { "columnOrder": 32, "type": "subTotal", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 33, "type": "subTotal", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 34, "type": "subTotal", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },

                // { "columnOrder": 35, "type": "price", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-brown" },
                // { "columnOrder": 36, "type": "price", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "text-arrow-brown" },
                // // 下部のcolumColorをブラウンからデフォルトに変更しました。間宮
                // { "columnOrder": 37, "type": "price", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },

                // { "columnOrder": 38, "type": "sumTotal", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 39, "type": "update", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "", "columnColor": "" },

            ],
            headerStructure: [
                // { "headerColumnOrder": 1, "tableHeaderRow": 1, "headerText": "税", "addCellClass": "left-[0px]", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": true, "rightShadow": false },
                // { "headerColumnOrder": 2, "tableHeaderRow": 1, "headerText": "ID", "addCellClass": "left-[2rem]", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": true, "rightShadow": false },
                // { "headerColumnOrder": 3, "tableHeaderRow": 1, "headerText": "名前", "addCellClass": "left-[6.5rem] ", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": true, "rightShadow": true },
                // { "headerColumnOrder": 4, "tableHeaderRow": 1, "headerText": "訪問単価", "addCellClass": "", "colSpan": "col-span-3", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 5, "tableHeaderRow": 1, "headerText": "リハビリテーション料", "addCellClass": "", "colSpan": "col-span-3", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 6, "tableHeaderRow": 1, "headerText": "会議", "addCellClass": "", "colSpan": "col-span-3", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 7, "tableHeaderRow": 1, "headerText": "挨拶", "addCellClass": "", "colSpan": "col-span-3", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 8, "tableHeaderRow": 1, "headerText": "事務作業[通常]", "addCellClass": "", "colSpan": "col-span-3", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 9, "tableHeaderRow": 1, "headerText": "事務作業[特別]", "addCellClass": "", "colSpan": "col-span-3", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 10, "tableHeaderRow": 1, "headerText": "研修1", "addCellClass": "", "colSpan": "col-span-3", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 11, "tableHeaderRow": 1, "headerText": "研修2", "addCellClass": "", "colSpan": "col-span-3", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // // 下部日当から小計に文言変更しました　間宮
                // { "headerColumnOrder": 12, "tableHeaderRow": 1, "headerText": "小計", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 13, "tableHeaderRow": 1, "headerText": "課税経費", "addCellClass": "", "colSpan": "col-span-3", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 14, "tableHeaderRow": 1, "headerText": "報酬額", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 15, "tableHeaderRow": 1, "headerText": "消費税", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 16, "tableHeaderRow": 1, "headerText": "所得税", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 17, "tableHeaderRow": 1, "headerText": "非課税経費", "addCellClass": "", "colSpan": "col-span-2", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // // 下部を追加しました。間宮
                // { "headerColumnOrder": 18, "tableHeaderRow": 1, "headerText": "調整額", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 19, "tableHeaderRow": 1, "headerText": "支払総額", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 20, "tableHeaderRow": 1, "headerText": "最終更新", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },


                // { "headerColumnOrder": 1, "tableHeaderRow": 2, "headerText": "単価", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 2, "tableHeaderRow": 2, "headerText": "H", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 3, "tableHeaderRow": 2, "headerText": "合計", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 4, "tableHeaderRow": 2, "headerText": "単価", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 5, "tableHeaderRow": 2, "headerText": "H", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 6, "tableHeaderRow": 2, "headerText": "合計", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 7, "tableHeaderRow": 2, "headerText": "単価", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 8, "tableHeaderRow": 2, "headerText": "H", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 9, "tableHeaderRow": 2, "headerText": "合計", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 10, "tableHeaderRow": 2, "headerText": "単価", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 11, "tableHeaderRow": 2, "headerText": "H", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 12, "tableHeaderRow": 2, "headerText": "合計", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 13, "tableHeaderRow": 2, "headerText": "単価", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 14, "tableHeaderRow": 2, "headerText": "H", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 15, "tableHeaderRow": 2, "headerText": "合計", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 16, "tableHeaderRow": 2, "headerText": "単価", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 17, "tableHeaderRow": 2, "headerText": "H", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 18, "tableHeaderRow": 2, "headerText": "合計", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 19, "tableHeaderRow": 2, "headerText": "単価", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 20, "tableHeaderRow": 2, "headerText": "H", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 21, "tableHeaderRow": 2, "headerText": "合計", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 22, "tableHeaderRow": 2, "headerText": "単価", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 23, "tableHeaderRow": 2, "headerText": "H", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 24, "tableHeaderRow": 2, "headerText": "合計", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 25, "tableHeaderRow": 2, "headerText": "交通費", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 26, "tableHeaderRow": 2, "headerText": "ランチ", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 27, "tableHeaderRow": 2, "headerText": "駐車場", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 28, "tableHeaderRow": 2, "headerText": "備品", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 29, "tableHeaderRow": 2, "headerText": "立て替え", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // // 下部を単体で支払総額の左に表示させました。間宮
                // // { "headerColumnOrder": 30,  "tableHeaderRow":2, "headerText": "調整額", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false},
                
                // { "headerColumnOrder": 1, "tableHeaderRow": 1, "headerText": "No.", "addCellClass": "left-[0px] text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": true, "rightShadow": false },
                // { "headerColumnOrder": 2, "tableHeaderRow": 1, "headerText": "インボイス登録", "addCellClass": "left-[2rem] text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": true, "rightShadow": false },
                // { "headerColumnOrder": 3, "tableHeaderRow": 1, "headerText": "ID", "addCellClass": "left-[4.5rem] text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": true, "rightShadow": false },
                // { "headerColumnOrder": 4, "tableHeaderRow": 1, "headerText": "名前", "addCellClass": "left-[9rem] text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": true, "rightShadow": true },
                // { "headerColumnOrder": 5, "tableHeaderRow": 1, "headerText": "リハビリテーション", "addCellClass": "text-center items-center grid", "colSpan": "col-span-4", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 6, "tableHeaderRow": 1, "headerText": "その他業務", "addCellClass": "text-center items-center grid", "colSpan": "col-span-10", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },


                // { "headerColumnOrder": 7, "tableHeaderRow": 1, "headerText": "経費", "addCellClass": "text-center items-center grid", "colSpan": "col-span-3", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 8, "tableHeaderRow": 1, "headerText": "調整金(税込)", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 9, "tableHeaderRow": 1, "headerText": "報酬本体(税込)", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 10, "tableHeaderRow": 1, "headerText": "消費税額", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 11, "tableHeaderRow": 1, "headerText": "報酬合計(税込)", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 12, "tableHeaderRow": 1, "headerText": "源泉所得税", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 13, "tableHeaderRow": 1, "headerText": "支払総額", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 14, "tableHeaderRow": 1, "headerText": "最終更新", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },


                // { "headerColumnOrder": 1, "tableHeaderRow": 2, "headerText": "訪問単価\n(税込)", "addCellClass": "whitespace-pre-line text-center text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 2, "tableHeaderRow": 2, "headerText": "数", "addCellClass": "whitespace-pre-line text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 3, "tableHeaderRow": 2, "headerText": "介入単価\n(税込)", "addCellClass": "whitespace-pre-line text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 4, "tableHeaderRow": 2, "headerText": "H", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },


                // { "headerColumnOrder": 5, "tableHeaderRow": 2, "headerText": "事務作業単価\n(税込)", "addCellClass": "whitespace-pre-line text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 6, "tableHeaderRow": 2, "headerText": "H", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 7, "tableHeaderRow": 2, "headerText": "集団サポート単価\n(税込)", "addCellClass": "whitespace-pre-line text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 8, "tableHeaderRow": 2, "headerText": "H", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                
                
                // { "headerColumnOrder": 9, "tableHeaderRow": 2, "headerText": "挨拶単価\n(税込)", "addCellClass": "whitespace-pre-line text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 10, "tableHeaderRow": 2, "headerText": "H", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 11, "tableHeaderRow": 2, "headerText": "研修1単価\n(税込)", "addCellClass": "whitespace-pre-line text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 12, "tableHeaderRow": 2, "headerText": "H", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 13, "tableHeaderRow": 2, "headerText": "研修2単価\n(税込)", "addCellClass": "whitespace-pre-line text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 14, "tableHeaderRow": 2, "headerText": "H", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 15, "tableHeaderRow": 2, "headerText": "交通費\n(税込)", "addCellClass": "whitespace-pre-line text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 16, "tableHeaderRow": 2, "headerText": "車両関係(税込)", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 17, "tableHeaderRow": 2, "headerText": "電話代\n(税込)", "addCellClass": "whitespace-pre-line text-center items-center grid", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },



            ]
        },
        Invoice: {
            gridTemplateColumns: [
                // { "columnOrder": 1, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "text-center items-center grid", "columnColor": "" },
                // { "columnOrder": 2, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 3, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 4, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 5, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 6, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 7, "type": "sumTotal", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 8, "type": "icon", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "icon", "addCellClass": "", "columnColor": "" }
            ],
            headerStructure: [
                // { "headerColumnOrder": 1, "tableHeaderRow": 1, "headerText": "集計月", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 2, "tableHeaderRow": 1, "headerText": "請求数", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 3, "tableHeaderRow": 1, "headerText": "リハビリ", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 5, "tableHeaderRow": 1, "headerText": "出張交通費", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 4, "tableHeaderRow": 1, "headerText": "立替金", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 6, "tableHeaderRow": 1, "headerText": "調整額", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 7, "tableHeaderRow": 1, "headerText": "請求総額", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 8, "tableHeaderRow": 1, "headerText": "PDF", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false }
            ]
        },
        InvoiceDetail: {
            gridTemplateColumns: [
                
                // { "columnOrder": 1, "type": "symbol", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "text-center items-center grid", "columnColor": "" },
                // { "columnOrder": 2, "type": "name", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "text-center items-center grid", "columnColor": "" },

                // { "columnOrder": 3, "type": "invoiceUnitPrice", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 4, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 5, "type": "invoiceAmount", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },

                // { "columnOrder": 6, "type": "invoiceUnitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 7, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 8, "type": "invoiceAmount", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },

                // { "columnOrder": 9, "type": "invoiceUnitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 10, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 11, "type": "invoiceAmount", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },

                // /////////////////////////////////////////////////////////////////
                // { "columnOrder": 12, "type": "invoiceUnitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 13, "type": "quantity", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "number", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 14, "type": "invoiceAmount", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // ////////////////////////////////////////////////////////////////////////////////////////////////

                // { "columnOrder": 15, "type": "invoicePrice", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 16, "type": "invoicePrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
    
                // { "columnOrder": 17, "type": "sumTotal", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },

                // { "columnOrder": 18, "type": "update", "leftBorder": true, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "text-center items-center grid", "columnColor": "" },



            ],
            headerStructure: [
                // { "headerColumnOrder": 1, "tableHeaderRow": 1, "headerText": "No.", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 2, "tableHeaderRow": 1, "headerText": "訪問会員様", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 3, "tableHeaderRow": 1, "headerText": "30分", "addCellClass": "", "colSpan": "col-span-3", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 4, "tableHeaderRow": 1, "headerText": "60分", "addCellClass": "", "colSpan": "col-span-3", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 5, "tableHeaderRow": 1, "headerText": "90分", "addCellClass": "", "colSpan": "col-span-3", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // /////////////////////////////////////////////////////////////////////////////////////////
                // { "headerColumnOrder": 5, "tableHeaderRow": 1, "headerText": "出張交通費", "addCellClass": "", "colSpan": "col-span-3", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // // { "headerColumnOrder": 5, "tableHeaderRow": 1, "headerText": "出張交通費", "addCellClass": "", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },


                // { "headerColumnOrder": 7, "tableHeaderRow": 1, "headerText": "立替金", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 8, "tableHeaderRow": 1, "headerText": "調整額", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 9, "tableHeaderRow": 1, "headerText": "請求額", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 10, "tableHeaderRow": 1, "headerText": "最終更新", "addCellClass": "text-center items-center grid", "colSpan": "", "rowSpan": "row-span-2", "leftBorder": true, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 11, "tableHeaderRow": 2, "headerText": "単価", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": true, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 12, "tableHeaderRow": 2, "headerText": "数", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 13, "tableHeaderRow": 2, "headerText": "合計", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 14, "tableHeaderRow": 2, "headerText": "単価", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 15, "tableHeaderRow": 2, "headerText": "数", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 16, "tableHeaderRow": 2, "headerText": "合計", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },

                // { "headerColumnOrder": 17, "tableHeaderRow": 2, "headerText": "単価", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 18, "tableHeaderRow": 2, "headerText": "数", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 19, "tableHeaderRow": 2, "headerText": "合計", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // ////////////////////////////////////////////
                // { "headerColumnOrder": 20, "tableHeaderRow": 2, "headerText": "単価", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 21, "tableHeaderRow": 2, "headerText": "数", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 22, "tableHeaderRow": 2, "headerText": "合計", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // ////////////////
            ]
        },
        Expenses: {
            gridTemplateColumns: [
                // { "columnOrder": 1, "type": "name", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 2, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 3, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 4, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 5, "type": "status", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 6, "type": "update", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "", "columnColor": "" },
            ],
            headerStructure: [
                // { "headerColumnOrder": 1, "tableHeaderRow": 1, "headerText": "経費名", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 2, "tableHeaderRow": 1, "headerText": "フリガナ", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 3, "tableHeaderRow": 1, "headerText": "消費税", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 4, "tableHeaderRow": 1, "headerText": "源泉税", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 5, "tableHeaderRow": 1, "headerText": "状態", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 6, "tableHeaderRow": 1, "headerText": "最終更新", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
            ]
        },
        Works: {
            gridTemplateColumns: [
                // { "columnOrder": 1, "type": "name", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 2, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 3, "type": "workUnitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 4, "type": "workUnitPrice", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "currency", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 5, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 6, "type": "auto", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 7, "type": "status", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "", "columnColor": "" },
                // { "columnOrder": 8, "type": "update", "leftBorder": false, "isSticky": false, "rightShadow": false, "dataType": "string", "addCellClass": "", "columnColor": "" },
            ],
            headerStructure: [
                // { "headerColumnOrder": 1, "tableHeaderRow": 1, "headerText": "業務名", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 2, "tableHeaderRow": 1, "headerText": "フリガナ", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 3, "tableHeaderRow": 1, "headerText": "60分単価（税込）", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 4, "tableHeaderRow": 1, "headerText": "60分単価（税抜）", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 5, "tableHeaderRow": 1, "headerText": "消費税", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 6, "tableHeaderRow": 1, "headerText": "源泉税", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 7, "tableHeaderRow": 1, "headerText": "状態", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
                // { "headerColumnOrder": 8, "tableHeaderRow": 1, "headerText": "最終更新", "addCellClass": "", "colSpan": "", "rowSpan": "", "leftBorder": false, "isSticky": false, "rightShadow": false },
            ]
        },
    },
    effects_UNSTABLE: [persistAtom]
})
