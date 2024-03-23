import { Formik, Form } from "formik";
import { Column, Button } from 'devextreme-react/data-grid';
import Section from "../Form/FormInputs/Section";
import InputContainer from '../Form/FormInputs/InputContainer';
import TextAreaInput from '../Form/FormInputs/TextAreaInput';
import EditableTable from "../ui/EditableTable";
import React, { useEffect, useRef, useState } from "react";
import Plus from "../atoms/img/Plus.svg";
import { MenuButtonSub } from "../atoms/buttons/MenuButtonSub";
import { Button as DevReactButton } from "devextreme-react/button";
import useFetchCategoryQuery from "../../hooks/useFetchCategoryQuery";
import { useModal } from "../../contexts/ModalContext";
import Loader from "../atoms/Loading/TherapistLoader";
import _ from "lodash";
import { Format } from "devextreme-react/chart";
import http from "../../restapi/httpService";
import { useToast } from "../../contexts/ToastContext";

const formValueInitial = {
    categoryMemo: '',
}

export default function Categories() {
    const formikRef = useRef();
    const [categorySubmitLoading, setCategorySubmitLoading] = useState(false);
    const [formValue, setFormValue] = useState(formValueInitial);
    const { isModalOpen: refetch, closeModal } = useModal();
    const dataGridRef = useRef(null);
    const { showToast } = useToast();

    //Query
    const { dataSource, isLoading: categoryLoading } = useFetchCategoryQuery(refetch);


    useEffect(() => {
        console.log(dataSource, 'dataSource')

        if (!categoryLoading) {
            if (dataGridRef.current) dataGridRef.current.instance.cancelEditData();

            dataSource?.records?.map((record, i) => {
                record.categoryTranslateNames?.map(name => {
                    const targetHeader = dataSource?.headers.find(item => item.translateId === name.categoryTranslateTranslateId);
                    console.log("targetHeader", targetHeader)
                    //
                    record[`categoryTranslateId_${targetHeader.translateId}`] = name.categoryTranslateId;
                    record[`categoryTranslateName${targetHeader.translateId}_${targetHeader.translateJpFlag}`] = name.categoryTranslateName;
                })
                delete record.categoryTranslateNames;
            });

            setFormValue((prevState) => ({
                ...prevState,
                categoryMemo: dataSource.categoryMemo
            }));

            if (formikRef.current) {
                formikRef.current.resetForm();
            }
        }
    }, [categoryLoading])

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const dataGrid = dataGridRef.current.instance;
        if (dataGridRef.current) {
            dataGrid.saveEditData(); // This triggers the save operation
        }
    }

    // Function to handle changes in the table data
    const onSaving = async (newData) => {
        //console.log(newData, 'newData....')
        try {
            const submittedData = _.pick(newData, ['changes', 'categoryMemo']);
            console.log("submittedData", submittedData)
            setCategorySubmitLoading(true);
            const response = await http.post('/manager/category', submittedData);
            const { status } = response;

            if (status === 200) {
                closeModal();
            }
            setCategorySubmitLoading(false);
        } catch (err) {
            console.log('error-->', err)
            showToast('システムエラーが発生しました。システム管理者に連絡してください', 'error');
            setCategorySubmitLoading(false);
        }
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

        //remove heighlighter
        if(dataField=="itemCount"){
            e.cellElement.classList.remove('dx-focused');
            e.cellElement.classList.add('dx-cell-focus-disabled');
        }
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

    const chooseColumns = (e) => {
        e.preventDefault();
        if (dataGridRef.current.instance) {
            dataGridRef.current.instance.hideColumnChooser();
            dataGridRef.current.instance.showColumnChooser();
        }
    }

    return (
        <>
            {(categoryLoading || categorySubmitLoading) && <Loader />}
            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <div className="flex justify-between h-16">
                            <Section caption="カテゴリー一覧（カウントが0のカテゴリのみ削除できます）" wrapClass="justify-center" />
                            <div className="flex">
                                <MenuButtonSub pathname='' icon={Plus} onClick={addNew}>追加</MenuButtonSub>
                                <MenuButtonSub className="ml-2 max-w-[80px] min-w-[80px]" onClick={chooseColumns}>
                                    <i className="dx-icon dx-icon-column-chooser"></i>
                                </MenuButtonSub>
                            </div>

                        </div>

                        <EditableTable
                            dataSource={dataSource?.records}
                            dataGridRef={dataGridRef}
                            rowFilter={false}
                            paging={false}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            stateStoring={true}
                            stateStoringPath="categoryList"
                            className='editable-table category-table'
                            onSaving={(data) => onSaving({ ...data, categoryMemo: values.categoryMemo })}
                            onCellClick={handleOnCellClick}
                            onCellPrepared={onCellPrepared}
                        >
                            {dataSource?.headers.map((header, index) => (
                                <Column
                                    dataType="string"
                                    caption={header.languageName}
                                    dataField={`categoryTranslateName${header.translateId}_${header.translateJpFlag}`}
                                    width={145}
                                    key={Math.random()}
                                />
                            ))}
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
                                <TextAreaInput name="categoryMemo" label="メモ" inputClassName="w-full" />
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