import React, { useRef, useState, useEffect, Suspense } from "react";


export const ExpensesRowEven = ({ColumnStyle, customWrapClass, customImgClass}) => {
    let RowClass = 'grid divide-x bg-white divide-slate-400 hover:bg-arrow-green-hover';
    let CellClass = 'text-center text-black font-normal py-2';

    return (
        <div id="ExpensesRowEven" className={`${RowClass}`} style={ColumnStyle} >
            <div className={`${CellClass}`} >立て替え</div>
            <div className={`${CellClass}`} >tatekae💓</div>
            <div className={`${CellClass}`} >●</div>
            <div className={`${CellClass}`} >●</div>
            <div className={`${CellClass}`} ></div>
            <div className={`${CellClass} font-DroidSans`} >2023/04/08 08:32</div>
        </div>
    );
};
