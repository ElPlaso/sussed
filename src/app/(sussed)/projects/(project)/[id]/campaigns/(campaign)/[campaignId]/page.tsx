import { auth } from "@/auth";
import prisma from "@/db";
import SusResponses from "@/components/projects/project/campaign/SusResponses";
import SusResults from "@/components/projects/project/campaign/SusResults";
import SusInviter from "@/components/projects/project/campaign/SusInviter";
import CampaignBreadcrumbs from "@/components/projects/project/campaign/CampaignBreadcrumbs";
import CampaignMenu from "@/components/projects/project/campaign/CampaignMenu";

async function getCampaign(id: string) {
  const campaign = await prisma.campaign.findUnique({
    where: {
      id,
    },
    include: {
      project: true,
      susResponses: true,
      susInvitations: true,
    },
  });

  return campaign;
}

export default async function CampaignPage({
  params: { campaignId },
}: {
  params: { campaignId: string };
}) {
  const campaign = await getCampaign(campaignId);

  if (!campaign) {
    throw new Error("Campaign not found");
  }

  const userId = (await auth())?.user?.id;

  const isOwner = campaign.project.ownerId === userId;

  if (!campaign.project.isPublic && !isOwner) {
    return (
      <main className="flex w-full">
        <div className="flex flex-1 flex-col px-12 py-8 gap-y-8">
          <h1 className="text-xl">You do not have access to this project.</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="flex w-full justify-center">
      <div className="flex flex-col px-12 py-8 gap-y-8 max-w-[96rem] w-full">
        <div className="flex flex-col gap-y-4">
          <CampaignBreadcrumbs campaign={campaign} />
          <div className="flex gap-x-4 justify-between items-start w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-xl">{campaign.title}</h1>
              <p className="text-sm">{campaign.description}</p>
            </div>
            {isOwner && <CampaignMenu campaign={campaign} />}
          </div>
        </div>
        <SusResults campaignId={campaignId} />
        {isOwner && <SusInviter />}
        <SusResponses
          responses={campaign?.susResponses || []}
          numInvitations={campaign.susInvitations.length}
        />
      </div>
    </main>
  );
}
