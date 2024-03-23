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
import { useModal } from "../../contexts/ModalContext";
import Loader from "../atoms/Loading/TherapistLoader";
import _ from "lodash";
import { Format } from "devextreme-react/chart";
import http from "../../restapi/httpService";
import { useToast } from "../../contexts/ToastContext";
import useFetchQuery from "../../hooks/useFetchQuery";

const formValueInitial = {
    genreMemo: '',
}

export default function Genre() {
    const formikRef = useRef();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formValue, setFormValue] = useState(formValueInitial);
    const { isModalOpen: refetch, closeModal } = useModal();
    const dataGridRef = useRef(null);
    const { showToast } = useToast();

    //Query
    const { dataSource, isLoading: genreLoading } = useFetchQuery('/manager/genre', refetch);

    useEffect(() => {
        console.log(dataSource, 'dataSource')

        if (!genreLoading) {
            if (dataGridRef.current) dataGridRef.current.instance.cancelEditData();

            dataSource?.records?.map((record, i) => {
                record.genreTranslateNames?.map(name => {
                    const targetHeader = dataSource?.headers.find(item => item.translateId === name.genreTranslateTranslateId);
                    console.log("targetHeader", targetHeader)
                    //
                    record[`genreTranslateId_${targetHeader.translateId}`] = name.genreTranslateId;
                    record[`genreTranslateName${targetHeader.translateId}_${targetHeader.translateJpFlag}`] = name.genreTranslateName;
                })
                delete record.genreTranslateNames;
            });

            setFormValue((prevState) => ({
                ...prevState,
                genreMemo: dataSource.genreMemo
            }));

            if (formikRef.current) {
                formikRef.current.resetForm();
            }
        }
    }, [genreLoading])

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
            const submittedData = _.pick(newData, ['changes', 'genreMemo']);
            console.log("submittedData", submittedData)
            setSubmitLoading(true);
            const response = await http.post('/manager/genre', submittedData);
            const { status } = response;

            if (status === 200) {
                closeModal();
            }
            setSubmitLoading(false);
        } catch (err) {
            console.log('error-->', err)
            showToast('システムエラーが発生しました。システム管理者に連絡してください', 'error');
            setSubmitLoading(false);
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
            {(genreLoading || submitLoading) && <Loader />}
            <Formik
                innerRef={formikRef}
                initialValues={formValue}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <div className="flex justify-between h-16">
                            <Section caption="ジャンル一覧" wrapClass="justify-center" />
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
                            stateStoringPath="genreList"
                            className='editable-table genre-table'
                            onSaving={(data) => onSaving({ ...data, genreMemo: values.genreMemo })}
                            onCellClick={handleOnCellClick}
                        >
                            {dataSource?.headers.map((header, index) => (
                                <Column
                                    dataType="string"
                                    caption={header.languageName}
                                    dataField={`genreTranslateName${header.translateId}_${header.translateJpFlag}`}
                                    width={145}
                                    key={Math.random()}
                                />
                            ))}
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
                                <TextAreaInput name="genreMemo" label="メモ" inputClassName="w-full" />
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