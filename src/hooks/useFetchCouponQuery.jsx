import { useState, useEffect } from "react";
import http from "../utils/httpService";
import { useModal } from "../contexts/ModalContext";


export default function useFetchCouponQuery(couponId, refetch = true) {
    const url = `/manager/coupon/${couponId}`;

    const [records, setRecords] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchApi = async () => {
        setIsLoading(true);

        const { records = {} } = await http.get(url);

        setRecords(records);
        setIsLoading(false);
    };

    useEffect(() => {
        if (refetch) fetchApi();
    }, [couponId, refetch]);


    return {
        data: { records },
        isLoading
    }
}