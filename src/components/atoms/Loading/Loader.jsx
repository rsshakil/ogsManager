import React, { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FadeLoader from "react-spinners/FadeLoader";
import RingLoader from "react-spinners/RingLoader";
import PuffLoader from "react-spinners/PuffLoader";

const Loader = ({ className }) => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#5e8eb2");
    return (
        <div id="Loader" className={`fixed top-0 right-0 left-0 bottom-0 ${className || "z-[9999]"}`}>
            <div className="flex top-0 right-0 left-0 bottom-0 justify-center items-center h-full w-screen bg-[#ffffff]">
                {/* <ClipLoader color={color} loading={loading} size={200} /> */}
                {/* <FadeLoader color={color} loading={loading} height={45} width={6} radius={20} margin={40} /> */}
                {/* <RingLoader color={color} loading={loading} size={120} margin={4} /> */}
                <PuffLoader color={color} loading={loading} size={120} />
            </div>
        </div>
    );
};

export default Loader;
