import React from "react";
import { usePathname } from "next/navigation";
import { useSidebarContext } from "../layout-context";
import { SidebarItem } from "./SidebarItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { tv } from "@nextui-org/react";

const sidebarStyles = tv({
  base: "bg-background transition-transform h-full fixed -translate-x-full w-64 shrink-0 z-[202] overflow-y-auto border-r border-divider flex-col py-6 px-3 md:ml-0 md:flex md:static md:h-screen md:translate-x-0",

  variants: {
    collapsed: {
      true: "translate-x-0 ml-0 [display:inherit]",
    },
  },
});

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div
          className="bg-[rgb(15_23_42/0.3)] fixed inset-0 z-[201] opacity-80 transition-opacity md:hidden md:z-auto md:opacity-100"
          onClick={setCollapsed}
        />
      ) : null}
      <div className={sidebarStyles({ collapsed })}>
        <div className="flex gap-8 items-center px-6">
          <h1 className="text-2xl font-semibold">Sussed.</h1>
        </div>
        <div className="flex flex-col gap-6 mt-9 px-2">
          <SidebarItem
            title="Home"
            icon={
              <FontAwesomeIcon className="text-default-500" icon={faHome} />
            }
            isActive={pathname === "/"}
            href="/"
          />
        </div>
      </div>
    </aside>
  );
}
