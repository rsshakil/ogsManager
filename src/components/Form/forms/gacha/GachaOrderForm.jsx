import { useUpdateGachaOrderMutation } from "../../../../features/gacha/gachaOrderApi";
import Loader from "../../../atoms/Loading/TherapistLoader";
import React, { useEffect, useRef, useState } from "react";
import useMutationApiResponse from "../../../../hooks/useMutationApiResponse";
import { useModal } from "../../../../contexts/ModalContext";
import InputContainer from "../../FormInputs/InputContainer";
import EditableTable from "../../../ui/EditableTable";
import {Column, FilterRow, Lookup, Scrolling, Sorting} from "devextreme-react/data-grid";
import Section from "../../FormInputs/Section";
import useCustomStore from "../../../../hooks/useCustomStore";
import {MenuButtonSub} from "../../../atoms/buttons/MenuButtonSub";
import Plus from "../../../atoms/img/Plus.svg";


const allPossibleRowFilterLookupData = [
    { gachaViewFlag: 0 },
    { gachaViewFlag: 1 },
]

const statusLookup = [
    { id: 0, caption: '非表示' },
    { id: 1, caption: '表示' },
]

function statusCellRenderer(cellData) {
    // console.log('cellData',cellData);
    const textColor = cellData.value === 0 || cellData.value === 3 ? '#FF758F' : ''; // Change the text color for "Disabled" status
    const targetItemStatus = statusLookup.find(item => item.id === cellData.data.gachaStatus);
    return (
        <div style={{ color: textColor }}>
            {targetItemStatus?.caption}
        </div>
    );
}

export default function GachaOrderForm({ closeModal, tableRef, createItemModal }) {
    const dataGridRef = useRef(null);
    const elementRef = useRef(null);
    const { isModalOpen: refetch } = useModal();
    const [applyFilter, setApplyFilter] = useState('onClick');

    const { trigger } = useMutationApiResponse()

    //Query list
    const { dataSource, isLoading, restData } = useCustomStore('gachaId', `/gacha/order`, true, allPossibleRowFilterLookupData, refetch);
    //Mutation list
    const [updateGachaOrder, { isLoading: submitLoading, isError: isStoreProductError }] = useUpdateGachaOrderMutation();

    useEffect(() => {
        const dataGrid = dataGridRef.current.instance;
        dataGrid.refresh(true);
        dataGrid.cancelEditData();
    },[refetch]);

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
                            if (dataField === 'gachaStatus')
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
        if (e.rowType === 'filter') {
            if (e.rowIndex === 1) {
                if (dataField === "gachaStatus") {
                    setApplyFilter('auto');
                } else {
                    setApplyFilter('onClick');
                }
                // last filtered element ref set
                elementRef.current = e;
            }
        }
    }

    const handleSubmit = async (data) => {
        console.log('handleSubmit data', data);
        const mutatedApi = async () => await updateGachaOrder(data);

        const { success } = await trigger({ data, setSubmitting: () => { }, mutatedApi, resetForm: () => { } });

        if (success) {
            if (dataGridRef.current) {
                dataGridRef.current.instance.refresh().done(() => {
                    if (dataGridRef.current) dataGridRef.current.instance.cancelEditData();
                });
            }
        }
    };

    const onEditorPreparing = (e) => {
        if (e.parentType == 'dataRow' && e.dataField == 'gachaOrder') {

            e.editorOptions.onFocusOut = function (event) {
                //Execute your code here
                console.log('dataInfo', e);
                const currentValue = Number(event.event.target.value);

                const { dataField, row } = e || {};
                const oldValue = row.oldData ? row.oldData[dataField] : undefined;
                // console.log('oldValue change', oldValue);
                // console.log('currentValue change', currentValue);
                if (oldValue >= 0 && (oldValue != currentValue)) {
                    handleSubmit({ gachaId: row.data.gachaId, [dataField]: currentValue });
                }
            };
            e.editorOptions.onKeyDown = (event) => {
                if (event.event.key === 'Enter') {
                    const currentValue = Number(event.event.target.value);

                    const { dataField, row } = e || {};
                    const oldValue = row.data ? row.data[dataField] : undefined;
                    if (oldValue >= 0 && oldValue != currentValue) {
                        handleSubmit({ gachaId: row.data.gachaId, [dataField]: currentValue });
                    }
                }
            };
        }
        if (e.parentType == 'filterRow' && e.dataField !== "gachaStatus") {
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

    const chooseColumns = (e) => {
        e.preventDefault();
        if (dataGridRef.current.instance) {
            dataGridRef.current.instance.hideColumnChooser();
            dataGridRef.current.instance.showColumnChooser();
        }
    }

    return (
        <div>
            {(isLoading || submitLoading) && <Loader />}

            <Section>
                <div className="flex justify-between h-16">
                    <Section caption="表示順管理(販売終了してから2週間経過したものは表示されません)" wrapClass="justify-center"/>
                    <MenuButtonSub className="ml-2 max-w-[80px] min-w-[80px]" onClick={chooseColumns}>
                        <i className="dx-icon dx-icon-column-chooser"></i>
                    </MenuButtonSub>
                </div>
                <InputContainer className="space-y-2 dragableGachaTable !mb-0">
                    <EditableTable
                        className="editable-table order-table"
                        dataSource={dataSource}
                        dataGridRef={dataGridRef}
                        allowDeleting={false}
                        allowColumnResizing={true}
                        allowColumnReordering={true}
                        stateStoring={true}
                        stateStoringPath="gachaOrder"
                        onCellClick={handleOnCellClick}
                        onEditorPreparing={onEditorPreparing}
                    >
                        <FilterRow applyFilter={applyFilter} visible={true}/>

                        <Column
                            caption="#"
                            dataField="gachaOrder"
                            width={60}
                            cssClass='cursor-pointer'
                        />
                        <Column dataField="gachaViewFlag" caption="状態" alignment="center"
                                filter
                                cellRender={statusCellRenderer}
                                width={60}
                                allowEditing={false}
                        >
                            <Lookup
                                dataSource={statusLookup}
                                valueExpr="id"
                                displayExpr="caption"
                            />
                        </Column>
                        <Column
                            dataField="gachaTranslateName"
                            caption="商品名"
                            alignment="left"
                            allowEditing={false}
                            width={200}
                        />
                        <Column
                            dataField="gachaPostStartDate"
                            dataType="datetime"
                            caption="表示開始日時"
                            format="yy/MM/dd HH:mm"
                            alignment="center"
                            width={130}
                            allowEditing={false}
                            cellRender={dateCellRender}
                        />
                        <Column
                            dataField="gachaStartDate"
                            dataType="datetime"
                            caption="販売開始日時"
                            format="yy/MM/dd HH:mm"
                            alignment="center"
                            width={130}
                            allowEditing={false}
                            cellRender={dateCellRender}
                        />
                        <Column
                            dataField="gachaEndDate"
                            dataType="datetime"
                            caption="販売終了日時"
                            format="yy/MM/dd HH:mm"
                            alignment="center"
                            width={130}
                            allowEditing={false}
                            cellRender={dateCellRender}
                        />
                        <Column
                            dataField="gachaTotalCount"
                            caption="総数"
                            alignment="right"
                            width={60}
                            allowEditing={false}
                        />
                        <Column
                            dataField="gachaRemainingCount"
                            caption="残数"
                            alignment="right"
                            width={60}
                            allowEditing={false}
                        />
                    </EditableTable>
                </InputContainer>
            </Section>
        </div>
    )
}