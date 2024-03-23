import * as React from "react";
const SVGComponent = (props) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 378.303 378.303"
    style={{
      enableBackground: "new 0 0 378.303 378.303",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <polygon
      style={{
        fill: "#E01329",
      }}
      stroke="#fff"
      strokeWidth={10}
      points="378.303,28.285 350.018,0 189.151,160.867 28.285,0 0,28.285 160.867,189.151 0,350.018  28.285,378.302 189.151,217.436 350.018,378.302 378.303,350.018 217.436,189.151 "
    />
  </svg>
);
export default SVGComponent;