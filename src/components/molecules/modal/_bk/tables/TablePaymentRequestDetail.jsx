import React, { useRef, useState, useEffect, Suspense } from "react";
import { InvoiceRowOdd } from "../../atoms/TableRow/InvoiceRowOdd";
import { InvoiceRowEven } from "../../atoms/TableRow/InvoiceRowEven";
import { PaymentRequestHeader } from "../../atoms/TableRow/PaymentRequestHeader";
import { PaymentRequestRowOdd } from "../../atoms/TableRow/PaymentRequestRowOdd";
import { PaymentRequestRowEven } from "../../atoms/TableRow/PaymentRequestRowEven";
import { PaymentRequestDetailHeader } from "../../atoms/TableRow/PaymentRequestDetailHeader";
import { PaymentRequestDetailRowOdd } from "../../atoms/TableRow/PaymentRequestDetailRowOdd";
import { PaymentRequestDetailRowEven } from "../../atoms/TableRow/PaymentRequestDetailRowEven";



export const TablePaymentRequestDetail = ({imageUrl, customWrapClass, customImgClass}) => {
    //　columnの構造がその他業務の設定具合で変わるのでTailWindを使わないで構造を操作する
    //　APIからカラムの構成を受け取る必要がある
    let ColumnStyle = {gridTemplateColumns: `
                                            2rem
                                            minmax(4.5rem,auto) 
                                            minmax(9rem,auto) 

                                            3.75rem
                                            2rem 
                                            4.75rem

                                            3.75rem
                                            2rem 
                                            4.75rem

                                            3.75rem
                                            2rem  
                                            4.75rem

                                            3.75rem
                                            2rem  
                                            4.75rem

                                            3.75rem
                                            2rem  
                                            4.75rem

                                            3.75rem
                                            2rem  
                                            4.75rem
                                            
                                            3.75rem
                                            2rem  
                                            4.75rem

                                            3.75rem
                                            2rem  
                                            4.75rem

                                            minmax(5rem,8rem)

                                            4.5rem
                                            4.5rem
                                            4.5rem

                                            5rem
                                            5rem

                                            4.5rem 
                                            4.5rem
                                            4.5rem

                                            minmax(5rem,8rem)

                                            8.75rem
                                            `};
    return (
        <>
        <PaymentRequestDetailHeader ColumnStyle={ColumnStyle}/>
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowOdd ColumnStyle={ColumnStyle} />
        <PaymentRequestDetailRowEven ColumnStyle={ColumnStyle} />

        {/* <PaymentRequestRowEven /> */}
        </>
    );
};
