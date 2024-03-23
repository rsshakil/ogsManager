import React, { useRef, useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { settingsState } from "../../store/settingsState";
import { displayState } from "../../store/displayState";
import { accessState } from "../../store/accessState";
import { FirstTimeInitialization } from "../../functions/FirstTimeInitialization";
import { Table } from "../organisms/Table";




export const PaymentRequest = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    // const history = useHistory();
    const [settingsStateStateValue, setSettingsStateState] = useRecoilState(settingsState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [accessStateValue, setAccessState] = useRecoilState(accessState);
    console.log(settingsStateStateValue);

    let pagePath = 'payment-request';
    // let pageName = location.state?.data.name;
    let pageTitle = 'セラピスト様請求一覧';



    useEffect(() => {
        window.history.pushState(null, '', window.location.href);
        setDisplayState((prevState) => ({
            ...prevState,
            pageTitle: pageTitle,
            pagePath: pagePath,
            //pageName: pageName,
        }))
    }, [location]);

    return (
        <>
            <FirstTimeInitialization />
            <Table />
        </>
    );
};



