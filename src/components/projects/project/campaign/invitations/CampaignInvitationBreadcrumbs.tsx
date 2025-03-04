"use client";

import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { Campaign, Project } from "@prisma/client";

export interface CampaignInvitationsBreadcrumbsProps {
  campaign: Campaign & {
    project: Project;
  };
}

export default function CampaignInvitationsBreadcrumbs(
  props: CampaignInvitationsBreadcrumbsProps
) {
  const { campaign } = props;

  return (
    <Breadcrumbs>
      <BreadcrumbItem href={`/projects/${campaign.projectId}`}>
        {campaign.project.title}
      </BreadcrumbItem>
      <BreadcrumbItem
        href={`/projects/${campaign.projectId}/campaigns/${campaign.id}`}
      >
        {campaign.title}
      </BreadcrumbItem>
      <BreadcrumbItem>Invitations</BreadcrumbItem>
    </Breadcrumbs>
  );
}
