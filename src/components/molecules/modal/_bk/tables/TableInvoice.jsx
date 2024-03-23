import React, { useRef, useState, useEffect, Suspense } from "react";
import { WorksHeader } from "../../atoms/TableRow/WorksHeader";
import { WorksRowOdd } from "../../atoms/TableRow/WorksRowOdd";
import { WorksRowEven } from "../../atoms/TableRow/WorksRowEven";
import { ExpensesHeader } from "../../atoms/TableRow/ExpensesHeader";
import { ExpensesRowOdd } from "../../atoms/TableRow/ExpensesRowOdd";
import { ExpensesRowEven } from "../../atoms/TableRow/ExpensesRowEven";
import { InvoiceHeader } from "../../atoms/TableRow/InvoiceHeader";
import { InvoiceRowOdd } from "../../atoms/TableRow/InvoiceRowOdd";
import { InvoiceRowEven } from "../../atoms/TableRow/InvoiceRowEven";

export const TableInvoice = ({imageUrl, customWrapClass, customImgClass}) => {
    let ColumnStyle = {gridTemplateColumns: `
        minmax(7.5rem,auto)
        minmax(5rem,auto) 
        minmax(5rem,auto) 
        minmax(5rem,auto) 
        minmax(6.5rem,auto) 
        minmax(6.5rem,auto) 
        minmax(6rem,auto) 

    `};

    return (
        <>
        <InvoiceHeader ColumnStyle={ColumnStyle} />
        <InvoiceRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceRowEven ColumnStyle={ColumnStyle} />
        <InvoiceRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceRowEven ColumnStyle={ColumnStyle} />
        <InvoiceRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceRowEven ColumnStyle={ColumnStyle} />
        <InvoiceRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceRowEven ColumnStyle={ColumnStyle} />
        <InvoiceRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceRowEven ColumnStyle={ColumnStyle} />
        <InvoiceRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceRowEven ColumnStyle={ColumnStyle} />
        <InvoiceRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceRowEven ColumnStyle={ColumnStyle} />
        <InvoiceRowOdd ColumnStyle={ColumnStyle} />
        <InvoiceRowEven ColumnStyle={ColumnStyle} />






        </>
    );
};
