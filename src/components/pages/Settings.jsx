import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { displayState } from "../../store/displayState";
import Table from "../ui/Table";
import { Column } from "devextreme-react/data-grid";
import { useModal } from "../../contexts/ModalContext";
import RedisManagement from "../Form/forms/settings/RedisManagement";
import VideoManagement from "../Form/forms/settings/VideoManagement";
import VideoTagManagement from "../Form/forms/settings/VideoTagManagement";
import AccountManagement from "../Form/forms/settings/AccountManagement";
import SystemKeylist from "../Form/forms/settings/SystemKeylist";
import LocalizationManagement from "../Form/forms/settings/LocalizationManagement";
import IPBlocklist from "../Form/forms/settings/IPBlocklist";
import DomainBlocklist from "../Form/forms/settings/DomainBlocklist";
import Pointlist from "../Form/forms/settings/Pointlist";
import ManualPointSqs from "../Form/forms/settings/ManualPointSqs";


export const Settings = () => {
    const { showModal, closeModal, setTableRef } = useModal();

    const location = useLocation();
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);

    let pagePath = 'settings';
    // let pageName = location.state?.data.name;
    let pageTitle = '設定管理';

    useEffect(() => {
        window.history.pushState(null, '', window.location.href);
        setDisplayState((prevState) => ({
            ...prevState,
            pageTitle: pageTitle,
            pagePath: pagePath,
            // pageName: pageName,
        }))
    }, [location]);

    const dataSource = [
        { key: 'notification', caption: 'お知らせ管理' },
        { key: 'account', caption: 'アカウント管理' },
        { key: 'localization', caption: 'ローカライズ管理' },
        { key: 'video', caption: '動画管理' },
        { key: 'video_tag', caption: '動画タグ管理' },
        { key: 'bill_limit', caption: '課金制限管理' },
        { key: 'present', caption: 'プレゼント管理' },
        { key: 'redis', caption: 'Redis管理' },
        { key: 'cacheclear', caption: 'キャッシュクリア' },
        { key: 'ip_blocklist', caption: '新規登録禁止IPリスト' },
        { key: 'ip_blocklist2', caption: 'SMS送信禁止IPリスト' },
        { key: 'domain_blocklist', caption: '新規登録禁止メールリスト' },
        { key: 'point_list', caption: 'ポイント管理' },
        { key: 'system_keylist', caption: 'システム値' },
        { key: 'manual_point_sqs', caption: '手動ポイントSQSツール' },
    ];

    const onCellPrepared = (e) => {
        if (e.rowType === "data") {
            if (e.data.item) e.cellElement.style.cursor = "pointer";
        }
    }

    const handleOnCellClick = async(e) => {
        console.log('handleColumnClick e ', e)
        const { key } = e?.data || {};

        switch (key) {
            case 'redis':
                showModal('Redis管理', <RedisManagement closeModal={closeModal} />);
                break;
            case 'account':
                showModal('アカウント管理', <AccountManagement closeModal={closeModal} />);
                break;
            case 'localization':
                showModal('ローカライズ管理', <LocalizationManagement closeModal={closeModal} />);
                break;
            case 'video':
                showModal('動画管理', <VideoManagement closeModal={closeModal} />);
                break;
            case 'video_tag':
                showModal('動画タグ管理', <VideoTagManagement closeModal={closeModal} />);
                break;
            case 'cacheclear':
                await localStorage.clear();
                await sessionStorage.clear();
                break;
            case 'ip_blocklist':
                showModal('新規登録IPブロックリスト', <IPBlocklist closeModal={closeModal} patternType="1" />);
                break;
            case 'ip_blocklist2':
                showModal('SMS送信禁止IPブロックリスト', <IPBlocklist closeModal={closeModal} patternType="2" />);
                break;
            case 'domain_blocklist':
                showModal('新規登録禁止メールリスト', <DomainBlocklist closeModal={closeModal} />);
                break;
            case 'point_list':
                showModal('ポイント管理', <Pointlist closeModal={closeModal} />);
                break;
            case 'system_keylist':
                showModal('システム値', <SystemKeylist closeModal={closeModal} />);
                break;
            case 'manual_point_sqs':
                showModal('手動ポイントSQSツール', <ManualPointSqs closeModal={closeModal} />);
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



