"use client";

import { CircularProgress } from "@heroui/react";
import { useMemo } from "react";
import { OK_THRESHOLD, GOOD_THRESHOLD } from "../utils/score-results";

export interface SusScoreCircleProps {
  score: number | undefined;
  size: "sm" | "lg";
}

export default function SusScoreCircle(props: SusScoreCircleProps) {
  const { score, size } = props;

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
      size={size}
      value={score}
      color={scoreColor}
      showValueLabel={true}
      formatOptions={{}}
      isIndeterminate={false}
    />
  );
}
