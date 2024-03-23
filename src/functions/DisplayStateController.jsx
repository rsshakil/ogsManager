import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { displayState } from "../../src/store/displayState";
import { useLocation } from "react-router-dom";




export const DisplayStateController = (props) => {
    const { isSpinerStart, toggleCheckbox, PageTitle, stepState } = props;
	const location = useLocation();
    const navigate = useNavigate();

    //recoilStateValueからqrのsetDisplayStateを取り出し
	const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    //propsで渡されてこない時は現状から取得して再セット
    const IsSpinerStart = isSpinerStart ? isSpinerStart : displayStateValue.isSpinerStart;
    const ToggleCheckbox = toggleCheckbox ? toggleCheckbox : displayStateValue.toggleCheckbox;
    const Pagetitle = PageTitle ? PageTitle : displayStateValue.PageTitle;
    const StepState = stepState ? stepState : displayStateValue.stepState;




    useEffect(() => {
    setDisplayState((oldsetDisplayState) => (
        {
            ...oldsetDisplayState,
            isSpinerStart: IsSpinerStart,
            toggleCheckbox: ToggleCheckbox,
            PageTitle: Pagetitle,
        }
        ));
    },[location]);
    return ;
};

