import { Formik, Form } from "formik";
import { Column, Button } from 'devextreme-react/data-grid';
import React, { Fragment, useEffect, useRef, useState } from "react";
import Section from "../../FormInputs/Section"
import Loader from "../../../atoms/Loading/TherapistLoader";
import EditableTable from "../../../ui/EditableTable";
import useCustomStore from '../../../../hooks/useCustomStore';
import { MenuButtonSub } from '../../../atoms/buttons/MenuButtonSub';
import Plus from "../../../atoms/img/Plus.svg";
import { useModal } from '../../../../contexts/ModalContext';
import { Button as DevReactButton } from "devextreme-react/button";
import Video from '../../../molecules/Video';
import http from "../../../../restapi/httpService";
import {useToast} from "../../../../contexts/ToastContext";

export default function VideoManagement({ closeModal }) {
    const { isModalOpen: refetch } = useModal();
    const { showToast } = useToast();

    const formikRef = useRef(null);
    const dataGridRef = useRef(null);

    const { dataSource, isLoading, restData } = useCustomStore('videoId', `/video`, false, [], refetch);

    const [isSubmitting, setIsSubmitting] = useState(false);

    console.log('myyyyyyyyyyyyy dataSource', dataSource)

    // const { uploadFile, progress = 0 } = useS3FileUploader(`productvideo-ogs-${process.env.REACT_APP_ENVIRONMENT}`);

    useEffect(() => {
        const dataGrid = dataGridRef?.current?.instance;
        dataGrid.refresh(true);
        dataGrid.cancelEditData();
    }, [refetch])


    const updateColumnValue = (key, fieldName, newValue) => {
        const rowIndex = dataSource.items().findIndex((item) => item.videoId == key);

        console.log('rowIndex checking >>>>>', rowIndex)

        if (rowIndex != -1) {
            dataSource.items()[rowIndex][fieldName] = newValue; // Update the specific column value
            dataGridRef.current.instance.repaintRows([rowIndex]); // Repaint the specific row
        }
    };


    // useEffect(() => {
    //     if (!isLoading) {
    //         const videosEl = document.getElementsByClassName('videoElement');

    //         for (let i = 0; i < videosEl.length; i++) {
    //             let el = videosEl[i];

    //             el.addEventListener('loadeddata', () => {
    //                 const canvas = document.createElement('canvas');
    //                 canvas.width = el.videoWidth;
    //                 canvas.height = el.videoHeight;
    //                 canvas.getContext('2d').drawImage(el, 0, 0, canvas.width, canvas.height);
    //                 const thumbnailData = canvas.toDataURL();

    //                 videosEl[i].setAttribute('poster', thumbnailData);
    //             })
    //         }
    //     }
    // }, [isLoading])



    const addNew = (e) => {
        e.preventDefault();

        const dataGrid = dataGridRef.current.instance;
        dataGrid.addRow();
    }

    const handleOnCellClick = (e) => {
        const { dataField } = e.column || {};
        // if (e.rowType === 'data') {
        //     if (dataField === 'deleteAction') {
        //         if (e.cellElement.children.length > 0) {
        //             console.log('delete/undelete')
        //             if (e.cellElement.children[0].className.includes('dx-link-delete')) {
        //                 dataGridRef.current.instance.deleteRow(e.rowIndex);
        //             } else {
        //                 dataGridRef.current.instance.undeleteRow(e.rowIndex);
        //             }
        //         }
        //     }
        // }

        // //remove heighlighter from td
        // if(e.columnIndex){
        //     e.cellElement.classList.remove('dx-focused');
        //     e.cellElement.classList.add('dx-cell-focus-disabled');
        // }
        // console.log("eeeee",e)

    }

    const onCellPrepared = (e) => {
        // if (e.rowType === "data" && e.column.command === "edit") {
        //     if (e.data.itemCount > 0) {
        //         let cellElement = e.cellElement;
        //         const links = cellElement.getElementsByClassName("dx-link");
        //         cellElement.classList.remove('cursor-pointer')
        //         if (links.length > 0) {
        //             cellElement.removeChild(links[0]);
        //         }
        //     }
        // }
    }

    const handleSubmit = async () => {
        const dataGrid = dataGridRef.current.instance;
        let changesItem = dataGrid.option("editing.changes");

        console.log('changesItem >>>', changesItem)
        let isSubmit = true;
        changesItem.forEach(change => {
            if (change.data.videoName === '') {
                isSubmit = false
            }
        });
        if (!isSubmit) {
            showToast('動画タイトルを入力してください', 'warning');
            return;
        }
        console.log('submiting......')

        const submittedData = {
            changes:changesItem
        }
        await processBatchRequest(submittedData);
    }

    const processBatchRequest = async (submittedData)=>{
        const dataGrid = dataGridRef.current.instance;

        try {
            setIsSubmitting(true);
            const response = await http.post('/manager/video', submittedData);
            const { status } = response;

            if (status === 200) {
                closeModal();
            }
            setIsSubmitting(false);
            dataGrid.refresh(true);
            dataGrid.cancelEditData();
        } catch (err) {
            console.log('error-->', err)
            showToast('システムエラーが発生しました。システム管理者に連絡してください', 'error');
            setIsSubmitting(false);
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
        <div>
            {(isLoading || isSubmitting) && <Loader />}

            <Formik
                innerRef={formikRef}
                initialValues={{}}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <div className="flex justify-between h-16">
                            <Section caption="動画管理" wrapClass="justify-center" />
                            {/* <MenuButtonSub pathname='' icon={Plus} onClick={addNew}>追加</MenuButtonSub> */}
                            <MenuButtonSub className="ml-2 max-w-[80px] min-w-[80px]" onClick={chooseColumns}>
                                <i className="dx-icon dx-icon-column-chooser"></i>
                            </MenuButtonSub>
                        </div>

                        <EditableTable
                            dataSource={dataSource}
                            dataGridRef={dataGridRef}
                            rowFilter={false}
                            paging={false}
                            className='editable-table'
                            repaintChangesOnly={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            stateStoring={true}
                            stateStoringPath="videoManagementList"
                            onCellClick={handleOnCellClick}
                            onCellPrepared={onCellPrepared}
                            allowDeleting={false}
                        >
                            <Column
                                dataType="string"
                                caption="動画タイトル"
                                dataField="videoName"
                                cssClass="min-w-200px"
                            />
                            <Column
                                caption="動画"
                                dataField="videoPath"
                                cssClass="min-w-200px"
                                allowEditing={false}
                                cellRender={({ data }) => <Video filePath={data.videoPath} onUploadComplete={(filePath) => updateColumnValue(data.videoId, 'videoPath', filePath)} />}
                            >
                            </Column>
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
        </div>
    )
}