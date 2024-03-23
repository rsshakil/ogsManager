import _ from "lodash";
import api from "../api/api";

//create product endpoints
export const itemApi = api.injectEndpoints({
    overrideExisting: true, // Specify this option to override the existing endpoint
    endpoints: (builder) => ({
        //Mutation endpoints
        storeItem: builder.mutation({
            query: (data) => ({
                url: '/manager/item',
                method: "POST",
                body: data
            }),
            invalidatesTags: [],
        }),
        updateItem: builder.mutation({
            query: ({ itemId, data }) => ({
                url: `/manager/item/${itemId}`,
                method: "PUT",
                body: data
            }),
        }),
        updateItemStock: builder.mutation({
            query: ({ itemId, data }) => ({
                url: `/manager/item/stock/${itemId}`,
                method: "PUT",
                body: data
            }),
        }),

    })
});

export const {
    useStoreItemMutation,
    useUpdateItemMutation,
    useUpdateItemStockMutation,
} = itemApi;