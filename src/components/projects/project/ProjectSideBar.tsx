"use client";

import React from "react";
import { tv } from "@nextui-org/react";
import ProjectSusScore from "../ProjectSusScore";
import { usePathname } from "next/navigation";

const sidebarStyles = tv({
  base: "bg-background fixed w-64 overflow-y-auto border-l border-divider flex-col py-6 px-3 flex static h-screen",
});

// TODO: Make responsive
export default function ProjectSidebar() {
  const pathName = usePathname();
  const projectId = pathName.split("/")[2];

  return (
    <aside className="h-screen sticky top-0">
      <div className={sidebarStyles()}>
        <div className="flex flex-col gap-6 mt-9 px-2">
          <ProjectSusScore projectId={projectId} />
          {/* TODO: Add selected response here potentially*/}
        </div>
      </div>
    </aside>
  );
}
