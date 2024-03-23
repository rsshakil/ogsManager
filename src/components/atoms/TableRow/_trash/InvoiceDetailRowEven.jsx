import React, { useRef, useState, useEffect, Suspense } from "react";
import { useNavigate } from 'react-router-dom';

export const InvoiceDetailRowEven = ({ColumnStyle, customWrapClass, customImgClass}) => {
    let RowClass = 'grid grid-cols-[1fr_1fr_minmax(3rem,_auto)_1fr_1fr_minmax(3rem,_auto)_1fr_1fr_minmax(3rem,_auto)_1fr_1fr_1fr_1fr_11rem] divide-x bg-white divide-slate-400 hover:bg-arrow-green-hover';
    let CellClass = 'text-center text-black font-normal py-2 px-2 bg-inherit hover:bg-inherit';
    let pathname = '/invoice-detail';
    const navigate = useNavigate();

    return (
        <div id="InvoiceDetailRowEven" className={`${RowClass}`} style={ColumnStyle} >
            <div onClick={() => navigate(pathname)} className={`${CellClass}`} >松下 あや</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right !border-l-2`} >1,000</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans text-right`} >11</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >11,000</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right !border-l-2`} >4,500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans text-right`} >11</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >49,500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right !border-l-2`} >4,500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans text-right`} >11</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >49,500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right !border-l-2`} >600</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >120</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right !border-l-2`} >110,600</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans !border-l-2`} >2023/03/09 21:41</div>
        </div>
    );
};
