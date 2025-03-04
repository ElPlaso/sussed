"use client";

import { CircularProgress } from "@heroui/react";
import { useMemo } from "react";
import { GOOD_THRESHOLD, OK_THRESHOLD } from "../utils/score-results";
import useCampaignSusScore from "@/hooks/useCampaignSusScore";

export interface SusScoreProps {
  campaignId: string;
  size?: "sm" | "lg";
}

export default function SusScore(props: SusScoreProps) {
  const { campaignId, size = "lg" } = props;

  const { data: score } = useCampaignSusScore(campaignId);

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
