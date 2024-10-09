"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import ProjectSusScore from "../ProjectSusScore";
import ProjectSusScoreComment from "./ProjectSusScoreComment";

export default function ProjectResults() {
  const pathName = usePathname();
  const projectId = pathName.split("/")[2];

  return (
    <div className="flex gap-x-4 items-center">
      <ProjectSusScore projectId={projectId} />
      <ProjectSusScoreComment projectId={projectId} />
    </div>
  );
}
