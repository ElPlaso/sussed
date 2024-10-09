"use client";

import useProjectSusScore from "@/hooks/useProjectSusScore";
import { CircularProgress } from "@nextui-org/react";
import { useMemo } from "react";
import { GOOD_THRESHOLD, OK_THRESHOLD } from "../utils/score-results";

export interface ProjectSusScoreProps {
  projectId: string;
  size?: "lg" | "xl";
}

export default function ProjectSusScore(props: ProjectSusScoreProps) {
  const { projectId, size = "lg" } = props;

  const { data: score } = useProjectSusScore(projectId);

  const scoreColor = useMemo(() => {
    if (score === undefined) {
      return "default";
    }
    if (score < OK_THRESHOLD) {
      return "danger";
    }
    return score < GOOD_THRESHOLD ? "warning" : "success";
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
      isIndeterminate={false}
    />
  );
}
