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

export default function AccountManagement() {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formValue, setFormValue] = useState(formValueInitial);
    const { isModalOpen: refetch, closeModal } = useModal();
    const dataGridRef = useRef(null);
    const formikRef = useRef();
    const elementRef = useRef(null);
    const { showToast } = useToast();
    const [applyFilter, setApplyFilter] = useState('onClick');

    //Query
    const { dataSource, isLoading } = useCustomStore('accountId', '/account', false, allPossibleRowFilterLookupData);

    useEffect(() => {
        const dataGrid = dataGridRef.current.instance;
        dataGrid.refresh(true);
        dataGrid.cancelEditData();
        formikRef.current.resetForm();
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
            if (data?.accountLoginId) {
                const allowedChars = /^([ -~]{6,64})+$/;
                if (!allowedChars.test(data?.accountLoginId)) {
                    showToast('IDは半角英数記号6~64文字までで入力してください', 'warning');
                    validation = false
                    return;
                }
            }else if(type=="insert" && !data?.accountLoginId){
                showToast('IDは半角英数記号6~64文字までで入力してください', 'warning');
                validation = false
                return;
            }else if(type=="update" && (/^(""|''|)$/.test(data?.accountLoginId) || data?.accountLoginId !== undefined)){
                showToast('IDは半角英数記号6~64文字までで入力してください', 'warning');
                validation = false
                return;
            }
            if (data?.accountPassword) {
                console.log('password', data?.accountPassword)
                // const allowedChars = /^[a-zA-Z0-9\-_/*+.,!#$%&()~|]+$/;
                const allowedChars = /^([ -~]{6,64})+$/;
                if (!allowedChars.test(data?.accountPassword)) {
                    console.log('password error')
                    showToast('パスワードは半角英数記号6~64文字までで入力してください', 'warning');
                    validation = false;
                    return;
                }
            }else if(type=="insert" && !data?.accountPassword){
                showToast('パスワードは半角英数記号6~64文字までで入力してください', 'warning');
                validation = false
                return;
            }else if(type=="update" && (/^(""|''|)$/.test(data?.accountPassword) || data?.accountPassword !== undefined)){
                showToast('パスワードは半角英数記号6~64文字までで入力してください', 'warning');
                validation = false
                return;
            }
            if(type=="insert" && !data?.accountRoleType){
                showToast('ロールタイプを選択してください', 'warning');
                validation = false
                return;
            }
        })
        if (validation) {
            const dataGrid = dataGridRef.current.instance;
            try {
                setSubmitLoading(true);
                const response = await http.post('/manager/account', submittedData);
                const { status } = response;

                if (status === 200) {
                    closeModal();
                }
                setSubmitLoading(false);
                dataGrid.refresh(true);
                dataGrid.cancelEditData();
            } catch (err) {
                console.log('error-->', err)
                showToast('システムエラーが発生しました。システム管理者に連絡してください', 'error');
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
        if (e.parentType == 'filterRow' && e.dataField !== "accountRoleType") {
            e.editorOptions.onFocusOut = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
            e.editorOptions.onEnterKey = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
        }
        if (e.dataField === 'accountLoginId' || e.dataField === 'accountPassword') {
            e.editorOptions.maxLength = 64;
        }
        if (e?.row?.isNewRow) { // Check if the row is new or not
            if (e.dataField === "accountRoleType") {
                e.component.cellValue(e.row.rowIndex, "accountRoleType", 2);
            }
        }
    };

    // Define a separate functional component for the password cell template
    function PasswordCellTemplate({ data }) {
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);

        const togglePasswordVisibility = () => {
            setIsPasswordVisible(!isPasswordVisible);
            //setShowPassword(!isPasswordVisible); // Update the parent state
        };

        return (
            <>
                {isPasswordVisible ? (
                    <span>{data.value}</span>
                ) : (
                    <span>********</span>
                )}
                <div
                    className="eye-icon-wrapper"
                    onClick={togglePasswordVisibility}
                >
                    {isPasswordVisible ? (
                        <FaEye className="eye-icon fa-eye" />
                    ) : (
                        <FaEyeSlash className="eye-icon fa-eye-slash" />
                    )}
                </div>
            </>
        );
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
                <Section caption="アカウント一覧(削除を行うと元に戻せません) ID・パスワードは半角英数記号6~64文字までで入力可能です" wrapClass="justify-center" />
                <div className="flex">
                    <MenuButtonSub pathname='' icon={Plus} onClick={ (e) => addNew(e) }>追加</MenuButtonSub>
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
                            stateStoringPath="accountManagementList"
                            className='editable-table account-management-table'
                            onSaving={(data) => onSaving(data)}
                            onCellClick={handleOnCellClick}
                            onEditorPreparing={onEditorPreparing}
                        >
                            <FilterRow  applyFilter={applyFilter} visible={true}/>
                            <Column
                                caption="編集日時"
                                dataField="accountUpdatedAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowEditing={false}
                                cellRender={dateCellRender}
                            />
                            <Column
                                caption="最終ログイン"
                                dataField="accountLastLoginAt"
                                dataType="datetime"
                                format="yyyy/MM/dd HH:mm"
                                alignment="center"
                                width={160}
                                allowEditing={false}
                                cellRender={dateCellRender}
                            />
                            <Column
                                dataType="string"
                                caption="ID"
                                dataField="accountLoginId"
                                width={120}
                            />
                            <Column
                                dataType="string"
                                caption="PASS"
                                dataField="accountPassword"
                                width={120}
                                allowFiltering={false}
                                cssClass="account-password-column"
                                cellRender={(data) => (
                                    data.value && <PasswordCellTemplate data={data} />
                                )}
                            >
                            </Column>
                            <Column
                                dataType="string"
                                caption="アカウント名"
                                dataField="accountName"
                                width={120}
                            />
                            <Column
                                caption="ロール"
                                dataField="accountRoleType"
                                alignment="left"
                                width={80}
                                filter
                            >
                                <Lookup
                                    dataSource={accountRoleType}
                                    valueExpr="id"
                                    displayExpr="caption"
                                />
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