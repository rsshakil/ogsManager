import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { UseWindowDimensions } from "../../functions/UseWindowDimensions";
import { elmState } from "../../store/elmState";
import Pagination from "../ui/Pagination";
import { displayState } from "../../store/displayState";
import { useModal } from "../../contexts/ModalContext";
import Categories from "../pages/Categories";
import GachaOrderForm from "../Form/forms/gacha/GachaOrderForm";
import Tags from "../pages/Tags";
import Genre from "../pages/Genre";
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { format } from 'date-fns';
import Loader from "../atoms/Loading/TherapistLoader";
import { useExportShippingCSVMutation } from "../../features/shipping/shippingApi";
import {useExportUserCSVMutation} from "../../features/user/userApi";
import {useExportPaymentCSVMutation} from "../../features/payment/paymentApi";

const getFormattedTimestamp = (timestamp, dateFormat = 'yyyy/MM/dd HH:mm') =>  timestamp ? format(new Date(timestamp), dateFormat) : '';

export const Footer = () => {
    const {tableRef, showModal, closeModal } = useModal();

    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [elmStateValue, setElmState] = useRecoilState(elmState);
    const [isDownloading, setIsDownloading] = useState(false);

    const [exportShippingCSV] = useExportShippingCSVMutation();
    const [exportUserCSV] = useExportUserCSVMutation();
    const [exportPaymentCSV] = useExportPaymentCSVMutation();


    // 画面の幅　最新情報取得
    const { width, height } = UseWindowDimensions();
    //Footerの高さを取得する
    const elm = useRef(null);

    /*useEffect(() => {
        const settingsListWrapper = document.querySelector("#settingsListWrapper");
        const footer = document.querySelector("footer");

        settingsListWrapper ? footer.style.display = "none" : footer.style.removeProperty = "display";
    }, [])*/

    //Footerの高さを保存する
    useEffect(() => {
        setElmState((prevState) => ({
            ...prevState,
            footerHeight: elm.current.offsetHeight,
        }))
    }, [width, height]);

    const itemsAdditionalSettings = (
        <>
            <p className="text-right cursor-pointer" onClick={() => showModal('カテゴリー管理', <Categories closeModal={closeModal} />)}>カテゴリー管理</p>
            <p className="text-right cursor-pointer" onClick={() => showModal('タグ管理', <Tags closeModal={closeModal} />)}>タグ管理</p>
        </>
    );

    const productsAdditionalSettings = (
        <>
            <p className="text-right cursor-pointer" onClick={() => showModal('表示順管理', <GachaOrderForm closeModal={closeModal} />)}>表示順管理</p>
            <p className="text-right cursor-pointer" onClick={() => showModal('ジャンル管理', <Genre closeModal={closeModal} />)}>ジャンル管理</p>
        </>
    );

    const shippingAdditionalSettings = (
        <>
            <p className={`text-right ${isDownloading ? 'cursor-default' : 'cursor-pointer'}`} onClick={exportShipping}>CSVエクスポート</p>
            <p className={`text-right ${isDownloading ? 'cursor-default' : 'cursor-pointer'}`} onClick={(e) => CSVExport('yuupuri', e)}>ゆうプリCSVエクスポート</p>
            {/* <br/> */}
        </>
    );

    const usersAdditionalSettings = (
        <>
            <p className={`text-right ${isDownloading ? 'cursor-default' : 'cursor-pointer'}`} onClick={(e) => CSVExport('userList', e)}>CSVエクスポート</p>
        </>
    );

    const epsilonCreditCardAdditionalSettings = (
        <>
            <p className={`text-right ${isDownloading ? 'cursor-default' : 'cursor-pointer'}`} onClick={(e) => CSVExport('epsilonCreditCard', e)}>CSVエクスポート</p>
        </>
    );

    const bankTransferAdditionalSettings = (
        <>
            <p className={`text-right ${isDownloading ? 'cursor-default' : 'cursor-pointer'}`} onClick={(e) => CSVExport('bankTransfer', e)}>CSVエクスポート</p>
        </>
    );

    async function CSVExport(exportType, e) {
        e.preventDefault();

        if(isDownloading) return;

        setIsDownloading(true);

        try{
            let queryParams = { };

            if(tableRef.current) {
                const dataGridInstance = tableRef.current.instance;

                console.log('dataGridInstance >>>>>', dataGridInstance)

                // Get filter and sort information
                const filters = dataGridInstance.getCombinedFilter();
                const sorts = dataGridInstance.getVisibleColumns('all');
                // const sorts1 = dataGridInstance.option('columns');
                // console.log('sorts >>>>>>', dataGridInstance.getVisibleColumns('all'))
                // return;

                if (Array.isArray(filters) && filters.length > 0) {
                    queryParams.filter = JSON.stringify(filters);
                }

                if(Array.isArray(sorts) && sorts.length > 0) {
                    const sorting = sorts.map((sortItem) => ({ selector: sortItem.selector, order: sortItem.desc ? 'DESC' : 'ASC' }));
                    queryParams.sort = JSON.stringify(sorting);
                }
            }

            let csvData, csvTitle;
            if (exportType === 'yuupuri') {
                csvTitle = '発送管理';
                const {data} = await exportShippingCSV(queryParams);
                csvData = data;
            }
            if (exportType === 'userList') {
                csvTitle = 'ユーザー';
                const {data} = await exportUserCSV(queryParams);
                csvData = data;
            }
            if (exportType === 'epsilonCreditCard') {
                csvTitle = 'イプシロン';
                queryParams.paymentType = exportType;
                const {data} = await exportPaymentCSV(queryParams);
                csvData = data;
            }
            if (exportType === 'bankTransfer') {
                csvTitle = '銀行振込';
                queryParams.paymentType = exportType;
                const {data} = await exportPaymentCSV(queryParams);
                csvData = data;
            }

            // Create a temporary URL for the Blob
            const url = URL.createObjectURL(new Blob([csvData]));

            // Create a link element and trigger a click to start the download
            const fileName = `${csvTitle}${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}.csv`
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();

            // Cleanup: revoke the Object URL to free up resources
            URL.revokeObjectURL(url);

            setIsDownloading(false);

        }catch(error) {
            setIsDownloading(false);
            console.log('Error in csv export', error)
        }
    }
    

     function exportShipping(e) {
        e.preventDefault();

        // let columns1 = tableRef.current.instance.getVisibleColumns();
        // console.log('ccccc', columns1);

        const columns = [
            {header: "状態", key: "userCollectionStatus"},
            {header: "申請日時", key: "userCollectionRequestAt"},
            {header: "ID", key: "userId"},
            {header: "申請ユーザー", key: "userEmail"},
            {header: "まとめて発送ID", key: "userCollectionTransactionUUID"},
            {header: "アイテム名[日本語]", key: "itemTranslateName"},
            {header: "ポイント", key: "userCollectionPoint"},
            {header: "編集日時", key: "userCollectionUpdatedAt"},
            {header: "発送日時", key: "userCollectionShippedAt"},
            {header: 'アイテムの取得日時', key: 'userCollectionCreatedAt'},
            {header: 'シリアルナンバー', key: 'itemAttribute3'},
            {header: 'タグ', key: 'itemTags'},
            {header: '送付先名称', key: 'userCollectionShippingName'},
            {header: "送付先名称カウント", key: "userShippingNameCount"},
            {header: '郵便番号', key: 'userCollectionShippingZipcode'},
            {header: '都道府県(⚠️旧住所)', key: 'userCollectionShippingAddress'},
            {header: '都道府県(⚠️旧住所)カウント', key: 'userShippingAddressCount'},
            {header: '市区町村+町名番地の結合', key: 'userCollectionShippingAddress23'},
            {header: '市区町村+町名番地カウント', key: 'userShippingAddress23Count'},
            {header: '建物名部屋番号', key: 'userCollectionShippingAddress4'},
            {header: '配送先電話番号国コード', key: 'userCollectionShippingTelCountryCode'},
            {header: '配送先電話番号', key: 'userCollectionShippingTel'},
            {header: '配送先電話番号カウント', key: 'userShippingTelCount'},
            {header: '登録IP', key: 'userRegistIPAddress'},
            {header: '登録IPカウント', key: 'userRegistIPCount'},
            {header: 'SMS番号国コード', key: 'userSMSTelLanguageCCValue'},
            {header: 'SMS番号', key: 'userSMSTelNoFormat'},
        ];
        let records = [];

        if (tableRef.current) {
            const statusLookup = {1: '', 2: '未対応', 3: '発送済', 4: 'その他', 5: '対応中', 6: 'キャンセル'};
            const getLookupCaption = (status) => statusLookup[status];

            records = tableRef.current.instance.getDataSource().items().map(x => ({
                ...x, 
                userCollectionStatus: getLookupCaption(x.userCollectionStatus),
                userCollectionRequestAt: getFormattedTimestamp(x.userCollectionRequestAt),
                userCollectionShippedAt: getFormattedTimestamp(x.userCollectionShippedAt),
                userCollectionUpdatedAt: getFormattedTimestamp(x.userCollectionUpdatedAt),
                userCollectionCreatedAt: getFormattedTimestamp(x.userCollectionCreatedAt),
            }));

            const fileName = `発送管理${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}`
            exportCsv(columns, records, fileName);
          }
    }



    const exportCsv = async(columns = [], records = [], fileName = 'example.csv') => {
        if(isDownloading) return;

        setIsDownloading(true);

        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');

        // Set worksheet columns based on defined columns
        worksheet.columns = columns;
        // Add data to the worksheet
        records.forEach(row => worksheet.addRow(row));

       // Generate the CSV file in memory
        workbook.csv.writeBuffer()
        .then((buffer) => {
            const blob = new Blob([buffer], { type: 'text/csv;charset=utf-8' });
            FileSaver.saveAs(blob, fileName);

            setIsDownloading(false);
        })
        .catch((error) => {
            console.error('Error occurred while exporting to CSV:', error);
            setIsDownloading(false);
        });
    }


    return (
        <>
            {isDownloading && <Loader />}

            <footer ref={elm} className={`flex h-20 flex-row grow-0 z-10 mx-4 items-center overflow-auto`}>
                {/* <Pagination /> */}

                <div className="text-lg font-bold text-white footer-right">
                    {
                        {
                            'items': itemsAdditionalSettings,
                            'products': productsAdditionalSettings,
                            //other page settings need to add here...
                            'shippings': shippingAdditionalSettings,
                            'users': usersAdditionalSettings,
                            'payment-history-epsilon-credit': epsilonCreditCardAdditionalSettings,
                            'payment-history': bankTransferAdditionalSettings,
                        }[displayStateValue.pagePath]
                    }
                </div>
            </footer>
        </>
    );
};
