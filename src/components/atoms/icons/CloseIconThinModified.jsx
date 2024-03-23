import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width="32px"
    height="32px"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      style={{
        fill: "#E01329",
        stroke: "#fff",
        strokeWidth: 10,
      }}
      d="M 20,4 3,21 33,50 3,80 20,97 49,67 79,97 95,80 65,50 95,20 80,4 50,34 z"
    />
  </svg>
);
export default SVGComponent;