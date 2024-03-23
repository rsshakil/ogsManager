import React, { useLayoutEffect, useState, useEffect, useReducer, Children } from "react";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { HeaderFooter } from '../components/templates/HeaderFooter'
import ScrollTop from './ScrollTop'
import Validator from './Validator'

import { accessState } from "../store/accessState";
import { useRecoilState, useRecoilValue } from "recoil";
import ReferrerController from "./ReferrerController";

import { PaymentRequest } from "../components/pages/PaymentRequest";
import { Works } from "../components/pages/Works";
import { Invoice } from "../components/pages/Invoice";
import { Expenses } from "../components/pages/Expenses";
import { PaymentRequestDetail } from "../components/pages/PaymentRequestDetail";
import { InvoiceDetail } from "../components/pages/InvoiceDetail ";
import { InvoiceLayout } from "../components/Form/InvoiceLayout/InvoiceLayout";
import { ReceiptLayout } from "../components/Form/InvoiceLayout/ReceiptLayout";
import { Products } from "../components/pages/Products";
import { Items } from "../components/pages/Items";
import { Shippings } from "../components/pages/Shippings";
import { Users } from "../components/pages/Users";
import { Sales } from "../components/pages/Sales";
import { Payment } from "../components/pages/Payment";
import { Settings } from "../components/pages/Settings";
import AuthLayout from "../components/templates/AuthLayout";
import Login from "../components/pages/auth/Login";
import PrivateRoute from "./PrivateRoute";
import { BankTransferManual } from "../components/pages/BankTransferManual";
import { PaymentSummary } from "../components/pages/PaymentSummary";
import { CreditEpsilon } from "../components/pages/CreditEpsilon";
import { Paypay } from "../components/pages/Paypay";


// export const RouteConf = ({ setPageLoadingEnded, isPageLoading, isPageLoadingStopState }) => {
// export const RouteConf = ({ setPageLoadingEnded, isPageLoading, isPageLoadingStopState, timer = '', clearTimer = () => { } }) => {
export const RouteConf = () => {
    const [recoilStateValue, setRecoilState] = useRecoilState(accessState);

    // useEffect(() => {
    const getDebugSwich = recoilStateValue.getDebug ? recoilStateValue.getDebug : '1';

    switch (getDebugSwich) {
        case '9JhdbGtd65egh$$rf%gq':
            // console.log("switch========> (getDebugSwich)" + recoilStateValue.getDebug);
            // initLogger(true); 
            break;
        default:
            // console.log("switch========> (default)" + recoilStateValue.getDebug);
            // initLogger(false); 
            break;
    }

    const location = useLocation();
    // console.log("location.pathname", location.pathname);


    return (
        <>
            {location.pathname == '/invoiceLayout' ? (
                <Routes>
                    <Route path="invoiceLayout" element={<InvoiceLayout />} />
                </Routes>
            ) : (
                location.pathname == '/receiptLayout' ? (
                    <Routes>
                        <Route path="receiptLayout" element={<ReceiptLayout />} />
                    </Routes>
                ) : (
                    <>
                        <ReferrerController />
                        <ScrollTop />
                        {/* <HeaderFooter> */}
                        <Routes>
                            <Route element={<AuthLayout />}>
                                <Route path="/" element={<Login />} />
                            </Route>

                            <Route element={<PrivateRoute><HeaderFooter /></PrivateRoute>}>
                                <Route path="items" element={<Items />} />

                                <Route path="*" element={<Products />} />
                                <Route path="products" element={<Products />} />
                                <Route path="shippings" element={<Shippings />} />
                                <Route path="users" element={<Users />} />
                                <Route path="sales" element={<Sales />} />
                                <Route path="payment" element={<Payment />} />
                                <Route path="payment-history" element={<BankTransferManual />} />
                                <Route path="payment-summary" element={<PaymentSummary />} />
                                <Route path="payment-history-epsilon-credit" element={<CreditEpsilon />} />
                                <Route path="payment-history-paypay" element={<Paypay />} />
                                <Route path="settings" element={<Settings />} />
                            </Route>

                            {/* <Route element={<Validator><Outlet /></Validator>}></Route> */}
                        </Routes>
                        {/* </HeaderFooter> */}
                    </>
                )
            )}
        </>
    )
}
