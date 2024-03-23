
import { Button } from "devextreme-react/button";
import { Column, FilterRow } from 'devextreme-react/data-grid';
import { useEffect, useRef, useState } from "react";
import { AiFillPlusCircle } from 'react-icons/ai';
import { useModal } from "../../../../contexts/ModalContext";
import { useToast } from "../../../../contexts/ToastContext";
import { useGachaStockRecoveryMutation } from "../../../../features/gacha/gachaApi";
import useCustomStore from "../../../../hooks/useCustomStore";
import http from "../../../../restapi/httpService";
import Loader from "../../../atoms/Loading/TherapistLoader";
import { MenuButtonSub } from "../../../atoms/buttons/MenuButtonSub";
import EditableTable from "../../../ui/EditableTable";
import GachaScenarioCalculation from "./GachaScenarioCalculation";
import GachaCeilingAward from "./GachaCeilingAward";



export default function GachaFormBuild({ gachaId,showSecnarioModalWithoutPass=false }) {
    const { isModalOpen: refetch, closeModal, showModal: openAnotherModal, setDynamicModalTitle, setDynamicModalHeight } = useModal();
    const { showToast } = useToast();
    const dataGridRef = useRef(null);
    const [gachaSubmitLoading, setGachaSubmitLoading] = useState(false);
    // const [disabled, setDisabled] = useState(false);
    // const [changes, setChanges] = useState(false);
    const [applyFilter, setApplyFilter] = useState('onClick');
    const [gachaFormAuth, setGachaFormAuth] = useState(showSecnarioModalWithoutPass);
    const [gachaFormAuthPass, setGachaFormAuthPass] = useState('');
    const { dataSource, isLoading, restData } = useCustomStore('gachaEmissionId', `/gacha/emission/${gachaId}`, true, [], refetch);
    const [changeScroll, setChangeScroll] = useState(false);
    //console.log('restData -------------->', restData);

    const [gachaStockRecovery] = useGachaStockRecoveryMutation();

    const {
        gachaTranslateName: productName = '',
        returnRate = 0,
        gachaBuildError = '',
        gachaStatus,
        gachaLoopFlag,
        gachaBuildStatus,
        gachaDeployStatus,
        gachaStopStatus,
        redisDataLength,
        gachaDirectionId,
        gachaLimitCount
    } = restData?.data || {};

    const { jumpPageNo = 0 } = restData || {};

    if (!gachaFormAuth) {
        setDynamicModalTitle('パスワード認証');
    }
    else {
        setDynamicModalTitle("&nbsp;")
        const directionText = gachaDirectionId == 1 ? '（本番用）' : '（裏サイト用）';
        const dynamicLabelText = productName?productName + directionText:"&nbsp;";
        setDynamicModalTitle(dynamicLabelText);
    }


    useEffect(() => {
        if(jumpPageNo > 0  && changeScroll) handleOnClickJumpPage()
    }, [jumpPageNo])

    useEffect(() => {
        setGachaFormAuth(showSecnarioModalWithoutPass);
        setGachaFormAuthPass('');
        if (refetch == true) {
            dataGridRef.current?.instance?.pageIndex(0);
        }
    }, [refetch])
    console.log("gachaFormAuth",gachaFormAuth)
    console.log("gachaFormAuthPass",gachaFormAuthPass)
    useEffect(() => {
        if (changeScroll) {
            console.log('my ref', dataGridRef.current.instance)
            console.log('-------------1', jumpPageNo)

            const dataSource = dataGridRef.current.instance.getDataSource();
            const items = dataSource.items();
            let smallUndoneRecordIndex = items.findIndex(x => x.gachaEmissionStatus == 0);
            console.log('smallUndoneRecordIndex >>>>', smallUndoneRecordIndex);

            const scrollable = dataGridRef.current.instance.getScrollable();
            // scrollable.scrollToElement(dataGridRef.current.instance.getRowElement(smallUndoneRecordIndex));
            const rowElement = dataGridRef.current.instance.getRowElement(smallUndoneRecordIndex);

            if (Array.isArray(rowElement)) {
                // const { top, left } = rowElement[0].getBoundingClientRect();
                const rowTop = rowElement[0].offsetTop;
                // console.log('111111111 ', top)
                // console.log('111111111 3333333', rowElement[0].offsetTop)
                // scrollable.scrollBy({ top: top, behavior: 'auto' });
                scrollable.scrollTo({ top: rowTop, behavior: 'auto' });
            }

            setChangeScroll(false);
        }
    }, [changeScroll])

    const handleOnCellClick = (e) => {
        const { dataField } = e.column || {};
        if (e.rowType === 'filter') {
            if (e.rowIndex === 1) {
                if (dataField === "gachaEmissionStatus") {
                    setApplyFilter('auto');
                } else {
                    setApplyFilter('onClick');
                }
            }
        }
    }

    const updateGachaEmissionIfo = async (e, data, actionType) => {
        try {
            setGachaSubmitLoading(true);
            // console.log('e.row.data', e.row.data);
            const gachaEmissionExecuteFlag = actionType == 'gachaEmissionOrder' ? 1 : 2;
            const gachaEmissionId = e.row.data.gachaEmissionId;

            const response = await http.put(`/manager/gacha/emission/${gachaId}?gachaEmissionId=${gachaEmissionId}&gachaEmissionExecuteFlag=${gachaEmissionExecuteFlag}`, data);
            const { status } = response;

            setGachaSubmitLoading(false);

            if (status === 200) {
                dataGridRef.current.instance.refresh().done(() => {
                    if (dataGridRef.current) dataGridRef.current.instance.cancelEditData();
                });
            }
            else {
                showToast('fail to update gacha emission count', 'error');
            }

        } catch (err) {
            showToast('fail to update gacha emission count', 'error');
            console.log('error', err)
            setGachaSubmitLoading(false);
        }
    }

    const onEditorPreparing = (e) => {
        if (e.parentType == 'dataRow' && (e.dataField == 'gachaEmissionItemPoint' || e.dataField == 'gachaEmissionBonusItemPoint' || e.dataField == 'gachaEmissionOrder')) {

            e.editorOptions.onFocusOut = function (event) {
                //Execute your code here
                console.log('dataInfo', e);
                const currentValue = event.event.target.value

                const { dataField, row } = e || {};
                const oldValue = row.oldData ? row.oldData[dataField] : undefined;
                // console.log('oldValue change', oldValue);
                // console.log('currentValue change', currentValue);
                if (oldValue >= 0 && (oldValue != currentValue)) {
                    updateGachaEmissionIfo(e, { [dataField]: currentValue }, dataField);
                }
            };
            e.editorOptions.onKeyDown = (event) => {
                if (event.event.key === 'Enter') {
                    console.log('dataInfo onEnterKey', e);
                    console.log('dataInfo event', event);
                    const currentValue = event.event.target.value

                    const { dataField, row } = e || {};
                    const oldValue = row.data ? row.data[dataField] : undefined;
                    // console.log('oldValue ', oldValue);
                    // console.log('currentValue', currentValue);
                    if (oldValue >= 0 && oldValue != currentValue) {
                        updateGachaEmissionIfo(e, { [dataField]: currentValue }, dataField);
                    }
                }
            };
            // e.editorOptions.onValueChanged = function (arg) {
            //     console.log('onValueChanged', arg);
            //     console.log('eeeeee', e);
            //     console.log("get values", e.row.values);
            //     console.log("or get the raw data", e.row.data);
            //     console.log("get the changed values from onValueChanged", arg.value);
            //     console.log("previous value", arg.previousValue);

            //     updateGachaEmissionIfo(e, arg.value);
            // }
        }
        if (e.parentType == 'filterRow' && e.dataField !== "gachaEmissionStatus") {
            e.editorOptions.onFocusOut = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
            e.editorOptions.onEnterKey = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
        }
    }

    const onCellPrepared = (e) => {
        if (e.rowType === "data" && e.column.dataField === 'gachaEmissionBonusItemPoint') {
            if (!e.data.gachaEmissionBonusItemName) {
                let cellElement = e.cellElement;
                cellElement.classList.remove('cursor-pointer');
                cellElement.classList.add('pointer-events-none');
            }
        }
    }

    const updategachaBuildStatus = async (e) => {
        try {
            // setDisabled(true);
            setGachaSubmitLoading(true);
            const response = await http.post(`/manager/gacha/build/${gachaId}`);
            const { status } = response;

            if (status === 200) {
                closeModal();
                // setDisabled(false);
            } else {
                showToast('fail to update gacha deploy status', 'error');
                // setDisabled(false);
            }

            setGachaSubmitLoading(false);
        } catch (err) {
            showToast('fail to update gacha deploy status', 'error');
            // setDisabled(false);
            setGachaSubmitLoading(false);
            console.log('error', err)
        }
    }
    const gachaDepoly = async (e) => {
        try {
            // setDisabled(true);
            setGachaSubmitLoading(true);
            const response = await http.post(`/manager/gacha/deploy/${gachaId}`);
            const { status } = response;

            if (status === 200) {
                closeModal();
                // setDisabled(false);
            } else {
                showToast('fail to update gacha deploy status', 'error');
                // setDisabled(false);
            }

            setGachaSubmitLoading(false);
        } catch (err) {
            showToast('fail to update gacha deploy status', 'error');
            // setDisabled(false);
            setGachaSubmitLoading(false);
            console.log('error', err)
        }
    }

    const handleOnClickJumpPage = () => {
        console.log('jump page to : ', jumpPageNo)

        if (dataGridRef.current) {
            console.log('loooooo', dataGridRef.current.instance)
            // console.log('pppppp', dataGridRef.current.instance.totalCount())

            let pageNo = 0;
            if (jumpPageNo > 0) {
                pageNo = jumpPageNo - 1;
            }
            else if (jumpPageNo == 0) {
                const totalCount = dataGridRef.current.instance.totalCount();
                const pageSize = dataGridRef.current.instance.pageSize();
                let lastPageNumber = Math.ceil(Number(totalCount) / Number(pageSize));
                pageNo = lastPageNumber;
            }
            dataGridRef.current.instance.option("paging.pageIndex", pageNo);

            dataGridRef.current.instance.refresh().done(function () {
                setChangeScroll(true);
                // dataGridRef.current.instance.pageIndex(0);
                // dataGridRef.current.instance.pageSize(996);
            });
        }
    }

    const handleOnclickGachaStockRecovery = async()=> {
        setGachaSubmitLoading(true);
        const { data, error }  =  await gachaStockRecovery({gachaId});
        setGachaSubmitLoading(false);

        if(!error) closeModal();
        else showToast('Failed gacha stock recvery', 'error');
    }

    const addMoreButton = (buttonTitle, buttonType) => {
        const buttonIcon = (
            <AiFillPlusCircle onClick={(e) => addNewItem(e, handleOnClick, buttonTitle, buttonType)} className="h-[22px] z-10 cursor-pointer" />
        ),
        handleOnClick = () => { };

        return (
            <div
                className="mb-1 flex justify-end bg-blue-25text-blue-100 scenario-calculation-button"
            >
                <div>
                    {buttonIcon}
                </div>
                <div>
                    <button
                        type="button"
                        onClick={(e) => addNewItem(e, handleOnClick, buttonTitle, buttonType)}
                        className="mx-1 border-none cursor-pointer"
                    >
                        {buttonTitle}
                    </button></div>
            </div>
        );
    };
    // Add more button section
    function addNewItem(e, callBackFunc = () => { }, buttonTitle, buttonType) {
        if (buttonType === 'scenarioCalculation') {
            openAnotherModal(`${productName} ${buttonTitle}`, <GachaScenarioCalculation gachaId={gachaId} productName={productName} closeModal={closeModal} tableRef={dataGridRef} />);
        }
        else if (buttonType === 'ceilingAward') {
            openAnotherModal(`${productName} ${buttonTitle}`, <GachaCeilingAward gachaId={gachaId} productName={productName} closeModal={closeModal} tableRef={dataGridRef} />);
        }
    }

    const fnShowReturnRate = (rate) => {
        let orgRate = parseFloat(restData.data.returnRate);
        console.log('orgRate', orgRate)
        return orgRate == 0 ? orgRate.toFixed(1) : orgRate.toFixed(2);
    }


    const rowPrepared = (e) => {
        const { gachaEmissionStatus } = e.data || {};

        if (gachaEmissionStatus == 1) {
            e.rowElement.classList.add('row-custom-bg');
            // e.rowElement.style = 'background-color: #D5D5D5 !important';
        }
    };

    const buildStatusCondition =  () => {
        if (restData && restData.data && ((restData.data?.gachaBuildStatus == 1 || restData.data?.gachaBuildStatus == 2) || gachaDeployStatus != 0)) {
            return 'gacha-build-running';
        }
        else {
            return 'gacha-build-completed';
        }
    }

    const gachaStatusCondition = () => {
        return (gachaStatus == 1 || gachaStatus == 2) ? 'gacha-status-completed' : 'gacha-status-incomplete';
    }


    let buildButtonText="";
    let soldoutBtnText = "強制完売";

    let showScenarioClearButton = false;
    let disableScenarioClearButton = false;
    let showConfirmButton = false;
    let showJumpButton = true;
    let showBuildButton = true;

    if([1, 2].includes(gachaStatus)){
        if(gachaStatus == 1){
            if(gachaStopStatus == 0){
                console.log('redisDataLength', redisDataLength)
                if(redisDataLength > 0){
                    soldoutBtnText = '強制完売';
                    showScenarioClearButton = true;
                }
                else {
                    showJumpButton = false;
                    showBuildButton = false
                }
            }
            else if(gachaStopStatus == 1 && redisDataLength == 0) {
                soldoutBtnText = '強制完売済み';
                showScenarioClearButton = true
                disableScenarioClearButton = true;
            }
            if (gachaLoopFlag) {
                showJumpButton = false;
                showBuildButton = false
            }
        }
        else {
            if(gachaStopStatus == 0){
                soldoutBtnText = '強制完売';
                showScenarioClearButton = true;
            }
            else if(gachaStopStatus == 1) {
                soldoutBtnText = '強制完売済み';
                showScenarioClearButton = true
                disableScenarioClearButton = true;
            }
        }
    }
    else if([5].includes(gachaStatus) && dataSource && dataSource?.items().length > 0){
        soldoutBtnText="シナリオクリア";

        showScenarioClearButton = true;
        showConfirmButton = true;
    }

    if([4, 3].includes(gachaStatus)){
        buildButtonText="構築";
    }
    else if([5].includes(gachaStatus)){
        buildButtonText="再構築";
    }

    const chooseColumns = (e) => {
        e.preventDefault();
        if (dataGridRef.current.instance) {
            dataGridRef.current.instance.hideColumnChooser();
            dataGridRef.current.instance.showColumnChooser();
        }
    }

    const gachaAuthCheck = () => {
        const gachaAuthPassword = process.env.REACT_APP_GACHA_FORM_AUTH_PASSWORD;
        console.log('gachaAuthPassword', gachaAuthPassword)
        setGachaFormAuth(false);
        if (gachaAuthPassword === gachaFormAuthPass) {
            setGachaFormAuth(true);
        }
    }

    return (
        <>
            {gachaSubmitLoading || isLoading && (<Loader />)}
            {
                gachaFormAuth ?

                <div className={`${buildStatusCondition()} ${gachaStatusCondition()}`}>
                    <h1 className="text-center mt-20 text-4xl build-text">{gachaDeployStatus != 0 ? '最終確定中' : '構築中'}</h1>
                    <div className="gachaTableWrapper">
                        <div className="flex justify-between h-16">
                            <p className="text-white-800 flex items-center">
                                還元率：{returnRate}%（天井は除く）
                            </p>
                            <MenuButtonSub className="ml-2 max-w-[80px] min-w-[80px]" onClick={chooseColumns}>
                                <i className="dx-icon dx-icon-column-chooser"></i>
                            </MenuButtonSub>
                        </div>
                        {restData && restData.data && restData.data?.gachaBuildError && (
                        <div className="relative h-8">
                            <p className="float-right absolute right-0  !text-[#F86E8E]">
                                <>
                                    ⚠️シナリオエラー発生中：{restData.data?.gachaBuildError}
                                </>
                            </p>
                        </div>
                        )}
                        {gachaSubmitLoading && (<Loader />)}
                        <div className="gacha-table-body">
                            <EditableTable
                                dataGridRef={dataGridRef}
                                keyExpr="gachaEmissionId"
                                isLoading={isLoading}
                                dataSource={dataSource}
                                allowDeleting={false}
                                onCellClick={handleOnCellClick}
                                onCellPrepared={onCellPrepared}
                                onEditorPreparing={onEditorPreparing}
                                repaintChangesOnly={true}
                                onRowPrepared={rowPrepared}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                stateStoring={true}
                                stateStoringPath="productGachaBuildModal"
                            >
                                <FilterRow applyFilter={applyFilter} visible={true} />
                                <Column
                                    caption="#"
                                    dataField="gachaEmissionOrder"
                                    width={60}
                                    cssClass='cursor-pointer'
                                />
                                <Column
                                    caption="おまけアイテム"
                                    dataField="gachaEmissionBonusItemName"
                                    width={155}
                                    allowEditing={false}
                                />
                                <Column
                                    caption="pt"
                                    dataField="gachaEmissionBonusItemPoint"
                                    dataType="number"
                                    alignment="right"
                                    cssClass='cursor-pointer'
                                />
                                <Column
                                    caption="賞"
                                    dataField="gachaPrizeName"
                                    allowEditing={false}
                                />
                                <Column
                                    caption="抽選動画"
                                    dataField="videoName"
                                    allowEditing={false}
                                />
                                <Column
                                    caption="アイテム"
                                    dataField="gachaEmissionItemName"
                                    width={155}
                                    allowEditing={false}
                                />
                                <Column
                                    caption="pt"
                                    dataField="gachaEmissionItemPoint"
                                    dataType="number"
                                    alignment="right"
                                    // width={40}
                                    cssClass='cursor-pointer'
                                />
                            </EditableTable>
                            <div className="add-more-buttons-wrapper">
                                {addMoreButton('シナリオ試算', 'scenarioCalculation')}
                                {gachaLimitCount !== 0 ? addMoreButton('天井賞', 'ceilingAward') : ''}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            {((gachaStatus == 1 || gachaStatus == 2 )&& showJumpButton == true) ? (
                                <Button
                                    className='w-full modal-button2'
                                    text={`未消化へジャンプする`}
                                    stylingMode="contained"
                                    disabled={isLoading || gachaSubmitLoading}
                                    onClick={handleOnClickJumpPage}
                                />
                            ) : (
                                <>
                                    {showBuildButton && (
                                        <Button
                                            className='w-full modal-button1'
                                            text={`${buildButtonText}（開始時間30分前まで${buildButtonText}できます　全て作り直されます）`}
                                            stylingMode="contained"
                                            disabled={isLoading || gachaSubmitLoading}
                                            onClick={updategachaBuildStatus}
                                        />
                                    )}

                                    {showConfirmButton && (
                                        <Button
                                            className='w-full modal-button2'
                                            text={`シナリオ最終確定(開始時間30分前を過ぎると自動的に最終確定します)`}
                                            stylingMode="contained"
                                            disabled={isLoading || gachaSubmitLoading}
                                            onClick={gachaDepoly}
                                        />
                                    )}
                                </>
                            )}

                            {showScenarioClearButton && (
                                <Button
                                    className={`w-full modal-button3 !bg-red-700 !text-white !hover:bg-red-600`}
                                    text={`${soldoutBtnText}（未消化のオリパ在庫は回復します。このオリパは表示されなくなります。）`}
                                    stylingMode="contained"
                                    disabled={isLoading || gachaSubmitLoading || disableScenarioClearButton}
                                    onClick={handleOnclickGachaStockRecovery}
                                />
                            )}
                        </div>
                    </div>
                </div>

                :

                <div className="flex flex-col items-center justify-center h-full gachaFormAuthWrapper">
                    <label htmlFor="password" className="w-full max-w-md">パスワード</label>
                    <input
                        id="password"
                        type="password"
                        className="w-full max-w-md text-black"
                        value={gachaFormAuthPass}
                        onChange={(e) => setGachaFormAuthPass(e.target.value)}
                    />

                    <Button
                        className='w-full modal-button'
                        text="認証する"
                        onClick={gachaAuthCheck}
                    />
                </div>
            }
        </>
    )
}