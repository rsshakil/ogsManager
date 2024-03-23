import {Column} from 'devextreme-react/data-grid';
import Table from "../ui/Table";
import React, {useEffect, useRef} from "react";
import {useModal} from "../../contexts/ModalContext";
import Loader from "../atoms/Loading/TherapistLoader";
import Section from "../Form/FormInputs/Section";
import useFetchQuery from "../../hooks/useFetchQuery";
import {Button as DevReactButton} from "devextreme-react/button";
import {MenuButtonSub} from "../atoms/buttons/MenuButtonSub";

export default function CouponLog({couponId}) {
    const { isModalOpen: refetch, closeModal } = useModal();
    const dataGridRef = useRef(null);

    //Query
    const { dataSource, isLoading } = useFetchQuery(`/manager/coupon/log/${couponId}`, refetch);

    useEffect(() => {
        const dataGrid = dataGridRef.current.instance;
        dataGrid.refresh(true);
    },[refetch]);

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
            {(isLoading) && <Loader />}
            <div className="flex justify-between h-16">
                <Section caption="クーポン利用履歴" wrapClass="justify-center" />
                <MenuButtonSub className="ml-2 max-w-[80px] min-w-[80px]" onClick={chooseColumns}>
                    <i className="dx-icon dx-icon-column-chooser"></i>
                </MenuButtonSub>
            </div>
            <Table
                dataSource={dataSource.records}
                dataGridRef={dataGridRef}
                rowFilter={false}
                className='coupon-log-table'
                paging={false}
                sort={false}
                allowColumnResizing={true}
                allowColumnReordering={true}
                stateStoring={true}
                stateStoringPath="couponLog"
            >
                <Column
                    dataType="string"
                    caption="クーポン利用者"
                    dataField="userEmail"
                    cssClass="min-w-300px"
                    allowSorting={false}
                />
                <Column
                    caption="クーポン利用日時"
                    dataField="userCouponCreatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={180}
                    allowSorting={false}
                    cellRender={dateCellRender}
                />
            </Table>

            <div>
                <DevReactButton
                    className='w-full mt-4 modal-button'
                    text='閉じる'
                    type="button"
                    stylingMode="contained"
                    onClick={() => closeModal()}
                />
            </div>
        </>
    )
}