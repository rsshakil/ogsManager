import React, { useRef, useState, useEffect } from "react";
import { settingsState } from "../../store/settingsState";
import { Header } from "../organisms/Header";
import { Content } from "../organisms/Content";
import { useRecoilState, useRecoilValue } from "recoil";
import { recoilState } from "../../store/recoilState";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { accessState } from "../../store/accessState";
import { historyState } from "../../store/historyState";
import { referrerState } from "../../store/referrerState";
import { LinkList } from "../molecules/LinkList";
import { DebugWindow } from "../molecules/DebugWindow";
import { debugState } from "../../store/debugState";
import { elmState } from "../../store/elmState";
import { UseWindowDimensions } from "../../functions/UseWindowDimensions";
import { displayState } from "../../store/displayState";
import { Footer } from "../organisms/Footer";
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup';
import { Button } from "devextreme-react/button";
import { ToastProvider } from "../../contexts/ToastContext";
import { ModalProvider } from "../../contexts/ModalContext";
import PopupModal from "../ui/PopupModal";
import { Outlet } from 'react-router-dom'

export const HeaderFooter = () => {

    //  Debug受信
    const [searchParams] = useSearchParams();
    const initiaDebug = '';
    //  Debug受信しなければ空にし、それを初期値とする
    const getDebug = searchParams.get("debug") ? searchParams.get("debug") : initiaDebug;
    //  recoilから取り出し
    const [accessStateValue, setAccessState] = useRecoilState(accessState);
    //  recoilにDebugがなければ初期値,recoilにあればgetの受信がなくてもデバッグ状態とする
    const stateDebug = accessStateValue.getDebug ? accessStateValue.getDebug : getDebug;
    //  getの受信があればその値で最終的なデバッグキーとする
    const Debug = getDebug ? getDebug : stateDebug;


    //　ヘッターフッターの高さ取得
    const [elmStateValue, setElmState] = useRecoilState(elmState);
    const [stepState, setStepState] = useRecoilState(recoilState);
    //　設定の読み取り
    const settingsstate = useRecoilValue(settingsState);
    //　必要な部分だけ切り取る
    const pageFrameSettings = settingsstate.appSettingQuery.pageFrameSettings;
    const footerSettings = settingsstate.appSettingQuery.footerSettings;
    //　HeaderはFixedかどうか？
    // const isHeaderFixed = pageFrameSettings.classes.headerPosition;
    // let isHeaderFixed = "";
    // trueで来るようになったら"true"をtrueに変更する
    // 画面の幅　最新情報取得
    const { width, height } = UseWindowDimensions();
    //contentOuterWrapの情報を取得する
    const elm = useRef(null);
    // console.log("[HeaderFooter]elm=>",elm);
    // console.log("[HeaderFooter]elm.current=>",elm.current);
    useEffect(() => {
        setElmState((prevState) => ({
            ...prevState,
            contentOuterWrapHeight: elm.current.offsetHeight,
            vh: height,
            vw: width
        }))
    }, [width, height]);

    let style = "";
    if (pageFrameSettings.classes.headerPosition == "fixed") {
        style = {
            // fixedの時フッターを引く
            paddingTop: elmStateValue.headerHeight,
        };
    }
    else {
        style = {
            // fixedの時フッターとヘッターを引く
            paddingTop: 0,
        };
    }
    // console.log("pageFrameSettings.classes.headerPosition =>"+pageFrameSettings.classes.headerPosition );
    // console.log("isHeaderFixed=>"+isHeaderFixed);

    //  テーブルの枠の高さ　スクロールなしでヘッダーフッター出す場合に調整
    let contentOuterWrapStyle = "";
    if (pageFrameSettings.classes.headerPosition == "fixed") {
        contentOuterWrapStyle = {
            // fixedの時フッターを引く
            // minHeight: `calc(${elmStateValue.vh}px - (${elmStateValue.footerHeight}px + ${elmStateValue.headerHeight}px ))`,
            minHeight: `calc(100vh - (144px))`,
        };
    } else {
        contentOuterWrapStyle = {
            // fixed以外の時フッターとヘッターを引く
            // minHeight: `calc(100vh - (${elmStateValue.footerHeight}px + ${elmStateValue.headerHeight}px))`,
            minHeight: `calc(100vh - (144px))`,
        };
    }

    // console.log('stepState=>'+JSON.stringify(stepState,null,'\t'));
    const stepDisplay = stepState[0] ? stepState[0].stepState : "none";
    // console.log("stepDisplay=>"+stepDisplay);
    const location = useLocation();
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    // const [displayStateValue, setDisplayState] = useRecoilState(pageState);
    //リファラー関係
    const [historyStateValue, setHistoryState] = useRecoilState(historyState);
    const [referrerStateValue, setReferrerState] = useRecoilState(referrerState);
    const referrerValue = historyStateValue[1] ? Object.values(historyStateValue[1]) : "";
    // const [recoilDebugStateValue, setRecoilDebugState] = useRecoilState(debugState);
    // console.log('historyStateValue=>'+JSON.stringify(historyStateValue,null,'\t'));
    // console.log("リファラーは=>" + referrerValue);
    //現在のパスの取得
    let currentPathname = location['pathname'].replace("/", "_");
    // console.log("currentPathname", currentPathname);
    // console.log("lastPath", referrerValue[0])
    // console.log("現在のパスは=>" + currentPathname);
    //ヒストリー作成機に送る
    // historyStateController({currentPathname:currentPathname});

    //ステレージ空っぽ対策をやる
    useEffect(() => {
        document.querySelector('title').textContent = displayStateValue.PageTitle;
        setAccessState((prevState) => ({
            ...prevState,
            getDebug: Debug
        }))
    }, [location]);

    let getDebugSwich = accessStateValue.getDebug ? accessStateValue.getDebug : '1tw-ざぉ$#eSfsソhc7(+5vぱTVq9(Pu!6$shd愛Wb7S~et]5OpG8p@uy=f9徳JGg0da';
    let debugKey = "1eQz2が[ニfGfGだQ+52ぎ[TxFT4xTgaがTx@g殿3pyJ!q4P34ふjfgD49#fGえuH2t%5犬Gfgh71@=あ~4pof7";
    debugKey = 'keiko';

    getDebugSwich = getDebugSwich == debugKey ? 'px-4 bg-gray-800 text-emerald-400' : 'hidden';

    // contentMarginTopをやめてpaddingCss
    return (
        <ToastProvider>
            <ModalProvider>
                <div id="pageWrap" className={`flex flex-col text-black`}>
                    <PopupModal />
                    <Header />

                    <div id="contentOuterWrapOuter" className=" flex h-full justify-center grow mx-4 " style={style}>
                        <div ref={elm} id="contentOuterWrap" className={`w-full h-full flex overflow-y-auto overscroll-x-none ${pageFrameSettings.classes.contentsDropShadow}`}>
                            <Content><Outlet /></Content>
                        </div>
                    </div>

                    <Footer />

                    <div className={getDebugSwich}>
                        {/* <TimeMachine/> */}
                        <LinkList />
                        <DebugWindow />
                    </div>
                </div>
            </ModalProvider>
        </ToastProvider>
    );
};
