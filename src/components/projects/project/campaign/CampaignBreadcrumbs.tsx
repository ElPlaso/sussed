"use client";

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Campaign, Project } from "@prisma/client";

export interface CampaignBreadcrumbsProps {
  campaign: Campaign & {
    project: Project;
  };
}

export default function CampaignBreadcrumbs(props: CampaignBreadcrumbsProps) {
  const { campaign } = props;

  return (
    <Breadcrumbs>
      <BreadcrumbItem href={`/projects/${campaign.projectId}`}>
        {campaign.project.title}
      </BreadcrumbItem>
      <BreadcrumbItem>{campaign.title}</BreadcrumbItem>
    </Breadcrumbs>
  );
}
