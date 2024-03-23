import _ from "lodash";
import api from "../api/api";

//create product endpoints
export const couponApi = api.injectEndpoints({
    overrideExisting: true, // Specify this option to override the existing endpoint
    endpoints: (builder) => ({
        //Mutation endpoints
        storeCoupon: builder.mutation({
            query: (data) => ({
                url: '/manager/coupon',
                method: "POST",
                body: data
            })
        }),
        updateCoupon: builder.mutation({
            query: ({ couponId, data }) => ({
                url: `/manager/coupon/${couponId}`,
                method: "PUT",
                body: data
            })
        })
    })
});

export const {
    useStoreCouponMutation,
    useUpdateCouponMutation
} = couponApi;