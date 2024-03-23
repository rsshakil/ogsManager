import _ from "lodash";
import api from "../api/api";
import { userLoggedIn, userLoggedOut, addShippingFlag } from "./authSlice";

const HEADERS = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Access-Control-Allow-Origin': origin
}

//create product endpoints
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        //Mutation endpoints
        login: builder.mutation({
            query: (data) => ({
                url: process.env.REACT_APP_AUTH_API_URL + '/auth/login',
                method: "POST",
                body: data,
                credentials: "include",
                headers: HEADERS,
                mode: "cors"
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log('response data: ', data);

                    dispatch(userLoggedIn(data))

                } catch (err) {
                    console.log("err", err)
                }
            }
        }),
        checkSession: builder.mutation({
            query: (data) => ({
                url: process.env.REACT_APP_AUTH_API_URL + '/auth/check-session',
                method: "POST",
                body: data,
                headers: HEADERS,
                credentials: 'include',
                mode: 'cors'
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log('response data: checksession ', data);
                    const { flag, shippingFlag } = data || {};

                    dispatch(addShippingFlag(shippingFlag));

                    if (flag !== true) {
                        console.log('logged out because of checkSession got false')
                        dispatch(userLoggedOut());
                    }

                } catch (err) {
                    console.log("err", err)
                    dispatch(userLoggedOut());
                }
            }
        }),


    })
});

export const {
    useLoginMutation,

    useCheckSessionMutation,
} = authApi;