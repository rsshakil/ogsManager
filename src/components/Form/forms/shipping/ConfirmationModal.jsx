
import { Button } from "devextreme-react/button";
import { useEffect, useRef, useState } from "react";
import { useToast } from "../../../../contexts/ToastContext";
import http from "../../../../restapi/httpService";
import Loader from "../../../atoms/Loading/TherapistLoader";



export default function ConfirmationModal({ 
    userShippingInfo,
    shippingStatus,
    closeModal,
    isModalOpen,
    tableRef,
    confirmAction = ()=>{},
    cancelAction = ()=>{},
    confirmationMessage=""
 }) {
    const { showToast } = useToast();
    const dataGridRef = useRef(null);
    console.log("modal component fire");
    const [confirmButtonStatus, setConfirmButtonStatus] = useState(false);

    useEffect(()=>{
        console.log("isModalOpen",isModalOpen);
    },[isModalOpen])

    useEffect(()=>{
        console.log("isModalOpen true",isModalOpen);
        setConfirmButtonStatus(false);
    },[userShippingInfo])
    return (
        <>
                <div className="flex flex-col items-center justify-center h-full gachaFormAuthWrapper">
                    <div>{confirmationMessage}</div>
                    <Button
                        className='w-full modal-button'
                        text="はい"
                        disabled={confirmButtonStatus}
                        onClick={(e)=>{
                            setConfirmButtonStatus(true);
                            confirmAction(userShippingInfo,shippingStatus);
                        }}
                    />
                    {/* for display two button besides */}
                    {/* <div className="flex flex-wrap w-full p-2 items-center commnButtonAreaPosition justify-center">
                            
                        <div className="w-1/2 p-2">
                            <Button
                                className='w-full commnButtonStyle'
                                text="閉じる"
                                onClick={cancelAction}
                            />
                        </div>
                        <div className="w-1/2 p-2">
                            <Button
                                className='w-full commnButtonStyle'
                                text="はい"
                                onClick={(e)=>confirmAction(userShippingInfo,shippingStatus)}
                            />
                             
                        </div>
                    </div> */}
                    
                </div>
        </>
    )
}