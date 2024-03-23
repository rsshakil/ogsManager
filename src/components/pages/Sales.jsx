import React, { useRef, useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { settingsState } from "../../store/settingsState";
import { displayState } from "../../store/displayState";
import {useModal} from "../../contexts/ModalContext";
import {Button, Column, FilterRow, Lookup} from "devextreme-react/data-grid";
import Table from "../ui/Table";
import EditIcon from "../atoms/icons/EditIcon";
import useCustomStore from "../../hooks/useCustomStore";
import ShippingFormEdit from "../Form/forms/shipping/ShippingFormEdit";
import CouponFormEdit from "../Form/forms/coupon/CouponFormEdit";
import CouponLog from "./CouponLog";


const allPossibleRowFilterLookupData = [
    { couponStatus: 1 },
    { couponStatus: 2 }
]

const statusLookup = [
    { id: 1, caption: '有効' },
    { id: 2, caption: '無効' }
]

function statusCellRenderer(cellData) {
    const textColor = cellData.value === 2 ? '#FF758F' : ''; // Change the text color for "Disabled" status
    const targetItemStatus = statusLookup.find(item => item.id === cellData.data.couponStatus);
    return (
        <div style={{ color: textColor }}>
            {targetItemStatus?.caption}
        </div>
    );
}

export const Sales = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const history = useHistory();
    const dataGridRef = useRef(null);
    const elementRef = useRef(null);

    const { showModal, closeModal, setTableRef } = useModal();

    const { dataSource, isLoading } = useCustomStore('couponId', '/coupon', true, allPossibleRowFilterLookupData);

    const [settingsStateStateValue, setSettingsStateState] = useRecoilState(settingsState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    console.log(settingsStateStateValue);
    const [applyFilter, setApplyFilter] = useState('onClick');

    let pagePath = 'sales';
    // let pageName = location.state?.data.name;
    let pageTitle = '販売管理';




    useEffect(() => {
        window.history.pushState(null, '', window.location.href);
        setDisplayState((prevState) => ({
            ...prevState,
            pageTitle: pageTitle,
            pagePath: pagePath,
            // pageName: pageName,
        }))
    }, [location]);


    useEffect(() => {
        if (dataGridRef.current) {
            setTableRef(dataGridRef);
        }
    }, [dataGridRef])

    useEffect(() => {
        if (elementRef.current) {
            // Get the filter row element
            const filterRowElement = dataGridRef.current.instance.element().querySelector('.dx-datagrid-filter-row');

            if (filterRowElement) {
                const dataField = elementRef.current.column.dataField;
                // Find the editor elements within the filter row
                const filterCols = filterRowElement.querySelectorAll('.dx-datagrid-filter-row td');
                filterCols.forEach((filterCol, columnIndex) => {
                    // Do something with each editor element (e.g., log its value)
                    if (columnIndex === elementRef.current.columnIndex) {
                        const editorElement = filterCol.querySelector('.dx-texteditor-input');
                        console.log(editorElement, 'editorElement')
                        if (editorElement) {
                            if (dataField === 'couponStatus')
                            {
                                if (editorElement.hasAttribute('aria-controls')) {
                                    editorElement.focus();
                                }
                                else {
                                    editorElement.click();
                                }
                            }
                            else {
                                if (applyFilter === 'onClick') {
                                    editorElement.focus();
                                }
                                else {
                                    editorElement.click();
                                }
                            }
                        }
                    }
                });
            }
        }
    }, [applyFilter])

    const handleOnCellClick = (e) => {
        //console.log('handleColumnClick e ', e)
        const { dataField } = e.column || {};

        if (e.rowType === 'data') {
            // coupon log modal
            if (dataField === 'couponLog') {
                const data = e.data;
                console.log(data, 'data....')
                showModal(`${data.couponName} クーポン利用履歴`, <CouponLog couponId={data?.couponId} closeModal={closeModal} tableRef={dataGridRef} />);
            }
            // editAction
            if (dataField === 'couponEdit') {
                const data = e.data;
                console.log(data, 'data....')
                showModal(`${data.couponName} クーポン管理`, <CouponFormEdit couponId={data?.couponId} closeModal={closeModal} tableRef={dataGridRef} />);
            }
        }
        else if (e.rowType === 'filter') {
            if (e.rowIndex === 1) {
                if (dataField === "couponStatus") {
                    setApplyFilter('auto');
                } else {
                    setApplyFilter('onClick');
                }
                // last filtered element ref set
                elementRef.current = e;
            }
        }
    }

    const onEditorPreparing = (e) => {
        if (e.parentType == 'filterRow' && e.dataField !== "couponStatus") {
            e.editorOptions.onFocusOut = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
            e.editorOptions.onEnterKey = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
        }
    };

    const dateCellRender = (e) => {
        if (e.data[e.column.dataField] !== 0) return e.text;
    }

    return (
        <>
            <Table
                className="non-editable-table"
                isLoading={isLoading}
                dataSource={dataSource}
                dataGridRef={dataGridRef}
                onCellClick={handleOnCellClick}
                onEditorPreparing={onEditorPreparing}
                allowColumnResizing={true}
                allowColumnReordering={true}
                stateStoring={true}
            >
                <FilterRow  applyFilter={applyFilter} visible={true}/>
                <Column
                    caption="状態"
                    dataField="couponStatus"
                    alignment="center"
                    width={60}
                    filter
                    cellRender={statusCellRenderer}
                >
                    <Lookup
                        dataSource={statusLookup}
                        valueExpr="id"
                        displayExpr="caption"
                    />
                </Column>
                <Column
                    caption="クーポン名"
                    dataField="couponName"
                    cssClass="min-w-300px"
                />
                <Column
                    caption="クーポンコード"
                    dataField="couponCode"
                    width={120}
                />
                <Column
                    caption="開始日時"
                    dataField="couponStartDate"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={200}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="終了日時"
                    dataField="couponEndDate"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={200}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="上限数"
                    dataField="couponLimitCount"
                    width={80}
                    alignment={"right"}
                />
                <Column
                    caption="使用数"
                    dataField="totalUseCount"
                    width={80}
                    alignment={"right"}
                />
                <Column
                    caption="付与pt"
                    dataField="couponPoint"
                    width={80}
                    alignment={"right"}
                />
                <Column
                    caption="登録日時"
                    dataField="couponCreatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={200}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="編集日時"
                    dataField="couponUpdatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={200}
                    cellRender={dateCellRender}
                />
                <Column
                    type="buttons"
                    caption="LOG"
                    dataField="couponLog"
                    alignment="center"
                    width={60}
                    allowFiltering={false}
                    cssClass='cursor-pointer'
                >
                    <Button>
                        <EditIcon classNames="inline fill-white" />
                    </Button>
                </Column>
                <Column
                    type="buttons"
                    caption="編集"
                    dataField="couponEdit"
                    alignment="center"
                    width={60}
                    allowFiltering={false}
                    cssClass='cursor-pointer'
                >
                    <Button>
                        <EditIcon classNames="inline fill-white" />
                    </Button>
                </Column>
            </Table>
        </>
    );
};