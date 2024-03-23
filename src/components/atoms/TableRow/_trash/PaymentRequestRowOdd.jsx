import React, { useRef, useState, useEffect, Suspense } from "react";
import { useNavigate } from 'react-router-dom';

export const PaymentRequestRowOdd = ({ColumnStyle, customWrapClass, customImgClass}) => {
    let RowClass = 'grid divide-x bg-slate-200 divide-slate-400 hover:bg-arrow-green-hover';
    let CellClass = 'text-center text-black font-normal py-2 px-1 bg-inherit hover:bg-inherit';
    let pathname = '/payment-request-detail';
    const navigate = useNavigate();

    return (
        <div id="PaymentRequestRowOdd" className={`${RowClass}`} style={ColumnStyle}>
            <div onClick={() => navigate(pathname)} className={`${CellClass}`} >2023年11月</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans`} >216</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans`} >1</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans`} >0</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >4,200,000</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >254,000</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >564,021</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >74,042</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >512,339</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >0</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >4,579,723</div>
        </div>
    );
};
