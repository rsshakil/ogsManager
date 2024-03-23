import { useEffect, useMemo, useRef, useState } from "react";
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import http from "../utils/httpService";
import { setPaginationData } from "../features/pagination/paginateSlice";
import { useDispatch } from "react-redux";

export default function useCustomStore(storeKey, endpoint, hasPagination = true, allPossibleRowFilterLookupData = [], refetch = false) {
    const dispatch = useDispatch();
    const prevDependency2Ref = useRef(refetch);

    useEffect(() => {
        prevDependency2Ref.current = refetch;
    }, [refetch]);

    const [isLoading, setIsLoading] = useState(false);
    const [restData, setRestData] = useState({});

    const customStore = new CustomStore({
        key: storeKey,
        async load(options) {
            const { skip, take, filter, sort } = options || {};
            console.log('raw filter ->>>>>>>>>', filter)

            if ((hasPagination && skip !== undefined && take !== undefined) || !hasPagination) {
                const queryParams = { skip, take };
                setIsLoading(true);

                // Handle sorting
                if (sort) {
                    const sorting = sort.map((sortItem) => ({ selector: sortItem.selector, order: sortItem.desc ? 'DESC' : 'ASC' }));
                    queryParams.sort = sorting ? JSON.stringify(sorting) : '';
                }
                // Handle filtering
                if (filter) {
                    queryParams.filter = JSON.stringify(filter);
                }
                console.log('my query params ->>>>>>>>>>', queryParams);
                try {
                    const { records, count, ...rest } = await http.get('/manager' + endpoint, { params: queryParams });

                    dispatch(setPaginationData({ count: count }));
                    setIsLoading(false);
                    setRestData(rest);

                    return {
                        data: records,
                        totalCount: count,
                    };
                } catch (e) {
                    console.log('API ERROR', e);
                    setIsLoading(false);
                    return {
                        data: [],
                        totalCount: 0,
                    };
                }

            }

            return {
                data: allPossibleRowFilterLookupData,
            };
        },
    })

    const dataSource = useMemo(() => {
        if (refetch != prevDependency2Ref.current && refetch == false) {
            return null;
        }

        return new DataSource({
            store: customStore,
            // onLoadingChanged: (isLoading) => setIsLoading(isLoading)
        });

    }, [endpoint, refetch]);

    return {
        dataSource,
        isLoading,
        restData
    }
}