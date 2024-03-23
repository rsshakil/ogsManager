import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    csrfToken: undefined,
    accessToken: undefined,
    checkSession: undefined,
    shippingFlag: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            const { isLoggedIn, token, csrf } = action.payload || {};

            if (csrf) localStorage.setItem('csrfToken', csrf);
            if (token) localStorage.setItem('accessToken', token);

            state.accessToken = token;
            state.csrfToken = csrf;
            state.checkSession = true;
        },
        userLoggedOut: (state, action) => {
            state.accessToken = undefined;
            state.csrfToken = undefined;
            state.checkSession = false;

            localStorage.removeItem('csrfToken');
            localStorage.removeItem('accessToken');
        },
        addShippingFlag: (state, action) => {
            state.shippingFlag = action.payload;
        }
    },
    extraReducers: {}
})

export default authSlice.reducer;
export const { userLoggedIn, userLoggedOut, addShippingFlag } = authSlice.actions;