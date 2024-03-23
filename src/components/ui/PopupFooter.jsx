import { useState } from "react";
import { Button } from "devextreme-react/button";

export default function PopupFooter({ clone, isSubmitting}) {


    return (
        <>
            <div>
                <Button
                    className='w-full mt-20 modal-button'
                    text={`${clone ? '複製' : '保存'}`}
                    type="submit"
                    stylingMode="contained"
                    useSubmitBehavior={true}
                    disabled={isSubmitting}
                />
            </div>
        </>
    )
}