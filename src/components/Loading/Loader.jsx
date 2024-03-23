import { useState } from "react";
import RingLoader from "react-spinners/RingLoader";

const Loader = ({ className }) => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#5e8eb2");
    return (
        <div className={`fixed top-0 right-0 left-0 bottom-0 ${className || "z-[9999]"}`}>
            <div className="flex top-0 right-0 left-0 bottom-0 justify-center items-center h-screen w-screen bg-transparent">
                
                <RingLoader color={color} loading={loading} size={128} margin={2} /> 
            </div>
        </div>
    );
};

export default Loader;
