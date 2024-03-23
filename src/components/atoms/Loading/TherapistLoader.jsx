import React, { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FadeLoader from "react-spinners/FadeLoader";
import RingLoader from "react-spinners/RingLoader";
import PuffLoader from "react-spinners/PuffLoader";
import './loaderStyle.css'  
const TherapistLoader = ({ className, top='50%' }) => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#5e8eb2");
    return (
        <div id="gifSpinner" className="sk-circle" align="center" style={{transform:"translate(-50%, -50%)", left: '50%',right: '50%',margin:'0 auto',position:'absolute',zIndex:'9999',filter:"brightness(10.5)"}}>
                    <div className="sk-circle1 sk-child"></div>
                    <div className="sk-circle2 sk-child"></div>
                    <div className="sk-circle3 sk-child"></div>
                    <div className="sk-circle4 sk-child"></div>
                    <div className="sk-circle5 sk-child"></div>
                    <div className="sk-circle6 sk-child"></div>
                    <div className="sk-circle7 sk-child"></div>
                    <div className="sk-circle8 sk-child"></div>
                    <div className="sk-circle9 sk-child"></div>
                    <div className="sk-circle10 sk-child"></div>
                    <div className="sk-circle11 sk-child"></div>
                    <div className="sk-circle12 sk-child"></div>
</div>
    );
};

export default TherapistLoader;
