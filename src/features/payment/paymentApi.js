import api from "../api/api";

//create product endpoints
export const paymentApi = api.injectEndpoints({
    overrideExisting: true, // Specify this option to override the existing endpoint
    endpoints: (builder) => ({
        //Mutation endpoints
        exportPaymentCSV: builder.mutation({
            query: (queryParams) => ({
                url: `/manager/payment/csv-export`,
                method: "GET",
                params: queryParams,
            }),
        })
    })
});

export const {
    useExportPaymentCSVMutation,
} = paymentApi;