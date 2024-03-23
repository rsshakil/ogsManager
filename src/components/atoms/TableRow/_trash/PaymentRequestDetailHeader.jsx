import React, { useRef, useState, useEffect, Suspense } from "react";


export const PaymentRequestDetailHeader = ({ColumnStyle, customWrapClass, customImgClass}) => {
    let HeaderClass = 'grid divide-x divide-y divide-slate-400 sticky top-0 z-20';
    let CellClass = 'align-middle text-center text-white font-bold bg-arrow-blue-header';

    return (
        <div id="PaymentRequestDetailHeader" className={`${HeaderClass}`} style={ColumnStyle}>
            {/* セラピスト情報のカラム */}
            <div className={`${CellClass} row-span-2 py-4 sticky left-[1px] top-0 z-10`} >税</div>
            <div className={`${CellClass} row-span-2 py-4 sticky left-[2rem] z-10`} >ID</div>
            <div className={`${CellClass} row-span-2 py-4 sticky left-[6.5rem] z-10 drop-shadow-lg`} >名前</div>
            {/* 固定請求項目 */}
            <div className={`${CellClass} col-span-3 !border-l-2`} >訪問単価</div>
            <div className={`${CellClass} col-span-3`} >リハビリテーション料</div>
            {/* その他業務❗️ここが動的に増えたり減ったりするので要注意 */}
            <div className={`${CellClass} col-span-3 !border-l-2`} >会議</div>
            <div className={`${CellClass} col-span-3`} >挨拶</div>
            <div className={`${CellClass} col-span-3`} >事務作業[通常]</div>
            <div className={`${CellClass} col-span-3`} >事務作業[特別]</div>
            <div className={`${CellClass} col-span-3`} >研修1</div>
            <div className={`${CellClass} col-span-3`} >研修2</div>
            {/* ここまでの合計 */}
            <div className={`${CellClass} row-span-2 py-4 !border-l-2`} >小計</div>
            {/* 課税経費 */}
            <div className={`${CellClass} col-span-3 !border-l-2`} >課税経費</div>
            {/* 所得税の計算 */}
            <div className={`${CellClass} row-span-2 py-4 !border-l-2`} >報酬額</div>
            <div className={`${CellClass} row-span-2 py-4`} >所得税</div>

            <div className={`${CellClass} col-span-3 !border-l-2`} >非課税経費</div>
            <div className={`${CellClass} row-span-2 py-4 !border-l-2`} >支払総額</div>
            <div className={`${CellClass} row-span-2 py-4 !border-l-2`} >最終更新</div>
            {/* ///////////////////////////////////////
            ヘッダーの2行目
            /////////////////////////////////////// */}
            {/* 訪問 */}
            <div className={`${CellClass} !border-l-2`} >単価</div>
            <div className={`${CellClass}`} >数</div>
            <div className={`${CellClass}`} >合計</div>
            {/* リハビリテーション */}
            <div className={`${CellClass}`} >単価</div>
            <div className={`${CellClass}`} >数</div>
            <div className={`${CellClass}`} >合計</div>
            {/* その他業務群 */}
            <div className={`${CellClass} !border-l-2`} >単価</div>
            <div className={`${CellClass}`} >数</div>
            <div className={`${CellClass}`} >合計</div>
            <div className={`${CellClass}`} >単価</div>
            <div className={`${CellClass}`} >数</div>
            <div className={`${CellClass}`} >合計</div>
            <div className={`${CellClass}`} >単価</div>
            <div className={`${CellClass}`} >数</div>
            <div className={`${CellClass}`} >合計</div>
            <div className={`${CellClass}`} >単価</div>
            <div className={`${CellClass}`} >数</div>
            <div className={`${CellClass}`} >合計</div>
            <div className={`${CellClass}`} >単価</div>
            <div className={`${CellClass}`} >数</div>
            <div className={`${CellClass}`} >合計</div>
            <div className={`${CellClass}`} >単価</div>
            <div className={`${CellClass}`} >数</div>
            <div className={`${CellClass}`} >合計</div>
            {/* 諸経費群 */}
            <div className={`${CellClass} !border-l-2`} >交通費</div>
            <div className={`${CellClass}`} >ランチ</div>
            <div className={`${CellClass}`} >駐車場</div>
            {/* 非課税経費群 */}
            <div className={`${CellClass} !border-l-2`} >備品</div>
            <div className={`${CellClass}`} >立て替え</div>
            <div className={`${CellClass}`} >調整額</div>

            {/* 課税経費❗️ここが動的に増えたり減ったりするので要注意 */}
            {/* <div className={`${CellClass} !border-l-2`} >交通費</div>
            <div className={`${CellClass}`} >駐車場</div>
            <div className={`${CellClass}`} >ランチ</div>

            <div className={`${CellClass}`} >調整</div>
            <div className={`${CellClass}`} >支払総額</div> */}
        </div>
    );
};


