import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { elmState } from "../../store/elmState";
import { settingsState } from "../../store/settingsState";

export const Content = (props) => {
    const { children } = props;
    //フッターの高さ取得
    const [elmStateValue, setElmState] = useRecoilState(elmState);
    //設定の読み取り
    const settingsstate = useRecoilValue(settingsState);
    //　必要な部分だけ切り取る
    const pageFrameSettings = settingsstate.appSettingQuery.pageFrameSettings;
    // contentOuterWrapClassを並列化
    const contentOuterWrapClass = [
        pageFrameSettings.classes.contentsBorderColor,
        pageFrameSettings.classes.contentsBorderStyle,
        pageFrameSettings.classes.contentsBorderWidth
    ].join(' ');
    // console.log(contentOuterWrapClass);



    let style = "";
    if (pageFrameSettings.classes.headerPosition == "fixed") {
        style = {
            // オフセットの高さ
            // minHeight: `${elmStateValue.contentOuterWrapHeight}px`,
            // minHeight: `calc(100vh - 95px)`,
            height: `calc(100vh - 68px)`,
        };
    } else {
        style = {
            // fixed以外の時フッターとヘッターを引く
            // minHeight: `calc(100vh - 95px)`,
            // height: `calc(100vh - (100vh - 80px))`,
            height: `calc(100vh - 68x)`,
        };
    }

    // https://chaika.hatenablog.com/entry/2020/11/04/120000
    return (
        // <div id="contentWrap" className={`overflow-x-auto overscroll-y-none min-w-[1873px] bg-amber-300 flex flex-col h-full grow`} style={style}>
        <div id="contentWrap" className={`overflow-x-auto overscroll-y-none bg-ogs-gray-nomal flex flex-col h-full grow`} style={style}>
            {children}
        </div>
    );
};
