import api from "../api/api";

//create product endpoints
export const shippingApi = api.injectEndpoints({
    overrideExisting: true, // Specify this option to override the existing endpoint
    endpoints: (builder) => ({
        //Mutation endpoints
        updateShipping: builder.mutation({
            query: ({ userCollectionId, data }) => ({
                url: `/manager/shipping/${userCollectionId}?actionType=1`,
                method: "PUT",
                body: data
            }),
        }),
        exportShippingCSV: builder.mutation({
            query: (queryParams) => ({
                url: `/manager/shipping/csv-export`,
                method: "GET",
                params: queryParams,
            }),
        })
    })
});

export const {
    useUpdateShippingMutation,
    useExportShippingCSVMutation,
} = shippingApi;