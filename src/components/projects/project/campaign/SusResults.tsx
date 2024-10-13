"use client";

import SusScore from "../../SusScore";
import SusScoreComment from "./SusScoreComment";

export interface SusResultsProps {
  campaignId: string;
}

export default function SusResults(props: SusResultsProps) {
  const { campaignId } = props;

  return (
    <div className="flex gap-x-4 items-center">
      <SusScore campaignId={campaignId} />
      <SusScoreComment campaignId={campaignId} />
    </div>
  );
}
