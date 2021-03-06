import * as React from "react";
var ClrDragHandleCorner = function() {
  return React.createElement(
    "svg",
    {
      version: "1.1",
      viewBox: "0 0 36 36",
      preserveAspectRatio: "xMidYMid meet",
      xmlns: "http://www.w3.org/2000/svg",
      focusable: "false",
      role: "img",
      xmlnsXlink: "http://www.w3.org/1999/xlink"
    },
    React.createElement("circle", { cx: "12", cy: "24", r: "1.5" }),
    React.createElement("circle", { cx: "18", cy: "24", r: "1.5" }),
    React.createElement("circle", { cx: "18", cy: "18", r: "1.5" }),
    React.createElement("circle", { cx: "24", cy: "12", r: "1.5" }),
    React.createElement("circle", { cx: "24", cy: "24", r: "1.5" }),
    React.createElement("circle", { cx: "24", cy: "18", r: "1.5" })
  );
};
export default ClrDragHandleCorner;
