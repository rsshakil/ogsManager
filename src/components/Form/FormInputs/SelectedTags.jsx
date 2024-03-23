import React, {useEffect, useImperativeHandle, useRef, useState} from "react";
import {v4 as uuid} from 'uuid';
import {useToast} from "../../../contexts/ToastContext";

export default function SelectedTags (
    {
        placeholder,
        bgGroupedColorMapper,
        selectedTagsRef,
        maxItemSelectLimit,
        selectedItems,
        initialServerSelectedDataDetails,
        tags,
        detailLoading,
        initLoading,
        getSelectedTags,
        onRemoveTag
    }
) {
    const { showToast } = useToast();
    const tagBoxWrapperRef = useRef(null);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        setSelectedTags([]);
        if (selectedItems?.length > 0 && (tags.length > 0 || initialServerSelectedDataDetails.length > 0)) {
            let tagList = [];
            let itemList = [];
            selectedItems.forEach(selectedItem => {
                if (selectedItem.startsWith("tag-")) {
                    const targetTag = tags.find(tag => tag.id == selectedItem);
                    if (targetTag !== undefined) {
                        tagList.push(targetTag);
                    }
                } else if (selectedItem.startsWith("item-")) {
                    const targetItem = initialServerSelectedDataDetails.find(item => item.id == selectedItem);
                    if (targetItem !== undefined) {
                        itemList.push(targetItem);
                    }
                }
            })
            setSelectedTags(prevState => [...tagList, ...itemList]);
        }
    }, [detailLoading, initLoading]);

    useEffect(() => {
        if (selectedTags) {
            getSelectedTags(selectedTags);
        }
    }, [selectedTags])

    useImperativeHandle(selectedTagsRef, () => ({
        handleTagAdd(tagData) {
            console.log("child function", tagData);
            if (maxItemSelectLimit !== undefined && selectedTags.length >= maxItemSelectLimit) {
                showToast('Maximum limit is encountered', 'warning');
                return;
            }
            setSelectedTags(prevState => [...prevState, tagData])
            setTimeout(() => {
                if (tagBoxWrapperRef.current) {
                    tagBoxWrapperRef.current.scrollTop = tagBoxWrapperRef.current.scrollHeight;
                }
            }, 0)
        }
    }));

    const handleOnRemoveTag = (e, i, tag) => {
        e.stopPropagation();

        const newSelectedTags = selectedTags.filter((x, index) => index != i);
        setSelectedTags(newSelectedTags);
        onRemoveTag(newSelectedTags);
    };

    const handleOnClearAll = (e) => {
        e.stopPropagation();

        setSelectedTags([]);
        onRemoveTag([]);
    };

    return (
        <div
            ref={selectedTagsRef}
            className="!rounded-none toggle mb-3 dx-show-invalid-badge dx-tagbox dx-tagbox-only-select dx-selectbox dx-textbox dx-texteditor dx-editor-outlined dx-widget dx-tagbox-default-template dx-dropdowneditor dx-dropdowneditor-field-clickable dx-dropdowneditor-active dx-skip-gesture-event">
            <div className="dx-dropdowneditor-input-wrapper dx-selectbox-container">
                <div className="dx-texteditor-container dx-native-click">
                    <div
                        ref={tagBoxWrapperRef}
                        className="min-h-[37px] dx-texteditor-input-container dx-tag-container dx-native-click tagBoxWrapper"
                    >
                        {selectedTags && selectedTags.map((x, i) => (
                            <div className="dx-tag" key={uuid()}>
                                <div
                                    style={{backgroundColor: bgGroupedColorMapper[x.type] ? bgGroupedColorMapper[x.type] : ''}}
                                    className="dx-tag-content">
                                    <span>{x.type === 'tag' ? x.tagName : [x.itemName, x.itemAttribute3, x.itemAttribute4, x.itemAttribute5, x.tagCount].filter(v => !!v).join('')}</span>
                                    <div className="dx-tag-remove-button"
                                        onClick={(e) => handleOnRemoveTag(e, i, x)}
                                    >

                                    </div>
                                </div>
                            </div>
                        ))}

                        {selectedTags.length === 0 && <div className="dx-placeholder">{placeholder}</div>}
                    </div>

                    {selectedTags.length > 0 && (
                        <div className="dx-texteditor-buttons-container">
                            <span
                                onClick={handleOnClearAll} className="dx-clear-button-area flex align-middle items-center"
                            >
                                <span className="dx-icon dx-icon-clear pointer-events-none"></span>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}