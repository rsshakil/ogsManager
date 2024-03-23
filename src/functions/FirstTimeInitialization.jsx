import React, { useState, useEffect, useReducer, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { recoilState } from "../store/recoilState";
// import { itemState } from "../store/itemState";
import { accessState } from "../../src/store/accessState";
import { displayState } from "../../src/store/displayState";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AccessStateController } from "./AccessStateController";
import axios from "axios";
// import { fieldState } from "../store/fieldState";
import { roundToNearestMinutes } from "date-fns/esm";
import { pageLoadiongState } from '../../src/store/pageLoadiongState';
import { freePagesState } from "../store/freePagesState";
// import { commonPagesState } from "../store/commonPagesState";
// import { allBlocksState } from "../store/allBlocksState";
// import { blockState } from "../store/blockState";
import { settingsState } from "../store/settingsState";
import { modalState } from "../store/modalState";
import { elmState } from "../store/elmState";
// import { zipData } from "../store/zipData";
// import { termServiceState } from "../store/termServiceState";

import useCsrfToken from '../hooks/useCsrfToken'

export const apiURL =
    process.env.NODE_ENV !== "production"
        ? process.env.REACT_APP_AUTH_URL_LOCALHOST
        : process.env.REACT_APP_AUTH_URL_PRODUCTION;

//getの値を設定したり、リロードした時にgetの値を復元する処理
export const FirstTimeInitialization = (props) => {

    // // セッションの初期化　全て消すのではなく特定するもしくは、変数に格納後初期化して書き込む
    // sessionStorage.removeItem('recoil-persist')

	const location = useLocation();
    const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	//ID PASS初期値
	const initialLoginId = '';
    const initialLoginPw = '19700101';

    const initialToken1 = '';
    const initialToken2 = '';
    const initialToken3 = '';
    const initialCreatedBy = '';
	//getがなければID PASS初期値
	const getLoginId  = searchParams ? searchParams.get("id") : initialLoginId;
	const getLoginPw  = searchParams ? searchParams.get("pw") : initialLoginPw;
	const getToken1  = searchParams ? searchParams.get("token1") : initialToken1;
	const getToken2  = searchParams ? searchParams.get("token2") : initialToken2;
	const getToken3  = searchParams ? searchParams.get("token3") : initialToken3;
	const getCreatedBy  = searchParams ? searchParams.get("c") : initialCreatedBy;

    //recoilから取り出し
	const [accessStateValue, setAccessState] = useRecoilState(accessState);
    // const [fieldStateValue, setFieldState] = useRecoilState(fieldState);

	//statesがなければ初期値
	const stateLoginId = accessStateValue ? accessStateValue.getLoginId : getLoginId;
    const stateLoginPw = accessStateValue ? accessStateValue.getLoginPw : getLoginPw;
    const stateToken1 = accessStateValue ? accessStateValue.getToken1 : getToken1;
    const stateToken2 = accessStateValue ? accessStateValue.getToken2 : getToken2;
    const stateToken3 = accessStateValue ? accessStateValue.getToken3 : getToken3;
    const stateCreatedBy = accessStateValue ? accessStateValue.getCreatedBy : getCreatedBy;


	//getがあればget、getがなければstates、何もなければ初期値
	const LoginId  = getLoginId ? getLoginId : stateLoginId ;
	const LoginPw  = getLoginPw ? getLoginPw : stateLoginPw ;
	const Token1  = getToken1 ? getToken1 : stateToken1 ;
	const Token2  = getToken2 ? getToken2 : stateToken2 ;
	const Token3  = getToken3 ? getToken3 : stateToken3 ;
	const CreatedBy  = getCreatedBy ? getCreatedBy : stateCreatedBy ;


    const StepState = '99';
    const [ZipSearchState, setZipSearchState] = useRecoilState(recoilState);

    //　displayState初期化
    const resetDisplayState = useResetRecoilState(displayState)
    //　アイテム選択状態データ初期化
    // const resetItemstate = useResetRecoilState(itemState)
    //　ローディング状態データ初期化
    const resetPageLoadiongState = useResetRecoilState(pageLoadiongState)
    //　FreePageデータ初期化
    const resetFreePagesStat = useResetRecoilState(freePagesState)
    //　CommonPageデータ初期化
    // const resetCommonPagesState = useResetRecoilState(commonPagesState)
    //　allBlocksStateデータ初期化
    // const resetAllBlocksState = useResetRecoilState(allBlocksState)
    //　blockStateデータ初期化
    // const resetBlockState = useResetRecoilState(blockState)
    //　settingsStateデータ初期化
    const resetSettingsState = useResetRecoilState(settingsState)
    //　itemStateデータ初期化
    // const resetItemState = useResetRecoilState(itemState)
    //  modalState初期化
    const resetModalState = useResetRecoilState(modalState)
    //  elmState初期化
    const resetElmState = useResetRecoilState(elmState)
    //  zipData初期化
    // const resetZipData = useResetRecoilState(zipData)
    //  termServiceState初期化
    // const resetTermServiceState = useResetRecoilState(termServiceState)

    const { getCsrfToken } = useCsrfToken();
    const key = sessionStorage.getItem('key');


    
    useEffect(() => {
        // resetFieldState();
        resetDisplayState();
        resetPageLoadiongState();
        resetFreePagesStat();
        // resetCommonPagesState();
        // resetAllBlocksState();
        // resetBlockState();
        resetSettingsState();

        resetModalState();
        // resetElmState();
        // resetZipData();
        // resetTermServiceState();
        //resetCookie();
    }, []);

    //IPアドレスの問い合わせ先
    const API_URL = 'https://api.ipify.org/';
    useEffect(() => {
        const logDataRecordTime = new Date().toLocaleString();
        setZipSearchState(() => [
            {
                ...ZipSearchState[0],
                zipSearch_access_time: new Date().toLocaleString(),
                ZipvalueMain: "",
                // ZipvalueSub: ZipvalueSub,
                // address1: address1,
                // address2: address2,
                // address3: address3,
                // kana1: kana1,
                // kana2: kana2,
                // kana3: kana3,
                // prefcode: prefcode,
                // zipcode: zipcode,
            }
        ]);
        setAccessState((oldSetAccessState) => (
            {
                ...oldSetAccessState,
                // getLoginId : LoginId,
                // getLoginPw : LoginPw,
                // getToken1 : Token1,
                // getToken2 : Token2,
                // getToken3 : Token3,
                // getCreatedBy : CreatedBy,
                LoginAccessUrl: window.location.href,
                LoginReferrer : document.referrer,
                LoginAccessLanguage: window.navigator.language,
                LoginAccessReferrer: document.referrer,
                LoginUserAgent: window.navigator.userAgent,
                LoginDataRecordTime: logDataRecordTime,
            }
        ));
        // setFieldState(fieldState);

    },[location]);

    const processing = useRef(false);
    const resetCookie = async () => {
        try {
            if (processing.current) return;
            processing.current = true;
            const headers = {
                "Content-Type": "application/json",
                Accept: "*/*",
                "Access-Control-Allow-Origin": origin,
            };
            const response = await fetch(apiURL + "/auth/initkey", {
                body: JSON.stringify({ csrf: getCsrfToken(), key: key }),
                method: "POST",
                headers: headers,
                credentials: "include",
                mode: "cors",
            });
            const data = await response.json();
        } catch (err) {
            console.log("err", err);
        } finally {
            processing.current = false;
        }
    }
/*
    //IPアドレスの問い合わせ先
    const API_URL = 'https://api.ipify.org/';
    useEffect(() => {
        
    //IPアドレスの問い合わせ
        axios.get(API_URL,{
            params: {
                //GETのパラメータ
                format: 'json',
            }
        }).then((response) => {
            const logDataRecordTime = new Date().toLocaleString();
            
            setAccessState((oldSetAccessState) => (
                {
                    ...oldSetAccessState,
                    getLoginId : LoginId,
                    getLoginPw : LoginPw,
                    getDebug : Debug,
                    LoginAccessIp : response.data.ip,
                    LoginAccessUrl: window.location.href,
                    LoginReferrer : document.referrer,
                    LoginAccessLanguage: window.navigator.language,
                    LoginAccessReferrer: document.referrer,
                    LoginUserAgent: window.navigator.userAgent,
                    LoginDataRecordTime: logDataRecordTime,
                }
            ));        
        })
        setDisplayState();//初期化
        setDisplayState((oldsetRecoilState) => (
            {
                isSpinerStart: false,
                toggleCheckbox: false,
                PageTitle: '',
                stepState: StepState,
            }
            ));
    },[location]);
*/
    return ;
};

