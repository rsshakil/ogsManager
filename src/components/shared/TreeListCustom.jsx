import { useEffect, useState } from 'react';
import _ from 'lodash';
import TreeList, { Column, RowDragging,Editing, Button } from 'devextreme-react/tree-list';
import { Template } from 'devextreme-react/core/template';
import { v4 as uuid } from 'uuid';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRef } from 'react';
import { Formik } from 'formik';
import BlockSelectBox from '../Form/FormInputs/BlockSelectBox';
import TextBox from "../Form/FormInputs/TextBox";
import TextAreaInput from "../Form/FormInputs/TextAreaInput";
const expandedRowKeys = [1];

export default function TreeListCustom({
    config = {},
    addMoreConfig = {},
    dataSource = [],
    columns = [],
    actionColumns = [],
}) {
    const {
        treeListClasses = 'custom-treelist',
        noDataText = 'No data',
        idKey = '',
        allowDragDrop = true,
        handleOnOrderChange = () => {},
        showColumnHeaders = true,
        defaultSelected = '',
        clickableCells = [],
        handleOnCellPreapared = () => {},
        dragDirection = 'both',
        columnAutoWidth = true,

        allowAddMoreButton = false,

        onKeyDown = null,
        onFocusedCellChanged = () => {},
    } = { ...config, ...config.dragDropConfig };

    const { buttonType = 'button', options = {} } = addMoreConfig;

    const [items, setItems] = useState(dataSource);
    const [activeItem, setActiveItem] = useState(defaultSelected);
    const ref = useRef();

    useEffect(() => {
        if (!noDataText) {
            if (dataSource.length === 0) ref.current._element.style.display = 'none';
            else ref.current._element.style.display = '';
        }

        setItems(dataSource);
    }, [dataSource]);

    useEffect(() => {
        setActiveItem(defaultSelected);
    }, [defaultSelected]);

    function onDragChange(e) {
        const visibleRows = e.component.getVisibleRows();
        const sourceNode = e.component.getNodeByKey(e.itemData[idKey]);
        let targetNode = visibleRows[e.toIndex].node;

        while (targetNode && targetNode.data) {
            if (targetNode.data[idKey] === sourceNode.data[idKey]) {
                e.cancel = true;
                break;
            }
            targetNode = targetNode.parent;
        }
    }

    function onReorder(e) {
        const visibleRows = e.component.getVisibleRows();
        let sourceData = e.itemData;
        const sourceIndex = items.indexOf(sourceData);

        let updatedItems = [...items];

        if (e.dropInsideItem) {
            sourceData = { ...sourceData, Head_ID: visibleRows[e.toIndex].key };
            updatedItems = [...updatedItems.slice(0, sourceIndex), sourceData, ...updatedItems.slice(sourceIndex + 1)];
        } else {
            const toIndex = e.fromIndex > e.toIndex ? e.toIndex - 1 : e.toIndex;
            let targetData = toIndex >= 0 ? visibleRows[toIndex].node.data : null;

            updatedItems = [...updatedItems.slice(0, sourceIndex), ...updatedItems.slice(sourceIndex + 1)];

            const targetIndex = updatedItems.indexOf(targetData) + 1;
            updatedItems = [...updatedItems.slice(0, targetIndex), sourceData, ...updatedItems.slice(targetIndex)];
        }

        updateState(null, updatedItems, 'orderChange');
    }

    function onClickActionIcon(e, eventType = '', handleOnClick) {
        const selectedItem = e.row.data;
        let updatedItems = [...items];

        if (eventType === 'delete') {
            updatedItems = _.filter(updatedItems, (item) => {
                return item[idKey] !== selectedItem[idKey];
            });
        }

        updateState(e, updatedItems, eventType, handleOnClick);
    }

    function onCellClick(e) {
        const { dataField, dataEventType, dataHandleOnClick } = e.column;

        if (clickableCells.includes(dataField)) {
            setActiveItem(e.data[idKey]);

            const updatedItems = _.map([...items], (x) => {
                return x[idKey] === e.data[idKey] ? { ...x, active: true } : x;
            });

            updateState(e, updatedItems, dataEventType, dataHandleOnClick);
        }
    }

    function onCellPrepared(e) {
        const { rowType } = e;

        if (rowType === 'header') return null;

        if (e.data[idKey] === activeItem) {
            e.cellElement.parentElement.classList.add('tab-active');
        }

        handleOnCellPreapared(e, 'cellPrepared');
    }

    function updateState(e = null, updatedItems, eventType, eventHandlerFunc = () => {}) {
        setItems(updatedItems);

        //callback function calling;
        if (eventType === 'orderChange') {
            handleOnOrderChange(e, eventType, updatedItems);
        } else {
            eventHandlerFunc({ e, eventType, updatedItems });
        }
    }
    // Add more button section
    function addNewItem(e, callBackFunc = () => {}) {
        const newItem = callBackFunc(e, 'add');

        setItems(newItem);
    }
    const addMoreButton = () => {
        if (buttonType === 'button') {
            const {
                buttonTitle = '',
                buttonIcon = (
                    <AiOutlinePlus className="h-[22px] w-[22px] z-10 mr-[-32px] absolute left-2 pointer-events-none" />
                ),
                handleOnClick = () => {},
            } = options || '';

            return (
                <div
                    className="mt-4 flex justify-center align-middle hover:bg-blue-400 relative items-center bg-blue-25
        !cursor-pointer text-blue-100 border border-all h-[32px]"
                >
                    {buttonIcon}
                    <button
                        type="button"
                        onClick={(e) => addNewItem(e, handleOnClick)}
                        className="w-full  mx-1 cursor-pointer"
                    >
                        {buttonTitle}
                    </button>
                </div>
            );
        } else if (buttonType === 'dropdown') {
            const { dropdownItems = [], captionKey = '', valueKey = '', handleOnClick = () => {} } = options || '';

            return (
                <div className="mb-4">
                    <Formik initialValues={{ addNewItem: '' }}>
                        <BlockSelectBox
                            label=""
                            name="addNewItem"
                            labelClassName="text-blue-100 justify-center"
                            inputClassName="bg-blue-25"
                            value=""
                            onChange={(e) => addNewItem(e, handleOnClick)}
                        >
                            {dropdownItems.map((item) => (
                                <option key={item[valueKey]} value={JSON.stringify(item)}>
                                    {item[captionKey]}
                                </option>
                            ))}
                        </BlockSelectBox>
                    </Formik>
                </div>
            );
        }
    };
    const renderCell = (data) => {
        return <TextBox name="test" label="dfdfdfdfd" className="w-full"/>;
    };
    const renderCell2 = (data) => {
        return <label> ddddd </label>;
    };
    return (
        <>
            <TreeList
                ref={ref}
                noDataText={noDataText}
                className={treeListClasses}
                keyExpr={idKey}
                parentIdExpr="Head_ID"
                dataSource={items}
                // height="inherit"
                // style="color: red"

                // height={function () {
                //   const height = ref.current._element.clientHeight;
                //   console.log('current height: ', height)
                //   return height;
                // }}

                showColumnHeaders={showColumnHeaders}
                defaultExpandedRowKeys={expandedRowKeys}
                showColumnLines={false}
                showRowLines={false}
                showBorders={false}
                //columnAutoWidth={columnAutoWidth}
                autoExpandAll={true}
                levelLimit={0}
                onCellClick={onCellClick}
                onCellPrepared={onCellPrepared}
                onKeyDown={onKeyDown}
                onFocusedCellChanged={onFocusedCellChanged}
            >
                {allowDragDrop && (
                    <RowDragging
                        dragDirection={dragDirection}
                        onDragChange={onDragChange}
                        onReorder={onReorder}
                        allowDropInsideItem={false}
                        allowReordering={true}
                        showDragIcons={true}
                        dataField="dragIcon"
                    />
                )}
          
                {columns.map((column) => (
                    <Column
                        key={uuid()}
                        dataField={column.dataField}
                        cellRender={()=><TextBox name="userCollectionMemo" wrapClass="relative" label="メモ" labelClassName="drabgleLabel" inputClassName="w-full customDragAbleInput" />}
                    >
                        
                    </Column>
                ))}

                {actionColumns.length > 0 && (
                    <Column type="buttons" dataField="action">
                        {actionColumns.map((item) => (
                            <Button
                                key={uuid()}
                                icon={item.icon}
                                onClick={(e) => onClickActionIcon(e, item.eventType, item.handleOnClick)}
                            />
                        ))}
                    </Column>
                )}
            </TreeList>

            {allowAddMoreButton && addMoreButton()}
        </>
    );
}
