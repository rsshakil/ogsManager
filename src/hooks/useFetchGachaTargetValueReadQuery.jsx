import { useState, useEffect } from "react";
import http from "../utils/httpService";
import { useModal } from "../contexts/ModalContext";


export default function useFetchGachaTargetValueReadQuery(gachaId, refetch = true) {
    const url = `/manager/target/value/${gachaId}`;

    const [records, setRecords] = useState({
        gachaSinglePoint:0,
        gachaTotalCount:0,
        gachaStartDate:0,
        gachaHourTargetValue:0
    });
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
    }, [gachaId, refetch]);


    return {
        data: { records },
        isLoading
    }
}