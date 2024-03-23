import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Column, Lookup, Button, FilterRow, RemoteOperations } from 'devextreme-react/data-grid';
import ItemForm from "../Form/forms/items/ItemFormEdit";
import { displayState } from "../../store/displayState";
import Table from "../ui/Table";
import EditIcon from "../atoms/icons/EditIcon";
import CloneIcon from "../atoms/icons/CloneIcon";
import { useModal } from "../../contexts/ModalContext";
import useCustomStore from "../../hooks/useCustomStore";
import StockFormEdit from "../Form/forms/items/StockFormEdit";
// import {useFetchItemInitQuery} from "../../features/item/itemApi";
import useFetchItemInitQuery from "../../hooks/useFetchItemInitQuery";

const pagePath = 'items';
const pageTitle = 'アイテム管理';


const allPossibleRowFilterLookupData = [
    { itemStatus: 1, itemShippingFlag: 0 },
    { itemStatus: 2, itemShippingFlag: 1 }
]

const statusLookup = [
    { id: 1, caption: '有効' },
    { id: 2, caption: '無効' },
]

const shippingRestrictionLookup = [
    { id: 0, caption: '不可能' },
    { id: 1, caption: '可能' },
]

function statusCellRenderer(cellData) {
    const textColor = cellData.value === 2 ? '#FF758F' : ''; // Change the text color for "Disabled" status
    const targetItemStatus = statusLookup.find(item => item.id === cellData.data.itemStatus);
    return (
        <div style={{ color: textColor }}>
            {targetItemStatus?.caption}
        </div>
    );
}

function shippingRestrictionCellRenderer(cellData) {
    const textColor = cellData.value === 0 ? '#FF758F' : ''; // Change the text color for "Disabled" status
    const targetItemStatus = shippingRestrictionLookup.find(item => item.id === cellData.data.itemShippingFlag);
    return (
        <div style={{ color: textColor }}>
            {targetItemStatus.caption}
        </div>
    );
}


export const Items = () => {
    const location = useLocation();
    const dataGridRef = useRef(null);
    const elementRef = useRef(null);

    const { showModal, closeModal, setTableRef } = useModal();
    const { dataSource, isLoading } = useCustomStore('itemId', '/item', true, allPossibleRowFilterLookupData);

    //Query
    const { data: { categories = [], tags = [] } = {}, isFetching: itemInitLoading, refetchApi } = useFetchItemInitQuery(false);

    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    const [applyFilter, setApplyFilter] = useState('onClick');
    //const [clickedColumn, setClickedColumn] = useState("");

    useEffect(() => {
        console.log('navigate fire', dataGridRef?.current);
        if (dataGridRef.current) {
            refetchApi();
            dataGridRef.current.instance.refresh();
        }
        setDisplayState((prevState) => ({
            ...prevState,
            pageTitle: pageTitle,
            pagePath: pagePath,
        }))
    }, [location]);

    useEffect(() => {
        if (dataGridRef.current) {
            setTableRef(dataGridRef);
        }
    }, [dataGridRef])

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
                        if (editorElement) {
                            if (
                                dataField === 'itemStatus'
                                || dataField === 'itemShippingFlag'
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


    const customTemplatePriceSurvey = (data) => {
        const { displayValue: itemName } = data || {};

        return (
            <div className="flex space-x-3">
                <a href={`https://auctions.yahoo.co.jp/search/search?is_postage_mode=1&dest_pref_code=13&exflg=1&b=1&n=100&s1=tbids&o1=d&mode=2&brand_id=167473&p=${itemName}&va=${itemName}`} target="_blank">①</a>
                <a href={`https://grading.pokeca-chart.com/search-result/?search_word=${itemName}`} target="_blank">②</a>
                <a href={`https://pokeca-chart.com/search-result/?search_word=${itemName}`} target="_blank">③</a>
                <a href={`https://pokeka-atari.jp/search?keyword=${itemName}`} target="_blank">④</a>
            </div>
        );
    }

    const handleOnCellClick = (e) => {
        console.log('handleColumnClick e ', e)
        const { dataField } = e.column || {};

        if (e.rowType === 'data') {
            if (dataField === 'itemStockUnsetCount' || dataField === 'itemStockGachaCount' || dataField === 'itemStockCollectionCount' || dataField === 'itemStockShippingRequestCount') {
                //console.log('openStockFormEditPopup')
                const data = e.data;
                // openInventoryChangePopup
                showModal(`${data.itemName} アイテム在庫管理`, <StockFormEdit itemId={data?.itemId} closeModal={closeModal} tableRef={dataGridRef} />);
            }
            if (dataField === 'duplicateAction') {
                console.log('duplicateActionPopup')
                const data = e.data;
                showModal(`${data.itemName} アイテム情報管理 複製`, <ItemForm itemId={data?.itemId} clone={true} closeModal={closeModal} tableRef={dataGridRef} />);
            }
            if (dataField === 'editAction') {
                console.log('editActionPopup')
                const data = e.data;
                showModal(`${data.itemName} アイテム情報管理`, <ItemForm itemId={data?.itemId} closeModal={closeModal} tableRef={dataGridRef} />);
            }
        }
        else if (e.rowType === 'filter') {
            if (e.rowIndex === 1) {
                if (dataField === 'itemStatus' || dataField === 'categoryName' || dataField === 'tagName' || dataField === 'itemShippingFlag') {
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
        //console.log(e, 'onEditorPreparing')
        if (e.parentType == 'filterRow' && e.dataField !== "itemStatus" && e.dataField !== "itemShippingFlag") {
            e.editorOptions.onFocusOut = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
            e.editorOptions.onEnterKey = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
        }

        if ((e.parentType === "dataRow" || e.parentType === "filterRow")) {
            if (e.dataField === "categoryName" || e.dataField === "tagName") {
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

                if (e.dataField === "categoryName") {
                    e.editorOptions.dataSource = categories;
                    e.editorOptions.displayExpr = "categoryName";
                    e.editorOptions.valueExpr = "categoryId";
                }
                else {
                    e.editorOptions.dataSource = tags;
                    e.editorOptions.displayExpr = "tagName";
                    e.editorOptions.valueExpr = "tagId";
                }
            }
        }
    };

    const dateCellRender = (e) => {
        if (e.data[e.column.dataField] !== 0) return e.text;
    }

    return (
        <>
            <Table
                className="non-editable-table"
                isLoading={isLoading}
                dataSource={dataSource}
                dataGridRef={dataGridRef}
                onCellClick={handleOnCellClick}
                onEditorPreparing={onEditorPreparing}
                allowColumnResizing={true}
                allowColumnReordering={true}
                stateStoring={true}
            >
                <FilterRow  applyFilter={applyFilter} visible={true}/>
                <Column
                    caption="状態"
                    dataField="itemStatus"
                    alignment="center"
                    width={60}
                    filter
                    cellRender={statusCellRenderer}
                >
                    <Lookup
                        dataSource={statusLookup}
                        valueExpr="id"
                        displayExpr="caption"
                    />
                </Column>
                <Column
                    caption="ID"
                    dataField="itemUUID"
                    width={80}
                />
                <Column
                    caption="カテゴリー"
                    dataField="categoryName"
                    width={120}
                    cssClass="tag-box"
                />
                <Column
                    caption="タグ"
                    dataField="tagName"
                    width={200}
                    allowSorting={false}
                    cssClass="tag-box"
                />
                <Column
                    caption="価格調査"
                    dataField="itemName"
                    width={200}
                    cellRender={customTemplatePriceSurvey}
                    allowFiltering={false}
                    allowSorting={false}
                />
                <Column
                    caption="アイテム名[日本語]"
                    dataField="itemName"
                    width={400}
                />
                <Column
                    caption="シリーズ名"
                    dataField="itemAttribute2"
                    width={120}
                    alignment="center"
                />
                <Column
                    caption="シリアルナンバー"
                    dataField="itemAttribute3"
                    width={150}
                    alignment="center"
                />
                <Column
                    caption="レアリティマーク"
                    dataField="itemAttribute4"
                    width={150}
                    alignment="center"
                />
                <Column
                    caption="発送制限"
                    dataField="itemShippingFlag"
                    width={80}
                    alignment="center"
                    cellRender={shippingRestrictionCellRenderer}
                >
                    <Lookup
                        dataSource={shippingRestrictionLookup}
                        valueExpr="id"
                        displayExpr="caption"
                    />
                </Column>
                <Column
                    caption="編集日時"
                    dataField="itemUpdatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={240}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="登録日時"
                    dataField="itemCreatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={240}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="未使用数"
                    dataField="itemStockUnsetCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                />
                <Column
                    caption="セット数"
                    dataField="itemStockGachaCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                />
                <Column
                    caption="所蔵数"
                    dataField="itemStockCollectionCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                />
                <Column
                    caption="発送申請"
                    dataField="itemStockShippingRequestCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                />
                <Column
                    caption="発送済み"
                    dataField="itemStockShippedCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                />
                <Column
                    caption="その他"
                    dataField="itemStockOtherCount"
                    dataType="number"
                    alignment="right"
                    width={100}
                    cssClass='cursor-pointer'
                />
                <Column
                    type="buttons"
                    caption="複製"
                    dataField="duplicateAction"
                    alignment="center"
                    width={60}
                    allowFiltering={false}
                    cssClass='cursor-pointer'
                >
                    <Button>
                        <CloneIcon classNames="inline fill-white " />
                    </Button>
                </Column>

                <Column
                    type="buttons"
                    caption="編集"
                    dataField="editAction"
                    alignment="center"
                    width={60}
                    allowFiltering={false}
                    cssClass='cursor-pointer'
                >
                    <Button>
                        <EditIcon classNames="inline fill-white" />
                    </Button>
                </Column>
            </Table>

        </>
    );
};



