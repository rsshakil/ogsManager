import { useState, useEffect } from "react";
import http from "../utils/httpService";
import { useModal } from "../contexts/ModalContext";


export default function useFetchGachaCalculationQuery(gachaId, refetch = true) {
    const url = `/manager/gacha/calculation/${gachaId}`;

    const [records, setRecords] = useState({
        totalConsumptionPoint:0,
        totalRewardPointWithoutCeiling:0,
        totalRewardPointWithCeiling:0,
        returnRateWithoutCeiling:0,
        returnRateWithCeiling:0
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