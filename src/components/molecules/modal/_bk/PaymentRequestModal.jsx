import React, { useRef, useState, useEffect, Suspense } from "react";
import Modal from 'react-modal'
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../../store/modalState";
import { displayState } from "../../../store/displayState";

const customStyles = {
    overlay: {
        // position: "fixed",
        // top: 0,
        // left: 0,
        zIndex: 20,
        backgroundColor: "rgba(0,0,0,0.70)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        border: 'none',
        maxHeight: '100%',
    }
};

const PaymentRequestModal = () => {
    const [modalStateValue, setModalState] = useRecoilState(modalState);
    const [displayStateValue, setDisplayState] = useRecoilState(displayState);
    //  念の為全部閉じる
    function closeModal() {
        setModalState((prevState) => ({
            ...prevState,
            ExpensesModal : false,
            WorksModal : false,
            PaymentRequestModal: false,
            InvoiceModal: false,
            mode : "edit",
            data : {
              name : "",
              id : ''
              }
        }))
    }

    //  ページごとに使用するデータをスイッチする
    let mode;
    switch (modalStateValue.mode) {
        case 'edit':
            mode = '編集';
        break;
        case 'create':
            mode = '作成';
        break;
        default:
            //any
        break;
    }

    let labelClass = "text-black font-bold text-base pt-2 px-1 block flex";
    let h3Class = "border-l-8 border-arrow-green text-lg font-bold leading-6 text-black text-left py-2 px-2 flex";
    let blockClass = "w-full py-4";
    let gridTemplateColumns = {gridTemplateColumns: 'minmax(8rem,auto) 3.5rem 3.5rem 6rem 6rem 6rem'};
    return (
        <div>
            <Modal
                isOpen={modalStateValue.PaymentRequestModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="セラピスト様請求詳細"
            >
                <div id="modal-wrap" className="flex flex-col justify-center items-center shadow-xl shadow-black rounded-md divide-y px-4">
                    {/* 768以上で余白発生 */}
                    <div id="modal-contents" className="w-[calc(100vw_-_40px)] bg-white md:w-176">
                        <div id="modal-title" className="md:flex items-center justify-between">
                            <h2 className="w-full text-xl font-bold leading-6 text-black text-center py-2">{displayStateValue.pageName}期：{modalStateValue.data.name}様 請求管理</h2>
                        </div>
                        <div id="modal-body" className="flex flex-col bg-white md:min-h-[320px] sm:min-h-[180px] min-h-[120px]">
                            <div className={`${blockClass}`}>
                                <h3 className={`${h3Class}`}>管理者調整項目</h3>
                                    <label data-id="labelClass" for="" className={`${labelClass}`}>請求ステータス</label>
                                    <div className="">
                                        <select id="" className="w-full" aria-label="" name="" defaultValue="">
                                        <option value="1" hidden="">children</option>
                                        <option value="2" hidden="">children</option>
                                        <option value="3" hidden="">children</option>
                                        <option value="4" hidden="">children</option>
                                        </select>
                                    </div>
                                    <label data-id="labelClass" for="" className={`${labelClass}`}>管理者入力調整額</label>
                                    <div className="">
                                        <select id="" className="w-full" aria-label="" name="" defaultValue="">
                                        <option value="1" hidden="">children</option>
                                        <option value="2" hidden="">children</option>
                                        <option value="3" hidden="">children</option>
                                        <option value="4" hidden="">children</option>
                                        </select>
                                    </div>
                            </div>
                            <div className={`${blockClass}`}>
                                <h3 className={`${h3Class}`}>セラピスト単価設定<p className="font-normal text-sm my-auto">(アーカイブ済みの請求には影響しません)</p></h3>
                                    <label data-id="labelClass" for="" className={`${labelClass}`}>請求ステータス</label>
                                    <div className="">
                                        <select id="" className="w-full" aria-label="" name="" defaultValue="">
                                        <option value="1" hidden="">children</option>
                                        <option value="2" hidden="">children</option>
                                        <option value="3" hidden="">children</option>
                                        <option value="4" hidden="">children</option>
                                        </select>
                                    </div>
                                    <label data-id="labelClass" for="" className={`${labelClass}`}>管理者入力調整額</label>
                                    <div className="">
                                        <input className="w-full" type="text" placeholder="プレイスホルダー" />
                                    </div>
                            </div>
                            <div className={`${blockClass}`}>
                                <h3 className={`${h3Class}`}>セラピスト基本設定<p className="font-normal text-sm my-auto">(アーカイブ済みの請求には影響しません)</p></h3>
                                    <label data-id="labelClass" for="" className={`${labelClass}`}>登録番号</label>
                                    <div className="">
                                        <input className="w-full" type="text" placeholder="プレイスホルダー" />
                                    </div>
                                    <label data-id="labelClass" for="" className={`${labelClass}`}>銀行名</label>
                                    <div className="">
                                        <input className="w-full" type="text" placeholder="プレイスホルダー" />
                                    </div>
                                    <label data-id="labelClass" for="" className={`${labelClass}`}>支店名</label>
                                    <div className="">
                                        <input className="w-full" type="text" placeholder="プレイスホルダー" />
                                    </div>
                                    <label data-id="labelClass" for="" className={`${labelClass}`}>口座種別</label>
                                    <div className="">
                                        <select id="" className="w-full" aria-label="" name="" defaultValue="">
                                        <option value="1" hidden="">children</option>
                                        <option value="2" hidden="">children</option>
                                        <option value="3" hidden="">children</option>
                                        <option value="4" hidden="">children</option>
                                        </select>
                                    </div>
                                    <label data-id="labelClass" for="" className={`${labelClass}`}>口座番号</label>
                                    <div className="">
                                        <input className="w-full" type="text" placeholder="プレイスホルダー" />
                                    </div>
                                    <label data-id="labelClass" for="" className={`${labelClass}`}>口座名義</label>
                                    <div className="">
                                        <input className="w-full" type="text" placeholder="プレイスホルダー" />
                                    </div>
                            </div>
                            <div className={`${blockClass}`}>
                                <h3 className={`${h3Class}`}>リハビリテーション報酬</h3>
                                <div className="mt-2 divide-x divide-slate-400 grid border-2 border-black" style={gridTemplateColumns}>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 品目 ">品目</div>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 数量 ">数量</div>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 単位 ">単位</div>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 税込単価 ">税込単価</div>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 税込合計 ">税込合計</div>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 税別合計 ">税別合計</div>

                                    <div className="bg-arrow-gray-odd py-1 px-1 品目">リハビリテーション料</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 数量 font-DroidSans text-center">10</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 単位 text-center">時間</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税込単価 currency font-DroidSans">3,000</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans">30,000</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税別合計 currency font-DroidSans">27,273</div>


                                    <div className="bg-arrow-gray-even py-1 px-1 品目">訪問料</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 数量 font-DroidSans text-center">9</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 単位 text-center">回</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税込単価 currency font-DroidSans">1,500</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans">13,500</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税別合計 currency font-DroidSans">12,273</div>
                                </div>
                            </div>
                            <div className={`${blockClass}`}>
                                <h3 className={`${h3Class}`}>その他業務</h3>
                                <div className="mt-2 divide-x divide-slate-400 grid border-2 border-black" style={gridTemplateColumns}>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 品目 ">品目</div>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 数量 ">数量</div>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 単位 ">単位</div>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 税込単価 ">税込単価</div>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 税込合計 ">税込合計</div>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 税別合計 ">税別合計</div>

                                    <div className="bg-arrow-gray-odd py-1 px-1 品目">MTG</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 数量 font-DroidSans text-center">10</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 単位 text-center">時間</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税込単価 currency font-DroidSans">3,000</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans">30,000</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税別合計 currency font-DroidSans">27,273</div>


                                    <div className="bg-arrow-gray-even py-1 px-1 品目">撮影[通常]</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 数量 font-DroidSans text-center">9</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 単位 text-center">時間</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税込単価 currency font-DroidSans">1,500</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans">13,500</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税別合計 currency font-DroidSans">12,273</div>

                                    <div className="bg-arrow-gray-odd py-1 px-1 品目">撮影[特別]</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 数量 font-DroidSans text-center">10</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 単位 text-center">時間</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税込単価 currency font-DroidSans">3,000</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans">30,000</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税別合計 currency font-DroidSans">27,273</div>


                                    <div className="bg-arrow-gray-even py-1 px-1 品目">研修</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 数量 font-DroidSans text-center">9</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 単位 text-center">時間</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税込単価 currency font-DroidSans">1,500</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans">13,500</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税別合計 currency font-DroidSans">12,273</div>
                                </div>
                            </div>

                            <div className={`${blockClass}`}>
                                <h3 className={`${h3Class}`}>課税経費<p className="font-normal text-sm my-auto">(消費税or源泉税)</p></h3>
                                <div className="mt-2 divide-x divide-slate-400 grid border-2 border-black" style={gridTemplateColumns}>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 品目 col-span-4">品目</div>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 税込合計 ">税込合計</div>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 税別合計 ">税別合計</div>

                                    <div className="bg-arrow-gray-odd py-1 px-1 品目 col-span-4">走行距離</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans">30,000</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税別合計 currency font-DroidSans">27,273</div>


                                    <div className="bg-arrow-gray-even py-1 px-1 品目 col-span-4">立て替え</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans">13,500</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税別合計 currency font-DroidSans">12,273</div>

                                    <div className="bg-arrow-gray-odd py-1 px-1 品目 col-span-4">電車代</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans">30,000</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税別合計 currency font-DroidSans">27,273</div>

                                    <div className="bg-arrow-gray-even py-1 px-1 品目 col-span-4">駐車場</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans">13,500</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税別合計 currency font-DroidSans">12,273</div>
                                </div>
                            </div>
                            <div className={`${blockClass}`}>
                                <h3 className={`${h3Class}`}>非課税経費<p className="font-normal text-sm my-auto">(消費税and源泉税)</p></h3>
                                <div className="mt-2 divide-x divide-slate-400 grid border-2 border-black" style={gridTemplateColumns}>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 品目 col-span-4">品目</div>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 税込合計 col-span-2">合計</div>

                                    <div className="bg-arrow-gray-odd py-1 px-1 品目 col-span-4">立て替え</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans col-span-2">30,000</div>

                                    <div className="bg-arrow-gray-even py-1 px-1 品目 col-span-4">備品購入</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans col-span-2">13,500</div>

                                    <div className="bg-arrow-gray-odd py-1 px-1 品目 col-span-4">会員へ返金</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans col-span-2">30,000</div>

                                    <div className="bg-arrow-gray-even py-1 px-1 品目 col-span-4">手土産</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans col-span-2">13,500</div>
                                </div>
                            </div>
                            <div className={`${blockClass}`}>
                                <h3 className={`${h3Class}`}>集計</h3>
                                <div className="mt-2 divide-x divide-slate-400 grid border-2 border-black" style={gridTemplateColumns}>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 品目 col-span-4">科目</div>
                                    <div className="bg-arrow-blue-header text-white text-center font-bold 税込合計 col-span-2">合計</div>

                                    <div className="bg-arrow-gray-odd py-1 px-1 品目 col-span-4">リハビリテーション報酬</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans col-span-2">30,000</div>

                                    <div className="bg-arrow-gray-even py-1 px-1 品目 col-span-4">その他業務</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans col-span-2">13,500</div>

                                    <div className="bg-arrow-gray-odd py-1 px-1 品目 col-span-4">課税経費</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans col-span-2">30,000</div>

                                    <div className="bg-arrow-gray-even py-1 px-1 品目 col-span-4">源泉所得税</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans col-span-2">13,500</div>

                                    <div className="bg-arrow-gray-odd py-1 px-1 品目 col-span-4">非課税経費</div>
                                    <div className="bg-arrow-gray-odd py-1 px-1 税込合計 currency font-DroidSans col-span-2">13,500</div>

                                    <div className="bg-arrow-gray-even py-1 px-1 品目 col-span-4">管理者入力調整額</div>
                                    <div className="bg-arrow-gray-even py-1 px-1 税込合計 currency font-DroidSans col-span-2">13,500</div>
                                </div>
                            </div>
                            <div className={`${blockClass}`}>
                                <div className="my-4 grid border-b-2 border-black text-4xl font-bold" style={gridTemplateColumns}>
                                    <div className=" text-black text-left 品目 col-span-2 pl-8">合計請求額</div>
                                    <div className=" text-black text-right 税込合計 col-span-4 currency font-DroidSans pr-8">145,976</div>
                                </div>
                            </div>
                            <div className={`${blockClass}`}>
                                <h3 className={`${h3Class}`}>メモ</h3>
                                <div className="mt-2 ">
                                    <textarea className="w-full" placeholder="プレイスホルダー" name="" rows="8" cols="33"></textarea>
                                </div>
                            </div>




                        </div>
                    </div>
                    <div id="modal-footer" className="flex items-center flex-row w-full bg-white p-0 divide-x">
                        <div className="font-bold w-full text-xl text-black flex items-center justify-center align-middle bg-white py-2 px-5 leading-6 cursor-pointer focus:bg-gray-200 hover:bg-gray-200" onClick={closeModal}>閉じる</div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default PaymentRequestModal;