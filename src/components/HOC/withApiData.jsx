import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from "recoil";
import _ from 'lodash';

import { allBlocksState } from '../../store/allBlocksState';
import { accessState } from '../../store/accessState';
import { fieldState } from '../../store/fieldState';
import { debugState } from '../../store/debugState';
import httpService from '../../restapi/httpService';
import * as queries from "../../restapi/queries";
import { GrandchildWrap } from '../molecules/GrandchildWrap';
import usePageLoader from '../../hooks/usePageLoader';
import useCsrfToken from '../../hooks/useCsrfToken';

const withApiData = (OriginalComponent, type = '', additionalSendData = {}) => {

    return (props) => {
        const location = useLocation();
        const ref = React.useRef();

        let { pathname } = location;
        pathname = pathname.substring(1);

        let endPoint = '';
        if (type == 'category') endPoint = queries.getEventCategory;
        else if (type == 'slot') endPoint = queries.getEventSlot;
        else if (type == 'item') endPoint = queries.getEventItem;
        else if (type == 'institute') endPoint = queries.getEventInstitute;

        const { appPageBlockId } = props.data;

        const [accessStateValue, setAcessState] = useRecoilState(accessState);
        const [fieldStateValue, setFieldState] = useRecoilState(fieldState);
        const [recoilDebugStateValue, setRecoilDebugState] = useRecoilState(debugState);
        const [eventData, setEventData] = useState(null);
        const { stopPageLoader } = usePageLoader(pathname);
        const { getCsrfToken } = useCsrfToken();

        const blockStates = useRecoilValue(allBlocksState)[appPageBlockId];
        const { blocks = [], blockWrapCustomClass, ifEmptyTargetField = '' } = blockStates;

        useEffect(() => {
            (async () => {
                try {
                    updateFieldState(ifEmptyTargetField, false);

                    //csrf token set
                    const csrf = getCsrfToken();

                    let sendData = {
                        ...accessStateValue,
                        ...fieldStateValue,
                    };
                    sendData.useTimeMachine = recoilDebugStateValue.useTimeMachine;
                    sendData.timeDifference = recoilDebugStateValue.timeDifference;
                    sendData.reservationCsrfToken = csrf;

                    if (!_.isEmpty(additionalSendData)) {
                        sendData = { ...sendData, ...additionalSendData }
                    }

                    if (type === 'institute') {
                        const { userLinkedInstitute = 1 } = blockStates;

                        sendData.eventCategoryId = fieldStateValue.selectEventCategoryId;
                        sendData.userLinkedInstitute = userLinkedInstitute;
                    }

                    const response = await httpService.post(queries.baseURL + endPoint, JSON.stringify(sendData));
                    const { data, status } = response;

                    if (status === 200) {
                        setEventDataState(data);
                    } else {
                        setEventDataState({ data: [] });
                    }
                }
                catch (err) {
                    console.log('error message ====0803====>', err);
                    setEventDataState({ data: [] });
                    stopPageLoader(pathname, appPageBlockId);
                }
            })();
        }, [location]);

        useEffect(() => {
            if (_.isObject(eventData) && _.isEmpty(eventData)) {
                stopPageLoader(pathname, appPageBlockId);
            }
        }, [eventData, appPageBlockId, pathname])


        const stopLoader = () => {
            stopPageLoader(pathname, appPageBlockId);
        }

        function setEventDataState(data = {}) {
            // console.log('looooooott >>>>', isObjectEmpty(data))
            // console.log('looooooott', data)
            if (isObjectEmpty(data)) {
                setEventData({});
                updateFieldState(ifEmptyTargetField, true);
            }
            else {
                setEventData(data);
            }
        }

        function updateFieldState(targetField, value) {
            if (targetField) {
                setFieldState((prevState) => ({
                    ...prevState,
                    [targetField]: {
                        ...prevState[targetField],
                        fieldValue: value,
                    }
                }))
            }
        }

        function isObjectEmpty(obj = {}) {
            let isEmpty = true;
            for (const [key, value] of Object.entries(obj)) {
                if (Array.isArray(value) && value.length > 0) return false;
                else if (typeof value === 'object' && !_.isEmpty(value)) return false;
                else if (!value) return false;
            }

            return isEmpty;
        }


        function handleOnSelect(data) {
            let info = [];
            let fieldStateKey = '';
            let isPresent = false;

            console.log('my check >>>>>> data', data)

            //Category: ---------------------
            isPresent = isMultiKeysPresentInObj(data, ['eventCategoryName', 'categoryName', 'eventCategoryId']);
            if (isPresent) {
                //categoryName
                if (data.hasOwnProperty('eventCategoryName') || data.hasOwnProperty('categoryName')) {
                    const categoryName = (data.hasOwnProperty('eventCategoryName') && data.eventCategoryName) ? data.eventCategoryName : data.categoryName;
                    fieldStateKey = 'reservationEventCategoryName';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, categoryName);
                }

                //eventCategoryId
                if (data.hasOwnProperty('eventCategoryId')) {
                    const eventCategoryId = data.eventCategoryId;
                    fieldStateKey = 'reservationEventCategoryId';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, eventCategoryId);

                    info['selectEventCategoryId'] = eventCategoryId;
                }
            }


            isPresent = isMultiKeysPresentInObj(data, ['mappingDate']);
            if (isPresent) {
                if (fieldStateValue["birthdayDatetime"] && fieldStateValue["birthdayDatetime"].fieldValue != "") {
                    const examinationDate = new Date(data.mappingDate * 1000); // 受診日 
                    let myBirthday = new Date(fieldStateValue["birthdayDatetime"].fieldValue * 1000) // 自分の誕生日
                    let y = myBirthday.getFullYear();
                    let m = myBirthday.getMonth();
                    let d = myBirthday.getDate();
                    let thisYearsBirthday = new Date(examinationDate.getFullYear(), m, d); // 受信日年の誕生日
                    let examinatgionAge = examinationDate.getFullYear() - y
                    if (examinationDate < thisYearsBirthday) examinatgionAge--;

                    fieldStateKey = 'examinationage';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, examinatgionAge);

                    // 受診日年齢奇数・偶数
                    fieldStateKey = 'examinationoddeven';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, ((examinatgionAge % 2) == 0) ? true : false);
                }
            }

            //Institute: ----------------------
            isPresent = isMultiKeysPresentInObj(data, ['instituteName', 'instituteCityName', 'instituteTownName', 'instituteAddressName', 'instituteBuilding', 'eventInstituteId', 'instituteZipCode', 'instituteTelNo']);
            if (isPresent) {
                //instituteName
                if (data.hasOwnProperty('instituteName')) {
                    const instituteName = data.instituteName;
                    fieldStateKey = 'reservationEventInstituteName';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, instituteName);
                }

                //instituteAddress
                if (isMultiKeysPresentInObj(data, ['instituteCityName', 'instituteTownName', 'instituteAddressName', 'instituteBuilding'])) {
                    const instituteAddress = data.instituteCityName + data.instituteTownName + data.instituteAddressName + data.instituteBuilding;
                    fieldStateKey = 'reservationEventInstituteAddress';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, instituteAddress);
                }

                //instituteNameAddress
                if (isMultiKeysPresentInObj(data, ['instituteName', 'instituteCityName', 'instituteTownName', 'instituteAddressName', 'instituteBuilding'])) {
                    const instituteNameAddress = data.instituteName + "（" + data.instituteCityName + data.instituteTownName + data.instituteAddressName + data.instituteBuilding + "）";
                    fieldStateKey = 'reservationEventInstituteNameAddress';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, instituteNameAddress);
                }

                //eventInstituteId
                if (data.hasOwnProperty('eventInstituteId')) {
                    const instituteId = data.eventInstituteId;
                    fieldStateKey = 'reservationEventInstituteId';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, instituteId);
                }

                //instituteZipCode
                if (data.hasOwnProperty('instituteZipCode')) {
                    const instituteZip = data.instituteZipCode;
                    fieldStateKey = 'reservationEventInstituteZipCode';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, instituteZip);
                }

                //instituteTelNo
                if (data.hasOwnProperty('instituteTelNo')) {
                    const instituteTelNo = data.instituteTelNo;
                    fieldStateKey = 'reservationEventInstituteTelNo';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, instituteTelNo);
                }
            }

            //Bus: ---------------------------
            isPresent = isMultiKeysPresentInObj(data, ['busStopName', 'busStopAddress', 'busTime', 'eventBusId']);
            if (isPresent) {
                //busStopName
                if (data.hasOwnProperty('busStopName')) {
                    const busStopName = data.busStopName;
                    fieldStateKey = 'reservationEventBusStopName';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, busStopName);
                }

                //busStopAddress
                if (data.hasOwnProperty('busStopAddress')) {
                    const busStopAddress = data.busStopAddress;
                    fieldStateKey = 'reservationEventBusStopAddress';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, busStopAddress);
                }

                //Bus time
                if (data.hasOwnProperty('busTime')) {
                    const busTime = data.busTime > 0 ? data.busTime : '';
                    fieldStateKey = 'reservationEventBusTime';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, busTime);
                }

                //Bus ID
                if (data.hasOwnProperty('eventBusId')) {
                    const eventBusId = data.eventBusId;
                    fieldStateKey = 'reservationEventBusId';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, eventBusId);
                }
            }

            //Delivery + Normal Slot: ---------------------------
            isPresent = isMultiKeysPresentInObj(data, ['mappingId', 'mappingDatetime', 'datetime', 'slotId']);
            if (isPresent) {
                //Mapping ID
                if (data.hasOwnProperty('mappingId')) {
                    const mappingId = data.mappingId;
                    fieldStateKey = 'reservationEventMappingId';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, mappingId);

                    info['selectEventMappingId'] = data.mappingId;
                }

                //ReservationReceiveDatetime ID
                if (data.hasOwnProperty('mappingDatetime')) {
                    const reservationReceiveDatetime = data.mappingDatetime;
                    fieldStateKey = 'reservationReceiveDatetime';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, reservationReceiveDatetime);
                }

                //ReservationExecutionTime ID
                if (data.hasOwnProperty('datetime')) {
                    const reservationExecutionTime = data.datetime > 0 ? data.datetime : '';
                    fieldStateKey = 'reservationExecutionTime';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, reservationExecutionTime);
                }

                //reservationAcceptanceStartTimeFrom ID
                if (data.hasOwnProperty('datetime')) {
                    const reservationAcceptanceStartTimeFrom = data.datetime > 0 ? data.datetime : '';
                    fieldStateKey = 'reservationAcceptanceStartTimeFrom';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, reservationAcceptanceStartTimeFrom);
                }

                //reservationAcceptanceStartTimeTo ID
                if (data.hasOwnProperty('datetime')) {
                    let reservationAcceptanceStartTimeTo;
                    console.log("data", data);
                    console.log("data.eventInstituteSlotStyle", data.eventInstituteSlotStyle);
                    console.log("data.eventInstituteSlotStyle.mappingInterval", data.eventInstituteSlotStyle.mappingInterval);

                    if (data.eventInstituteSlotStyle.mappingInterval) {
                        reservationAcceptanceStartTimeTo = data.datetime + Number(data.eventInstituteSlotStyle.mappingInterval);
                    }
                    else {
                        reservationAcceptanceStartTimeTo = 0;
                    }

                    reservationAcceptanceStartTimeTo = data.datetime > 0 ? reservationAcceptanceStartTimeTo : '';

                    fieldStateKey = 'reservationAcceptanceStartTimeTo';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, reservationAcceptanceStartTimeTo);
                }

                //ReservationEventSlotId ID
                if (data.hasOwnProperty('slotId')) {
                    const reservationEventSlotId = data.slotId;
                    fieldStateKey = 'reservationEventSlotId';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, reservationEventSlotId);
                }
            }

            //Item: ---------------------------
            isPresent = isMultiKeysPresentInObj(data, ['reservationItemContents', 'reservationItem', 'reservationItemId', 'reservationItemCost', 'reservationItemSlotId']);
            if (isPresent) {
                //ReservationItem Contents
                if (data.hasOwnProperty('reservationItemContents')) {
                    const reservationItemContents = data.reservationItemContents.join(",");
                    fieldStateKey = 'reservationItemContents';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, reservationItemContents);
                }

                //Reservation Items
                if (data.hasOwnProperty('reservationItem')) {
                    const reservationItem = data.reservationItem;
                    fieldStateKey = 'reservationItem';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, reservationItem);
                }

                //Reservation itemId
                if (data.hasOwnProperty('reservationItemId')) {
                    const reservationItemId = data.reservationItemId;
                    fieldStateKey = 'reservationItemId';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, reservationItemId);
                }

                //reservationItem Cost
                if (data.hasOwnProperty('reservationItemCost')) {
                    const reservationItemCost = data.reservationItemCost;
                    fieldStateKey = 'reservationItemCost';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, reservationItemCost);
                }

                //reservationItemSlotId
                if (data.hasOwnProperty('reservationItemSlotId')) {
                    const reservationItemSlotId = data.reservationItemSlotId;
                    fieldStateKey = 'reservationItemSlotId';
                    info[fieldStateKey] = generateFieldStateValue(fieldStateKey, reservationItemSlotId);
                }
            }

            console.log('is present  >>>>>', info)

            setFieldState((prevState) => ({
                ...prevState,
                ...info
            }));
        }


        function isMultiKeysPresentInObj(obj, keys = []) {
            return _.some(keys, _.partial(_.has, obj)) // return true if any key match from given keys in the obj otherwise return false
            // return _.every(keys, _.partial(_.has, obj)) // return true if all given keys are present in the obj otherwise return false
        }

        function generateFieldStateValue(fieldKey, newValue) {
            let key = fieldStateValue[fieldKey];
            let copyObject = Object.assign({}, key);
            copyObject.fieldValue = newValue;

            return copyObject;
        }


        return (
            <div ref={ref} data-id="blockWrapCustomClass" className={`overflow-visible break-all ${blockWrapCustomClass}`}>
                {(_.isObject(eventData) && !_.isEmpty(eventData)) && <OriginalComponent {...props} eventData={eventData} initialData={getInitialRecoilData(type)} handleActionOnSelect={handleOnSelect} stopLoader={stopLoader} />}

                {(_.isObject(eventData) && _.isEmpty(eventData)) && <div style={{ minHeight: '64px' }}><GrandchildWrap data={{ "subBlocks": blocks }}></GrandchildWrap></div>}
            </div>
        )
    }
}

export default withApiData;


function getInitialRecoilData(type) {
    let initialData = {};

    if (type == 'slot') {
        initialData = {
            "slotId": '',
            "mappingId": '',
            "mappingDate": '',
            "mappingDatetime": '',
            "datetime": '',

            "busStopName": "",
            "busStopAddress": "",
            "busTime": "",
            "eventBusId": '',

            "instituteName": "",
            "instituteZipCode": "",
            "institutePrefecture": "",
            "instituteCityName": "",
            "instituteTownName": "",
            "instituteAddressName": "",
            "instituteBuilding": "",
            "instituteTelNo": "",
            "eventInstituteSlotStyle": "",
        };
    }


    return initialData;
}