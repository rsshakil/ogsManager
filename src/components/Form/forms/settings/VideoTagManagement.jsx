import { Formik, Form } from "formik";
import {Column, Button, RowDragging} from 'devextreme-react/data-grid';
import React, {useEffect, useRef, useState, useCallback} from "react";
import { Button as DevReactButton } from "devextreme-react/button";
import _ from "lodash";
import {stringify, v4 as uuid} from 'uuid';
import {Format} from "devextreme-react/chart";
import {RequiredRule} from "devextreme-react/form";
import Section from "../../FormInputs/Section";
import InputContainer from "../../FormInputs/InputContainer";
import TextAreaInput from "../../FormInputs/TextAreaInput";
import EditableTable from "../../../ui/EditableTable";
import DataGridTagBox from "../../../ui/DataGridTagBox";
import Plus from "../../../atoms/img/Plus.svg";
import {MenuButtonSub} from "../../../atoms/buttons/MenuButtonSub";
import {useModal} from "../../../../contexts/ModalContext";
import Loader from "../../../atoms/Loading/TherapistLoader";
import http from "../../../../restapi/httpService";
import {useToast} from "../../../../contexts/ToastContext";
import useCustomStore from "../../../../hooks/useCustomStore";
import TagBox from 'devextreme-react/tag-box';

import DataGrid, {
    FilterRow,
    Paging,
    Pager,
    Sorting,
    Scrolling,
    LoadPanel,
    Editing,
    Lookup,
    RemoteOperations, StateStoring, ColumnChooserSelection, ColumnChooser,
} from 'devextreme-react/data-grid';

const formValueInitial = {
    tagMemo: '',
}

export default function VideoTagManagement() {
    const [tagSubmitLoading, setTagSubmitLoading] = useState(false);
    const [formValue, setFormValue] = useState(formValueInitial);
    const { isModalOpen: refetch, closeModal } = useModal();
    const dataGridRef = useRef(null);
    const { showToast } = useToast();
    const formikRef = useRef();

    //Query
    // const { dataSource, isLoading: tagLoading } = useFetchTagQuery(refetch);
    const { dataSource, isLoading, restData } = useCustomStore('videoTagId', `/video/tag`, false);
    const { videoItems:videos=[] } = restData;
    useEffect(() => {
        const dataGrid = dataGridRef.current.instance;
        dataGrid.refresh(true);
        dataGrid.cancelEditData();
        formikRef.current.resetForm();
    },[refetch]);
    useEffect(() => {
        console.log("restData", restData)
        const { tagMemo } = restData;
        setFormValue((prevState) => ({
            ...prevState,
            tagMemo: tagMemo
        }));

        console.log(formValue, 'formValue')
    },[restData])

    const handleSubmit = async (values) => {
        const dataGrid = dataGridRef.current.instance;
        console.log("values",values);
        let changesItem = dataGrid.option("editing.changes");

        const submittedData = {
            changes:changesItem,
            tagMemo:values.tagMemo
        }
        await processBatchRequest(submittedData);
    }

    //processBatchRequest
    const processBatchRequest = async (submittedData)=>{
        //validationImplemented
        const { changes } = submittedData;
        let validation = true;
        changes.forEach(change => {
            const { data, type } = change;
            if(type=="insert" && !data?.videoTagName){
                showToast('タグ名を入力してください', 'warning');
                validation = false
                return;
            }
            if(type=="insert" && !data?.videoId){
                showToast('ビデオを選択してください', 'warning');
                validation = false
                return;
            }

            if(type=="update" && data.hasOwnProperty('videoTagName') && data?.videoTagName==""){
                showToast('タグ名を入力してください', 'warning');
                validation = false
                return;
            }
            if(type=="update" && data.hasOwnProperty('videoId') && data.videoId.length==0){
                showToast('ビデオを選択してください', 'warning');
                validation = false
                return;
            }
            
        })
        if (validation) {
            const dataGrid = dataGridRef.current.instance;
            try {
                setTagSubmitLoading(true);
                console.log('my data>>>', submittedData)
                const response = await http.post('/manager/video/tag', submittedData);
                const { status } = response;

                if (status === 200) {
                    closeModal();
                }
                setTagSubmitLoading(false);
                dataGrid.refresh(true);
                dataGrid.cancelEditData();
            } catch (err) {
                console.log('error-->', err)
                showToast('システムエラーが発生しました。システム管理者に連絡してください', 'error');
                setTagSubmitLoading(false);
            }
        }
    }

    // Function to handle changes in the table data
    const onSaving = async (newData) => {
        //console.log(newData, 'newData....')
        const submittedData = _.pick(newData, ['changes', 'tagMemo']);
        console.log("submittedData", submittedData)
        await processBatchRequest(submittedData);
    }

    const addNew = (e) => {
        const dataGrid = dataGridRef.current.instance;
        e.preventDefault();
        dataGrid.addRow();
        dataGridRef.current.instance.repaint();
    }

    const handleOnCellClick = (e) => {
        const { dataField } = e.column || {};
        console.log("cellclick",e);
        if (e.rowType === 'data') {
            if (dataField === 'deleteAction') {
                if (e.cellElement.children.length > 0) {
                    console.log('delete/undelete')
                    if (e.cellElement.children[0].className.includes('dx-link-delete')) {
                        dataGridRef.current.instance.deleteRow(e.rowIndex);
                        dataGridRef.current.instance.repaint();
                    } else {
                        dataGridRef.current.instance.undeleteRow(e.rowIndex);
                    }
                }
            }
        }

        //remove heighlighter from td
        if(e.columnIndex){
            e.cellElement.classList.remove('dx-focused');
            e.cellElement.classList.add('dx-cell-focus-disabled');
        }
        console.log("eeeee",e)
       
    }

    const onCellPrepared = (e) => {
        if (e.rowType === "data" && e.column.command === "edit") {
            if (e.data.videoTagUsesCount > 0) {
                let cellElement = e.cellElement;
                const links = cellElement.getElementsByClassName("dx-link");
                cellElement.classList.remove('cursor-pointer')
                if (links.length > 0) {
                    cellElement.removeChild(links[0]);
                }
            }
        }
    }

    console.log(dataSource, 'dataSource.....')

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
                updateCell(i, "videoTagOrder", i + 1);
            }
        }, 1500)
    }

    const updateCell = (rowIndex, dataField, value) => {
        dataGridRef.current.instance.cellValue(rowIndex, dataField, value);
    };

    const chooseColumns = (e) => {
        e.preventDefault();
        if (dataGridRef.current.instance) {
            dataGridRef.current.instance.hideColumnChooser();
            dataGridRef.current.instance.showColumnChooser();
        }
    }

    const tagBoxEditor = (e) => {
        console.log("cellInfo",e)
        return <TagBox
        className={`!rounded-none`}
        dataSource={videos}
        valueExpr={`videoId`} // Specify the property to use as the value
        displayExpr={`videoName`} // Specify the property to display as the tag label
        value={e.value}
        placeholder={`ビデオを選択してください`}
        showSelectionControls={true}
        showClearButton={true}
        // onValueChanged={onValueChanged}
    />
    }

    const handleOnRemoveTag = (e, i, videoId, cellRowInfo) => {
        e.stopPropagation();
        console.log("removeTag index",i);
        console.log("removeTag info",cellRowInfo);
        console.log("removeTag list",cellRowInfo.value);
        let tagsFilter = cellRowInfo.value && cellRowInfo.value.filter((vId,Index)=>Index!=i);
        updateCell(cellRowInfo.rowIndex, "videoId", [...tagsFilter]);
    };
    const cellTemplate = (container, options) => {
        const noBreakSpace = '\u00A0';
        const assignees = (options.value || []).map((assigneeId) =>
          options.column.lookup.calculateCellValue(assigneeId));
        const text = assignees.join(', ');
        container.textContent = text || noBreakSpace;
        container.title = text;
      };
    const cellRender = (cellinfo) => {
        const noBreakSpace = '\u00A0';
        let tags = (cellinfo.value || []).map((x, i) => (
            <div className="dx-tag" key={uuid()}>
                <div style={{ backgroundColor: '#ddd' }} className="dx-tag-content">
                    <span>{videos.find(tag=>tag.videoId===x)?.videoName}</span>
                    <div className="dx-tag-remove-button" onClick={(e) => handleOnRemoveTag(e, i, x, cellinfo)}></div>
                </div>
            </div>
        ));
        return tags;
      };
      function calculateFilterExpression(filterValue, selectedFilterOperation, target) {
        if (target === 'search' && typeof filterValue === 'string') {
          return [this.dataField, 'contains', filterValue];
        }
        return (rowData) => (rowData.videoId || []).indexOf(filterValue) !== -1;
      }
      const repaintDataGrid = (e) => {
        console.log("a row has been removed",e);
        const { dataField } = e.column || {};
        if (e.row.rowType === 'data') {
            if (dataField === 'deleteAction') {
                dataGridRef.current.instance.deleteRow(e.row.rowIndex);
                dataGridRef.current.instance.repaint();
            }
        }
      }
    return (
        <>
            {(isLoading || tagSubmitLoading) && <Loader />}
            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <div className="flex justify-between h-16">
                            <Section caption="動画タグ一覧（カウントが0のタグのみ削除できます）" wrapClass="justify-center" />
                            <div className="flex">
                                <MenuButtonSub pathname='' icon={Plus} onClick={addNew}>追加</MenuButtonSub>
                                <MenuButtonSub className="ml-2 max-w-[80px] min-w-[80px]" onClick={chooseColumns}>
                                    <i className="dx-icon dx-icon-column-chooser"></i>
                                </MenuButtonSub>
                            </div>

                        </div>

                        <EditableTable
                            dataSource={dataSource}
                            dataGridRef={dataGridRef}
                            rowFilter={false}
                            className='editable-table category-table'
                            onSaving={(data) => onSaving({...data, tagMemo: values.tagMemo})}
                            repaintChangesOnly={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            stateStoring={true}
                            stateStoringPath="tagList"
                            onCellClick={handleOnCellClick}
                            onCellPrepared={onCellPrepared}
                            paging={false}
                        >
                            <RowDragging
                                allowReordering={true}
                                onReorder={onReorder}
                                showDragIcons={true}
                            />
                            <Column
                                visible={false}
                                dataField="videoTagOrder"
                                showInColumnChooser={false}
                            ></Column>
                            <Column
                                dataType="string"
                                caption="動画タグ名"
                                dataField="videoTagName"
                                width={160}
                            >
                                <RequiredRule />
                            </Column>
                            <Column
                                caption="動画"
                                dataField="videoId"
                                cssClass="whitespace-pre-line"
                                allowSorting={false}
                                width={200}
                                editCellComponent={DataGridTagBox}
                                cellRender={cellRender}
                                // cellTemplate={cellTemplate}
                                // calculateFilterExpression={calculateFilterExpression}
                            >
                                <Lookup
          dataSource={videos}
          valueExpr="videoId"
          displayExpr="videoName"
        />
        <RequiredRule />
                            </Column>
                            <Column
                                type="buttons"
                                caption="削除"
                                dataField="deleteAction"
                                width={60}
                                cssClass="cursor-pointer"
                            >
                                <Button onClick={repaintDataGrid} name="delete" />
                            </Column>
                        </EditableTable>

                        <Section caption="メモ欄" wrapClass="mt-16">
                            <InputContainer className="space-y-2">
                                <TextAreaInput name="tagMemo" label="メモ" inputClassName="w-full" />
                            </InputContainer>
                        </Section>

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