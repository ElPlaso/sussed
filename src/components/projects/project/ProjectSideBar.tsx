import React from "react";
import { CircularProgress, tv } from "@nextui-org/react";

const sidebarStyles = tv({
  base: "bg-background fixed w-64 overflow-y-auto border-l border-divider flex-col py-6 px-3 flex static h-screen",
});

// TODO: Make responsive
export default function ProjectSidebar() {
  return (
    <aside className="h-screen sticky top-0">
      <div className={sidebarStyles()}>
        <div className="flex flex-col gap-6 mt-9 px-2">
          <CircularProgress
            size="lg"
            value={0} // TODO: Add score here
            color="success"
            formatOptions={{ style: "percent" }}
            showValueLabel={true}
          />
          {/* TODO: Add selected response here potentially*/}
        </div>
      </div>
    </aside>
  );
}
