"use client";

import useProjectSusScore from "@/hooks/useProjectSusScore";
import { CircularProgress } from "@nextui-org/react";
import { useMemo } from "react";

export interface ProjectSusScoreProps {
  projectId: string;
}

export default function ProjectSusScore(props: ProjectSusScoreProps) {
  const { projectId } = props;

  const { data: score } = useProjectSusScore(projectId);

  const scoreColor = useMemo(() => {
    if (score === undefined) {
      return "default";
    }
    if (score < 50) {
      return "danger";
    }
    return score < 70 ? "warning" : "success";
  }, [score]);

  return (
    <CircularProgress
      minValue={0}
      maxValue={100}
      size="lg"
      value={score}
      color={scoreColor}
      showValueLabel={true}
      formatOptions={{}}
    />
  );
}
