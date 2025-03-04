import { auth } from "@/auth";
import CampaignInvitationsBreadcrumbs from "@/components/projects/project/campaign/invitations/CampaignInvitationBreadcrumbs";
import Invitations from "@/components/projects/project/campaign/invitations/Invitations";
import NewInvitation from "@/components/projects/project/campaign/invitations/NewInvitation";
import prisma from "@/db";

// TODO: Can DRY up
async function getCampaign(id: string) {
  const campaign = await prisma.campaign.findUnique({
    where: {
      id,
    },
    include: {
      project: true,
      susResponses: true,
      susInvitations: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return campaign;
}

export default async function InvitationsPage({
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

  if (!isOwner) {
    return (
      <main className="flex w-full">
        <div className="flex flex-1 flex-col px-12 py-8 gap-y-8">
          <h1 className="text-xl">You do not have access to this.</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="flex w-full justify-center">
      <div className="flex flex-col px-12 py-8 gap-y-4 max-w-[96rem] w-full">
        <CampaignInvitationsBreadcrumbs campaign={campaign} />
        <div className="flex gap-x-4 justify-between items-center w-full">
          <h1 className="text-xl">Invitations</h1>
          <NewInvitation campaignId={campaign.id} />
        </div>
        <Invitations invitations={campaign.susInvitations} />
      </div>
    </main>
  );
}
