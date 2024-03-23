import { Column, FilterRow } from 'devextreme-react/data-grid';
import Table from "../../../ui/Table";
import Section from "../../FormInputs/Section";
import InputContainer from "../../FormInputs/InputContainer";
import React, { useEffect, useRef, useState } from 'react';
import useCustomStore from '../../../../hooks/useCustomStore';
import { useModal } from '../../../../contexts/ModalContext';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { format } from 'date-fns';
import {MenuButtonSub} from "../../../atoms/buttons/MenuButtonSub";
import {useExportUserDetailsCSVMutation} from "../../../../features/user/userApi";

const paymentStatusOptions = [
    // { id: 1, caption: "成功" },
    // { id: 2, caption: "---" },
    // { id: 3, caption: "作成" },
    // { id: 4, caption: "失敗" },
    // { id: 5, caption: "認証済み" },
    // { id: 6, caption: "認証失敗" },
    // { id: 7, caption: "成功（セキュアなし）" },
    { id: 1, caption: '決済完了' },
    { id: 3, caption: '決済開始' },
    { id: 4, caption: '3DS失敗' },
    { id: 5, caption: '3DS開始' },
    { id: 6, caption: '認証失敗' },
    { id: 7, caption: '決済完了（3DSなし）' },
    { id: 8, caption: 'トークン発行失敗' },
];
const smsHistoryStatusLookup = [
    { id: 1, caption: 'SMS認証' },
    { id: 2, caption: '購入認証' },
    { id: 3, caption: '発送認証' },
    { id: 4, caption: 'SMS認証返信' },
    { id: 5, caption: '購入認証返信' },
    { id: 6, caption: '発送認証返信' }
]
const getFormattedTimestamp = (timestamp, dateFormat = 'yyyy/MM/dd HH:mm') =>  timestamp ? format(new Date(timestamp), dateFormat) : '';
const getPaymentStatus = (id) => {
    let optionsInfo = paymentStatusOptions.find(item=>item.id==id);
    if(optionsInfo){
        return optionsInfo.caption;
    }else{
        return "";
    }
};
const getSmsStatus = (id) => {
    let optionsInfo = smsHistoryStatusLookup.find(item=>item.id==id);
    if(optionsInfo){
        return optionsInfo.caption;
    }else{
        return "";
    }
};

export default function UserCollections({keyId='userCollectionId', label = '', children, userId, type}) {
    const dataGridRef = useRef(null);
    const {isModalOpen: refetch } = useModal();

    const [isDownloading, setIsDownloading] = useState(false);

    const { dataSource, isLoading } = useCustomStore(keyId, `/user/${userId}?type=${type}`, true, [], refetch);

    const [exportUserDetailsCSV] = useExportUserDetailsCSVMutation();

    useEffect(() => {
        if (refetch == true) {
            dataGridRef.current?.instance?.pageIndex(0);
        }
    }, [refetch])

    const onCellClick = (e) => {
        if (!e?.column) return;
        const { dataField } = e.column;
        const paymentURL = 'https://dashboard.stripe.com';
        switch (dataField) {
            case 'paymentHistoryPIAction':
                window.open(`${paymentURL}/payments/${e.data.userPaymentHistoryPaymentIntent}`);
                break;
            case 'paymentHistoryIPAction':
                window.open(`${paymentURL}/search?query=paymentIPAddress%3A${e.data.userPaymentHistoryIPAddress1}`);
                break;
            case 'paymentHistoryTelAction':
                window.open(`${paymentURL}/search?query=userSMSTelNo%3A${e.data.userSMSTelNo}`);
                break;
            case 'paymentHistoryUIDAction':
                window.open(`${paymentURL}/search?query=userId%3A${e.data.userId}`);
                break;
            case 'paymentHistoryIDAction':
                window.open(`${paymentURL}/search?query=userEmail%3A${e.data.userEmail}`);
                break;
            case 'paymentHistoryLogAction':
                window.open(`${paymentURL}/logs?showIP=true&method[0]=get&method[1]=post&method[2]=delete&remote_ip=${e.data.userPaymentHistoryIPAddress1}&dashboard=false&direction[0]=self&direction[1]=connect_in`);
                break;
            case 'paymentHistoryCardFingerPrintAction':
                window.open(`${paymentURL}/search?query=fingerprint%3A${e.data.userPaymentHistoryCardFingerPrint}`);
                break;
            case 'paymentHistoryMailAction':
                window.open(`${paymentURL}/search?query=email%3A${e.data.userEmail}`);
                break;
        }
    }

    const exportCsv = async(e) => {
        e.preventDefault();

        if(isDownloading) return;

        setIsDownloading(true);

        try{
            let queryParams = {
                userId,
                type
            };
            const {data} = await exportUserDetailsCSV(queryParams);

            // Create a temporary URL for the Blob
            const url = URL.createObjectURL(new Blob([data]));

            // Create a link element and trigger a click to start the download
            const fileName = `${label}${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}.csv`
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();

            // Cleanup: revoke the Object URL to free up resources
            URL.revokeObjectURL(url);

            setIsDownloading(false);

        }catch(error) {
            setIsDownloading(false);
            console.log('Error in csv export > user', error)
        }

        /*let columns = [];
        let records = [];

        if (dataGridRef.current) {
            columns = dataGridRef.current.instance.getVisibleColumns().map(({caption, dataField, width}, i) => ({header: caption, key: dataField, width}));
            records = dataGridRef.current.instance.getDataSource().items();

            if(type == 'collection') {
                records = records.map(x => ({
                    ...x,
                    userCollectionCreatedAt: getFormattedTimestamp(x.userCollectionCreatedAt),
                    userCollectionExpiredAt: getFormattedTimestamp(x.userCollectionExpiredAt),
                }))
            }
            else if(type == 'shipping_await'){
                records = records.map(x => ({
                    ...x,
                    userCollectionRequestAt: getFormattedTimestamp(x.userCollectionRequestAt)
                }))
            }
            else if(type == 'shipping_complete') {
                records = records.map(x => ({
                    ...x,
                    userCollectionShippedAt: getFormattedTimestamp(x.userCollectionShippedAt)
                }))
            }
            else if (type == 'present') {
                records = records.map(x => ({
                    ...x,
                    userPresentCreatedAt: getFormattedTimestamp(x.userPresentCreatedAt),
                    userPresentExpiredAt: getFormattedTimestamp(x.userPresentExpiredAt),
                    userPresentUsedAt: getFormattedTimestamp(x.userPresentUsedAt),
                }))
            }
            else if (type == 'payment_history') {
                records = records.map(x => ({
                    ...x,
                    userPaymentHistoryCreatedAt: getFormattedTimestamp(x.userPaymentHistoryCreatedAt)
                }))
            }
            else if (type == 'payment_history_epsilon') {
                records = records.map(x => ({
                    ...x,
                    userPaymentHistoryCreatedAt: getFormattedTimestamp(x.userPaymentHistoryCreatedAt),
                    userPaymentHistoryPaymentFinishedAt: getFormattedTimestamp(x.userPaymentHistoryPaymentFinishedAt),
                    userPaymentHistoryPaymentStartedAt: getFormattedTimestamp(x.userPaymentHistoryPaymentStartedAt),
                    userPaymentHistory3DSecureStartedAt: getFormattedTimestamp(x.userPaymentHistory3DSecureStartedAt),
                    userPaymentHistoryStatus:getPaymentStatus(x.userPaymentHistoryStatus)
                }))
            }
            else if (type == 'user_sms') {
                records = records.map(x => ({
                    ...x,
                    userSmsHistoryCreatedAt: getFormattedTimestamp(x.userSmsHistoryCreatedAt),
                    userSmsHistoryExpiredAt: getFormattedTimestamp(x.userSmsHistoryExpiredAt),
                    userSmsHistoryType:getSmsStatus(x.userSmsHistoryType)
                }))
            }
            else if (type == 'payment_history_banktransfer') {
                records = records.map(x => ({
                    ...x,
                    userPaymentHistoryCreatedAt: getFormattedTimestamp(x.userPaymentHistoryCreatedAt),
                    userPaymentHistoryPaymentFinishedAt: getFormattedTimestamp(x.userPaymentHistoryPaymentFinishedAt)
                }))
            }
            else if (type == 'coupon') {
                records = records.map(x => ({
                    ...x,
                    userCouponCreatedAt: getFormattedTimestamp(x.userCouponCreatedAt)
                }))
            }
        }

        // console.log(columns)
        // console.log(records)

        const fileName = `${label}${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}`

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
        });*/
    }

    const chooseColumns = (e) => {
        e.preventDefault();
        if (dataGridRef.current.instance) {
            dataGridRef.current.instance.hideColumnChooser();
            dataGridRef.current.instance.showColumnChooser();
        }
    }

    return (
        <Section>
            <div className="flex justify-between items-center">
                <Section caption={label} />
                <MenuButtonSub className="ml-2 h-8 !w-12" onClick={chooseColumns}>
                    <i className="dx-icon dx-icon-column-chooser"></i>
                </MenuButtonSub>
            </div>

            <InputContainer className="space-y-2 relative">
                <Table
                    dataGridRef={dataGridRef}
                    className="user-edit-form"
                    isLoading={isLoading || isDownloading}
                    dataSource={dataSource}
                    paging={true}
                    allowColumnResizing={true}
                    allowColumnReordering={true}
                    stateStoring={true}
                    stateStoringPath={`userCollection-${type}`}
                    itemsPerPage={100}
                    isModal={true}
                    onCellClick={onCellClick}
                >
                    <FilterRow  visible={false}/>
                    
                    {children}
                </Table>

                <div className="text-sm text-white cursor-pointer footer-right absolute right-0 bottom-[20px]">
                    <p className={`text-right ${isDownloading ? 'cursor-default' : 'cursor-pointer'}`} onClick={exportCsv}>CSVエクスポート</p>
                </div>
            </InputContainer>
        </Section>
    )
}