import { useState, useEffect } from "react";
import http from "../utils/httpService";
import { useModal } from "../contexts/ModalContext";


export default function useFetchShippingQuery(userCollectionId, refetch = true) {
    const url = `/manager/shipping/${userCollectionId}`;

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
    }, [userCollectionId, refetch]);


    return {
        data: { records },
        isLoading
    }
}