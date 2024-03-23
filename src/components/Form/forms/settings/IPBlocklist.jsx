import {Form, Formik} from "formik";
import {Button, Column, RowDragging} from 'devextreme-react/data-grid';
import React, {useEffect, useRef, useState} from "react";
import {Button as DevReactButton} from "devextreme-react/button";
import Section from "../../FormInputs/Section";
import EditableTable from "../../../ui/EditableTable";
import {useModal} from "../../../../contexts/ModalContext";
import {useToast} from "../../../../contexts/ToastContext";
import useCustomStore from "../../../../hooks/useCustomStore";
import http from "../../../../restapi/httpService";
import {MenuButtonSub} from "../../../atoms/buttons/MenuButtonSub";
import Plus from "../../../atoms/img/Plus.svg";

const formValueInitial = {}

export default function IPBlocklist({ patternType }) {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formValue, setFormValue] = useState(formValueInitial);
    const [tableData, setTableData] = useState([]);
    const { isModalOpen: refetch, closeModal } = useModal();
    const dataGridRef = useRef(null);
    const dataGrid2Ref = useRef(null);
    const formikRef = useRef();
    const { showToast } = useToast();

    //Query
    const { dataSource, isLoading } = useCustomStore('blockIPAddress', `/ip-blocklist?patternType=${patternType}`, false);
    const { dataSource: dataSource2, isLoading: isLoading2 } = useCustomStore('ipBlockPatternId', `/ip-blocklist?listType=pattern&patternType=${patternType}`, false, [], true);

    useEffect(() => {
        resetDataGrid();
    },[refetch]);

    useEffect(() => {
        setTableData(dataSource2);
    }, [refetch, dataSource2]);

    function resetDataGrid() {
        const dataGrid = dataGridRef.current.instance;
        dataGrid.refresh(true);
        dataGrid.cancelEditData();
        formikRef.current.resetForm();

        const dataGrid2 = dataGrid2Ref.current.instance;
        dataGrid2.refresh(true);
        dataGrid2.cancelEditData();
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

        let submittedData = {};
        if (changesArray.length > 0) {
            submittedData.patternType = patternType;
            submittedData.changes = changesArray;
        }

        console.log('submittedData', submittedData)

        const dataGrid2 = dataGrid2Ref.current.instance;
        const visibleRows = dataGrid2.getVisibleRows();
        console.log('visibleRows', visibleRows);
        const patternItems = visibleRows.map((item, i) => {
            item.data.ipBlockPatternOrder = i + 1;
            return item.data;
        });
        console.log('patternItems', patternItems)

        let validation = true;
        patternItems.forEach(item => {
            if (item?.type === 'insert') {
                delete item.type;
                delete item.ipBlockPatternId;
            }
            if (item.ipBlockPatternInquiryUnixime === null || item.ipBlockPatternMaxCount === null || item.ipBlockPatternBlockUnixtime === null) {
                showToast('Please input required field', 'warning');
                validation = false;
                return true;
            }
        })

        if (!validation) return;

        let patternSubmittedData = {
            type: "pattern",
            items: patternItems,
            patternType
        };
        console.log('patternSubmittedData', patternSubmittedData)

        await processBatchRequest(submittedData, patternSubmittedData);
    }

    //processBatchRequest
    const processBatchRequest = async (submittedData, patternSubmittedData)=> {
        console.log('submittedData', submittedData)
        console.log('patternSubmittedData', patternSubmittedData)
        try {
            setSubmitLoading(true);
            if (Object.keys(submittedData).length > 0) {
                await http.post('/manager/ip-blocklist', submittedData);
            }
            await http.post('/manager/ip-blocklist', patternSubmittedData);

            resetDataGrid();
            closeModal();
            setSubmitLoading(false);
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

    const rowPrepared = (e) => {
        const nowTimestamp = Math.floor(new Date().getTime());
        const { blockApplicationDeadline } = e.data || {};

        if (blockApplicationDeadline < nowTimestamp) {
            e.rowElement.style = 'color: #666 !important';
        }
    };

    const handleOnCellClick2 = (e) => {
        const { dataField } = e.column || {};
        if (e.rowType === 'data') {
            if (dataField === 'deleteAction') {
                if (e.cellElement.children.length > 0) {
                    /*console.log('delete/undelete')
                    if (e.cellElement.children[0].className.includes('dx-link-delete')) {
                        dataGrid2Ref.current.instance.deleteRow(e.rowIndex);
                    } else {
                        dataGrid2Ref.current.instance.undeleteRow(e.rowIndex);
                    }*/

                    deleteRow(e);
                }
            }
        }
    }

    const chooseColumns2 = (e) => {
        e.preventDefault();
        if (dataGrid2Ref.current.instance) {
            dataGrid2Ref.current.instance.hideColumnChooser();
            dataGrid2Ref.current.instance.showColumnChooser();
        }
    }

    const addNew = (e) => {
        e.preventDefault();
        const dataGrid = dataGrid2Ref.current.instance;
        const newList = [...dataGrid.getDataSource().items()];
        newList.unshift({
            "type": 'insert',
            "ipBlockPatternId": crypto.randomUUID(),
            "ipBlockPatternType": patternType,
            "ipBlockPatternOrder": (newList.length + 1),
            "ipBlockPatternInquiryUnixime": null,
            "ipBlockPatternMaxCount": null,
            "ipBlockPatternBlockUnixtime": null
        });
        setTableData(newList);
    }

    const onReorder = async (e) => {
        console.log(e, 'eeeeeeeeee')
        const dataGrid = dataGrid2Ref.current.instance;
        const visibleRows = e.component.getVisibleRows();
        const oldIndex = visibleRows.findIndex((row) => row.data === e.itemData);
        const newIndex = visibleRows.findIndex((row) => row.rowIndex === e.toIndex);

        // Update the data source by moving the dragged row to the new position
        //const updatedDataSource = [...dataGrid.getDataSource().items()];
        const updatedDataSource = visibleRows.map(item => item.data);
        const [movedItem] = updatedDataSource.splice(oldIndex, 1);
        updatedDataSource.splice(newIndex, 0, movedItem);

        setTableData(updatedDataSource);
        console.log('updatedDataSource', updatedDataSource)
    }

    const rowPrepared2 = (e) => {
        const { type = null } = e.data || {};

        if (type === 'insert') {
            if (e.rowElement?.children?.length > 0) {
                if (typeof e.rowElement.children[1] !== 'undefined') {
                    e.rowElement.children[1].innerText = '';
                }
            }
        }
    };

    function deleteRow(e) {
        console.log('deleteRow..', e);
        const dataGrid2 = dataGrid2Ref.current.instance;
        const visibleRows = dataGrid2.getVisibleRows();
        const newList = visibleRows.map(item => item.data);
        console.log('newList', newList)
        let ipBlockPatternId = e.row.key;
        if (typeof e.row.key === 'object') {
            ipBlockPatternId = e.row.key.ipBlockPatternId;
        }
        console.log('ipBlockPatternId', ipBlockPatternId)
        const newTableData = newList.filter(item => item.ipBlockPatternId !== ipBlockPatternId);
        console.log('newTableData', newTableData)
        setTableData(newTableData);
    }

    return (
        <>
            <div className="flex justify-between h-16">
                <Section caption="IPブロックリスト" wrapClass="justify-center"/>
                <MenuButtonSub className="ml-2 max-w-[80px] min-w-[80px]" onClick={chooseColumns}>
                    <i className="dx-icon dx-icon-column-chooser"></i>
                </MenuButtonSub>
            </div>
            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({values, setFieldValue, isSubmitting}) => (
                    <Form onKeyDown={handleKeyPress}>
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
                            className='editable-table ipBlockListTable max-h-[40vh]'
                            columnChooserPosition='.ipBlockListTable'
                            //onSaving={(data) => onSaving(data)}
                            onCellClick={handleOnCellClick}
                            onRowPrepared={rowPrepared}
                        >
                            <Column
                                dataType="string"
                                caption="BID"
                                dataField="bid"
                                alignment="center"
                                width={60}
                                allowEditing={false}
                            />
                            <Column
                                dataType="string"
                                caption="IPアドレス"
                                dataField="blockIPAddress"
                                alignment="center"
                                width={250}
                                allowEditing={false}
                            />
                            <Column
                                caption="ブロック適用期限"
                                dataField="blockApplicationDeadline"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={250}
                                cellRender={dateCellRender}
                                allowEditing={false}
                            />
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

                        <div className="flex justify-between h-16 mt-5">
                            <Section caption="ブロック条件 単位は秒で指定" wrapClass="justify-center"/>
                            <div className="flex">
                                <MenuButtonSub pathname='' icon={Plus} onClick={(e) => addNew(e)}>追加</MenuButtonSub>
                                <MenuButtonSub className="ml-2 max-w-[80px] min-w-[80px]" onClick={chooseColumns2}>
                                    <i className="dx-icon dx-icon-column-chooser"></i>
                                </MenuButtonSub>
                            </div>
                        </div>

                        <EditableTable
                            isLoading={isLoading2}
                            dataSource={tableData}
                            dataGridRef={dataGrid2Ref}
                            paging={false}
                            sorting={false}
                            rowFilter={false}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            stateStoring={true}
                            stateStoringPath="ipBlockPatternList"
                            className='editable-table ipBlockPatternListTable max-h-[40vh]'
                            columnChooserPosition='.ipBlockPatternListTable'
                            onCellClick={handleOnCellClick2}
                            onRowPrepared={rowPrepared2}
                        >
                            <RowDragging
                                allowReordering={true}
                                onReorder={onReorder}
                            />

                            <Column
                                dataType="string"
                                caption="BID"
                                dataField="ipBlockPatternId"
                                alignment="center"
                                width={60}
                                allowEditing={false}
                            />
                            <Column
                                dataType="number"
                                caption="現在時間からの照合範囲"
                                dataField="ipBlockPatternInquiryUnixime"
                                width={230}
                            />
                            <Column
                                dataType="number"
                                caption="出現回数"
                                dataField="ipBlockPatternMaxCount"
                                width={180}
                            />
                            <Column
                                dataType="number"
                                caption="制限継続時間"
                                dataField="ipBlockPatternBlockUnixtime"
                                width={180}
                            />
                            <Column
                                type="buttons"
                                caption="削除"
                                dataField="deleteAction"
                                width={60}
                                cssClass="cursor-pointer"
                            >
                                <Button
                                    onClick={deleteRow}
                                    icon="trash"
                                />
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
