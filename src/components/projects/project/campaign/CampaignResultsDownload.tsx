"use client";

import DownloadButton from "@/components/shared/DownloadButton";
import { Campaign, Project } from "@prisma/client";

export interface CampaignResultsDownloadProps {
  campaign: Campaign & {
    project: Project;
  };
}

export default function CampaignResultsDownload(
  props: CampaignResultsDownloadProps
) {
  const { campaign } = props;

  const href = `/api/campaigns/${campaign.id}/results/sus`;
  const title = `sussed-${campaign.project.title}-${campaign.title}-sus-results-download.csv`;

  return (
    <DownloadButton
      href={href}
      title={title}
      toastMessage="Responses downloaded!"
    />
  );
}
