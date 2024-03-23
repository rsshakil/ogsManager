import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { recoilState } from "../../../store/recoilState";
import { displayState } from "../../../store/displayState";
import PaymentRequest from "../../atoms/img/PaymentRequest.svg";
import Invoice from "../../atoms/img/Invoice.svg";
import Expenses from "../../atoms/img/Expenses.svg";
import Works from "../../atoms/img/Works.svg";
import CircleOff from "../../atoms/img/CircleOff.svg";
import CircleOn from "../../atoms/img/CircleOn.svg";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const MenuButton = (props) => {
    const { children, pathname, icon, blinkClass="" } = props;
    const [recoilStateValue, setRecoilState] = useRecoilState(recoilState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const location = useLocation();
    const navigate = useNavigate();
    //現在のパスの取得
    let currentPathname = displayStateValue.pagePath;
    // console.log("currentPathname", currentPathname);
    // console.log("pathname", pathname);
    //選択中のアイコンをCircleOnにする
    //*や/の場合一致しないがpaymentRequestをCircleOnにする処理が未実装
    let CircleIcon = CircleOn;
    if (currentPathname === pathname) {
        CircleIcon = CircleOn;
    }
    else if(pathname == 'payment' && currentPathname == 'payment-history' || pathname == 'payment' && currentPathname == 'payment-history-epsilon-credit' || pathname == 'payment' && currentPathname == 'payment-history-paypay' || pathname == 'payment' && currentPathname == 'payment-summary'){
        CircleIcon = CircleOn;
    }
     else {
        CircleIcon = CircleOff;
    }

    console.log('currentPathname' , currentPathname)
    console.log('pathname >>>>>>>>' , pathname)

    const menuButtonClick = () => {
        // if (pathname === 'stripe') {
        //     window.open("https://dashboard.stripe.com/dashboard");
        //     return;
        // }
        navigate(pathname);
    }

    return (
        <button onClick={menuButtonClick} className={`
            font-bold
            relative
            rounded-xl
            w-44
            sm:w-44
            md:w-44
            lg:w-44
            xl:w-44
            2xl:w-44
            border-2
            border-white
            flex
            items-center
            justify-center
            text-base
            text-ogs-blue-nomal
            my-2
            mr-2
            bg-ogs-yellow-nomal
            hover:bg-ogs-yellow-hover
            focus:bg-ogs-yellow-hover
            active:bg-ogs-yellow-active
            disabled:bg-blue-100
            focus:outline-none
            active:outline-none
            active:shadow-inner
            disabled:text-blue-300
            disabled:shadow-inner
            ${blinkClass}
            `}>
            <img className={`
                left-4
                h-6
                w-6
                absolute
                
                `} src={`${[icon]}`} />
            {children}
            <img className="
                right-4
                h-4
                w-4
                absolute
                " src={`${CircleIcon}`} />

        </button>
    );
};