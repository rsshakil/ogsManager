import React, { useRef, useState, useEffect, Suspense } from "react";


export const InvoiceHeader = ({ColumnStyle, customWrapClass, customImgClass}) => {
    let HeaderClass = 'grid divide-x bg-arrow-blue-header divide-slate-400 sticky top-0 z-20';
    let CellClass = 'text-center text-white font-bold py-2 px-1 bg-inherit hover:bg-inherit';

    return (
        <div id="InvoiceHeader" className={`${HeaderClass}`} style={ColumnStyle} >
            <div className={`${CellClass}`} >集計月</div>
            <div className={`${CellClass}`} >請求数</div>
            <div className={`${CellClass}`} >リハビリ</div>
            <div className={`${CellClass}`} >立替金</div>
            <div className={`${CellClass}`} >調整</div>
            <div className={`${CellClass}`} >請求総額</div>
            <div className={`${CellClass}`} >PDF</div>
        </div>
    );
};
