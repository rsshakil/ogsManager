import React, { useRef, useState, useEffect, Suspense } from "react";
import Modal from 'react-modal'
import { useRecoilState, useRecoilValue } from "recoil";
import { recoilState } from "../../../store/recoilState";

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.50)",
        zIndex: '1001',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '1.5rem',
        border: 'none',
    }
};

const ImformationModal_test = () => {
    const [recoilStateValue, setRecoilState] = useRecoilState(recoilState);
    var text = "999";
    //　自身のブロックID
    const myCheckItemID = "a11223344";
    //  自身のブロックIDがチェック開始されたかかどうか見つめ続ける
    useEffect((text) => {
        //自身のブロックに何か起きた
        if(recoilStateValue.a11223344){
            //trueなのでチェックされたらしい
            text = "trueなのでチェックされたらしい";
            setRecoilState((prevState) => ({
                ...prevState,
                text: "ただいまの時間は"+new Date().toLocaleString(),
            }))
        }
    }, [recoilStateValue.a11223344]);

    function closeImformationModal() {
        setRecoilState((prevState) => ({
            ...prevState[0],
            [myCheckItemID] : false
        }))
    }
    return (
        <div>
            <Modal
                isOpen={recoilStateValue[myCheckItemID]}
                onRequestClose={closeImformationModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                    <p>今回トリガーを引いたIDは{recoilStateValue.testBlockId}</p>
                    <p>今回発火したIDは{myCheckItemID}</p>
                    <p>{recoilStateValue.text}</p>
                    <div className="flex flex-col justify-center items-centerv rounded-md divide-y">
                    <div className="flex items-center flex-row w-full bg-white p-0 divide-x">
                        <div className="
                            font-bold w-full text-xl text-black flex items-center justify-center align-middle bg-white
                            py-2 
                            px-5 
                            leading-6 cursor-pointer 
                            focus:bg-gray-200 
                            hover:bg-gray-200" onClick={closeImformationModal}>閉じる</div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ImformationModal_test;