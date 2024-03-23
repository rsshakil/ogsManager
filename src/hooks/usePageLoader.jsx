import { useRecoilState, } from 'recoil';
import { freePagesState } from "../store/freePagesState";
import _ from "lodash";

export default function usePageLoader() {
    let [pageLoadiongState, setPageLoadiongState] = useRecoilState(freePagesState);

    const stopPageLoader = (pathname = '', appPageBlockId = '') => {
        const pageIndex = pageLoadiongState.findIndex(x => x.appPageURLName == pathname);

        if (pageIndex > -1 && !_.isEmpty(pageLoadiongState[pageIndex].appPageLoadingStopFlag)) {
            // console.log('my checking >>>', pathname)
            // console.log('my checking >>> appPageBlockId', appPageBlockId)
            setPageLoadiongState((prevState) => {
                const pageStateObj = { ...prevState[pageIndex].appPageLoadingStopFlag, [appPageBlockId]: 1 };

                return [
                    ...prevState.slice(0, pageIndex),
                    { ...prevState[pageIndex], appPageLoadingStopFlag: pageStateObj },
                    ...prevState.slice(pageIndex + 1)
                ];
            })
        }
    }

    const resetPageLoader = (pathname = '') => {
        const pageIndex = pageLoadiongState.findIndex(x => x.appPageURLName == pathname);

        if (pageIndex > -1) {
            let updatedObj = JSON.parse(JSON.stringify(pageLoadiongState[pageIndex].appPageLoadingStopFlag));
            if (updatedObj) {
                Object.keys(updatedObj).forEach(key => {
                    updatedObj[key] = 0;
                });
            }

            setPageLoadiongState((prevState) => ([
                ...prevState.slice(0, pageIndex),
                { ...prevState[pageIndex], appPageLoadingStopFlag: updatedObj },
                ...prevState.slice(pageIndex + 1)
            ]))
        }
    }


    return {
        stopPageLoader,
        resetPageLoader,
    }
}