import React, { useRef, useState, useEffect, Suspense } from "react";


export const ExpensesRowOdd = ({ColumnStyle, customWrapClass, customImgClass}) => {
    let RowClass = 'grid divide-x bg-slate-200 divide-slate-400 hover:bg-arrow-green-hover';
    let CellClass = 'text-center text-black font-normal py-2';

    return (
        <div id="ExpensesRowOdd" className={`${RowClass}`} style={ColumnStyle} >
            <div className={`${CellClass}`} >交通費</div>
            <div className={`${CellClass}`} >こうつうひ</div>
            <div className={`${CellClass}`} >●</div>
            <div className={`${CellClass}`} >●</div>
            <div className={`${CellClass}`} >停止</div>
            <div className={`${CellClass} font-DroidSans`} >2023/04/08 08:32</div>
        </div>
    );
};
