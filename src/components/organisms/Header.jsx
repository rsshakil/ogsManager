import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { elmState } from "../../store/elmState";
import { UseWindowDimensions } from "../../functions/UseWindowDimensions";
import { useLocation } from "react-router-dom";
import { MenuButton } from "../atoms/buttons/MenuButton";
import Product from "../atoms/img/Product.svg";
import Item from "../atoms/img/Item.svg";
import Shipping from "../atoms/img/Shipping.svg";
import User from "../atoms/img/Users.svg";
import Sales from "../atoms/img/Sales.svg";
import Stripe from "../atoms/img/Stripe.svg";
import Setting from "../atoms/img/Setting.svg";

import Back from "../atoms/img/Back.svg";
import Download from "../atoms/img/Download.svg";
import Plus from "../atoms/img/Plus.svg";
import { MenuButtonSub } from "../atoms/buttons/MenuButtonSub";
import { displayState } from "../../store/displayState";
import { modalState } from "../../store/modalState";
import { pageLoaderState } from "../../store/pageLoaderState";
import http from '../../../src/restapi/httpService';
import _ from "lodash";
import Loader from "../atoms/Loading/TherapistLoader";

import ItemForm from "../Form/forms/items/ItemFormEdit";
import ItemFormCreate from "../Form/forms/items/ItemFormCreate";
import ProductFormCreate from "../Form/forms/products/ProductFormCreate";

import { useModal } from "../../contexts/ModalContext";
import CouponFormCreate from "../Form/forms/coupon/CouponFormCreate";
import { useSelector } from "react-redux";
// import useFetchShippingFlagQuery from "../../hooks/useFetchShippingFlagQuery";


export const Header = () => {
    const { showModal, closeModal, tableRef } = useModal();

    const [displayStateValue, setDisplayState] = useRecoilState(displayState);

    const {shippingFlag} = useSelector(state => state.auth);

    console.log('->>>>>>>>shippingFlag', shippingFlag)

    const location = useLocation();
    const navigate = useNavigate();

    // 画面の幅　最新情報取得
    const { width, height } = UseWindowDimensions();
    //　エレメント設定の読み込み
    const [elmStateValue, setElmState] = useRecoilState(elmState);
    //headerの高さを取得する
    const elm = useRef(null);
    //headerの高さを保存する
    useEffect(() => {
        setElmState((prevState) => ({
            ...prevState,
            headerHeight: elm.current.offsetHeight,
        }))
    }, [location, width, height]);

    //close ModalWhenBrowserBackTriggerOrPageLocationGotChange
    const { pathname } = useLocation();
    useEffect(() => {
        console.log("page has been change");
        closeModal();
    }, [pathname]);


    const chooseColumns = () => {
        if (tableRef.current.instance) {
            console.log('tableRef.current.instance', tableRef.current.instance);
            tableRef.current.instance.showColumnChooser();
        }
    }

    //////////////////////////////////////////////////////////////////
    //  メニューの内容定義
    //////////////////////////////////////////////////////////////////
    //  通常のメニュー
    const standardMenu = (
        <>
            <MenuButton className="" blinkClass="" pathname="products" icon={Product}>商品管理</MenuButton>
            <MenuButton className="" blinkClass="" pathname="items" icon={Item}>アイテム管理</MenuButton>
            <MenuButton className="" blinkClass={shippingFlag == 'true' ? "flushGrowingButton" : ""} pathname="shippings" icon={Shipping}>{shippingFlag == 'true' && "⚠️"}発送管理</MenuButton>
            <MenuButton className="" blinkClass="" pathname="users" icon={User}>ユーザー管理</MenuButton>
            <MenuButton className="" blinkClass="" pathname="sales" icon={Sales}>販売管理</MenuButton>
            <MenuButton className="" blinkClass="" pathname="payment" icon={Stripe}>決済情報</MenuButton>
            <MenuButton className="" blinkClass="" pathname="settings" icon={Setting}>設定管理</MenuButton>
        </>
    );

    //  payment-requestに戻る
    const back2PaymentRequest = <><MenuButtonSub pathname='payment-request' icon={Back} onClick={() => navigate('/payment-request')}>戻る</MenuButtonSub></>;
    //  invoiceに戻る
    const back2Invoice = <><MenuButtonSub pathname='payment-request' icon={Back} onClick={() => navigate('/invoice')}>戻る</MenuButtonSub></>;
    //  アイテム追加ボタン
    const addItems = <><MenuButtonSub className="flex-none" pathname='' icon={Plus} onClick={() => showModal('アイテム情報管理', <ItemFormCreate closeModal={closeModal} tableRef={tableRef} createItemModal={Math.random()} />)}>追加</MenuButtonSub></>;
    //  商品追加ボタン
    const addProducts = <><MenuButtonSub className="flex-none" pathname='' icon={Plus} onClick={() => showModal('商品管理', <ProductFormCreate closeModal={closeModal} tableRef={tableRef} createItemModal={Math.random()} />)}>追加</MenuButtonSub></>;
    //  販売追加ボタン
    const addSales = <><MenuButtonSub className="flex-none" pathname='' icon={Plus} onClick={() => showModal('クーポン管理', <CouponFormCreate closeModal={closeModal} tableRef={tableRef} createItemModal={Math.random()} />)}>追加</MenuButtonSub></>;
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////

    return (
        <header ref={elm} className={`w-full absolute h-16 grow-0 flex z-20 flex-col px-4 overflow-auto`}>
            <div className="flex h-full">

                <div className="flex-none flex justify-start">
                    {
                        {
                            'products': standardMenu,
                            'items': standardMenu,
                            'shippings': standardMenu,
                            'users': standardMenu,
                            'sales': standardMenu,
                            'payment': standardMenu,
                            'payment-history': standardMenu,
                            'payment-summary': standardMenu,
                            'payment-history-epsilon-credit': standardMenu,
                            'payment-history-paypay': standardMenu,
                            'settings': standardMenu,
                        }[displayStateValue.pagePath]
                    }
                </div>
                <div className="grow flex justify-start items-center font-bold text-lg">
                    {/* {records == 'true' &&  <p className="w-36 text-white text-base">❗️未対応請求あり</p>} */}
                </div>
                <div className="grow flex justify-center items-center font-bold text-lg">
                    {
                        {
                            'payment-request': '',
                            'payment-request-detail': displayStateValue.pageTitle,
                            'invoice': '',
                            'invoice-detail': displayStateValue.pageTitle,
                            'expenses': '',
                            'works': '',
                        }[displayStateValue.pagePath]
                    }
                </div>
                <div className="flex-none flex">
                    {
                        {
                            'items': addItems,
                            'products': addProducts,
                            'sales': addSales,
                        }[displayStateValue.pagePath]
                    }
                </div>
                {displayStateValue.pagePath !== 'settings' &&
                    <MenuButtonSub className="ml-2 max-w-[80px] min-w-[80px]" onClick={chooseColumns}>
                        <i className="dx-icon dx-icon-column-chooser"></i>
                    </MenuButtonSub>
                }
            </div>
        </header>
    )
};
