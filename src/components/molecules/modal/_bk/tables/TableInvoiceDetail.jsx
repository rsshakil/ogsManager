import React, { useRef, useState, useEffect, Suspense } from "react";

import { InvoiceDetailHeader } from "../../atoms/TableRow/InvoiceDetailHeader";
import { InvoiceDetailRowOdd } from "../../atoms/TableRow/InvoiceDetailRowOdd";
import { InvoiceDetailRowEven } from "../../atoms/TableRow/InvoiceDetailRowEven";



export const TableInvoiceDetail = ({imageUrl, customWrapClass, customImgClass}) => {
    let ColumnStyle = {gridTemplateColumns: `
        minmax(8rem,auto)

        minmax(4.5rem,auto) 
        2rem 
        minmax(6rem,auto)

        minmax(4.5rem,auto)
        2rem 
        minmax(6rem,auto)

        minmax(4.5rem,auto)
        2rem 
        minmax(6rem,auto)

        minmax(5rem,auto)
        minmax(5rem,auto)
        minmax(6rem,auto)
        9.5rem
    `};

    return (
        <>
        <InvoiceDetailHeader ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceDetailRowEven ColumnStyle={ColumnStyle} />






        </>
    );
};
