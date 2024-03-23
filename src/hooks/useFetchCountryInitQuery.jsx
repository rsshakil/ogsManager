import { useState, useEffect } from "react";
import http from "../utils/httpService";


export default function useFetchCountryInitQuery(refetch = true) {
    const url = `/manager/user/init`;

    const [records, setRecords] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchApi = async () => {
        setIsLoading(true);
        const records = await http.get(url);
        setRecords(records);
        setIsLoading(false);
    };

    useEffect(() => {
        if (refetch) fetchApi();
    }, [refetch]);


    const refetchApi = () => {
        fetchApi();
    }


    return {
        data: records,
        isLoading,
        refetchApi,
    }
}