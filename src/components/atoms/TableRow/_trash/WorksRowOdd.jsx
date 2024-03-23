import React, { useRef, useState, useEffect, Suspense } from "react";


export const WorksRowOdd = ({imageUrl, customWrapClass, customImgClass}) => {
    let RowClass = 'grid grid-cols-8 divide-x bg-slate-200 divide-slate-400 hover:bg-arrow-green-hover';
    let CellClass = 'text-center text-black font-normal py-2 px-2';

    return (
        <div id="WorksRowOdd" className={`${RowClass}`} >
            <div className={`${CellClass}`} >会議</div>
            <div className={`${CellClass}`} >会議</div>
            <div className={`${CellClass} font-DroidSans currency text-right`} >9,800</div>
            <div className={`${CellClass} font-DroidSans currency text-right`} >7,818</div>
            <div className={`${CellClass}`} >●</div>
            <div className={`${CellClass}`} >●</div>
            <div className={`${CellClass}`} >停止</div>
            <div className={`${CellClass} font-DroidSans`} >2023/04/08 08:32</div>
        </div>
    );
};
