import { Button } from "devextreme-react/button";
import { Column, FilterRow } from 'devextreme-react/data-grid';
import { useEffect, useRef, useState } from "react";
import { useModal } from "../../../../contexts/ModalContext";
import { useToast } from "../../../../contexts/ToastContext";
import useCustomStore from "../../../../hooks/useCustomStore";
import http from "../../../../restapi/httpService";
import Loader from "../../../atoms/Loading/TherapistLoader";
import { MenuButtonSub } from "../../../atoms/buttons/MenuButtonSub";
import EditableTable from "../../../ui/EditableTable";
import GachaFormBuild from "./GachaFormBuild";

export default function GachaCeilingAward({ gachaId }) {
    const { isModalOpen: refetch, closeModal:closeThisModal, showModal } = useModal();
    const { showToast } = useToast();
    const dataGridRef = useRef(null);
    const [gachaSubmitLoading, setGachaSubmitLoading] = useState(false);
    const [applyFilter, setApplyFilter] = useState('onClick');
    const { dataSource, isLoading, restData } = useCustomStore('gachaEmissionId', `/gacha/emission/${gachaId}?type=ceilingAward`, true, [], refetch);
    const [changeScroll, setChangeScroll] = useState(false);

    const {
        gachaTranslateName: productName = '',
        gachaStatus,
    } = restData?.data || {};

    const { jumpPageNo = 0 } = restData || {};

    useEffect(() => {
        if(jumpPageNo > 0  && changeScroll) handleOnClickJumpPage()
    }, [jumpPageNo])

    useEffect(() => {
        if (refetch == true) {
            dataGridRef.current?.instance?.pageIndex(0);
        }
    }, [refetch])
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
            const gachaEmissionExecuteFlag = actionType == 'gachaEmissionLimitOrder' ? 3 : 2;
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
        if (e.parentType == 'dataRow' && (e.dataField == 'gachaEmissionItemPoint' || e.dataField == 'gachaEmissionBonusItemPoint' || e.dataField == 'gachaEmissionLimitOrder')) {

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

    const rowPrepared = (e) => {
        const { gachaEmissionStatus } = e.data || {};

        if (gachaEmissionStatus == 1) {
            e.rowElement.classList.add('row-custom-bg');
        }
    };

    const gachaStatusCondition = () => {
        return (gachaStatus == 1 || gachaStatus == 2) ? 'gacha-status-completed' : 'gacha-status-incomplete';
    }

    const chooseColumns = (e) => {
        e.preventDefault();
        if (dataGridRef.current.instance) {
            dataGridRef.current.instance.hideColumnChooser();
            dataGridRef.current.instance.showColumnChooser();
        }
    }

    const closeCurrentModal = () => {
        closeThisModal();
        showModal(productName, <GachaFormBuild gachaId={gachaId} productName={productName} closeModal={closeThisModal} tableRef={dataGridRef} showSecnarioModalWithoutPass={true}/>);
    }

    return (
        <>
            {gachaSubmitLoading || isLoading && (<Loader />)}
            {
                <div className={`gachaTableWrapper ${gachaStatusCondition()}`}>
                        <div className="flex justify-between h-16">
                            <p className="text-white-800 flex items-center"></p>
                            <MenuButtonSub className="ml-2 max-w-[80px] min-w-[80px]" onClick={chooseColumns}>
                                <i className="dx-icon dx-icon-column-chooser"></i>
                            </MenuButtonSub>
                        </div>
                        {gachaSubmitLoading && (<Loader />)}
                        <EditableTable
                            dataGridRef={dataGridRef}
                            keyExpr="gachaEmissionId"
                            isLoading={isLoading}
                            dataSource={dataSource}
                            allowDeleting={false}
                            onCellClick={handleOnCellClick}
                            onEditorPreparing={onEditorPreparing}
                            repaintChangesOnly={true}
                            onRowPrepared={rowPrepared}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            stateStoring={true}
                            stateStoringPath="gachaCellingAward"
                        >
                            <FilterRow applyFilter={applyFilter} visible={true} />
                            <Column
                                caption="#"
                                dataField="gachaEmissionLimitOrder"
                                width={60}
                                cssClass='cursor-pointer'
                            />
                            <Column
                                caption="抽選動画"
                                dataField="videoName"
                                allowEditing={false}
                            />
                            <Column
                                caption="おまけアイテム"
                                dataField="gachaEmissionBonusItemName"
                                allowEditing={false}
                            />
                            <Column
                                caption="pt"
                                dataField="gachaEmissionBonusItemPoint"
                                dataType="number"
                                alignment="right"
                                cssClass='cursor-pointer'
                            />
                        </EditableTable>

                        <Button
                            className="w-full modal-button3"
                            text={`戻る`}
                            // type="submit"
                            onClick={closeCurrentModal}
                            stylingMode="contained"
                            useSubmitBehavior={false}
                        />
                    </div>
            }
        </>
    )
}