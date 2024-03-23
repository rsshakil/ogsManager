import React, { useRef, useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { settingsState } from "../../store/settingsState";
import { displayState } from "../../store/displayState";
import { Button, Column, FilterRow, Lookup } from "devextreme-react/data-grid";
import { useModal } from "../../contexts/ModalContext";
import useCustomStore from "../../hooks/useCustomStore";
import Table from "../ui/Table";
import EditIcon from "../atoms/icons/EditIcon";
import GachaFormEdit from "../Form/forms/gacha/GachaFormEdit";
import ProductFormEdit from "../Form/forms/products/ProductFormEdit";
import CloneIcon from "../atoms/icons/CloneIcon";
import GachaFormBuild from "../Form/forms/gacha/GachaFormBuild";
import useFetchItemInitQuery from "../../hooks/useFetchItemInitQuery";
import {unixTimestampToDateFormat} from "../../utils/commonFunctions";


const pagePath = 'products';
const pageTitle = '商品管理';

const allPossibleRowFilterLookupData = [
    { gachaStatus: 0, gachaDirectionId: 1, roundNumber: 0, gachaSoldOutFlag: 0, displayedCondition: 1, eventCondition: 1},
    { gachaStatus: 1, gachaDirectionId: 2, roundNumber: 1, gachaSoldOutFlag: 1, displayedCondition: 2, eventCondition: 2},
    { gachaStatus: 3 }
]

const statusLookup = [
    { id: 0, caption: '非表示' },
    { id: 1, caption: '表示' },
    { id: 3, caption: 'エラー' }
]

function statusCellRenderer(cellData) {
    const textColor = cellData.value === 0 || cellData.value === 3 ? '#FF758F' : ''; // Change the text color for "Disabled" status
    const targetItemStatus = statusLookup.find(item => item.id === cellData.data.gachaStatus);
    return (
        <div style={{ color: textColor }}>
            {targetItemStatus?.caption}
        </div>
    );
}

const directionLookup = [
    { id: 1, caption: '本番' },
    { id: 2, caption: '裏' }
]

function directionCellRenderer(cellData) {
    const textColor = cellData.value === 2 ? '#FF758F' : ''; // Change the text color for "Disabled" status
    const targetItem = directionLookup.find(item => item.id === cellData.data.gachaDirectionId);
    return (
        <div style={{ color: textColor }}>
            {targetItem?.caption}
        </div>
    );
}

const viewLookup = [
    { id: 1, caption: '○' },
    { id: 2, caption: '×' }
]

function viewCellRenderer(cellData) {
    const textColor = cellData.value === 2 ? '#FF758F' : ''; // Change the text color for "Disabled" status
    const targetItem = viewLookup.find(item => item.id === cellData.data.displayedCondition);
    return (
        <div style={{ color: textColor }}>
            {targetItem?.caption}
        </div>
    );
}

const executeLookup = [
    { id: 1, caption: '○' },
    { id: 2, caption: '×' }
]

function executeCellRenderer(cellData) {
    const textColor = cellData.value === 2 ? '' : ''; // Change the text color for "Disabled" status
    const targetItem = executeLookup.find(item => item.id === cellData.data.eventCondition);
    return (
        <div style={{ color: textColor }}>
            {targetItem?.caption}
        </div>
    );
}







const flagLookup = [
    { id: 0, caption: '' },
    { id: 1, caption: '◯' }
]

export const Products = () => {
    const location = useLocation();
    const dataGridRef = useRef(null);
    const elementRef = useRef(null);

    const { showModal, closeModal, setTableRef, setListTableRef } = useModal();
    const { dataSource, isLoading } = useCustomStore('gachaId', '/product', true, allPossibleRowFilterLookupData);

    // console.log("product dataSource", dataSource)

    // const [settingsStateStateValue, setSettingsStateState] = useRecoilState(settingsState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    // console.log(settingsStateStateValue);
    const [applyFilter, setApplyFilter] = useState('onClick');

    //Query
    const { data: { categories = [] } = {}, isFetching: itemInitLoading, refetchApi } = useFetchItemInitQuery(false);


    useEffect(() => {
        if (dataGridRef.current) {
            refetchApi();
            dataGridRef.current.instance.refresh();
        }

        window.history.pushState(null, '', window.location.href);
        setDisplayState((prevState) => ({
            ...prevState,
            pageTitle: pageTitle,
            pagePath: pagePath,
        }))
    }, [location]);

    useEffect(() => {
        if (dataGridRef.current) {
            setTableRef(dataGridRef);
            setListTableRef(dataGridRef);
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
                                dataField === 'gachaStatus'
                                || dataField === 'gachaDirectionId'
                                || dataField === 'roundNumber'
                                || dataField === 'gachaSoldOutFlag'
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


    const handleOnCellClick = (e) => {
        //console.log('handleColumnClick e ', e)
        const { dataField } = e.column || {};

        if (e.rowType === 'data') {
            const data = e.data;
            const directionText = data.gachaDirectionId == 1 ? '（本番用）' : '（裏サイト用）';
            const dynamicLabelText = data?.gachaTranslateName + directionText
            if (dataField === 'gachaBuild') {
                showModal(`${dynamicLabelText}`, <GachaFormBuild gachaId={data?.gachaId} closeModal={closeModal} tableRef={dataGridRef} showSecnarioModalWithoutPass={false}/>);
            }
            else if (dataField === 'gachaEdit') {
                showModal(`${dynamicLabelText} パック設定`, <GachaFormEdit gachaId={data?.gachaId} closeModal={closeModal} tableRef={dataGridRef} />);
            }
            else if (dataField === 'productDuplicate') {
                showModal(`${dynamicLabelText} 商品管理 複製`, <ProductFormEdit cloneProduct={true} gachaId={data?.gachaId} closeModal={closeModal} tableRef={dataGridRef} />);
            }
            else if (dataField === 'productEdit') {
                showModal(`${dynamicLabelText} 商品管理`, <ProductFormEdit cloneProduct={false} gachaId={data?.gachaId} closeModal={closeModal} tableRef={dataGridRef} />);
            }
        }
        else if (e.rowType === 'filter') {
            if (e.rowIndex === 1) {
                if (
                    dataField === "gachaStatus"
                    || dataField === "gachaDirectionId"
                    || dataField === "categoryTranslateName"
                    || dataField === "roundNumber"
                    || dataField === "gachaSoldOutFlag"
                ) {
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
        if (
            e.parentType == 'filterRow'
            && e.dataField !== "gachaStatus"
            && e.dataField !== "gachaDirectionId"
            && e.dataField !== "roundNumber"
            && e.dataField !== "gachaSoldOutFlag"
        ) {
            e.editorOptions.onFocusOut = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
            e.editorOptions.onEnterKey = function () {
                e.element.querySelector('.dx-apply-button').click();
            };
        }

        if ((e.parentType === "dataRow" || e.parentType === "filterRow")) {
            if (e.dataField === "categoryTranslateName") {
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

                if (e.dataField === "categoryTranslateName") {
                    e.editorOptions.dataSource = categories;
                    e.editorOptions.displayExpr = "categoryName";
                    e.editorOptions.valueExpr = "categoryId";
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
                <FilterRow applyFilter={applyFilter} visible={true} />
                <Column
                    caption="状態"
                    // filterValues={[1, 2]}
                    dataField="gachaStatus"
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
                    caption="面"
                    dataField="gachaDirectionId"
                    alignment="center"
                    width={60}
                    filter
                    cellRender={directionCellRenderer}
                >
                    <Lookup
                        dataSource={directionLookup}
                        valueExpr="id"
                        displayExpr="caption"
                    />
                </Column>
                <Column
                    caption="表示"
                    dataField="displayedCondition"
                    alignment="center"
                    width={60}
                    filter
                    cellRender={viewCellRenderer}
                >
                    <Lookup
                        dataSource={viewLookup}
                        valueExpr="id"
                        displayExpr="caption"
                    />
                </Column>
                <Column
                    caption="開催"
                    dataField="eventCondition"
                    alignment="center"
                    width={60}
                    filter
                    cellRender={executeCellRenderer}
                >
                    <Lookup
                        dataSource={executeLookup}
                        valueExpr="id"
                        displayExpr="caption"
                    />
                </Column>
                <Column
                    caption="カテゴリー"
                    dataField="categoryTranslateName"
                    width={120}
                    cssClass="tag-box"
                />
                <Column
                    caption="商品名[日本語]"
                    dataField="gachaTranslateName"
                    width={280}
                />
                <Column
                    caption="表示開始日時"
                    dataField="gachaPostStartDate"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={240}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="販売開始日時"
                    dataField="gachaStartDate"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={240}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="販売終了日時"
                    dataField="gachaEndDate"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={240}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="連続数"
                    dataField="gachaConosecutiveCount"
                    dataType="number"
                    alignment="right"
                    width={80}
                />
                <Column
                    caption="連続pt"
                    dataField="gachaConosecutivePoint"
                    dataType="number"
                    alignment="right"
                    width={80}
                />
                <Column
                    caption="単発pt"
                    dataField="gachaSinglePoint"
                    dataType="number"
                    alignment="right"
                    width={80}
                />
                <Column
                    caption="総数"
                    dataField="gachaTotalCount"
                    dataType="number"
                    alignment="right"
                    width={80}
                />
                <Column
                    caption="残数"
                    dataField="gachaRemainingCount"
                    dataType="number"
                    alignment="right"
                    width={80}
                />
                <Column
                    caption="天井数"
                    dataField="gachaLimitCount"
                    dataType="number"
                    alignment="right"
                    width={80}
                />
                <Column
                    caption="1人総上限"
                    dataField="gachaLimitOnce"
                    dataType="number"
                    alignment="right"
                    width={80}
                />
                <Column
                    caption="1人1日上限"
                    dataField="gachaLimitOncePerDay"
                    dataType="number"
                    alignment="right"
                    width={80}
                />
                <Column
                    caption="全員1日上限"
                    dataField="gachaLimitEveryonePerDay"
                    dataType="number"
                    alignment="right"
                    width={80}
                />
                <Column
                    caption="キリ番"
                    dataField="roundNumber"
                    alignment="center"
                    width={60}
                    filter
                >
                    <Lookup
                        dataSource={flagLookup}
                        valueExpr="id"
                        displayExpr="caption"
                    />
                </Column>
                <Column
                    caption="売り切れ表示"
                    dataField="gachaSoldOutFlag"
                    alignment="center"
                    width={60}
                    filter
                >
                    <Lookup
                        dataSource={flagLookup}
                        valueExpr="id"
                        displayExpr="caption"
                    />
                </Column>
                <Column
                    caption="登録日時"
                    dataField="gachaCreatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={240}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="編集日時"
                    dataField="gachaUpdatedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={240}
                    cellRender={dateCellRender}
                />
                <Column
                    caption="シナリオ構築日時"
                    dataField="gachaBuiltedAt"
                    dataType="datetime"
                    format="yyyy/MM/dd HH:mm"
                    alignment="center"
                    width={240}
                    cellRender={dateCellRender}
                />
                <Column
                    type="buttons"
                    caption="シナリオ"
                    dataField="gachaBuild"
                    alignment="center"
                    width={60}
                    allowFiltering={false}
                    cssClass='cursor-pointer'
                >
                    <Button>
                        <EditIcon classNames="inline fill-white" />
                    </Button>
                </Column>
                <Column
                    type="buttons"
                    caption="パック"
                    dataField="gachaEdit"
                    alignment="center"
                    width={60}
                    allowFiltering={false}
                    cssClass='cursor-pointer'
                >
                    <Button>
                        <EditIcon classNames="inline fill-white" />
                    </Button>
                </Column>
                <Column
                    type="buttons"
                    caption="複製"
                    dataField="productDuplicate"
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
                    dataField="productEdit"
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



