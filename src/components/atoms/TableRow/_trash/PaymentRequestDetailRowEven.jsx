import React, { useRef, useState, useEffect, Suspense } from "react";
import { useNavigate } from 'react-router-dom';

export const PaymentRequestDetailRowEven = ({ColumnStyle, customWrapClass, customImgClass}) => {
    const navigate = useNavigate();
    let RowClass = 'grid divide-x divide-slate-400 bg-white hover:bg-arrow-green-hover text-black font-normal';
    let CellClass = 'text-center bg-inherit hover:bg-inherit py-2 px-1';
    let pathname = '/payment-request-detail';
    //  固定請求の数字の色
    let FixedBillingColor = 'text-[#0000ff]';
    //  その他業務の数字の色
    let WorkBillingColor = 'text-[#008120]';
    //  課税経費の数字の色
    let TaxableExpensesColor = 'text-[#ca019e]';
    //  非課税経費の数字の色
    let TaxExemptExpensesColor = 'text-[#964600]';

    return (
        <div id="PaymentRequestDetailRowEven" className={`${RowClass}`} style={ColumnStyle} >
            {/* セラピスト情報のカラム */}
            <div onClick={() => navigate(pathname)} className={`${CellClass} sticky left-[1px] z-10`} ></div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} sticky left-[2rem] z-10 font-DroidSans`} >TD0009</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} sticky left-[6.5rem] z-10 drop-shadow-lg`} >⚠️三崎 宏明</div>
            {/* 固定請求項目 */}
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${FixedBillingColor} currency text-right !border-l-2 font-DroidSans`} >7,500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${FixedBillingColor} text-right font-DroidSans`} >63</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${FixedBillingColor} currency text-right font-DroidSans`} >54,500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${FixedBillingColor} currency text-right font-DroidSans`} >9,500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${FixedBillingColor} text-right font-DroidSans`} >95</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${FixedBillingColor} currency text-right font-DroidSans`} >883,500</div>
            {/* その他業務❗️ここが動的に増えたり減ったりするので要注意 */}
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} currency text-right !border-l-2 font-DroidSans`} >100</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} text-right font-DroidSans`} >88</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} currency text-right font-DroidSans`} >8,709</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} currency text-right font-DroidSans`} >700</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} text-right font-DroidSans`} >55</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} currency text-right font-DroidSans`} >9,500</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} currency text-right font-DroidSans`} >7,970</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} text-right font-DroidSans`} >5</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} currency text-right font-DroidSans`} >4,850</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} currency text-right font-DroidSans`} >9,030</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} text-right font-DroidSans`} >3</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} currency text-right font-DroidSans`} >3,090</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} currency text-right font-DroidSans`} >8,830</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} text-right font-DroidSans`} >3</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} currency text-right font-DroidSans`} >12,490</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} currency text-right font-DroidSans`} >950</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} text-right font-DroidSans`} >3</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${WorkBillingColor} currency text-right font-DroidSans`} >92,850</div>
            {/* ここまでの合計 */}
            <div onClick={() => navigate(pathname)} className={`${CellClass} currency text-right !border-l-2 font-semibold font-DroidSans`} >735,480</div>
            {/* 課税経費 */}
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${TaxableExpensesColor} currency text-right !border-l-2 font-DroidSans`} >2,400</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${TaxableExpensesColor} currency text-right font-DroidSans`} >5,400</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${TaxableExpensesColor} currency text-right font-DroidSans`} >18,400</div>
            {/* 所得税の計算 */}
            <div onClick={() => navigate(pathname)} className={`${CellClass} currency text-right !border-l-2 font-DroidSans`} >336,280</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} currency text-right font-DroidSans`} >(14,390)</div>
            {/* 非課税経費 */}
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${TaxExemptExpensesColor} currency text-right !border-l-2 font-DroidSans`} >2,000</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${TaxExemptExpensesColor} currency text-right font-DroidSans`} >652,000</div>
            <div onClick={() => navigate(pathname)} className={`${CellClass} ${TaxExemptExpensesColor} currency text-right font-DroidSans`} >0</div>
            {/* 支払総額 */} 
            <div onClick={() => navigate(pathname)} className={`${CellClass} currency text-right !border-l-2 font-semibold font-DroidSans`} >911,421</div>
            {/* 最終更新 */}
            <div onClick={() => navigate(pathname)} className={`${CellClass} !border-l-2 font-DroidSans`} >2023/03/09 11:13</div>
        </div>
    );
};
