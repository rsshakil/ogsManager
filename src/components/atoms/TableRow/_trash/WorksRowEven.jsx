import React, { useRef, useState, useEffect, Suspense } from "react";


export const WorksRowEven = ({imageUrl, customWrapClass, customImgClass}) => {
    let RowClass = 'grid grid-cols-8 divide-x bg-white divide-slate-400 hover:bg-arrow-green-hover';
    let CellClass = 'text-center text-black font-normal py-2 px-2';

    return (
        <div id="WorksRowEven" className={`${RowClass}`} >
            <div className={`${CellClass}`} >会議</div>
            <div className={`${CellClass}`} >会議</div>
            <div className={`${CellClass} font-DroidSans currency text-right`} >2,005</div>
            <div className={`${CellClass} font-DroidSans currency text-right`} >1,087</div>
            <div className={`${CellClass}`} ></div>
            <div className={`${CellClass}`} >●</div>
            <div className={`${CellClass}`} ></div>
            <div className={`${CellClass} font-DroidSans`} >2023/04/08 08:32</div>
        </div>
    );
};
