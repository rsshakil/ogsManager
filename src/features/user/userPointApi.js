import api from "../api/api";

export const userPointApi = api.injectEndpoints({
    endpoints: (builder) => ({
        //Mutation endpoints
        updateUserPoint: builder.mutation({
            query: ({ userId, data }) => ({
                url: `/manager/point/${userId}`,
                method: "PUT",
                body: data
            })
        })
    })
});

export const {
    useUpdateUserPointMutation
} = userPointApi;