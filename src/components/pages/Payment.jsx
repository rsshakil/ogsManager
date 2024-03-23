import React, { useRef, useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Column } from "devextreme-react/data-grid";
// import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { settingsState } from "../../store/settingsState";
import { displayState } from "../../store/displayState";
// import { Table } from "../organisms/Table";
import Table from "../ui/Table";


export const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const history = useHistory();
    const [settingsStateStateValue, setSettingsStateState] = useRecoilState(settingsState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    console.log(settingsStateStateValue);

    let pagePath = 'payment';
    // let pageName = location.state?.data.name;
    let pageTitle = '決済情報';

    const dataSource = [
        { key: 'stripe', caption: 'ストライプ' },
        { key: 'bank_transfer_manual', caption: '銀行振込（アナログ）' },
        { key: 'credit_epsilon', caption: 'イプシロン（クレジットカード）' },
        { key: 'paypay', caption: 'PayPay' },
        { key: 'paymentSummary', caption: '売上データ' },
    ];


    useEffect(() => {
        window.history.pushState(null, '', window.location.href);
        setDisplayState((prevState) => ({
            ...prevState,
            pageTitle: pageTitle,
            pagePath: pagePath,
            // pageName: pageName,
        }))
    }, [location]);

    const onCellPrepared = (e) => {
        if (e.rowType === "data") {
            if (e.data.item) e.cellElement.style.cursor = "pointer";
        }
    }

    const handleOnCellClick = async(e) => {
        console.log('handleColumnClick e ', e)
        const { key } = e?.data || {};

        switch (key) {
            case 'stripe':
                window.open("https://dashboard.stripe.com/dashboard");
                break;
            case 'bank_transfer_manual':
                navigate('/payment-history');
                break;
            case 'paymentSummary':
                navigate('/payment-summary');
                break;
            case 'credit_epsilon':
                navigate('/payment-history-epsilon-credit');
                break;
            case 'paypay':
                navigate('/payment-history-paypay');
                break;
        }
    }

    return (
        <div id="settingsListWrapper">
            <Table
                dataSource={dataSource}
                onCellClick={handleOnCellClick}
                onCellPrepared={onCellPrepared}
            >
                <Column
                    cssClass="cursor-pointer"
                    dataField="caption"
                    allowFiltering={false}
                />
            </Table>
        </div>
    );
};



