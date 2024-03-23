import React, { useRef, useState, useEffect, Suspense } from "react";
import { useNavigate } from 'react-router-dom';

export const InvoiceRowOdd = ({ColumnStyle, customWrapClass, customImgClass}) => {
    let RowClass = 'grid divide-x bg-slate-200 divide-slate-400 hover:bg-arrow-green-hover';
    let CellClass = 'text-center text-black font-normal py-2 px-1 bg-inherit hover:bg-inherit';
    let pathname = '/invoice-detail';
    const navigate = useNavigate();

    return (
        <div id="InvoiceRowOdd" className={`${RowClass}`} style={ColumnStyle} >
            <div onClick={() => navigate(pathname)} className={`${CellClass}`} >2023年11月</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans`} >216</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >4,200,000</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >254,000</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >0</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >4,454,000</div>
            <div className={`${CellClass}`} ></div>
        </div>
    );
};
