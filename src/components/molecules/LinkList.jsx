import React from "react";
import { Link } from "react-router-dom";

// import { useNavigate } from 'react-router-dom';

export const LinkList = () => {
    return (
        <>        
        <h3 ><span>-LinkList-</span></h3>
        <ul className="flex flex-row gap-4">
        <li><Link to="/payment-request">▶︎payment-request</Link></li>
        <li><Link to="/payment-request-detail">▶︎payment-request-detail</Link></li>
        <li><Link to="/invoice">▶︎invoice</Link></li>
        <li><Link to="/invoice-detail">▶︎invoice-detail</Link></li>
        <li><Link to="/expenses">▶︎expenses</Link></li>
        <li><Link to="/works">▶︎works</Link></li>
        </ul>
        </>
    );
};


