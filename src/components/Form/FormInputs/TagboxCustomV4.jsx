import React, {useEffect, useImperativeHandle, useRef, useState} from "react";
import { useField, useFormikContext } from 'formik';
import AddRequiredText from "../../HelpingComponent/AddRequiredText";
import {Button} from "devextreme-react/button";
import {MenuButtonSub} from "../../atoms/buttons/MenuButtonSub";
import TagItemList from "./TagItemList";
import SelectedTags from "./SelectedTags";

export default function TagboxCustomV4({
    detailLoading,
    initLoading,
    tagLoading,
    itemLoading,
    placeholder = "Select...",
    initialData = [],
    initialServerSelectedDataDetails = [],
    valueExpr = "id",
    displayExpr = "caption",
    ondemandServiceUrl = "",
    bgGroupedColorMapper = {},
    searchEnabled = false,
    setFieldValue,
    itemRender,
    label,
    wrapClass = "",
    labelClassName,
    inputClassName,
    isRequired,
    requiredText,
    keyUpdate = "",
    maxItemSelectLimit = undefined,
    tags,
    tagDataSource,
    itemDataSource,
    selectedItems,
    ...rest
}) {
    const formik = useFormikContext();
    const selectedTagsRef = useRef(null);
    const selectedTagItemsRef = useRef([]);
    const tagDataGridRef = useRef(null);
    const itemDataGridRef = useRef(null);
    const popupImgUrlRef = useRef(null);
    const tagItemCountSetRef = useRef(null);
    const [activeGroup, setActiveGroup] = useState("tag");

    let [field] = useField(rest);
    const { name: fieldName } = field || {};

    let indexNo = -1;
    //check the field is array type or not
    if (/\[.*\]/.test(fieldName)) {
        const match = fieldName.match(/^(.*?)\[\d+\]/);
        const extractedName = match[1];

        const matche2 = /\[(\d+)\]/.exec(fieldName);
        indexNo = matche2[1];

        field.name = extractedName;
        field.value = initialData[keyUpdate];
    }
    else {
        field.value = initialData;
    }


    const updateFormikState = (selectedTags = []) => {
        let selectedTagIds = selectedTags.map(x => x[valueExpr]);

        //For array-object type field
        if (Array.isArray(initialData)) {
            setFieldValue(fieldName, selectedTagIds);
        }
        else if (typeof initialData === 'object') {
            const { values = {} } = formik || {};

            let updatedState = values[field.name] || [];
            if (updatedState[indexNo]) {
                updatedState[indexNo][keyUpdate] = selectedTagIds;
            }

            setFieldValue(field.name, updatedState);
        }
    }

    const handleOnTabChange = (e, tabKey) => {
        e.stopPropagation();
        console.log("tabKey -->", tabKey)
        setActiveGroup(tabKey);
        resetTable(tagDataGridRef);
        resetTable(itemDataGridRef);
    };

    function resetTable(dataGridRef) {
        if (dataGridRef.current) {
            const dataGrid = dataGridRef.current.instance;
            dataGrid.refresh(true);
        }
    }

    const closeModal = () => {
        const selectedTags = selectedTagItemsRef.current;
        if (selectedTags) {
            updateFormikState(selectedTags);
        }

        //console.log('closeModal....')
        const customTagBoxes = document.querySelectorAll('.custom-tagbox');
        customTagBoxes.forEach(customTagBox => {
            customTagBox.classList.remove('openTagListSingleModal');
        })
        sessionStorage.setItem("tagBoxCloseModal", true);
        setActiveGroup('tag');
        if (tagDataGridRef.current) {
            tagDataGridRef.current.instance.clearFilter();
        }
    }

    const handleOnRemoveTag = (selectedTags) => {
        updateFormikState(selectedTags);
    }

    function TagItemCount ({tagItemCountSetRef}) {
        const [selectedTagCount, setSelectedTagCount] = useState(0);
        const [selectedItemCount, setSelectedItemCount] = useState(0);

        const selectedTags = selectedTagItemsRef.current;

        useEffect(() => {
            if (selectedTags.length > 0) {
                const tagCount = selectedTags.filter(item => item.id.startsWith("tag-")).length;
                setSelectedTagCount(tagCount);

                const itemCount = selectedTags.filter(item => item.id.startsWith("item-")).length;
                setSelectedItemCount(itemCount);
            }
        }, [selectedTags])

        useImperativeHandle(tagItemCountSetRef, () => ({
            handleTagItemCountSet(selectedTags) {
                console.log('selectedTags====>', selectedTags)
                if (selectedTags.length > 0) {
                    const tagCount = selectedTags.filter(item => item.id.startsWith("tag-")).length;
                    setSelectedTagCount(tagCount);

                    const itemCount = selectedTags.filter(item => item.id.startsWith("item-")).length;
                    setSelectedItemCount(itemCount);
                }
            }
        }));

        return <span className="tag-box-label-count">アイテム：{selectedItemCount} タグ：{selectedTagCount}</span>;
    }

    const getSelectedTags = (selectedTags) => {
        console.log(selectedTags, 'selectedTags')
        selectedTagItemsRef.current = selectedTags;
        setTimeout(() => {
            tagItemCountSetRef.current?.handleTagItemCountSet(selectedTags);
        }, 2000)
    }

    const onRowClick = (e) => {
        selectedTagsRef.current.handleTagAdd(e.data);
    }

    const chooseColumns = (e) => {
        e.preventDefault();
        if (tagDataGridRef.current) {
            tagDataGridRef.current.instance.hideColumnChooser();
            tagDataGridRef.current.instance.showColumnChooser();
        }
        if (itemDataGridRef.current) {
            itemDataGridRef.current.instance.hideColumnChooser();
            itemDataGridRef.current.instance.showColumnChooser();
        }
    }

    function PopupImage ({popupImgUrlRef}) {
        const [popupImgUrl, setPopupImgUrl] = useState('');

        useImperativeHandle(popupImgUrlRef, () => ({
            handleImageSrcSet(imgPath) {
                if (imgPath) {
                    setPopupImgUrl(imgPath);
                } else {
                    setPopupImgUrl("");
                }
            }
        }));
        return (
            <>
                {activeGroup === 'item' && popupImgUrl &&
                    <div className="image-popup">
                        <img src={popupImgUrl} alt="" />
                    </div>
                }
            </>
        );
    }

    const onCellHoverChanged = (e) => {
        //console.log('onCellHoverChanged e ', e)
        const { column, data, eventType, rowType } = e;
        popupImgUrlRef.current.handleImageSrcSet(null);
        if (rowType === 'data' && column.dataField === 'itemImagePath1') {
            if(eventType === 'mouseover') {
                //setPopupImgUrl(data.itemImagePath1);
                popupImgUrlRef.current.handleImageSrcSet(data.itemImagePath1);
            }
        }
    }

    return (
        <div className="custom-tagbox relative w-full">
            <div className="relative h-full">
                <PopupImage popupImgUrlRef={popupImgUrlRef}/>
                {label && (
                    <div className="tag-box-label-wrapper">
                        <label className={`${labelClassName} tag-box-label`} dangerouslySetInnerHTML={{__html: label}}>
                            {isRequired ? <AddRequiredText requiredText={requiredText}/> : null}
                        </label>
                        <TagItemCount tagItemCountSetRef={tagItemCountSetRef} />
                        {/*<span className="tag-box-label-count">アイテム：{selectedItemCount} タグ：{selectedTagCount}</span>*/}
                        <span className="tag-box-choose-columns">
                            <MenuButtonSub className="ml-2 max-w-[80px] min-w-[80px]" onClick={chooseColumns}>
                                <i className="dx-icon dx-icon-column-chooser"></i>
                            </MenuButtonSub>
                        </span>
                    </div>
                )}
                <div className="tagbox-middle-area">
                    <SelectedTags
                        placeholder={placeholder}
                        bgGroupedColorMapper={bgGroupedColorMapper}
                        selectedTagsRef={selectedTagsRef}
                        maxItemSelectLimit={maxItemSelectLimit}
                        selectedItems={selectedItems}
                        initialServerSelectedDataDetails={initialServerSelectedDataDetails}
                        tags={tags}
                        detailLoading={detailLoading}
                        initLoading={initLoading}
                        getSelectedTags={getSelectedTags}
                        onRemoveTag={handleOnRemoveTag}
                    />
                    <TagItemList
                        activeGroup={activeGroup}
                        tagDataSource={tagDataSource}
                        itemDataSource={itemDataSource}
                        tags={tags}
                        tagDataGridRef={tagDataGridRef}
                        itemDataGridRef={itemDataGridRef}
                        handleOnTabChange={handleOnTabChange}
                        onRowClick={onRowClick}
                        onCellHoverChanged={onCellHoverChanged}
                    />
                </div>

                <div className="dx-toolbar dx-widget dx-visibility-change-handler dx-collection dx-popup-bottom dx-popup-cancel dx-popup-done tagbox-footer-area" role="toolbar" >
                    <Button
                        className='modal-button modal-close-btn'
                        text='このモーダルを閉じる'
                        type="button"
                        stylingMode="contained"
                        onClick={closeModal}
                    />
                </div>
            </div>
        </div>
    )
}