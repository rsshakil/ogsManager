import _ from "lodash";
import api from "../api/api";

//create product endpoints
export const settingsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        //Mutation endpoints
        executeRedisCommand: builder.mutation({
            query: (data) => ({
                url: '/manager/debug/redis',
                method: "POST",
                body: data
            }),
            invalidatesTags: [],
        }),
    })
});

export const {
    useExecuteRedisCommandMutation,
} = settingsApi;