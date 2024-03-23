import React, { useRef, useState, useEffect, Suspense } from "react";


export const ExpensesHeader = ({ColumnStyle, customWrapClass, customImgClass}) => {
    let HeaderClass = 'grid divide-x bg-arrow-blue-header divide-slate-400 sticky top-0 z-20';
    let CellClass = 'text-center text-white font-bold py-2';

    return (
        <div id="ExpensesHeader" className={`${HeaderClass}`} style={ColumnStyle} >
            <div className={`${CellClass}`} >経費名</div>
            <div className={`${CellClass}`} >フリガナ</div>
            <div className={`${CellClass}`} >消費税</div>
            <div className={`${CellClass}`} >源泉税</div>
            <div className={`${CellClass}`} >状態</div>
            <div className={`${CellClass}`} >最終更新</div>
        </div>
    );
};
