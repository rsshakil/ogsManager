//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//  2023-04-24
//  このコンポーネントでテーブルが呼ばれるたびにAPIから最新のテーブル情報を取得する
//  取得した情報はrecoilに保存してから使用する
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

import React, { useRef, useState, useEffect, Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { displayState } from "../../store/displayState";
import { TableBody } from "../atoms/TableRow/TableBody";
import { tableStructure } from "../../store/tableStructure";
import BaseModal from "../molecules/modal/BaseModal";
import { TableBodyTest } from "../atoms/TableRow/TableBodyTest";



export const Table = ({customWrapClass, customImgClass}) => {
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [tableStructureObject, setTableStructure] = useRecoilState(tableStructure);

    return (
        <>
            <BaseModal />
            <TableBodyTest />
            {/* テストのために複数個設置
            本番は撤去する 
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />
            <TableBody />*/}
        </>            

    )

};
