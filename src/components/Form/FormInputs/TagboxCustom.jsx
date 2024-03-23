import TagBox from 'devextreme-react/tag-box';
import _ from "lodash";
import _debounce from 'lodash/debounce';
import React, { useEffect, useRef } from 'react';
import { useField, useFormikContext } from 'formik';
import AddRequiredText from '../../HelpingComponent/AddRequiredText';

//In this tagbox same option can be choose multiple times as you need.
export default function TagboxCustom({ dataSource = [], initialData = [], valueExpr = "id", displayExpr = "caption", grouped = false, bgGroupedColorMapper = {}, searchEnabled = false, setFieldValue, label, wrapClass = "", labelClassName, inputClassName, isRequired, requiredText, keyUpdate = "", ...rest }) {
    const formik = useFormikContext();
    const tagBoxRef = useRef(null);
    const tagBoxComponentRef = useRef(null);

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

    const fieldValue = field.value || [];

    // console.log('current data is : >>>>>>', fieldValue)

    useEffect(() => {
        let eventListeners = [];

        if (tagBoxRef.current) {
            const tagContainerElement = tagBoxRef.current._element.querySelector('.dx-tag-container');
            const textEditorInputElement = tagContainerElement.querySelector('.dx-texteditor-input');

            // clean-up old tags
            var childrenToRemove = tagContainerElement.getElementsByClassName('dx-tag');
            while (childrenToRemove.length > 0) {
                tagContainerElement.removeChild(childrenToRemove[0]);
            }

            //Add new tags
            if (fieldValue.length > 0) {
                let tags = [];
                if (grouped) tags = _.flatMap(dataSource, ({ items }) => items).filter(x => fieldValue.includes(x[valueExpr]));
                else tags = dataSource.filter(x => fieldValue.includes(x[valueExpr]));
                // console.log('aaaaalll tags >>>>', tags)
                for (let i = 0; i < fieldValue.length; i++) {
                    const tag = tags.find(x => fieldValue[i] == x[valueExpr]);

                    if (tag) {
                        const html = renderTag(tag, i);
                        // console.log('my html >>>>>>>>>>>>>', html)
                        let newNode = document.createTextNode(html);
                        if (html) {
                            newNode = document.createElement('div');
                            newNode.className = 'dx-tag';
                            newNode.innerHTML = html;
                        }

                        const removeButton = newNode.querySelector('.dx-tag-remove-button-custom');
                        const listener = removeButton.addEventListener('click', handleOnRemoveTag);

                        tagContainerElement.insertBefore(newNode, textEditorInputElement);
                        eventListeners.push(listener);
                    }
                }
            }
        }

        return () => {
            if (eventListeners.length > 0) {
                for (let listener of eventListeners) {
                    listener?.removeEventListener('click', handleOnRemoveTag);
                }
            }
        }
    }, [fieldValue, dataSource])

    useEffect(() => {
        let removeAllListener;

        //Add clear-all listener
        if (tagBoxRef.current) {
            const clearAllElement = tagBoxRef.current._element.querySelector('.dx-clear-button-area');
            if (clearAllElement) {
                removeAllListener = clearAllElement.addEventListener('click', (e) => handleOnRemoveTag(e, true));
            }
        }

        return () => {
            if (removeAllListener) removeAllListener.removeEventListener('click', (e) => handleOnRemoveTag(e, true));
        }
    }, [])


    const handleItemClick = (item) => {
        //For array-object type field
        if (Array.isArray(initialData)) {
            setFieldValue(fieldName, [...fieldValue, item[valueExpr]]);
        }
        else if (typeof initialData === 'object') {
            const { values = {} } = formik || {};

            let updatedState = values[field.name] || [];
            if (updatedState[indexNo]) {
                updatedState[indexNo][keyUpdate] = [...fieldValue, item[valueExpr]];
            }

            setFieldValue(field.name, updatedState);
        }
    };


    const handleOnInitialized = (e) => {
        e.component.registerKeyHandler('enter', (e) => {
            const selectedItem = e.component.option('selectedItem');
            if (selectedItem) {
                handleItemClick(selectedItem);
            }
        });
    }

    const handleOnClickItem = (e) => {
        handleItemClick(e.itemData);
    }


    const handleOnRemoveTag = (e, allRemove = false) => {
        e.stopPropagation();

        let updatedIds = [];
        if (!allRemove) {
            //Remove from index
            const dataIndex = e.target.getAttribute('data-index');
            updatedIds = [...fieldValue];
            updatedIds.splice(dataIndex, 1);
        }

        if (Array.isArray(initialData)) {
            setFieldValue(fieldName, updatedIds);
        }
        else if (typeof initialData === 'object') {
            const { values = {} } = formik || {};

            let updatedState = values[field.name] || [];
            console.log('my check >>> 1', updatedState)
            if (updatedState[indexNo]) {
                updatedState[indexNo][keyUpdate] = updatedIds;
            }

            setFieldValue(field.name, updatedState);
        }

        if (allRemove) {
            removeUnnecessaryCheckboxed();
        }
    }


    const renderTag = (tag, i) => {
        const html = `<div class="dx-tag-content" style="background-color: ${bgGroupedColorMapper[tag?.type] ? bgGroupedColorMapper[tag.type] : '#ddd'}">
                        <span>${tag[displayExpr]}</span>
                        <div data-index=${i} class="dx-tag-remove-button-custom"></div>
                    </div>`
        return html;
    }


    const handleTagBoxOpened = (e) => {
        console.log('myyyyyyyyyyyyyyyyyyyyyy eeeeeeeeeeeeee', e)
        tagBoxComponentRef.current = e.component;
        removeUnnecessaryCheckboxed();

        //Add searchbox
        if (searchEnabled) {
            const searchContainerElement = e.component._popup?._$wrapper[0].querySelector('.dx-overlay-content');
            // console.log('loppppppppppppppppppp>>>>>>>>>>', searchContainerElement)

            const filterTagList = (keyword = '') => {
                const taglistElements = searchContainerElement.querySelectorAll('.dx-list-item-content');

                if (keyword) {
                    for (let el of taglistElements) {
                        let targetElement;

                        if (!grouped) targetElement = el;
                        else targetElement = el.querySelector('span');

                        if (targetElement) {
                            const tagName = targetElement.innerText;
                            if (!tagName.toLowerCase().includes(keyword.toLowerCase())) {
                                el.style.display = 'none';
                            }
                        }
                    }
                }
                else {
                    const searchInputElement = searchContainerElement.querySelector('.dx-tagbox-custom-search-input');
                    if (searchInputElement) {
                        searchInputElement.value = '';
                    }

                    for (let el of taglistElements) {
                        el.style.display = 'block';
                    }
                }
            }

            if (searchContainerElement && !searchContainerElement.contains(searchContainerElement.querySelector('.dx-tagbox-custom-search-input-container'))) {
                const insertBeforeElement = searchContainerElement.querySelector('.dx-popup-content');

                let newSearchInputNode = document.createElement('div');
                newSearchInputNode.className = 'dx-tagbox-custom-search-input-container';
                newSearchInputNode.innerHTML = `<input type="text" name="searchKeywords" class="dx-tagbox-custom-search-input w-full text-black my-2" placeholder="Search..." />`;

                searchContainerElement.insertBefore(newSearchInputNode, insertBeforeElement);

                const searchInputElement = newSearchInputNode.querySelector('.dx-tagbox-custom-search-input');
                const debouncedSearch = _debounce((e) => filterTagList(e.target.value), 300); // 300 milliseconds debounce delay
                const searchInputListener = searchInputElement.addEventListener('input', debouncedSearch);
            }
            else if (searchContainerElement) {
                filterTagList('');
            }
        }
    };

    const removeUnnecessaryCheckboxed = () => {
        //To hide controll option checkboxed
        if (tagBoxComponentRef.current) {
            const parentElement = tagBoxComponentRef.current._popup?._$content;
            const selectAllElement = parentElement[0].querySelector('.dx-list-select-all')
            let checkboxElements = parentElement[0].querySelectorAll('.dx-list-select-checkbox-container') || [];
            // console.log('my rrrrrrrrrrrrrrrrrrrrrr -> checkboxElements', checkboxElements)
            if (selectAllElement) selectAllElement.style.display = "none";

            for (let el of checkboxElements) {
                el.style.display = "none";
            }
        }
    }



    return (
        <div className={`${wrapClass} custom-tagbox`}>
            {label && (
                <label className={`${labelClassName}`} dangerouslySetInnerHTML={{ __html: label }}>
                    {isRequired ? <AddRequiredText requiredText={requiredText} /> : null}
                </label>
            )}

            <TagBox
                ref={tagBoxRef}
                className={`${inputClassName} !rounded-none`}
                dataSource={dataSource}
                valueExpr={valueExpr} // Specify the property to use as the value
                displayExpr={displayExpr} // Specify the property to display as the tag label
                grouped={grouped}
                showSelectionControls={true}
                value={field.value}
                tagRender={() => { }}
                showClearButton={true}
                searchEnabled={false}
                onInitialized={handleOnInitialized}
                onItemClick={handleOnClickItem}
                onOpened={handleTagBoxOpened}

                {...rest}
                {...field}
            />
        </div>
    )
}