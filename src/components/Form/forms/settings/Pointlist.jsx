import {Form, Formik} from "formik";
import {Button, Column, Lookup, RowDragging} from 'devextreme-react/data-grid';
import React, {useEffect, useRef, useState} from "react";
import {Button as DevReactButton} from "devextreme-react/button";
import Section from "../../FormInputs/Section";
import EditableTable from "../../../ui/EditableTable";
import {useModal} from "../../../../contexts/ModalContext";
import {useToast} from "../../../../contexts/ToastContext";
import {MenuButtonSub} from "../../../atoms/buttons/MenuButtonSub";
import http from "../../../../restapi/httpService";
import Plus from "../../../atoms/img/Plus.svg";
import useCustomStore from "../../../../hooks/useCustomStore";
import {errorMessages} from "../../../../utils/errorMessages";
import { CheckBox, CheckBoxTypes } from 'devextreme-react/check-box';
import DataGridCheckBox from "../../../ui/DataGridCheckBox";
import DataGridSelectBox from "../../../ui/DataGridSelectBox";
import {RequiredRule} from "devextreme-react/form";


//

const checkedLabel = { 'aria-label': 'Checked' };
const uncheckedLabel = { 'aria-label': 'Unchecked' };

const formValueInitial = {}


const statusLookup = [
    { id: 1, caption: '有効' },
    { id: 0, caption: '無効' },
    { id: 2, caption: 'デバッグ' },
]

function statusCellRenderer(cellData) {
    const textColor = cellData.value === 0 ? '#F65437' : ''; // Change the text color for "Disabled" status
    const targetItemStatus = statusLookup.find(item => item.id === cellData.data.pointStatus);
    return (
        <div style={{ color: textColor }}>
            {targetItemStatus?.caption}
        </div>
    );
}

export default function Pointlist() {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formValue, setFormValue] = useState(formValueInitial);
    const { isModalOpen: refetch, closeModal } = useModal();
    const dataGridRef = useRef(null);
    const formikRef = useRef();
    const { showToast } = useToast();

    //Query
    const { dataSource, isLoading } = useCustomStore('pointId', '/point-list', false, [], true);

    useEffect(() => {
        resetDataGrid();
    },[refetch]);

    function resetDataGrid() {
        const dataGrid = dataGridRef.current.instance;
        dataGrid.refresh(true);
        dataGrid.cancelEditData();
        formikRef.current.resetForm();
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('handleKeyPress', e)
            e.preventDefault();
        }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const dataGrid = dataGridRef.current.instance;
        let changesItem = dataGrid.option("editing.changes");
        let changesArray = changesItem && changesItem.length>0?[...changesItem]:[];
        console.log('submit by manual');
        let validation = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const domainRegex = /^@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

        changesArray.forEach(item => {
            const { data, type } = item;
            if (type === 'insert' || type === 'update') {
                console.log("validation data", data);
                const pointName = data.pointName ? data.pointName: null;
                const pointValue = data.pointValue ? data.pointValue: null;
                const pointPrice = data.pointPrice ? data.pointPrice: null;

                if (data.hasOwnProperty('pointName') && !pointName) {
                    showToast(errorMessages.W_REQUIRED_01('商品コード'), 'warning');
                    validation = false;
                }
                if (data.hasOwnProperty('pointValue') && !pointValue) {
                    showToast(errorMessages.W_REQUIRED_01('ポイント購入pt'), 'warning');
                    validation = false;
                }
                if (data.hasOwnProperty('pointPrice') && !pointPrice) {
                    showToast(errorMessages.W_REQUIRED_01('ポイント購入額'), 'warning');
                    validation = false;
                }
                if (data.hasOwnProperty('pointStatus') && data.pointStatus==="") {
                    showToast(errorMessages.W_REQUIRED_01('ポイント状態'), 'warning');
                    validation = false;
                }
                if(type === 'insert'){

                    if (!pointName) {
                        showToast(errorMessages.W_REQUIRED_01('商品コード'), 'warning');
                        validation = false;
                    }
                    if (!pointValue) {
                        showToast(errorMessages.W_REQUIRED_01('ポイント購入pt'), 'warning');
                        validation = false;
                    }
                    if (!pointPrice) {
                        showToast(errorMessages.W_REQUIRED_01('ポイント購入額'), 'warning');
                        validation = false;
                    }
                    console.log("data.pointStatus",data.pointStatus)
                    if (data.pointStatus===undefined || data.pointStatus===null) {
                        showToast(errorMessages.W_REQUIRED_01('ポイント状態'), 'warning');
                        validation = false;
                    }
                }
            }
        })
        console.log('changesArray', changesArray);

        if (!validation) return;

        console.log('changesArray2222', changesArray);

        let submittedData = {};
        if (changesArray.length > 0) {
            submittedData.changes = changesArray;
        }

        console.log('submittedData', submittedData)

        await processBatchRequest(submittedData);
    }

    //processBatchRequest
    const processBatchRequest = async (submittedData)=> {
        console.log('submittedData', submittedData);
        try {
            setSubmitLoading(true);
            if (Object.keys(submittedData).length > 0) {
                await http.post('/manager/point-list', submittedData);
            }
            closeModal();
            setSubmitLoading(false);
            resetDataGrid();
        } catch (err) {
            console.log('error-->', err)
            showToast('システムエラーが発生しました。システム管理者に連絡してください', 'error');
            setSubmitLoading(false);
        }
    }

    const handleOnCellClick = (e) => {
        const { dataField } = e.column || {};
        if (e.rowType === 'data') {
            if (dataField === 'deleteAction') {
                if (e.cellElement.children.length > 0) {
                    console.log('delete/undelete')
                    if (e.cellElement.children[0].className.includes('dx-link-delete')) {
                        dataGridRef.current.instance.deleteRow(e.rowIndex);
                    } else {
                        dataGridRef.current.instance.undeleteRow(e.rowIndex);
                    }
                }
            }
        }
    }

    const chooseColumns = (e) => {
        e.preventDefault();
        if (dataGridRef.current.instance) {
            dataGridRef.current.instance.hideColumnChooser();
            dataGridRef.current.instance.showColumnChooser();
        }
    }


    function onReorder(e) {
        const visibleRows = e.component.getVisibleRows();
        let store = e.component.getDataSource().store();
        const fromIndex = e.fromIndex;
        const toIndex = e.toIndex;

        store.push([{ type: 'remove', key: visibleRows[fromIndex].key }]);
        store.push([{ type: 'insert', data: e.itemData, index: toIndex }]);

        setTimeout(() => {
            let items = e.component.getDataSource().items();

            for (let i = 0; i < items.length; i++) {
                updateCell(i, "pointOrder", i + 1);
            }
        }, 1500)
    }
    const changeCheckBox = (e) => {
        console.log("changes",e);
    }
    const checkBoxCellRender = (cellInfo) => {
        
        return  <CheckBox
        defaultValue={cellInfo.value}
        onValueChanged={changeCheckBox}
      />
    }

    const updateCell = (rowIndex, dataField, value) => {
        dataGridRef.current.instance.cellValue(rowIndex, dataField, value);
    };

    const addNew = (e) => {
        e.preventDefault();
        const dataGrid = dataGridRef.current.instance;
        dataGrid.addRow();
    }

    return (
        <>
            <div className="flex justify-between h-16">
                <Section caption="ポイント一覧" wrapClass="justify-center"/>
                <div className="flex">
                    <MenuButtonSub pathname='' icon={Plus} onClick={(e) => addNew(e)}>追加</MenuButtonSub>
                    <MenuButtonSub className="ml-2 max-w-[80px] min-w-[80px]" onClick={chooseColumns}>
                        <i className="dx-icon dx-icon-column-chooser"></i>
                    </MenuButtonSub>
                </div>
            </div>
            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({values, setFieldValue, isSubmitting}) => (
                    <Form onKeyDown={handleKeyPress}>
                        <p className="pb-2">商品コードは半角のみ使用できます</p>
                        <EditableTable
                            isLoading={isLoading || submitLoading}
                            dataSource={dataSource}
                            dataGridRef={dataGridRef}
                            rowFilter={false}
                            paging={false}
                            sorting={false}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            stateStoring={true}
                            stateStoringPath="ipBlockList"
                            className='editable-table ipBlockListTable max-h-[60vh]'
                            columnChooserPosition='.ipBlockListTable'
                            onCellClick={handleOnCellClick}
                        >
                            <RowDragging
                                allowReordering={true}
                                onReorder={onReorder}
                                showDragIcons={true}
                            />
                            <Column
                                visible={false}
                                dataField="pointOrder"
                                showInColumnChooser={false}
                            ></Column>

                            <Column
                                dataType="string"
                                caption="商品コード"
                                dataField="pointName"
                                cssClass='cursor-pointer'
                                width={250}
                            ><RequiredRule />
                            </Column>

                            <Column
                                caption="状態"
                                dataField="pointStatus"
                                cellRender={statusCellRenderer}
                                cssClass='cursor-pointer'
                                alignment="center"
                                width={80}
                            >
                                <Lookup
                                    dataSource={statusLookup}
                                    valueExpr="id"
                                    displayExpr="caption"
                                />

                                <RequiredRule />
                            </Column>
                            <Column
                                caption="購入pt"
                                dataField="pointValue"
                                dataType="number"
                                alignment="right"
                                width={100}
                                cssClass='cursor-pointer'
                                format="#,##0.##"
                            >
                                <RequiredRule />
                            </Column>
                            <Column
                                caption="購入額"
                                dataField="pointPrice"
                                dataType="number"
                                alignment="right"
                                width={100}
                                cssClass='cursor-pointer'
                                format="#,##0.##"
                            ><RequiredRule />
                            </Column>

                            <Column
                               
                                caption="クレジット・ストライプ"
                                dataField="pointCreditStripeFlag"
                                dataType="boolean"
                                cssClass="customCheckBox"
                                alignment={"center"}
                                width={60}
                            />
                            
                            <Column
                                caption="クレジット・イプシロン"
                                dataField="pointCreditEpsilonFlag"
                                dataType="boolean"
                                cssClass="customCheckBox"
                                alignment={"center"}
                                width={60}
                            />
                            
                            <Column
                                caption="銀行振込・ストライプ"
                                dataField="pointBankStripeFlag"
                                dataType="boolean"
                                cssClass="customCheckBox"
                                alignment={"center"}
                                width={60}
                            />
                            
                           
                            
                            <Column
                                caption="銀行振込・マニュアル"
                                dataField="pointBankManualFlag"
                                dataType="boolean"
                                cssClass="customCheckBox"
                                alignment={"center"}
                                width={60}
                            />
                            
                            <Column
                                caption="paypay ・マニュアル"
                                dataField="pointPaypayFlag"
                                dataType="boolean"
                                cssClass="customCheckBox"
                                alignment={"center"}
                                width={60}
                            />
{/*                             
                             <Column
                                caption="銀行振込・イプシロン"
                                dataField="pointBankEpsilonFlag"
                                dataType="boolean"
                                cssClass="customCheckBox"
                                width={60}
                                alignment={"center"}
                            />

                            <Column
                                caption="paypay・イプシロン"
                                dataField="pointPaypayEpsilonFlag"
                                dataType="boolean"
                                cssClass="customCheckBox"
                                alignment={"center"}
                                width={60}
                            />

                            <Column
                                caption="コンビニ払い"
                                dataField="pointConvenienceStoreFlag"
                                dataType="boolean"
                                cssClass="customCheckBox"
                                alignment={"center"}
                                width={60}
                            /> */}

                            <Column
                                type="buttons"
                                caption="削除"
                                dataField="deleteAction"
                                width={60}
                                cssClass="cursor-pointer"
                            >
                                <Button name="delete"/>
                            </Column>
                        </EditableTable>

                        <div>
                            
                            <DevReactButton
                                className='w-full mt-4 modal-button'
                                text='保存'
                                type="submit"
                                stylingMode="contained"
                                useSubmitBehavior={true}
                                disabled={isSubmitting}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}
