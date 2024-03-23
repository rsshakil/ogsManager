
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
import Loader from "../atoms/Loading/TherapistLoader";
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ITEMS_PER_PAGE } from '../../utils/commonConst';
import {Position} from "devextreme-react/popup";


export default function EditableTable({
    className = 'editable-table',
    dataGridRef,
    isLoading,
    children,
    dataSource = [],
    sort = true,
    rowFilter = true,
    paging = true,
    allowAdding = true,
    allowDeleting = true,
    stateStoring = false,
    stateStoringPath= null,
    columnChooserPosition = '.editable-table',
    ...rest
}) {

    useEffect(() => {
        if (stateStoringPath) {
            const state = JSON.parse(localStorage.getItem(stateStoringPath));
            if (state) {
                state.pageSize = 300;
            }
            localStorage.setItem(stateStoringPath, JSON.stringify(state));
        }
        dataGridRef?.current.instance.clearFilter();
        dataGridRef?.current.instance.clearSorting();
    },[dataSource])

    dataGridRef?.current?.instance.hideColumnChooser();

    // Custom function to format the pager info text
    const formatPagerInfoText = (pageIndex, pageCount, itemCount) => {
        return `データ件数 : ${itemCount >= 0 ? itemCount : 0}件`;
    };

    return (
        <>
            {isLoading && <Loader />}

            <DataGrid
                id="gridContainer"
                className={className}
                ref={dataGridRef}
                noDataText=""
                dataSource={dataSource}
                repaintChangesOnly={true}
                columnAutoWidth={true}
                height="100%"
                rowAlternationEnabled={true}
                hoverStateEnabled={true}
                showBorders={false}
                showRowLines={false}
                columnResizingMode="widget"

                {...rest}
            >
                <RemoteOperations filtering={rowFilter} paging={paging} sorting={sort} />

                <Editing
                    mode="batch"
                    allowUpdating={true}
                    allowAdding={allowAdding}
                    allowDeleting={allowDeleting}
                    useIcons={true}
                />

                <ColumnChooser
                    enabled={true}
                    mode="select"
                >
                    <ColumnChooserSelection
                        allowSelectAll={true}
                        selectByClick={true}
                        recursive={true} />
                    <Position
                        my="right top"
                        at="right bottom"
                        of={columnChooserPosition + ' .dx-datagrid-headers'}
                    />
                </ColumnChooser>
                <LoadPanel enabled={false} />
                <Scrolling columnRenderingMode="standard" />
                {/* Conditional features */}
                <Sorting mode="multiple" />
                <FilterRow visible={rowFilter} applyFilter={rowFilter} />
                <Paging enabled={paging} defaultPageSize={ITEMS_PER_PAGE} />
                <Pager
                    visible={paging}
                    allowedPageSizes={[]}
                    displayMode={'full'}
                    showPageSizeSelector={false}
                    showInfo={true}
                    infoText={formatPagerInfoText}
                    showNavigationButtons={true}
                />
                <StateStoring enabled={stateStoring} type="localStorage" storageKey={stateStoringPath} />
                {children}
            </DataGrid>
        </>
    )
}