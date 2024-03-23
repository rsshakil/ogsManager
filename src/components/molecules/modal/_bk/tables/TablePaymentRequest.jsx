import React, { useRef, useState, useEffect, Suspense } from "react";
import { InvoiceRowOdd } from "../../atoms/TableRow/InvoiceRowOdd";
import { InvoiceRowEven } from "../../atoms/TableRow/InvoiceRowEven";
import { PaymentRequestHeader } from "../../atoms/TableRow/PaymentRequestHeader";
import { PaymentRequestRowOdd } from "../../atoms/TableRow/PaymentRequestRowOdd";
import { PaymentRequestRowEven } from "../../atoms/TableRow/PaymentRequestRowEven";



export const TablePaymentRequest = ({imageUrl, customWrapClass, customImgClass}) => {
    let ColumnStyle = {gridTemplateColumns: `
                                            minmax(7rem,auto)
                                            minmax(5rem,auto) 
                                            minmax(5rem,auto) 
                                            minmax(5rem,auto) 
                                            minmax(6.5rem,auto) 
                                            minmax(6.5rem,auto) 
                                            minmax(6.5rem,auto) 
                                            minmax(6.5rem,auto) 
                                            minmax(6.5rem,auto) 
                                            minmax(6.5rem,auto) 
                                            minmax(6.5rem,auto) 
                                            `};

    return (
        <>
        <PaymentRequestHeader ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowOdd ColumnStyle={ColumnStyle}/>
        <PaymentRequestRowEven ColumnStyle={ColumnStyle}/>





        </>
    );
};
