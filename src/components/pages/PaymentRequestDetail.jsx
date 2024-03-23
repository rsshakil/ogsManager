import React, { useRef, useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { settingsState } from "../../store/settingsState";
import { displayState } from "../../store/displayState";
import { Table } from "../organisms/Table";





export const PaymentRequestDetail = () => {
    
    const location = useLocation();
    const navigate = useNavigate();

    // const history = useHistory();
    const [settingsStateStateValue, setSettingsStateState] = useRecoilState(settingsState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    console.log(settingsStateStateValue);
    // console.log('[location.state]',location.state?.data);

    let pagePath = 'payment-request-detail';
    // let pageName = location.state?.data.name;
    let pageTitle = displayStateValue.pageName + '期：セラピスト様請求詳細';





    useEffect(() => {
        window.history.pushState(null, '', window.location.href);
        setDisplayState((prevState) => ({
            ...prevState,
            pageTitle: pageTitle,
            pagePath: pagePath,
            // pageName: pageName,
        }))
    }, [location]);

    return (
        <>
            <Table />
        </>
    );
};



