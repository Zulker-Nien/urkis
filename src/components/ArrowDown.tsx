import * as React from "react";
import "../app/globals.css";

const ArrowDown = () => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className="draw"
      d="M58,12
         C118,32 24,58 96,80
         C158,100 66,112 112,148
         C88,132 70,118 66,108
         C92,126 104,138 112,148
         C120,134 136,118 152,102"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="7.37 7.37"
    />
  </svg>
);

export default ArrowDown;