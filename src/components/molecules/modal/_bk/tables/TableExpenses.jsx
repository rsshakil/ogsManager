import React, { useRef, useState, useEffect, Suspense } from "react";
import { WorksHeader } from "../../atoms/TableRow/WorksHeader";
import { WorksRowOdd } from "../../atoms/TableRow/WorksRowOdd";
import { WorksRowEven } from "../../atoms/TableRow/WorksRowEven";
import { ExpensesHeader } from "../../atoms/TableRow/ExpensesHeader";
import { ExpensesRowOdd } from "../../atoms/TableRow/ExpensesRowOdd";
import { ExpensesRowEven } from "../../atoms/TableRow/ExpensesRowEven";



export const TableExpenses = ({imageUrl, customWrapClass, customImgClass}) => {
    let ColumnStyle = {gridTemplateColumns: `
    minmax(9rem,auto) 
    minmax(9rem,auto) 
    minmax(9rem,auto) 
    minmax(9rem,auto) 
    minmax(9rem,auto) 
    minmax(9rem,auto) 
    9rem
                                            `};

    return (
        <>
        <ExpensesHeader ColumnStyle={ColumnStyle} />
        <ExpensesRowOdd ColumnStyle={ColumnStyle} />
        <ExpensesRowEven ColumnStyle={ColumnStyle} />

        </>
    );
};
