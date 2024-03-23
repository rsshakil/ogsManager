import _ from "lodash";
import api from "../api/api";

//create gacha endpoints
export const gachaApi = api.injectEndpoints({
    endpoints: (builder) => ({
        //Mutation endpoints
        updateGacha: builder.mutation({
            query: ({ gachaId, data }) => ({
                url: `/manager/gacha/${gachaId}`,
                method: "PUT",
                body: data
            }),
        }),
        gachaStockRecovery: builder.mutation({
            query: ({ gachaId, data }) => ({
                url: `/manager/gacha/stock-recovery/${gachaId}`,
                method: "PUT",
                body: data
            }),
        }),
    })
});

export const {
    useUpdateGachaMutation,
    useGachaStockRecoveryMutation,
} = gachaApi;