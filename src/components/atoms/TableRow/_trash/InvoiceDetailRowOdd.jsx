import React, { useRef, useState, useEffect, Suspense } from "react";
import { useNavigate } from 'react-router-dom';

export const InvoiceDetailRowOdd = ({ColumnStyle, customWrapClass, customImgClass}) => {
    let RowClass = 'grid grid-cols-[1fr_1fr_minmax(3rem,_auto)_1fr_1fr_minmax(3rem,_auto)_1fr_1fr_minmax(3rem,_auto)_1fr_1fr_1fr_1fr_11rem] divide-x bg-slate-200 divide-slate-400 hover:bg-arrow-green-hover';
    let CellClass = 'text-center text-black font-normal py-2 px-2 bg-inherit hover:bg-inherit';
    let pathname = '/invoice-detail';
    const navigate = useNavigate();

    return (
        <div id="InvoiceDetailRowOdd" className={`${RowClass}`} style={ColumnStyle} >
            <div onClick={() => navigate(pathname)} className={`${CellClass}`} >青木　涼介</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right !border-l-2`} >1,500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans text-right`} >3</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >4,500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right !border-l-2`} >4,500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans text-right`} >3</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >13,500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right !border-l-2`} >4,500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans text-right`} >3</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >13,500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right !border-l-2`} >500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right`} >0</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans currency text-right !border-l-2`} >32,000</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} font-DroidSans !border-l-2`} >2023/03/09 11:13</div>
        </div>
    );
};
