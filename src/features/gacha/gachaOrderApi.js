import _ from "lodash";
import api from "../api/api";

//create product endpoints
export const gachaOrderApi = api.injectEndpoints({
    overrideExisting: true, // Specify this option to override the existing endpoint
    endpoints: (builder) => ({
        //Mutation endpoints
        updateGachaOrder: builder.mutation({
            query: (data) => ({
                url: '/manager/gacha/order',
                method: "POST",
                body: data
            }),
            invalidatesTags: [],
        }),
    })
});

export const {
    useUpdateGachaOrderMutation,
} = gachaOrderApi;