import {Form, Formik} from "formik";
import {Button, Column} from 'devextreme-react/data-grid';
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

const formValueInitial = {}

export default function DomainBlocklist() {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formValue, setFormValue] = useState(formValueInitial);
    const { isModalOpen: refetch, closeModal } = useModal();
    const dataGridRef = useRef(null);
    const formikRef = useRef();
    const { showToast } = useToast();

    //Query
    const { dataSource, isLoading } = useCustomStore('domainBlockPatternId', '/domain-blocklist', false, [], true);

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
                const patternName = data.domainBlockPatternName ? data.domainBlockPatternName.trim() : null;
                if (!patternName) {
                    showToast(errorMessages.W_REQUIRED_01('ドメイン/メールアドレス'), 'warning');
                    validation = false;
                    return true;
                }
                if (!(domainRegex.test(patternName) || emailRegex.test(patternName))) {
                    showToast('入力されたドメイン/メールアドレスの形式が正しくありません', 'warning');
                    validation = false;
                }
            }
        })

        if (!validation) return;

        let submittedData = {};
        if (changesArray.length > 0) {
            submittedData.changes = changesArray;
        }

        console.log('submittedData', submittedData)

        await processBatchRequest(submittedData);
    }

    //processBatchRequest
    const processBatchRequest = async (submittedData)=> {
        console.log('submittedData', submittedData)
        try {
            setSubmitLoading(true);
            if (Object.keys(submittedData).length > 0) {
                await http.post('/manager/domain-blocklist', submittedData);
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

    const addNew = (e) => {
        e.preventDefault();
        const dataGrid = dataGridRef.current.instance;
        dataGrid.addRow();
    }

    return (
        <>
            <div className="flex justify-between h-16">
                <Section caption="新規登録禁止メールリスト" wrapClass="justify-center"/>
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
                            <Column
                                dataType="string"
                                caption="ドメイン/メールアドレス"
                                dataField="domainBlockPatternName"
                                width={250}
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

                        <div>
                            <p className="text-white modal-button-note">メールアドレスで禁止する場合は[abc＠aaa.com]　ドメインで禁止する場合は[@aaa.com]と入力してください</p>
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
