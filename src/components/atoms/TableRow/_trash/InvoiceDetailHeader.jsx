import React, { useRef, useState, useEffect, Suspense } from "react";


export const InvoiceDetailHeader = ({ColumnStyle, customWrapClass, customImgClass}) => {
    let HeaderClass = 'grid divide-x divide-y bg-arrow-blue-header divide-slate-400 sticky top-0 z-20';
    let CellClass = 'align-middle text-center text-white font-bold bg-inherit hover:bg-inherit';

    return (
        <div id="InvoiceDetailHeader" className={`${HeaderClass}`} style={ColumnStyle} >
            <div className={`${CellClass} row-span-2 py-4`} >訪問会員様</div>
            <div className={`${CellClass} col-span-3 !border-l-2`} >30分</div>
            <div className={`${CellClass} col-span-3 !border-l-2`} >60分</div>
            <div className={`${CellClass} col-span-3 !border-l-2`} >90分</div>
            <div className={`${CellClass} row-span-2 py-4 !border-l-2`} >立替金</div>
            <div className={`${CellClass} row-span-2 py-4`} >調整額</div>
            <div className={`${CellClass} row-span-2 py-4 !border-l-2`} >請求額</div>
            <div className={`${CellClass} row-span-2 py-4 !border-l-2`} >最終更新</div>

            <div className={`${CellClass} !border-l-2`} >単価</div>
            <div className={`${CellClass}`} >数</div>
            <div className={`${CellClass}`} >合計</div>

            <div className={`${CellClass} !border-l-2`} >単価</div>
            <div className={`${CellClass}`} >数</div>
            <div className={`${CellClass}`} >合計</div>

            <div className={`${CellClass} !border-l-2`} >単価</div>
            <div className={`${CellClass}`} >数</div>
            <div className={`${CellClass}`} >合計</div>





        </div>
    );
};
