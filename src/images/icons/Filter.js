import * as React from "react";
function SvgFilter(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={24}
      viewBox="0 -960 960 960"
      width={24}
      fill="currentColor"
      {...props}
    >
      <path d="M400-240v-80h160v80H400zM240-440v-80h480v80H240zM120-640v-80h720v80H120z" />
    </svg>
  );
}
export default SvgFilter;
