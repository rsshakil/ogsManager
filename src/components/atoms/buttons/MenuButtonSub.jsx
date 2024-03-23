/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import PaymentRequest from "../../atoms/img/PaymentRequest.svg";
import Invoice from "../../atoms/img/Invoice.svg";
import Expenses from "../../atoms/img/Expenses.svg";
import Works from "../../atoms/img/Works.svg";
import CircleOff from "../../atoms/img/CircleOff.svg";
import CircleOn from "../../atoms/img/CircleOn.svg";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { displayState } from "../../../store/displayState";
import { modalState } from "../../../store/modalState";

export const MenuButtonSub = (props) => {
    const { onClick, children, pathname, icon, type, className } = props;
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);


    ///////////////間宮(仮)/////////////////////
    const [modalStateValue, modalStateState] = useRecoilState(modalState);
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
    } else {
        CircleIcon = CircleOff;
    }
    ////////////////間宮(仮)///////////////////////
    let ButtonMargin = "my-2";


    if (modalStateValue.BaseModalOpen && type === "modal") {
        // console.log("✋✋✋✋✋✋✋イフに入った", modalStateValue.BaseModalOpen,);
        ButtonMargin = "h-10";
        // console.log("✋✋✋✋✋✋✋イフに入ったときのボタンマージン",ButtonMargin)
    } else {
        ButtonMargin = "my-2";
        // console.log("✋✋✋✋✋✋✋エルスに入った", modalStateValue.BaseModalOpen,);
        // console.log("✋✋✋✋✋✋✋エルスに入ったときのボタンマージン",ButtonMargin)
    }
    ;
    // console.log("最後に入ったときのボタンマージン",ButtonMargin)

    return (
        <button onClick={onClick} className={`
            font-bold
            relative
            rounded-xl
            w-36
            sm:w-36
            md:w-36
            border-2
            border-white
            flex
            items-center
            justify-center
            text-base
            text-ogs-blue-nomal
            
            ${ButtonMargin}
            bg-arrow-blue-nomal
            hover:bg-arrow-blue-hover
            focus:bg-arrow-blue-hover
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
            ${className}
            `}>
            {icon && <img className="
                left-4
                h-6
                w-6
                absolute
                " src={`${[icon]}`} />}
            {children}
        </button>
    );
};
