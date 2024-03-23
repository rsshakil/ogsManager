import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 0,
    count: 0
}

const paginateSlice = createSlice({
    name: 'paginate',
    initialState,
    reducers: {
        setPaginationData: (state, action) => {
            return { ...state, ...action.payload };
        }
    },
    extraReducers: {
    }
})

export default paginateSlice.reducer;
export const {
    setPaginationData,
    resetState,
} = paginateSlice.actions;
