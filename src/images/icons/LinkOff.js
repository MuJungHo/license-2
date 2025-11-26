import * as React from "react";
function SvgLinkOff(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={24}
      viewBox="0 -960 960 960"
      width={24}
      fill="currentColor"
      {...props}
    >
      <path d="M770-302l-60-62q40-11 65-42.5t25-73.5q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 57-29.5 105T770-302zM634-440l-80-80h86v80h-6zM792-56L56-792l56-56 736 736-56 56zM440-280H280q-83 0-141.5-58.5T80-480q0-69 42-123t108-71l74 74h-24q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80zM320-440v-80h65l79 80H320z" />
    </svg>
  );
}
export default SvgLinkOff;
