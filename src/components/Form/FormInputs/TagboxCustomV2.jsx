import { useEffect, useRef, useState } from "react";
import { useField, useFormikContext } from 'formik';
import _ from "lodash";
import { v4 as uuid } from 'uuid';
import http from "../../../restapi/httpService";
import PaginationTagbox from "../../ui/PaginationTagbox";
import AddRequiredText from "../../HelpingComponent/AddRequiredText";
import { useToast } from "../../../contexts/ToastContext";
import Loader from "../../atoms/Loading/TherapistLoader";

const ITEMS_PER_PAGE = 300;

export default function TagboxCustomV2({ isLoading, placeholder = "Select...", options = [], initialData = [], initialServerSelectedDataDetails = [], grouped = false, valueExpr = "id", displayExpr = "caption", ondemandServiceUrl = "", bgGroupedColorMapper = {}, searchEnabled = false, searchPlaceholder = "Search...", setFieldValue, itemRender, label, wrapClass = "", labelClassName, inputClassName, isRequired, requiredText, keyUpdate = "", maxItemSelectLimit = undefined, ...rest }) {
    const formik = useFormikContext();
    const { showToast } = useToast();

    const tagRef = useRef(null);
    const tagListRef = useRef(null);
    const searchInputRef = useRef(null);
    const scrollRef = useRef(null);
    const scrollPositionRef = useRef(undefined);

    const [responseData, setResponseData] = useState([]);
    const [datasource, setDatasource] = useState([]);
    const [activeGroup, setActiveGroup] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [isFetchingApi, setIsFetchingApi] = useState(false);

    // Pagination state
    const [page, setPage] = useState(undefined);
    const [totalRecordsCount, setTotalRecordsCount] = useState(0);


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

    // console.log('my field value -------------->>>>>>', fieldValue)
    // console.log('my options options -------------->>>>>>options', options)

    //Update with initial data
    useEffect(() => {
        if (!isLoading && options.length > 0) {
            if (Array.isArray(fieldValue) && fieldValue.length > 0) {
                let selectedTagArray = [];
                let tagList = options;

                if (Array.isArray(initialServerSelectedDataDetails) && initialServerSelectedDataDetails.length > 0) {
                    tagList = tagList.map(x => {
                        const findResult = initialServerSelectedDataDetails.find(i => i.key == x.key);

                        if (findResult) return { ...x, items: [x.items, ...findResult.items] }
                        else return x
                    })
                }

                if (grouped) tagList = _.flatMap(tagList, ({ items }) => items).filter(x => fieldValue.includes(x[valueExpr]));

                for (const tagId of fieldValue) {
                    const findItem = tagList.find(x => x[valueExpr] == tagId);
                    if (findItem) selectedTagArray.push(findItem);
                }

                setSelectedTags(selectedTagArray);
            }

            let tagOptions = options;
            let totalCount = options.length;

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
            setResponseData(options);
        }
    }, [isLoading])

    //Refetch when tab changed
    useEffect(() => {
        if (page !== undefined && grouped && activeGroup) {
            reFetchApi();
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

            const getTopParent = (event) => {
                let target = event.target;
                while (target.parentNode) {
                    if (target.classList && target.classList.contains('custom-tagbox')) {
                        return target;
                    }
                    target = target.parentNode;
                }
            };

            const topParentEl = getTopParent(e);
            const childs = document.querySelectorAll('.list[style*="display: block"]');

            for (let child of childs) {
                if (!topParentEl.contains(child)) {
                    child.style.display = "none";
                }
            }

            tagListRef.current.style.display = tagListRef.current.style.display === "block" ? "none" : "block";
        };

        const displayTagList = (event) => tagListRef.current.style.display = "block";

        const collapseOpenedTagList = (event) => {
            const targetClassList = event.target.classList;

            if (targetClassList.contains("dx-tag-remove-button") || targetClassList.contains("dx-clear-button-area") || targetClassList.contains('paginate-btn')) {
                return;
            }

            const childs = document.querySelectorAll('.list[style*="display: block"]');

            if ((event && !event.target.closest(".toggle") && !event.target.closest(".list")) || !event) {
                for (let child of childs) {
                    child.style.display = "none";
                }
            }
        };

        if (tagRef.current && tagListRef.current) tagRef.current.addEventListener("click", toggleTagList);
        if (tagListRef.current) tagListRef.current.addEventListener("click", displayTagList);
        document.addEventListener("click", collapseOpenedTagList);

        return () => {
            if (tagRef.current) tagRef.current.removeEventListener("click", toggleTagList);
            if (tagListRef.current) tagListRef.current.removeEventListener("click", displayTagList);
            document.removeEventListener("click", collapseOpenedTagList);
        };
    }, []);


    const reFetchApi = async (reserPageNo = false) => {
        if (ondemandServiceUrl) {
            setIsFetchingApi(true);

            const queryParams = _.pickBy({ skip: reserPageNo ? 0 : (page * 300), take: ITEMS_PER_PAGE, groupKey: activeGroup, keyword: searchInputRef.current.value }, (value) => value !== "" && value !== null && value !== undefined);

            const { data = [] } = await http.get('/manager' + ondemandServiceUrl, { params: queryParams });
            let { count = 0, items = [] } = data;

            setIsFetchingApi(false);
            scrollPositionRef.current = 0;

            setDatasource(items);
            setTotalRecordsCount(count);
        }
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
    };

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


    const TagContentTemplate = () => {
        return (
            <>
                {isFetchingApi && <Loader />}

                <div ref={scrollRef} className="dx-scrollable-container max-h-96 " style={{ overflowY: "auto" }} >
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
                                    <div className="dx-item-content dx-list-item-content">
                                        {_.isFunction(itemRender) ? itemRender(x) : x[displayExpr]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    };


    return (
        <div className="custom-tagbox relative w-full">
            {label && (
                <label className={`${labelClassName}`} dangerouslySetInnerHTML={{ __html: label }}>
                    {isRequired ? <AddRequiredText requiredText={requiredText} /> : null}
                </label>
            )}

            <div ref={tagRef} className="!rounded-none toggle mb-3 dx-show-invalid-badge dx-tagbox dx-tagbox-only-select dx-selectbox dx-textbox dx-texteditor dx-editor-outlined dx-widget dx-tagbox-default-template dx-dropdowneditor dx-dropdowneditor-field-clickable dx-dropdowneditor-active dx-skip-gesture-event"  >
                <div className="dx-dropdowneditor-input-wrapper dx-selectbox-container">
                    <div className="dx-texteditor-container dx-native-click">
                        <div className="min-h-[37px] dx-texteditor-input-container dx-tag-container dx-native-click">
                            {selectedTags.map((x, i) => (
                                <div className="dx-tag" key={uuid()}>
                                    <div style={{ backgroundColor: bgGroupedColorMapper[x.type] ? bgGroupedColorMapper[x.type] : '' }} className="dx-tag-content">
                                        <span>{x[displayExpr]}</span>
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

            <div ref={tagListRef} className="custom-tagbox-list list list-closed dx-overlay-wrapper dx-dropdowneditor-overlay dx-popup-wrapper dx-popup-cancel-visible dx-popup-done-visible dx-dropdownlist-popup-wrapper dx-selectbox-popup-wrapper dx-tagbox-popup-wrapper" >
                <div className="dx-overlay-content dx-popup-normal dx-resizable w-full">
                    <div className="dx-popup-content">
                        <div className="dx-scrollable dx-scrollview dx-visibility-change-handler dx-scrollable-vertical dx-scrollable-simulated dx-list-select-decorator-enabled dx-list dx-widget dx-collection" >
                            <div className="dx-scrollable-wrapper">
                                <div className="w-full search-box">
                                    <input ref={searchInputRef}
                                        type="text"
                                        name="keyword"
                                        className="w-full"
                                        placeholder={searchPlaceholder}
                                        onKeyDown={handleOnPressEnter}
                                    />
                                </div>

                                {grouped && (
                                    <div className="tab space-x-5">
                                        {responseData.map((x) => (
                                            <button type="button"
                                                ke={uuid()}
                                                className={`tablinks ${x.key == activeGroup ? 'active' : ''}`}
                                                onClick={(e) => handleOnTabChange(e, x.key)}
                                            >
                                                {x.caption}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <TagContentTemplate />
                            </div>
                        </div>
                    </div>

                    <div className="dx-toolbar dx-widget dx-visibility-change-handler dx-collection dx-popup-bottom dx-popup-cancel dx-popup-done" role="toolbar" >
                        <PaginationTagbox currentPage={page} handleOnPageChange={(e, pageNo) => handleOnPageChange(e, pageNo)} totalRecordsCount={totalRecordsCount} itemsPerPage={ITEMS_PER_PAGE} />
                    </div>
                </div>
            </div>
        </div>
    )
}