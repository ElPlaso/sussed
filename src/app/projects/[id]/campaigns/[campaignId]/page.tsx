import { auth } from "@/auth";
import prisma from "@/db";
import SusResponses from "@/components/projects/project/campaign/SusResponses";
import SusResults from "@/components/projects/project/campaign/SusResults";
import SusInviter from "@/components/projects/project/campaign/SusInviter";
import CampaignBreadcrumbs from "@/components/projects/project/campaign/CampaignBreadcrumbs";

async function getCampaign(id: string) {
  const campaign = await prisma.campaign.findUnique({
    where: {
      id,
    },
    include: {
      project: true,
      susResponses: true,
    },
  });

  return campaign;
}

export default async function ProjectPage({
  params: { campaignId },
}: {
  params: { campaignId: string };
}) {
  const campaign = await getCampaign(campaignId);

  if (!campaign) {
    throw new Error("Campaign not found");
  }

  const userId = (await auth())?.user?.id;

  const isOwner = campaign?.project.ownerId === userId;

  return (
    <main className="flex w-full justify-center">
      <div className="flex flex-col px-12 py-8 gap-y-8 max-w-[96rem] w-full">
        <CampaignBreadcrumbs campaign={campaign} />
        <SusResults campaignId={campaignId} />
        {isOwner && <SusInviter />}
        <SusResponses responses={campaign?.susResponses || []} />
      </div>
    </main>
  );
}
