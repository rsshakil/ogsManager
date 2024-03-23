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

export const referrerState = atom({
  key: 'referrerState',
  default: {
      /*appState*/
      default: ["/cancelsuccess","/input","/check","/complete","/mypage","/failure"],
_input: ["/check","/category","/top"],
_check: ["/input","/category2","/category"],
_category: ["/check2","/date2","/failure2","/check","/date"],
_date: ["/category2","/item2","/category","/item"],
_item: ["/date2","/info2","/date","/info"],
_info: ["/item","/confirm2","/confirm","/top"],
_confirm: ["/info","/complete2","/top"],
_complete: ["/confirm","/top"],
_failure: ["/confirm","/top"],
_mypage: ["/changeconfirmation2","/top","/modifyinput"],
_cancelsuccess: ["/mypage","/top"],
_modifyinput: ["/top","/mypage","/modifycheck","/modifycategory"],
_modifycheck: ["/modifyinput","/modifycategory"],
_modifycategory: ["/modifydate","/modifycheck"],
_modifydate: ["/modifycategory","/modifyitem"],
_modifyitem: ["/modifydate","/modifyinfo"],
_modifyinfo: ["/top","/modifyitem","/modifyconfirm"],
_modifyconfirm: ["/top","/modifyinfo"],
_modifychangecompleted: ["/top","/modifyconfirm"],
_modifyfailure: ["/top","/modifyconfirm"],

      /*appDesignBlocksState*/
  },
  effects_UNSTABLE: [persistAtom]
})
