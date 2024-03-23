import React, { useRef, useState, useEffect, Suspense } from "react";


export const WorksHeader = ({imageUrl, customWrapClass, customImgClass}) => {
    let HeaderClass = 'grid grid-cols-8 divide-x bg-arrow-blue-header divide-slate-400 sticky top-0 z-20';
    let CellClass = 'text-center text-white font-bold py-2';

    return (
        <div id="WorksHeader" className={`${HeaderClass}`} >
            <div className={`${CellClass}`} >業務名</div>
            <div className={`${CellClass}`} >フリガナ</div>
            <div className={`${CellClass}`} >60分単価（税込）</div>
            <div className={`${CellClass}`} >60分単価（税抜）</div>
            <div className={`${CellClass}`} >消費税</div>
            <div className={`${CellClass}`} >源泉税</div>
            <div className={`${CellClass}`} >状態</div>
            <div className={`${CellClass}`} >最終更新</div>
        </div>
    );
};
