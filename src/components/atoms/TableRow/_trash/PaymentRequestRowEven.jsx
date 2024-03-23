import React, { useRef, useState, useEffect, Suspense } from "react";
import { useNavigate } from 'react-router-dom';

export const PaymentRequestRowEven = ({ColumnStyle, customWrapClass, customImgClass}) => {
    let RowClass = 'grid divide-x bg-white divide-slate-400 hover:bg-arrow-green-hover';
    let CellClass = 'text-center text-black font-normal py-2 px-1 bg-inherit hover:bg-inherit';
    let pathname = '/payment-request-detail';
    const navigate = useNavigate();

    return (
        <div id="PaymentRequestRowEven" className={`${RowClass}`} style={ColumnStyle}>
            <div onClick={() => navigate(pathname)} className={`${CellClass}`} >2023年12月</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans`} >206</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans`} >0</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans`} >3</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} currency text-right font-DroidSans`} >3,920,000</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} currency text-right font-DroidSans`} >198,000</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} currency text-right font-DroidSans`} >32,456</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} currency text-right font-DroidSans`} >32,456</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} currency text-right font-DroidSans`} >423,761</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} currency text-right font-DroidSans`} >-2,500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} currency text-right font-DroidSans`} >3,756,650</div>
        </div>
    );
};
