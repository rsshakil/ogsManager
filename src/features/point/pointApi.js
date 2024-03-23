import _ from "lodash";
import api from "../api/api";

//create product endpoints
export const pointApi = api.injectEndpoints({
    endpoints: (builder) => ({
        //Mutation endpoints
        createPointHistory: builder.mutation({
            query: (data) => ({
                url: `/manager/point-history`,
                method: "POST",
                body: data
            })
        })
    })
});

export const {
    useCreatePointHistoryMutation
} = pointApi;