import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";


const initialState = {
    itemImagePath1: '',
    itemImagePath2: '',
    itemImagePath3: '',
    itemStatus: 1,
    itemShippingFlag: 1,
    itemCategoryId: 0,
    itemName: '',
    itemMemo: "",
    itemAttribute1: "",
    itemAttribute2: "",
    itemAttribute3: "",
    itemAttribute4: "",
    itemAttribute5: "",
    itemAttribute6: "",
    itemAttribute7: "",
    itemAttribute8: "",
    itemTagIds: [],
    itemTranslates: [],
};

const itemSlice = createSlice({
    name: 'managerItem',
    initialState,
    reducers: {
        setItemImagePath1: (state, action) => {
            state.itemImagePath1 = action.payload;
        },
        setItemImagePath2: (state, action) => {
            state.itemImagePath2 = action.payload;
        },
        setItemImagePath3: (state, action) => {
            state.itemImagePath3 = action.payload;
        },
        setItemStatus: (state, action) => {
            state.itemStatus = Number(action.payload);
        },
        setItemShippingFlag: (state, action) => {
            state.itemShippingFlag = Number(action.payload);
        },
        setItemCategoryId: (state, action) => {
            state.itemCategoryId = Number(action.payload);
        },
        setItemName: (state, action) => {
            state.itemName = action.payload;
        },
        setItemMemo: (state, action) => {
            state.itemMemo = action.payload;
        },
        setItemAttribute1: (state, action) => {
            state.itemAttribute1 = action.payload;
        },
        setItemAttribute2: (state, action) => {
            state.itemAttribute2 = action.payload;
        },
        setItemAttribute3: (state, action) => {
            state.itemAttribute3 = action.payload;
        },
        setItemAttribute4: (state, action) => {
            state.itemAttribute4 = action.payload;
        },
        setItemAttribute5: (state, action) => {
            state.itemAttribute5 = action.payload;
        },
        setItemAttribute6: (state, action) => {
            state.itemAttribute6 = action.payload;
        },
        setItemAttribute7: (state, action) => {
            state.itemAttribute7 = action.payload;
        },
        setItemAttribute8: (state, action) => {
            state.itemAttribute8 = action.payload;
        },
        setItemTagIds: (state, action) => {
            const tagIds = action.payload;
            state.itemTagIds = Array.isArray(tagIds) ? tagIds : [];
        },
        setItemTranslates: (state, action) => {
            const translateIds = action.payload;
            state.itemTranslates = Array.isArray(translateIds) ? translateIds : [];
        },
        resetState: (state) => {
            Object.assign(state, initialState);
        }
    },
    // Special reducer for hydrating the state
    extraReducers: {}
})

export default itemSlice.reducer;
export const {
    setItemImagePath1,
    setItemImagePath2,
    setItemImagePath3,
    setItemName,
    setItemCategoryId,
    setItemStatus,
    setItemAttribute1,
    setItemAttribute2,
    setItemAttribute3,
    setItemAttribute4,
    setItemAttribute5,
    setItemAttribute6,
    setItemAttribute7,
    setItemAttribute8,
    setItemMemo,
    setItemShippingFlag,
    setItemTagIds,
    setItemTranslates,
    resetState,
} = itemSlice.actions;
