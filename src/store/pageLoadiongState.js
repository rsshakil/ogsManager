import { atom, selectorFamily } from "recoil";
import { recoilPersist } from 'recoil-persist'
import { encode, decode } from 'js-base64';
import _ from 'lodash';
import { freePagesState } from "./freePagesState";

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


//  need to cover the page
// "CATEGORY"
// "SLOT"
// "ITEM"
// "INSTITUTE"



export const pageLoadiongState = atom({
  key: 'pageLoadiongState',
  // default: { row: [false,1,2,3,4,5] }
  // default: ['1111111'],
  default: {
    // "pathName01": {
    //   "aaaaaaaa-11111111-bbbbbbbb": {
    //     "key": "CATEGORY",
    //     "loadiongStartTime": 1673434199,
    //     "loadiongProgress": false,
    //   },
    //   "cccccccc-22222222-eeeeeeeeeeee": {
    //     "key": "SLOT",
    //     "loadiongStartTime": 1673434199,
    //     "loadiongProgress": false,

    //   }
    // },
    // "pathName02": {
    //   "ffffffff-33333333-gggggggg": {
    //     "key": "ITEM",
    //     "loadiongStartTime": 1673434199,
    //     "loadiongProgress": false,

    //   },
    //   "hhhhhhhh-44444444-iiiiiiii": {
    //     "key": "INSTITUTE",
    //     "loadiongStartTime": 1673434199,
    //     "loadiongProgress": false,
    //   }
    // },
  },
  effects_UNSTABLE: [persistAtom]
})


export const isMatchedPageLoading = selectorFamily({
  key: "isMatchedPageLoadingSelector",
  get: (key) => ({ get }) => {
    const page = get(freePagesState).find(x => x.appPageURLName == key);
    if (page && page.hasOwnProperty('appPageLoadingFlag')) {
      return page.appPageLoadingFlag;
    }
    return null;
  },
  //set: ({set}, newValue) => set(tempFahrenheit, (newValue * 9) / 5 + 32),
});

export const isStoppeddPageLoading = selectorFamily({
  key: "isStoppeddPageLoadingSelector",
  get: (key) => ({ get }) => {
    const page = get(freePagesState).find(x => x.appPageURLName == key);
    if (page && page.hasOwnProperty('appPageLoadingStopFlag')) {
      const obj = page.appPageLoadingStopFlag || {};

      if (page.appPageLoadingFlag !== null && !_.isEmpty(obj)) {
        console.log('>>>>>>>>>>>>>>-----', obj)
        console.log('>>>>>>>>>>>>>>----- rrr', Object.keys(obj).every((k) => obj[k]))
        return Object.keys(obj).every((k) => obj[k]);
      }

      return false;
    }
    return false;
  },
});