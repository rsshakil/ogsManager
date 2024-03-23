import _ from "lodash";
import api from "../api/api";

//create product endpoints
export const productApi = api.injectEndpoints({
    overrideExisting: true, // Specify this option to override the existing endpoint
    endpoints: (builder) => ({
        //Mutation endpoints
        storeProduct: builder.mutation({
            query: (data) => ({
                url: '/manager/product',
                method: "POST",
                body: data
            }),
            invalidatesTags: [],
        }),
        updateProduct: builder.mutation({
            query: ({ gachaId, data }) => ({
                url: `/manager/product/${gachaId}`,
                method: "PUT",
                body: data
            }),
        }),
    })
});

export const {
    useStoreProductMutation,
    useUpdateProductMutation,
} = productApi;