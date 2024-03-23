// カラム（表の行列セルの設定を格納するファイル）
import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { encode, decode } from 'js-base64';

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


export const columnSettingsData = atom({
  key: 'columnSettingsData',
  default: {
        //  行列のClassをまとめて設定
        //  [初期値]行のClass
        rowClass : 'grid divide-x divide-slate-400 hover:bg-arrow-green-hover font-normal min-w-max cursor-pointer text-white ',
        //  [初期値]セルのClass
        cellClass : ' bg-inherit hover:bg-inherit font-DroidSans py-2 px-1',
        //  [初期値]ヘッダーのClass
        headerClass : 'grid divide-x bg-ogs-red-nomal divide-slate-400 min-w-max sticky top-0 z-20',
        //  [初期値]セルのClass
        headerCellClass : 'text-center text-white font-bold py-1 bg-inherit hover:bg-inherit',

        //  テーブルの列幅の設定
        //  自動可変の列　だいたいがこれ
        auto : 'minmax(7rem,auto)',
        name_hiragana : 'minmax(9rem,1fr)',
        name_katakana : 'minmax(9rem,1fr)',
        //  税適応の○の列
        symbol : '2rem',
        sequence : '3rem',
        //  PDFのアイコンとか
        icon : 'minmax(3rem,6rem)',
        //  IDの列
        id : 'minmax(4.5rem,auto)',
        //  セラピスト名　顧客名の列
        name : '9rem',
        nameAuto : 'minmax(21rem,1fr)',
        payment_name : 'minmax(13.5rem,auto)',
        //  単価の列
        unitPrice : '5rem',
        //  業務単価の列
        workUnitPrice : '11rem',
        //  業務単価の列
        invoiceUnitPrice : 'minmax(4rem,auto)',
        //  数量の列
        quantity : '2.5rem',
        //  単価×数量の合計額の列
        amount : '6rem',
        //  単価×数量の合計額の列
        invoiceAmount : 'minmax(6rem,auto)',
        amount5Digits : '4.5rem',
        amount7Digits : '6rem',
        //  中間集計の列
        subTotal : '5rem',
        //  経費ごとの集計額の列
        price : '6rem',
        //  経費ごとの集計額の列
        invoicePrice : 'minmax(7rem,auto)',
        memberInvoicePrice : '7rem',
        //  総計の列
        sumTotal : '8rem',
        //  更新日時の列
        update : '10rem',
        //  状態の列
        status: '5rem', 
  },
  effects_UNSTABLE: [persistAtom]
})

