"use client";

import useCampaignSusScore from "@/hooks/useCampaignSusScore";
import SusScoreCircle from "../shared/SusScoreCircle";

export interface SusScoreProps {
  campaignId: string;
  size?: "sm" | "lg";
}

export default function SusScore(props: SusScoreProps) {
  const { campaignId, size = "lg" } = props;

  const { data: score } = useCampaignSusScore(campaignId);

  return <SusScoreCircle score={score} size={size} />;
}
