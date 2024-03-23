import React from 'react';
import Modal from 'react-modal'
// import { useNavigate } from 'react-router-dom';
// import InsuranceCardImg from "../atoms/img/InsuranceCardImg.png";

const customStyles = {
    overlay: {
        // position: "fixed",
        // top: 0,
        // left: 0,
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
    }
};

export const  BaseModalBK = () => {
    // var subtitle;
    // const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const img = new Image();
	// img.src = InsuranceCardImg;

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    return (

        <div>
            <p onClick={openModal} className="text-red-600 font-bold underline hover:opacity-75 text-right">保険証の「記号」「番号」がわからない方はこちらからご確認ください</p>
            {/* <button onClick={openModal} type="submit" className="font-bold mt-6 w-full bg-blue-800 border border-transparent rounded-md py-2 px-5 flex items-center justify-center text-base text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-blue-400">予約をキャンセル</button> */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="flex flex-col justify-center items-center shadow-xl shadow-black rounded-md divide-y">
                    {/* 768以上で余白発生 */}
                    <div className="w-[calc(100vw_-_40px)] bg-white md:w-176">
                        <div className="md:flex items-center justify-between">
                            <h2 className="w-full text-xl font-bold leading-6 text-black text-center py-2 px-5 ">健康保険証</h2>
                        </div>
                        <div className="flex justify-end bg-white md:min-h-[320px] sm:min-h-[180px] min-h-[120px]">
                            {/* <img className="m-1 bg-white h-[auto] w-full" src={InsuranceCardImg} alt="" /> */}
                        </div>
                    </div>
                    <div className="flex items-center flex-row w-full bg-white p-0 divide-x">
                        <div className="font-bold w-full text-xl text-black flex items-center justify-center align-middle bg-white py-2 px-5 leading-6 cursor-pointer focus:bg-gray-200 hover:bg-gray-200" onClick={closeModal}>閉じる</div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

// export default BaseModal;