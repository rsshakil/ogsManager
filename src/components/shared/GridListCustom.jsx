import { useEffect, useState } from 'react';
import _ from 'lodash';
import DataGrid, {
    Column, RowDragging, Scrolling, Lookup, Sorting,
  } from 'devextreme-react/data-grid';
import { Template } from 'devextreme-react/core/template';
import { v4 as uuid } from 'uuid';
import { AiOutlinePlus,AiOutlineClose,AiFillPlusCircle } from 'react-icons/ai';
import { useRef } from 'react';
import { Formik } from 'formik';
import BlockSelectBox from '../Form/FormInputs/BlockSelectBox';
import TextBox from "../Form/FormInputs/TextBox";
import TextAreaInput from "../Form/FormInputs/TextAreaInput";
const expandedRowKeys = [1];

export default function GridListCustom({
    config = {},
    addMoreConfig = {},
    dataSource = [],
    columns = [],
    actionColumns = [],
    setGachaPrize = ()=>{}
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

    function onReorder(e) {
        const visibleRows = e.component.getVisibleRows();
        let sourceData = e.itemData;
        const newTasks = [...items];

        const toIndex = newTasks.findIndex((item) => item.ID === visibleRows[e.toIndex].data.ID);
        const fromIndex = newTasks.findIndex((item) => item.ID === e.itemData.ID);
    
        newTasks.splice(fromIndex, 1);
        newTasks.splice(toIndex, 0, e.itemData);
    
        setItems(newTasks);
        updateGachaPrize(newTasks);
    }

    // Add more button section
    function addNewItem(e, callBackFunc = () => {}) {
        const newItem = {
            ID: uuid(),
            gachaOrderNo: '',
            gachaPrice: "",
            gachaLabel:"",
            newItem: true
        };
        const newTasks = [...items,newItem];
        setItems(newTasks);
        updateGachaPrize(newTasks);
    }
    const addMoreButton = () => {
        if (buttonType === 'button') {
            const {
                buttonTitle = '',
                buttonIcon = (
                    <AiFillPlusCircle className="h-[22px] w-[22px] z-10 absolute pointer-events-none" style={{right:"60px"}} />
                ),
                handleOnClick = () => {},
            } = options || '';

            return (
                <div
                    className="mt-4 flex justify-end align-middle hover:bg-blue-400 relative items-center bg-blue-25
        !cursor-pointer text-blue-100 h-[32px]"
                >
                    {buttonIcon}
                    <button
                        type="button"
                        onClick={(e) => addNewItem(e, handleOnClick)}
                        className="mx-1 cursor-pointer"
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
    
    const removeField = (e,row) => {
        console.log('deleteable field', e)
        console.log('deleteable row', row)
        const newTasks = [...items];
        let filterItems = newTasks.filter(item=>item.ID!=row.ID);
        setItems(filterItems);
        updateGachaPrize(filterItems);
    };
    
    const updateGachaPrize = (e, row) => {
        const { name, value } = e.target || '';
        console.log('deleteable field', e)
        console.log('deleteable row', row)
        if(row){
            let newTasks = [...items];
            _.map(newTasks, x => x.ID === row.ID ? x.gachaPrice = value : x.gachaPrice = x.gachaPrice);
            
            console.log('newTasks',newTasks);
            setItems(newTasks);
            updateGachaPrize(newTasks);
        }
    };
   
    return (
        <>
            <DataGrid
                dataSource={items}
                showBorders={false}
                showColumnHeaders={false}
                showColumnLines={false}
                showRowLines={false}
        >
          <RowDragging
            allowReordering={true}
            onReorder={onReorder}
            showDragIcons={true}
          />
            <Column cellComponent={(data)=><TextBox name={data.data.key.ID} isDeletable={data.data.key.newItem} value={data.data.key.gachaPrice} wrapClass="relative" onChange={(e)=>updateGachaPrize(e,data.data.key)} label={`${data.data.key.gachaLabel}${data.data.key.gachaPrice}`} dataContent={data.data.key} labelClassName="drabgleLabel" inputClassName="w-full customDragAbleInput" deleteField={removeField} />}>
            
            </Column>
        </DataGrid>

            {allowAddMoreButton && addMoreButton()}
        </>
    );
}
