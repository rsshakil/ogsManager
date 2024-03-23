import React, {useEffect, useRef, useState } from "react";
import {v4 as uuid} from 'uuid';
import {Column, FilterRow} from "devextreme-react/data-grid";
import Table from "../../ui/Table";

const responseData = [
    { key: 'tag', caption: "タグ" },
    { key: 'item', caption: "アイテム" },
];

export default function TagItemList (
    {
        tagLoading,
        itemLoading,
        activeGroup,
        tagDataSource,
        itemDataSource,
        tags,
        tagDataGridRef,
        itemDataGridRef,
        onRowClick,
        handleOnTabChange,
        onCellHoverChanged
    }
) {
    const selectedTagsRef = useRef(null);
    const elementRef = useRef(null);
    const [applyFilter, setApplyFilter] = useState('onClick');


    useEffect(() => {
        if (elementRef.current) {
            // Get the filter row element
            let filterRowElement;
            if (activeGroup === 'tag') {
                filterRowElement = tagDataGridRef.current.instance.element().querySelector('.dx-datagrid-filter-row');
            } else {
                filterRowElement = itemDataGridRef.current.instance.element().querySelector('.dx-datagrid-filter-row');
            }

            if (filterRowElement) {
                const dataField = elementRef.current.column.dataField;
                // Find the editor elements within the filter row
                const filterCols = filterRowElement.querySelectorAll('.dx-datagrid-filter-row td');
                filterCols.forEach((filterCol, columnIndex) => {
                    // Do something with each editor element (e.g., log its value)
                    if (columnIndex === elementRef.current.columnIndex) {
                        const editorElement = filterCol.querySelector('.dx-texteditor-input');
                        if (editorElement) {
                            if (
                                dataField === 'tagCount'
                            )
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

    const imgCellRender = (data) => {
        return <img src={data.value}  alt="" />;
    }

    const handleOnCellClick = (e) => {
        // console.log('handleColumnClick e ', e)
        const { dataField } = e.column || {};

        if (e.rowType === 'filter') {
            if (e.rowIndex === 1) {
                if (dataField === 'tagCount') {
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
        // console.log(e, 'onEditorPreparing')
        if (e.parentType == 'filterRow' && e.dataField !== "tagCount") {
            e.editorOptions.onFocusOut = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
            e.editorOptions.onEnterKey = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
        }

        if (e.parentType === "filterRow") {
            if (e.dataField === "tagCount") {
                //console.log('tagCount..........')
                e.editorName = "dxTagBox";
                e.editorOptions.selectAllText = "すべてを選択";
                e.editorOptions.allowFilter = false;
                e.editorOptions.showSelectionControls = true;
                e.editorOptions.height = 30;
                e.editorOptions.dropDownOptions = {
                    minWidth: 220,
                };
                e.editorOptions.value = e.value || [];
                e.editorOptions.applyValueMode = "useButtons";
                e.editorOptions.onValueChanged = function (args) {
                    e.setValue(args.value);
                };

                if (e.dataField === "tagCount") {
                    e.editorOptions.dataSource = tags;
                    e.editorOptions.displayExpr = "tagName";
                    e.editorOptions.valueExpr = "tagId";
                }
            }
        }
    };

    const tagBoxListHeight = () => {
        if (selectedTagsRef.current?.clientHeight <= 140) {
            return { height: `calc(100vh - ${(165+selectedTagsRef.current?.clientHeight)}px)` }
        }
    }

    console.log('rendering...................')

    return (
        <div className="custom-tagbox-list" style={tagBoxListHeight()}>
            <div className="tab space-x-5 mb-2">
                {responseData.map((x) => (
                    <button type="button"
                            key={uuid()}
                            className={`tablinks ${x.key == activeGroup ? 'active' : ''}`}
                            onClick={(e) => handleOnTabChange(e, x.key)}
                    >
                        {x.caption}
                    </button>
                ))}
            </div>

            {/* ================= Tag list start =================*/}
            {
                tagDataSource && activeGroup === 'tag' &&
                <Table
                    className="tagbox-tag-table"
                    isLoading={tagLoading}
                    dataSource={tagDataSource}
                    paging={false}
                    dataGridRef={tagDataGridRef}
                    onRowClick={onRowClick}
                    onCellClick={handleOnCellClick}
                    onEditorPreparing={onEditorPreparing}
                    allowColumnResizing={true}
                    allowColumnReordering={true}
                    stateStoring={true}
                    stateStoringPath="customTagBoxTags"
                >
                    <FilterRow  applyFilter={applyFilter} visible={true}/>
                    <Column
                        caption="タグ名"
                        dataField="tagName"
                        cssClass="cursor-pointer min-w-200px"
                    />
                    <Column
                        caption="在庫数"
                        dataField="itemStockUnsetCount"
                        width={120}
                        cssClass="cursor-pointer"
                        alignment="right"
                        dataType="number"
                    />
                    <Column
                        caption="アイテム数"
                        dataField="itemCount"
                        width={120}
                        cssClass="cursor-pointer"
                        alignment="right"
                        dataType="number"
                    />
                </Table>
            }
            {/* ================= Tag list end =================*/}

            {/* ================= Item list start =================*/}
            {
                itemDataSource && activeGroup === 'item' &&
                <Table
                    className="tagbox-item-table"
                    isLoading={itemLoading}
                    dataSource={itemDataSource}
                    onCellHoverChanged={onCellHoverChanged}
                    dataGridRef={itemDataGridRef}
                    onRowClick={onRowClick}
                    onCellClick={handleOnCellClick}
                    onEditorPreparing={onEditorPreparing}
                    allowColumnResizing={true}
                    allowColumnReordering={true}
                    stateStoring={true}
                    stateStoringPath="customTagBoxItems"
                >
                    <FilterRow applyFilter={applyFilter} visible={true}/>
                    <Column
                        caption="画像"
                        dataField="itemImagePath1"
                        width="30"
                        allowFiltering={false}
                        allowSorting={false}
                        cellRender={imgCellRender}
                        cssClass="cursor-pointer item-img"
                    />
                    <Column
                        caption="アイテム名"
                        dataField="itemName"
                        width={400}
                        cssClass="cursor-pointer"
                    />
                    <Column
                        caption="シリアルナンバー"
                        dataField="itemAttribute3"
                        width={150}
                        cssClass="cursor-pointer"
                        alignment="center"
                    />
                    <Column
                        caption="レアリティ"
                        dataField="itemAttribute4"
                        width={120}
                        cssClass="cursor-pointer"
                        alignment="center"
                    />
                    <Column
                        caption="鑑定/ランク"
                        dataField="itemAttribute5"
                        width={120}
                        cssClass="cursor-pointer"
                        alignment="center"
                    />
                    <Column
                        caption="状態"
                        dataField="itemAttribute6"
                        width={120}
                        cssClass="cursor-pointer"
                        alignment="center"
                    />
                    <Column
                        caption="シリーズ名"
                        dataField="itemAttribute2"
                        width={120}
                        cssClass="cursor-pointer"
                        alignment="center"
                    />
                    <Column
                        caption="在庫数"
                        dataField="itemStockUnsetCount"
                        width={120}
                        cssClass="cursor-pointer"
                        alignment="right"
                    />
                    <Column
                        caption="タグ名"
                        dataField="tagCount"
                        cssClass="cursor-pointer tag-box min-w-200px"
                    />
                </Table>
            }
            {/* ================= Item list end =================*/}
        </div>
    )
}