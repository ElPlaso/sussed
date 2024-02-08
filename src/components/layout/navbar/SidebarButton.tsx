import React from "react";
import { useSidebarContext } from "../layout-context";

export default function SidebarButton() {
  const { setCollapsed } = useSidebarContext();

  return (
    <div
      className="absolute flex flex-col justify-around w-6 h-6 bg-transparent border-none cursor-pointer padding-0 z-[202] focus:outline-none [&_div]:w-6 [&_div]:h-px [&_div]:bg-default-900 [&_div]:rounded-xl  [&_div]:transition-all  [&_div]:relative  [&_div]:origin-[1px]"
      onClick={setCollapsed}
    >
      <div />
      <div />
    </div>
  );
}
