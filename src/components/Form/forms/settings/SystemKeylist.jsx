import {Form, Formik} from "formik";
import {Button, Column, FilterRow, Lookup} from 'devextreme-react/data-grid';
import React, {useEffect, useRef, useState} from "react";
import {Button as DevReactButton} from "devextreme-react/button";
import _ from "lodash";
import Section from "../../FormInputs/Section";
import {MenuButtonSub} from "../../../atoms/buttons/MenuButtonSub";
import EditableTable from "../../../ui/EditableTable";
import {useModal} from "../../../../contexts/ModalContext";
import {useToast} from "../../../../contexts/ToastContext";
import http from "../../../../restapi/httpService";
import Plus from "../../../atoms/img/Plus.svg";
import useCustomStore from "../../../../hooks/useCustomStore";
import {FaEye, FaEyeSlash} from "react-icons/fa";

const formValueInitial = {}

const allPossibleRowFilterLookupData = [
    { accountRoleType: 2},
    { accountRoleType: 1}
]

const accountRoleType = [
    { id: 2, caption: 'スタッフ' },
    { id: 1, caption: '管理者' },
]

export default function SystemKeylist() {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formValue, setFormValue] = useState(formValueInitial);
    const { isModalOpen: refetch, closeModal } = useModal();
    const dataGridRef = useRef(null);
    const formikRef = useRef();
    const elementRef = useRef(null);
    const { showToast } = useToast();
    const [applyFilter, setApplyFilter] = useState('onClick');

    //Query
    const { dataSource, isLoading } = useCustomStore('systemId', '/system/data', false, allPossibleRowFilterLookupData);

    useEffect(() => {
        const dataGrid = dataGridRef.current.instance;
        dataGrid.refresh(true);
        dataGrid.cancelEditData();
        formikRef.current.resetForm();
        let modalSelector = document.querySelector(".dx-overlay-content");
        console.log("is contain",modalSelector.classList.contains("dx-state-invisible"))
        console.log("is length",modalSelector.classList.length)
        console.log("is valuesss",modalSelector.classList.value)
        if(modalSelector.classList.contains("customModal")){
            //at the time of closing the modal remove customModal class
            console.log("remove custom");
            modalSelector.classList.remove("customModal");
        }else{
            //add extra width for systemDataModal
            console.log("add custom");
            modalSelector.classList.add("customModal");
        }
        console.log("modalSelector",modalSelector.classList)
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
                            if (dataField === 'accountRoleType')
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('handleKeyPress', e)
            e.preventDefault();
        }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const dataGrid = dataGridRef.current.instance;
        console.log("EditData",dataGrid.option("editing.changes"));

        let changesItem = dataGrid.option("editing.changes");
        let changesArray = changesItem && changesItem.length>0?[...changesItem]:[];
        console.log('submit by manual');
        const submittedData = {
            changes:changesArray
        }
        await processBatchRequest(submittedData);
    }

    //processBatchRequest
    const processBatchRequest = async (submittedData)=>{
        const { changes } = submittedData;
        let validation = true;
        changes.forEach(change => {
            const { data, type } = change;
            
            if((type=="insert" || type=="insert") && !data?.systemKey){
                showToast('キー入力してください', 'warning');
                validation = false
                return;
            }

            if((type=="insert" || type=="insert") && !data?.systemValue){
                showToast('値入力してください', 'warning');
                validation = false
                return;
            }

            if((type=="insert" || type=="insert") && !data?.systemDesc){
                showToast('詳細入力してください', 'warning');
                validation = false
                return;
            }

            if((type=="insert" || type=="insert") && !data?.systemRedisKey){
                showToast('redisキー入力してください', 'warning');
                validation = false
                return;
            }

        })
        if (validation) {
            const dataGrid = dataGridRef.current.instance;
            try {
                setSubmitLoading(true);
                const response = await http.put('/manager/system/data', submittedData);
                const { status } = response;

                if (status === 200) {
                    closeModal();
                }
                setSubmitLoading(false);
                dataGrid.refresh(true);
                dataGrid.cancelEditData();
            } catch (err) {
                console.log('error-->', err.response)
                if(err?.response && err?.response?.data?.errorCode==101){
                    showToast(err?.response?.data?.message, 'error');
                }else{
                    showToast('システムエラーが発生しました。システム管理者に連絡してください', 'error');
                }
                
                setSubmitLoading(false);
            }
        }
    }

    // Function to handle changes in the table data
    const onSaving = async (newData) => {
        //console.log(newData, 'newData....')
        const submittedData = _.pick(newData, ['changes']);
        console.log("submittedData", submittedData)
        if (submittedData.changes.length > 0) {
            await processBatchRequest(submittedData);
        }
    }

    const addNew = (e) => {
        const dataGrid = dataGridRef.current.instance;
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
        else if (e.rowType === 'filter') {
            if (e.rowIndex === 1) {
                if (dataField === 'accountRoleType') {
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
        if (e.parentType == 'filterRow') {
            e.editorOptions.onFocusOut = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
            e.editorOptions.onEnterKey = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
        }
        // console.log("eeee>",e)
        // if (e.dataField == "systemRedisKey" && e.parentType == "dataRow" && e.hasOwnProperty('value')) {  
        //     e.editorOptions.readOnly = true;  
        //     e.cssClass="cursor-default";

        // }  
        if ((e.dataField == "systemValue" || e.dataField == "systemDesc") && e.parentType == "dataRow") {  
            
            console.log("eeeeeeeeee",e);
            console.log("eeeeeeeeee td",e?.element);
            // let tdHieght = e?.element?.clientHeight?e?.element?.clientHeight:300;
            // console.log("tdHieght",tdHieght);
            console.log("e.editorOptions",e.editorOptions);
            e.editorName = "dxTextArea";
            // e.editorOptions.autoResizeEnabled = false;
            e.editorOptions.minHeight = 34;
            e.editorOptions.onInitialized = function(e) {
            //   e.element[0].closest("td").classList.add("dx-editor-cell");
              var intervalID = setInterval(function() {
                e.component.option("autoResizeEnabled", false);
                e.component.option("autoResizeEnabled", true);
                e.element.click();
              }, 200);
              
              e.component.on("disposing", function() {
                clearInterval(intervalID);
              });
            }
        }  
    };
    const onContentReady = (e) =>{
        console.log(">>>>>>>>eeee",e);
        // if (e.column.dataField == "systemRedisKey" && e.rowType == "data") {  
        //     e.column.cssClass="cursor-default";
        //     e.column.newFlag=false;
        //     // e.column.readOnly=true;
        //     // e.column.disabled=true;
        //     console.log(">>>>>>>>eeee after",e.column);
        // }
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

    return (
        <>
            <div className="flex justify-between h-16">
                <Section caption="" wrapClass="justify-center" />
                <div className="flex">
                    {/* <MenuButtonSub pathname='' icon={Plus} onClick={ (e) => addNew(e) }>追加</MenuButtonSub> */}
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
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form onKeyDown={handleKeyPress}>
                        <EditableTable
                            isLoading={isLoading || submitLoading}
                            dataSource={dataSource}
                            dataGridRef={dataGridRef}
                            rowFilter={true}
                            paging={false}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            stateStoring={true}
                            stateStoringPath="systemKeylist"
                            className='editable-table account-management-table'
                            onSaving={(data) => onSaving(data)}
                            onCellClick={handleOnCellClick}
                            onEditorPreparing={onEditorPreparing}
                            allowAdding={false}
                            allowDeleting={false}
                            wordWrapEnabled={true}
                        >
                            <FilterRow  applyFilter={applyFilter} visible={true}/>
                            <Column
                                caption="キー"
                                dataField="systemKey"
                                dataType="string"
                                width={260}
                                cssClass="cursor-pointer !align-top"
                            />
                            <Column
                                caption="値"
                                dataField="systemValue"
                                dataType="string"
                                cssClass="whitespace-pre-wrap !align-top cursor-pointer"
                            />
                            <Column
                                dataType="string"
                                caption="詳細"
                                dataField="systemDesc"
                                cssClass="whitespace-pre-wrap !align-top cursor-pointer"
                                width={360}
                            />
                            <Column
                                dataType="string"
                                caption="redisキー"
                                dataField="systemRedisKey"
                                cssClass="cursor-default"
                                allowEditing={false}
                                width={120}
                            />
                            {/* <Column
                                type="buttons"
                                caption="削除"
                                dataField="deleteAction"
                                width={60}
                                cssClass="cursor-pointer"
                            >
                                <Button name="delete" />
                            </Column> */}
                        </EditableTable>

                        <div>
                            <DevReactButton
                                className='w-full mt-4 modal-button-custom'
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