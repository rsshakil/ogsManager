import { useState, useEffect } from "react";
import http from "../utils/httpService";


export default function useFetchShippingFlagQuery(userId, refetch = true) {
    const url = `/manager/shipping-flag`;

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
    }, [userId, refetch]);


    return {
        data: { records },
        isLoading
    }
}