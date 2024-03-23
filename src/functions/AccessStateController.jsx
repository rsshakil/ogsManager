import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessState } from "../../src/store/accessState";
import { useLocation } from "react-router-dom";
import axios from "axios";

//これは使わなくなるかもしれない

export const AccessStateController = (props) => {
    const { 
        // everything=============
        accessInfomation,
        // GET=============
        // getLoginId,
        // getLoginPw,
        // getDebug,
        // // Dvice=============
        // accessIp,
        // accessUrl,
        // accessLanguage,
        // accessReferrer,
        // userAgent,
        // // Access=============
        
        // LoginAccessTime,
        // LoginWithReservedTime,
        // LoginWithoutReservedTime,
        // LoginSuccessGetRsvErrorTime,
        // LoginFunctionErrorTime,
        // LogDataRecordTime,
        // MypageAccessByReservedTime,
        // MypageAccessWithoutReservedTime,
        // FacilityListAccessTime,
        // GetMappingSlotTime,
        // ReservationAccessTime,
        // OptionAccessTime,
        // EditAccessTime,
        // EditSubmitTime,
        // ConfirmAccessTime,
        // QuestionnaireAccessTime,
        // ThanksAccessTime,
        // CancelCompletAccessTime,
        // PageNotFoundAccessTime,
        // ReservationFailureAccessTime,
        // SessionErrorAccessTime,
        // UnderMaintenanceAccessTime,
        // MappingSlotGetTime,
    } = props;
	const location = useLocation();
    const navigate = useNavigate();
    const API_URL = 'https://api.ipify.org/';
    // const logDataRecordTime = new Date().toLocaleString();
    //recoilStateValueからqrのIDを取り出し
	const [accessStateValue, setAccessState] = useRecoilState(accessState);
    const logDataRecordTime = new Date().toLocaleString();
    useEffect(() => {
        axios.get(API_URL,{
            params: {
                //GETのパラメータ
                format: 'json',
              }
        }).then((response) => {
            // AccessIp = response.data.ip;
            // console.log("中＝＞"+JSON.stringify(AccessIp,null, '...'));
            setAccessState((oldSetAccessState) => (
                {
                    ...oldSetAccessState,
                    ...props,
                    accessIp : response.data.ip,
                    accessUrl: window.location.href,
                    accessLanguage: window.navigator.language,
                    accessReferrer: document.referrer,
                    userAgent: window.navigator.userAgent,
                    LogDataRecordTime: logDataRecordTime,
                }
                ));
        });

    },[location]);
    return ;
};

