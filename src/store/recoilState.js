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

export const recoilState = atom({
  key: 'recoilState',
  // default: { row: [false,1,2,3,4,5] }
  // default: ['1111111'],
  default: {
    PageTitle: '',
    getLoginId: '',
    LoginAccessTime: '',
    MypageAccessTime: '',
    FacilityListAccessTime: '',
    ReservationAccessTime: '',
    selected_facility_address : '',
    selected_facility_name : '',
    selected_facility_facilityId : '',
    asyncAccessTime: '',
    isSpinerStart: '',
    ZipvalueMain: '0',
    ZipvalueSub: '0',
    address1: '',
    address2: '',
    address3: '',
    kana1: '',
    kana2: '',
    kana3: '',
    prefcode: '',
    zipcode: '',
  },
  effects_UNSTABLE: [persistAtom]
})
