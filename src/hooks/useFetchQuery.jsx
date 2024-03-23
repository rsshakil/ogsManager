import { useState, useEffect } from "react";
import http from "../utils/httpService";

const initialValue = {
    headers: [],
    records: []
}
export default function useFetchQuery(url, refetch = true) {

    const [records, setRecords] = useState(initialValue);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchApi = async () => {
        setIsLoading(true);

        const res = await http.get(url);
        setRecords(res);
        setIsLoading(false);
    };

    useEffect(() => {
        if (refetch) {
            fetchApi();
        }
    }, [refetch]);


    return {
        dataSource: records,
        isLoading
    }
}