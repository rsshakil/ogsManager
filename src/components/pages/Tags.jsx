import { Formik, Form } from "formik";
import {Column, Button, RowDragging} from 'devextreme-react/data-grid';
import Section from "../Form/FormInputs/Section";
import InputContainer from '../Form/FormInputs/InputContainer';
import TextAreaInput from '../Form/FormInputs/TextAreaInput';
import EditableTable from "../ui/EditableTable";
import React, {useEffect, useRef, useState, useCallback} from "react";
import Plus from "../atoms/img/Plus.svg";
import {MenuButtonSub} from "../atoms/buttons/MenuButtonSub";
import { Button as DevReactButton } from "devextreme-react/button";
import useFetchTagQuery from "../../hooks/useFetchTagQuery";
import {useModal} from "../../contexts/ModalContext";
import Loader from "../atoms/Loading/TherapistLoader";
import _ from "lodash";
import {Format} from "devextreme-react/chart";
import http from "../../restapi/httpService";
import {useToast} from "../../contexts/ToastContext";
import useCustomStore from "../../hooks/useCustomStore";
import {RequiredRule} from "devextreme-react/form";

const formValueInitial = {
    tagMemo: '',
}

export default function Tags() {
    const [tagSubmitLoading, setTagSubmitLoading] = useState(false);
    const [formValue, setFormValue] = useState(formValueInitial);
    const { isModalOpen: refetch, closeModal } = useModal();
    const dataGridRef = useRef(null);
    const { showToast } = useToast();
    const formikRef = useRef();

    //Query
    // const { dataSource, isLoading: tagLoading } = useFetchTagQuery(refetch);
    const { dataSource, isLoading, restData } = useCustomStore('tagId', `/tag`, false);

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
        const dataGrid = dataGridRef.current.instance;
        try {
            setTagSubmitLoading(true);
            const response = await http.post('/manager/tag', submittedData);
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

        //remove heighlighter from td
        if(e.columnIndex){
            e.cellElement.classList.remove('dx-focused');
            e.cellElement.classList.add('dx-cell-focus-disabled');
        }
        console.log("eeeee",e)
       
    }

    const onCellPrepared = (e) => {
        if (e.rowType === "data" && e.column.command === "edit") {
            if (e.data.itemCount > 0) {
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
                updateCell(i, "tagOrder", i + 1);
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
                            <Section caption="タグ一覧（カウントが0のタグのみ削除できます）" wrapClass="justify-center" />
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
                                dataField="tagOrder"
                                showInColumnChooser={false}
                            ></Column>
                            <Column
                                dataType="string"
                                caption="タグ名"
                                dataField="tagName"
                                cssClass="min-w-200px"
                            >
                                <RequiredRule />
                            </Column>
                            <Column
                                dataType="number"
                                caption="アイテム"
                                dataField="itemCount"
                                cssClass="min-w-100px"
                                allowEditing={false}
                                alignment="right"
                            >
                                <Format type="fixedPoint" precision={0} />
                            </Column>
                            <Column
                                type="buttons"
                                caption="削除"
                                dataField="deleteAction"
                                width={60}
                                cssClass="cursor-pointer"
                            >
                                <Button name="delete" />
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