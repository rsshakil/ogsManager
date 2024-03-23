import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";
import { debugState } from "../../store/debugState";
import { H3 } from "../atoms/text/H3";

const intervalInSec = 60;

export const TimeMachine = () => {
    const location = useLocation();
    // Time machine start**************************************
    const interval = useRef(null);
    const [recoilDebugStateValue, setRecoilDebugState] = useRecoilState(debugState)

    useEffect(() => {
        setRecoilDebugState((prevState) => ({
            ...prevState
        }))

    }, [location])

    useEffect(() => {
        if (recoilDebugStateValue.useTimeMachine) {
            let fakeTimestamp = new Date(recoilDebugStateValue.fakeTime);

            // interval.current = setInterval(() => initiateTimeMachine(fakeTimestamp), intervalInSec * 1000);

        } else {
            const fakeDateTime = new Date();
            
            setRecoilDebugState((prevState) => ({
                ...prevState,
                timeDifference: 0,
                fakeTime: fakeDateTime
            }))

            clearInterval(interval.current);
        }

        // ... 👇 Clean up here with the interval on unmount
        return () => clearInterval(interval.current);

    }, [recoilDebugStateValue.useTimeMachine])

    function handleOnChangeTimeMachine(e) {
        const name = e.target.name;

        if (name === 'useTimeMachine') {
            setRecoilDebugState((prevState) => ({
                ...prevState,
                timeDifference: +e.target.checked ? generateTimeDiff(new Date(recoilDebugStateValue.fakeTime)) : 0,
                [name]: e.target.checked
            }))

        } else {
            const fakeDateTime = new Date(e.target.value);

            setRecoilDebugState((prevState) => ({
                ...prevState,
                timeDifference: generateTimeDiff(fakeDateTime),
                fakeTime: fakeDateTime.toLocaleString()
            }))
        }
    }

    function initiateTimeMachine(timeValue = 0) {
        let fakeTimestamp = timeValue;
        fakeTimestamp.setSeconds(fakeTimestamp.getSeconds() + intervalInSec); //60 seconds extra added

        const diff = generateTimeDiff(fakeTimestamp);

        setRecoilDebugState((prevState) => ({
            ...prevState,
            fakeTime: new Date(fakeTimestamp).toLocaleString(),
            timeDifference: diff,
        }))
    }

    function generateTimeDiff(fakeTimestamp) {

console.log("fakeTimestamp ====== ", fakeTimestamp);

        const currentTimestamp = new Date(new Date().toLocaleString());

        const unixTimestampfake = Math.floor(fakeTimestamp.getTime() / 1000);
        const unixTimestampCurrent = Math.floor(currentTimestamp.getTime() / 1000);

        // console.log('time f', fakeTimestamp)
        // console.log('time fake--: ', unixTimestampfake)
        // console.log('time pCurrent: ', unixTimestampCurrent)

        // const diff = unixTimestampfake - unixTimestampCurrent;
        // console.log('time diff--: ', diff)


        // return diff;
        return unixTimestampfake;
    }

    function getFormattedDate(date) {
        let dt = new Date(new Date(date).toLocaleString());

        const y = dt.getFullYear();
        const m = (dt.getMonth() + 1).toString().padStart(2, '0');
        const d = dt.getDate().toString().padStart(2, '0');

        var h = dt.getHours().toString().padStart(2, '0');
        var min = dt.getMinutes().toString().padStart(2, '0');
        var s = dt.getSeconds().toString().padStart(2, '0');

        const modifiedDate = [y, m, d].join('-');
        const modifiedTime = [h, min, s].join(':');
        // const modifiedTime = [h, min].join(':');


        // console.log('extracted date', modifiedDate)
        // console.log('extracted hour', h)
        // console.log('extracted min', min)
        // console.log('extracted sec', s)

        return modifiedDate + 'T' + modifiedTime
    }
    // Time machine end****************

    return (
        <>
            {/* Time mechine start */}
            <H3 >
                <span>現在の日時を強制変更</span>{"  "}
                <input
                    id="useTimeMachine"
                    name="useTimeMachine"
                    type="checkbox"
                    className="focus:ext-green-600 m-2 text-green-500 border-gray-300 rounded scale-150"
                    onChange={handleOnChangeTimeMachine}
                    checked={recoilDebugStateValue.useTimeMachine}
                />
            </H3>
            <input
                name="timeValue"
                className="text-4xl w-full placeholder-gray-500" type="datetime-local"
                value={getFormattedDate(new Date(recoilDebugStateValue.fakeTime))}
                onChange={handleOnChangeTimeMachine}
                step="1"
            />
            {/* Time mechine end */}
        </>
    );
};
