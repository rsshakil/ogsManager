import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import { historyStateController } from "../functions/historyStateController";
import { historyState } from "../store/historyState";
import { referrerState } from "../store/referrerState";
import { useRecoilState, useRecoilValue } from "recoil";
import { recoilState } from "../store/recoilState";

function ReferrerController() {
    const location = useLocation();
    const navigate = useNavigate();

    const [historyStateValue, setHistoryState] = useRecoilState(historyState);
    const [referrerStateValue, setReferrerState] = useRecoilState(referrerState);
    const referrerValue = historyStateValue[1] ? Object.values(historyStateValue[1]) : "";

    let currentPathname = location['pathname'].replace("/", "_");
    // historyStateController({currentPathname:currentPathname});

    useLayoutEffect(() => {
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        // console.log(currentPathname);
        // console.log(referrerValue);
        if (currentPathname.length > 0 && referrerValue != currentPathname) {
            let allowedPaths;
            if (referrerValue[0] != "_") {
                allowedPaths = referrerStateValue[currentPathname];
                // console.log("allowedPaths", allowedPaths);
                // console.log("referrerStateValue", referrerStateValue);
                // console.log("currentPathname", currentPathname);
                // console.log("referrerValue[0]", referrerValue[0]);
                // console.log(currentPathname == "_");


                if (typeof allowedPaths === 'undefined') {
                    // console.log('undefined');
                    // window.location.href = '/404'
                }
                else {
                    if (referrerValue[0] && referrerValue[0] != 'initialValueForHistory') {
                        // console.log("[ReferrerController]allowedPaths", allowedPaths);
                        // console.log("[ReferrerController]referrerValue[0]", referrerValue[0].replace("_","/"));
                        // console.log("[ReferrerController]referrerValue[0].toLowerCase()", referrerValue[0].replace("_","/").toLowerCase());
                        if (!allowedPaths.includes(referrerValue[0].replace("_", "/"))) {
                            // console.log('%cTransition error', "color:red");
                            navigate("/transition_error");
                        }
                    }
                }
            }


        }
        else {
            // console.log('%cAllow', "color:green");
        }

    }, [historyStateValue]);

    return null;
}

export default ReferrerController;