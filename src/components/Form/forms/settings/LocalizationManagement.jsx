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
import useFetchQuery from "../../../../hooks/useFetchQuery";

const formValueInitial = {}

export default function LocalizationManagement() {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formValue, setFormValue] = useState(formValueInitial);
    const { isModalOpen: refetch, closeModal } = useModal();
    const dataGridRef = useRef(null);
    const formikRef = useRef();
    const elementRef = useRef(null);
    const { showToast } = useToast();
    const [applyFilter, setApplyFilter] = useState('auto');
    const [localize, setLocalize] = useState([]);
    const [countries, setCountries] = useState([]);

    //Query
    const { dataSource, isLoading } = useFetchQuery('/manager/localize', refetch);

    useEffect(() => {
        const dataGrid = dataGridRef.current.instance;
        dataGrid.refresh(true);
        dataGrid.cancelEditData();
        formikRef.current.resetForm();
    },[refetch]);

    useEffect(() => {
        if (dataSource) {
            const { records = [], countries = []} = dataSource;
            const newCountries = [
                {
                    "countryId": -1,
                    "countryName": "対象言語にデータがない時の代替言語",
                    "countryCode": "指定した言語が空の場合日本語が使用されます"
                },
                {
                    "countryId": 0,
                    "countryName": "その他",
                    "countryCode": "そのほか全て"
                },
            ]
            countries.unshift(...newCountries)
            setCountries(countries);
            records.map(record => {
                const targetCountry = countries.find(item => item.countryId === record.localizeCountryId);
                if (targetCountry) {
                    return record.countryCode = targetCountry.countryCode;
                }
            })
            setLocalize(records);
        }
    }, [dataSource])

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

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const dataGrid = dataGridRef.current.instance;
        console.log("EditData",dataGrid.option("editing.changes"));

        let changesItem = dataGrid.option("editing.changes");
        let changesArray = changesItem && changesItem.length>0?[...changesItem]:[];
        console.log('submit by manual');
        const submittedData = {
            changes:changesArray
        }
        // await processBatchRequest(submittedData);
    }

    //processBatchRequest
    const processBatchRequest = async (submittedData)=>{
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

    // Function to handle changes in the table data
    const onSaving = async (newData) => {
        //console.log(newData, 'newData....')
        const submittedData = _.pick(newData, ['changes']);
        console.log("submittedData", submittedData)
        if (submittedData.changes.length > 0) {
            // await processBatchRequest(submittedData);
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
                if (dataField === 'localizeCountryId' || dataField === 'localizeLanguageId') {
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
        if (e.parentType == 'filterRow' && e.dataField !== "localizeCountryId" && e.dataField !== "localizeLanguageId") {
            e.editorOptions.onFocusOut = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
            e.editorOptions.onEnterKey = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
        }
    };

    const onCellPrepared = (e) => {
        //console.log('onCellPrepared e', e)
        if (e.rowType === "data") {
            if (e.column.command === "edit") {
                if (e.data.localizeCountryId === -1 || e.data.localizeCountryId === 0) {
                    let cellElement = e.cellElement;
                    const links = cellElement.getElementsByClassName("dx-link");
                    cellElement.classList.remove('cursor-pointer')
                    if (links.length > 0) {
                        cellElement.removeChild(links[0]);
                    }
                }
            }
            else if (e.column.dataField === 'localizeCountryId') {
                if (e.data.localizeCountryId === -1 || e.data.localizeCountryId === 0) {
                    e.cellElement.classList.add('pointer-events-none');
                }
            }
        }
    }

    const countryWiseSetCellValue = (newData, value) => {
        // Update the countryCode based on the selected countryId
        const selectedCountry = countries.find(country => country.countryId === value);

        newData.localizeCountryId = value;
        newData.countryCode = selectedCountry.countryCode;
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
                <Section caption="ユーザー情報の地域との関連付け" wrapClass="justify-center" />
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
                    <Form>
                        <EditableTable
                            isLoading={isLoading || submitLoading}
                            dataSource={localize}
                            dataGridRef={dataGridRef}
                            rowFilter={true}
                            paging={false}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            stateStoring={true}
                            stateStoringPath="localizationManagementList"
                            className='editable-table account-management-table'
                            onSaving={(data) => onSaving(data)}
                            onCellClick={handleOnCellClick}
                            onEditorPreparing={onEditorPreparing}
                            onCellPrepared={onCellPrepared}
                            remoteOperations={false}
                        >
                            <FilterRow  applyFilter={applyFilter} visible={true}/>
                            <Column
                                caption="地域/国"
                                dataField="localizeCountryId"
                                alignment="left"
                                cssClass="min-w-200px"
                                filter
                                setCellValue={countryWiseSetCellValue}
                            >
                                <Lookup
                                    dataSource={countries}
                                    valueExpr="countryId"
                                    displayExpr="countryName"
                                />
                            </Column>
                            <Column
                                dataType="string"
                                caption="ブラウザcountry"
                                dataField="countryCode"
                                width={200}
                                allowEditing={false}
                                allowFiltering={false}
                            />
                            <Column
                                caption="表示言語"
                                dataField="localizeLanguageId"
                                alignment="left"
                                width={140}
                                filter
                            >
                                <Lookup
                                    dataSource={dataSource.languages}
                                    valueExpr="languageId"
                                    displayExpr="languageName"
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