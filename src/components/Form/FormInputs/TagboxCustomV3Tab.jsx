import React, {useCallback, useEffect, useRef, useState} from "react";
import { useField, useFormikContext } from 'formik';
import _ from "lodash";
import {stringify, v4 as uuid} from 'uuid';
import http from "../../../restapi/httpService";
import PaginationTagbox from "../../ui/PaginationTagbox";
import AddRequiredText from "../../HelpingComponent/AddRequiredText";
import { useToast } from "../../../contexts/ToastContext";
import Loader from "../../atoms/Loading/TherapistLoader";
import {Button} from "devextreme-react/button";
import TagboxInput from "./TagboxInput";
import SelectBox from "./SelectBox";
import TagBox from "devextreme-react/tag-box";

const ITEMS_PER_PAGE = 300;

const tagConditionModeOptions = [
    { id: 'and', caption: "AND" },
    { id: 'or', caption: "OR" },
];

const tabData = [
    { key: 'videoTag', caption: "動画タグ" },
    { key: 'video', caption: "動画" },
];
export default function TagboxCustomV3({ isLoading, placeholder = "Select...", options = [], videoTags=[], initialData = [], initialServerSelectedDataDetails = [], grouped = false, valueExpr = "id", displayExpr = "caption", ondemandServiceUrl = "", bgGroupedColorMapper = {}, searchEnabled = false, setFieldValue, itemRender, label, wrapClass = "", labelClassName, inputClassName, isRequired, requiredText, keyUpdate = "", maxItemSelectLimit = undefined, ...rest }) {
    const formik = useFormikContext();
    const { showToast } = useToast();

    const tagRef = useRef(null);
    const tagListRef = useRef(null);
    const searchInputRef = useRef(null);
    const tagConditionModeRef = useRef(null);
    const scrollRef = useRef(null);
    const scrollPositionRef = useRef(undefined);
    const tagBoxWrapper = useRef(null);
    const selectedTagItemsRef = useRef([]);
    const tagItemCountSetRef = useRef(null);

    const [responseData, setResponseData] = useState([]);
    const [datasource, setDatasource] = useState([]);
    const [activeGroup, setActiveGroup] = useState("videoTag");
    const [selectedTags, setSelectedTags] = useState([]);
    const [isFetchingApi, setIsFetchingApi] = useState(false);
    //const [tagBoxSearchedValue, setTagBoxSearchedValue] = useState([]);
    const [searchPlaceholder, setSearchPlaceholder] = useState('Search...');

    // Pagination state
    const [page, setPage] = useState(undefined);
    const [totalRecordsCount, setTotalRecordsCount] = useState(0);
    const [popupImgUrl, setPopupImgUrl] = useState('');

    valueExpr = activeGroup=="video"?"videoId":"videoTagId";
    displayExpr = activeGroup=="video"?"videoName":"videoTagName";


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

    console.log('my field value -------------->>>>>>', fieldValue)
    console.log('my field initialData -------------->>>>>>', initialData)
    // console.log('my options options -------------->>>>>>options', options)

    //Update with initial data
    useEffect(() => {
        if (!isLoading && options.length > 0) {
            if (Array.isArray(fieldValue) && fieldValue.length > 0) {
                let selectedTagArray = [];
                let tagList = activeGroup=="video"?options:videoTags;
                if (Array.isArray(initialServerSelectedDataDetails) && initialServerSelectedDataDetails.length > 0) {
                    tagList = tagList.map(x => {
                        const findResult = initialServerSelectedDataDetails.find(i => i.key == x.key);

                        if (findResult) return { ...x, items: [x.items, ...findResult.items] }
                        else return x
                    })
                }

                if (grouped) tagList = _.flatMap(tagList, ({ items }) => items).filter(x => fieldValue.includes(x[valueExpr]));
                console.log("fieldValue",fieldValue);
                for (const tagId of fieldValue) {
                    if(typeof tagId=="string"){
                        const findItem = options.find(x => x.videoId == tagId);
                        if (findItem) selectedTagArray.push(findItem); 
                        const findItemVideoTag = videoTags.find(x => x.videoTagId == tagId);
                        if (findItemVideoTag) selectedTagArray.push(findItemVideoTag);
                    }else{
                        const findItem = options.find(x => x.videoId == `video-${tagId}`);
                        if (findItem) selectedTagArray.push(findItem);
                    }
                    
                }

                setSelectedTags(selectedTagArray);
            }

            let tagOptions = activeGroup=="video"?options:videoTags;
            let totalCount = activeGroup=="video"?options.length:videoTags.length;

            if (grouped) {
                let activeGroupKey = activeGroup;

                if (activeGroupKey == "") {
                    activeGroupKey = options[0]?.key;
                    setActiveGroup(activeGroupKey);
                }

                const { items = [], count = 0 } = options.find(x => x.key == activeGroupKey) || {};
                tagOptions = items;
                totalCount = count;
            }

            setDatasource(tagOptions);
            setTotalRecordsCount(totalCount);
            setResponseData(activeGroup=="video"?options:videoTags);
        }
    }, [isLoading,activeGroup])

    //Refetch when tab changed
    useEffect(() => {
        if (page !== undefined && grouped && activeGroup) {
            //reFetchApi();
            sessionStorage.removeItem("tagBoxCloseModal");
            sessionStorage.removeItem("tagBoxSearchedValue");
            handleSearch();
            setPopupImgUrl('');
        }
    }, [activeGroup])

    // Refetch when page changed
    useEffect(() => {
        if (page !== undefined) {
            reFetchApi();
        }
    }, [page])


    useEffect(() => {
        if (scrollRef.current && scrollPositionRef.current && scrollPositionRef.current !== undefined) {
            scrollRef.current.scrollTop = scrollPositionRef.current;
        }
    })

    //Custom listeners
    useEffect(() => {
        const toggleTagList = (e) => {
            if (e.target.classList.contains("dx-tag-remove-button") || e.target.classList.contains("dx-clear-button-area")) {
                return;
            }

            /*const getTopParent = (event) => {
                let target = event.target;
                while (target.parentNode) {
                    if (target.classList && target.classList.contains('custom-tagbox')) {
                        return target;
                    }
                    target = target.parentNode;
                }
            };*/

            /*const topParentEl = getTopParent(e);
            const childs = document.querySelectorAll('.list[style*="display: block"]');

            for (let child of childs) {
                if (!topParentEl.contains(child)) {
                    child.style.display = "none";
                }
            }*/

            // tagListRef.current.style.display = tagListRef.current.style.display === "block" ? "none" : "block";
        };

        // const displayTagList = (event) => tagListRef.current.style.display = "block";

        const collapseOpenedTagList = (event) => {
            const targetClassList = event.target.classList;
            // console.log("targetClassList", targetClassList)

            /*if (targetClassList.contains('tagBoxWrapper')) {
                console.log('tagBoxWrapper --->')
                searchInputRef.current.value = '';
                setActiveGroup('tag');
                sessionStorage.removeItem('tagBoxCloseModal');
            }*/

            /*if (
                targetClassList.contains("dx-tag-remove-button")
                || targetClassList.contains("dx-clear-button-area")
                || targetClassList.contains('paginate-btn')
                || targetClassList.contains('dx-button-content')
                || targetClassList.contains('dx-button-text')
                || targetClassList.contains('dx-list-item-content')
                || targetClassList.contains('dx-list-select-checkbox-container')
            ) {
                return;
            }*/

            if (targetClassList.contains("tagBoxWrapper")) {
                const customTagBoxes = document.querySelectorAll('.custom-tagbox');
                customTagBoxes.forEach(customTagBox => {
                    customTagBox?.classList.remove('openTagListSingleModal');
                })
                event.target.closest(".custom-tagbox")?.classList.add('openTagListSingleModal');
            }

            /*const childs = document.querySelectorAll('.list[style*="display: block"]');

            if ((event && !event.target.closest(".toggle") && !event.target.closest(".list")) || !event) {
                for (let child of childs) {
                    child.style.display = "none";
                }
            }*/
        };

        if (tagRef.current && tagListRef.current) tagRef.current.addEventListener("click", toggleTagList);
        //if (tagListRef.current) tagListRef.current.addEventListener("click", displayTagList);
        document.addEventListener("click", collapseOpenedTagList);

        return () => {
            if (tagRef.current) tagRef.current.removeEventListener("click", toggleTagList);
            //if (tagListRef.current) tagListRef.current.removeEventListener("click", displayTagList);
            //document.removeEventListener("click", collapseOpenedTagList);
        };
    }, []);

    /*useEffect(() => {
        handleSearch();
    }, [tagBoxSearchedValue])*/


    const reFetchApi = async (reserPageNo = false) => {
        console.log("ondemandServiceUrl",ondemandServiceUrl);
        if (ondemandServiceUrl) {
            const tagBoxSearchedValue = sessionStorage.getItem("tagBoxSearchedValue");
            setIsFetchingApi(true);
            const searchTagParams = {}
            if (tagBoxSearchedValue && JSON.parse(tagBoxSearchedValue).length > 0) {
                searchTagParams.tags = tagBoxSearchedValue;
                searchTagParams.groupKey = 'item';
            }
            else if (sessionStorage.getItem('tagBoxCloseModal')) {
                searchTagParams.groupKey = 'tag';
            }
            else {
                searchTagParams.groupKey = activeGroup;
            }

            if (tagConditionModeRef.current?.value) {
                searchTagParams.tagConditionMode = tagConditionModeRef.current?.value
            }
            const queryParams = _.pickBy({ skip: reserPageNo ? 0 : (page * 300), take: ITEMS_PER_PAGE, keyword: searchInputRef.current.value, ...searchTagParams }, (value) => value !== "" && value !== null && value !== undefined);

            const { data = [] } = await http.get('/manager' + ondemandServiceUrl, { params: queryParams });
            let { count = 0, items = [] } = data;

            setIsFetchingApi(false);
            scrollPositionRef.current = 0;

            setDatasource(items);
            setTotalRecordsCount(count);
        }
    }


    const updateFormikState = (selectedTags = []) => {
        let selectedTagIds = selectedTags.map(x => {
            if(x.type=="video"){
                return x.videoId;
            }else{
                return x.videoTagId;
            }
        });

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

    const handleOnAddTag = (e, tag) => {
        e.stopPropagation();

        if (maxItemSelectLimit !== undefined && selectedTags.length >= maxItemSelectLimit) {
            showToast('Maximum limit is encountered', 'warning');
            return;
        }

        if (scrollRef.current) {
            scrollPositionRef.current = scrollRef.current.scrollTop;
        }

        setSelectedTags(prevState => [...prevState, tag])

        let newStateVal = [...selectedTags, tag];
        updateFormikState(newStateVal);

        setTimeout(() => {
            if (tagBoxWrapper.current) {
                tagBoxWrapper.current.scrollTop = tagBoxWrapper.current.scrollHeight;
            }
        }, 0)
    };

    const popupImgShow = (e, tag) => {
        if (scrollRef.current) {
            scrollPositionRef.current = scrollRef.current.scrollTop;
            setPopupImgUrl(tag.itemImagePath1);
        }
    }

    const handleOnRemoveTag = (e, i, tag) => {
        e.stopPropagation();

        setSelectedTags((prevState) => prevState.filter((x, index) => index != i));
        let newStateVal = selectedTags.filter((x, index) => index != i);
        updateFormikState(newStateVal);
    };

    const handleOnClearAll = (e) => {
        e.stopPropagation();

        setSelectedTags([]);
        updateFormikState([]);
    };

    const handleOnTabChange = (e, tabKey) => {
        e.stopPropagation();
        setPage(0);
        setActiveGroup(tabKey);
        sessionStorage.removeItem("tagBoxSearchedValue");
        searchInputRef.current.value = '';
        if (tabKey === 'video') {
            setSearchPlaceholder('動画検索 （半角スペースを入力することで複数検索できます）');
        } else {
            setSearchPlaceholder('動画タグ名検索 （半角スペースを入力することで複数検索できます）');
        }
    };

    const handleOnPageChange = (e, pageNo) => {
        e.stopPropagation();
        setPage(pageNo);
    }

    const handleOnPressEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            handleSearch();
        }
    }

    const handleSearch = () => {
        if (ondemandServiceUrl) {
            reFetchApi(true);
            if (page != 0) setPage(0);

            return;
        }

        //Local search when not define ondemandServiceUrl
        const value = searchInputRef.current.value;
        let items = responseData;
        if (grouped) items = responseData[activeGroup]?.items || [];

        let filteredItems = items;
        if (value) {
            filteredItems = items.filter(x => x[displayExpr].toLowerCase().includes(value.toLowerCase()));
        }

        setDatasource(filteredItems);
        setTotalRecordsCount(filteredItems.length);
    }

    const handleTagConditionModeChange = (e) => {
        handleSearch();
    }

    const tagBoxSearchChanged = useCallback((e) => {
        const { value = [], previousValue = [] } = e || {};
        if (Array.isArray(value) && !_.isEqual(previousValue, value)) {
            console.log('my value --------------->', value)
            //setTagBoxSearchedValue(value);
            sessionStorage.setItem("tagBoxSearchedValue", JSON.stringify(value));
            handleSearch();
        }
    }, []);
    const TagContentTemplate = () => {
        return (
            <>
                {isFetchingApi && <Loader />}

                <div ref={scrollRef} className="dx-scrollable-container min-h-[300px]" style={{ overflowY: "auto" }} >
                    <div className="dx-scrollable-content">
                        <div className="text-left px-2 dx-scrollview-content">
                            {datasource.map((x, i) => (
                                <div
                                    key={uuid()}
                                    onClick={(e) => handleOnAddTag(e, x)}
                                    className="dx-item-custom dx-item dx-list-item dx-list-item-selected"
                                    role="option"
                                    aria-selected="true"
                                >
                                    {activeGroup === 'item' &&
                                        <span className="thumb-img-area"
                                            onMouseEnter={(e) => popupImgShow(e, x)}
                                            onMouseLeave={(e) => setPopupImgUrl('')}
                                        />
                                    }
                                    <div className="dx-item-content dx-list-item-content">
                                        {_.isFunction(itemRender) ? itemRender(x,i) : x[displayExpr]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    };

    const closeModal = () => {
        //console.log('closeModal....')
        const customTagBoxes = document.querySelectorAll('.custom-tagbox');
        customTagBoxes.forEach(customTagBox => {
            customTagBox.classList.remove('openTagListSingleModal');
        })
        sessionStorage.setItem("tagBoxCloseModal", true);
        searchInputRef.current.value = '';
        setActiveGroup('video');
        handleSearch();
    }


    function VideoTagCount ({tagItemCountSetRef,selectedTagList=[]}) {
        const [selectedVideoCount, setSelectedVideoCount] = useState(0);
        const [selectedVideoTagCount, setSelectedVideoTagCount] = useState(0);

        useEffect(() => {
            console.log("selectedTagList on counting",selectedTagList)
            if (selectedTagList.length > 0) {
                const videoCount = selectedTagList.filter(item => item.type=="video").length;
                setSelectedVideoCount(videoCount);

                const itemCount = selectedTagList.filter(item => item.type=="videoTag").length;
                setSelectedVideoTagCount(itemCount);
            }
        }, [selectedTagList]);

        return <span className="tag-box-label-count">動画タグ：{selectedVideoTagCount} 動画：{selectedVideoCount}</span>;
    }

    return (
        <div className="custom-tagbox relative w-full"
             onMouseEnter={(e) => setPopupImgUrl('')}
             onMouseLeave={(e) => setPopupImgUrl('')}
        >
            <div className="relative h-full">
                {activeGroup === 'item' && popupImgUrl &&
                    <div className="image-popup">
                        <img src={popupImgUrl} alt="" />
                    </div>
                }
                {label && (
                    <div className="tag-box-label-wrapper">
                        <label className={`${labelClassName} tag-box-label`} dangerouslySetInnerHTML={{ __html: label }}>
                            {isRequired ? <AddRequiredText requiredText={requiredText} /> : null}
                        </label>
                                        
                        <VideoTagCount tagItemCountSetRef={tagItemCountSetRef} selectedTagList={selectedTags}/>
                    </div>
                
                )}
                <div className="tagbox-middle-area">
                    <div ref={tagRef} className="!rounded-none toggle mb-3 dx-show-invalid-badge dx-tagbox dx-tagbox-only-select dx-selectbox dx-textbox dx-texteditor dx-editor-outlined dx-widget dx-tagbox-default-template dx-dropdowneditor dx-dropdowneditor-field-clickable dx-dropdowneditor-active dx-skip-gesture-event"  >
                        <div className="dx-dropdowneditor-input-wrapper dx-selectbox-container">
                            <div className="dx-texteditor-container dx-native-click">
                                <div
                                    ref={tagBoxWrapper}
                                    className="min-h-[37px] dx-texteditor-input-container dx-tag-container dx-native-click max-h-[138px] overflow-auto tagBoxWrapper"
                                >
                                    {selectedTags.map((x, i) => (
                                        <div className="dx-tag" key={uuid()}>
                                            <div style={{ backgroundColor: bgGroupedColorMapper[x.type] ? bgGroupedColorMapper[x.type] : '' }} className="dx-tag-content">
                                                <span>{x.type=="video"?x.videoName:x.videoTagName}</span>
                                                <div className="dx-tag-remove-button" onClick={(e) => handleOnRemoveTag(e, i, x)}></div>
                                            </div>
                                        </div>
                                    ))}

                                    {selectedTags.length == 0 && <div className="dx-placeholder">{placeholder}</div>}
                                </div>

                                {selectedTags.length > 0 && (
                                    <div className="dx-texteditor-buttons-container">
                                        <span onClick={handleOnClearAll} className="dx-clear-button-area flex align-middle items-center" >
                                            <span className="dx-icon dx-icon-clear pointer-events-none"></span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div ref={tagListRef}
                         className="custom-tagbox-list list list-closed dx-overlay-wrapper dx-dropdowneditor-overlay dx-popup-wrapper
                         dx-popup-cancel-visible dx-popup-done-visible dx-dropdownlist-popup-wrapper dx-selectbox-popup-wrapper dx-tagbox-popup-wrapper hidden"
                    >
                        <div className="dx-overlay-content dx-popup-normal dx-resizable w-full">
                            <div className="dx-popup-content">
                                <div className="dx-scrollable dx-scrollview dx-visibility-change-handler dx-scrollable-vertical dx-scrollable-simulated dx-list-select-decorator-enabled dx-list dx-widget dx-collection" style={{padding: "2px"}}>
                                    <div className="dx-scrollable-wrapper">
                                        {grouped && (
                                            <div className="tab space-x-5">
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
                                        )}

<div className="tab space-x-5">
                                                {tabData.map((x) => (
                                                    <button type="button"
                                                        key={uuid()}
                                                        className={`tablinks ${x.key == activeGroup ? 'active' : ''}`}
                                                        onClick={(e) => handleOnTabChange(e, x.key)}
                                                    >
                                                        {x.caption}
                                                    </button>
                                                ))}
                                            </div>

                                        <div className="w-full search-box px-2">
                                            <input ref={searchInputRef}
                                                   type="text"
                                                   name="keyword"
                                                   className="w-full"
                                                   placeholder={searchPlaceholder}
                                                   onKeyDown={handleOnPressEnter}
                                            />
                                        </div>

                                        {activeGroup === 'item' && <div className="w-full search-box px-2">
                                            <select name="tagConditionMode" className={`w-24 border text-black`} ref={tagConditionModeRef} onChange={handleTagConditionModeChange}>
                                                {
                                                    tagConditionModeOptions.map(x =>
                                                    <option key={x[valueExpr]} value={x[valueExpr]}>{x[displayExpr]}</option>)
                                                }
                                            </select>
                                            <TagBox
                                                className={`w-full !rounded-none ml-2`}
                                                dataSource={options.find(item => item.key == 'tag')?.items}
                                                valueExpr="tagId" // Specify the property to use as the value
                                                displayExpr="tagName" // Specify the property to display as the tag label
                                                placeholder="タグ検索"
                                                showSelectionControls={true}
                                                showClearButton={true}
                                                onValueChanged={tagBoxSearchChanged}
                                                wrapClass="w-full"
                                            />
                                        </div>}

                                        <TagContentTemplate />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dx-toolbar dx-widget dx-visibility-change-handler dx-collection dx-popup-bottom dx-popup-cancel dx-popup-done tagbox-footer-area" role="toolbar" >
                    <PaginationTagbox currentPage={page} handleOnPageChange={(e, pageNo) => handleOnPageChange(e, pageNo)} totalRecordsCount={totalRecordsCount} itemsPerPage={ITEMS_PER_PAGE} />
                    <Button
                        className='modal-button modal-close-btn'
                        text='閉じる'
                        type="button"
                        stylingMode="contained"
                        onClick={closeModal}
                    />
                </div>
            </div>
        </div>
    )
}