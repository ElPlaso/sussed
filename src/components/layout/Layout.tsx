import React from "react";
import { useLockedBody } from "../../hooks/useBodyLock";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import { SidebarContext } from "./layout-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        <Sidebar />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Navbar />
          {children}
        </div>
      </section>
    </SidebarContext.Provider>
  );
}
