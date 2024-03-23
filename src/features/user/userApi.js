import _ from "lodash";
import api from "../api/api";

//create product endpoints
export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        //Mutation endpoints
        updateUser: builder.mutation({
            query: ({ userId, data }) => ({
                url: `/manager/user/${userId}`,
                method: "PUT",
                body: data
            })
        }),
        exportUserCSV: builder.mutation({
            query: (params) => ({
                url: `/manager/user/csv-export`,
                method: "GET",
                params: params,
            }),
        }),
        exportUserDetailsCSV: builder.mutation({
            query: ({ userId, type }) => ({
                url: `/manager/user/csv-export/${userId}`,
                method: "GET",
                params: {type},
            }),
        })
    })
});

export const {
    useUpdateUserMutation,
    useExportUserCSVMutation,
    useExportUserDetailsCSVMutation
} = userApi;