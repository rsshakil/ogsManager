import React, { useRef, useState, useEffect, Suspense } from "react";


export const PaymentRequestHeader = ({ColumnStyle, customWrapClass, customImgClass}) => {
    let HeaderClass = 'grid divide-x bg-arrow-blue-header divide-slate-400 sticky top-0 z-20';
    let CellClass = 'text-center text-white font-bold py-1 bg-inherit hover:bg-inherit';

    return (
        <div id="PaymentRequestHeader" className={`${HeaderClass}`} style={ColumnStyle} >
            <div className={`${CellClass}`} >集計月</div>
            <div className={`${CellClass}`} >請求数</div>
            <div className={`${CellClass}`} >未請求数</div>
            <div className={`${CellClass}`} >承認待ち</div>
            <div className={`${CellClass}`} >リハビリ</div>
            <div className={`${CellClass}`} >その他業務</div>
            <div className={`${CellClass}`} >課税経費</div>
            <div className={`${CellClass}`} >非課税経費</div>
            <div className={`${CellClass}`} >源泉</div>
            <div className={`${CellClass}`} >調整</div>
            <div className={`${CellClass}`} >支払総額</div>
        </div>
    );
};


