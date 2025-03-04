import { auth } from "@/auth";
import CampaignInvitationsBreadcrumbs from "@/components/projects/project/campaign/invitations/CampaignInvitationBreadcrumbs";
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
      susInvitations: true,
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
      <div className="flex flex-col px-12 py-8 gap-y-8 max-w-[96rem] w-full">
        <div className="flex flex-col gap-y-4">
          <CampaignInvitationsBreadcrumbs campaign={campaign} />
          <h1 className="text-xl">Invitations</h1>
        </div>
        {/* TODO: Add invitations table  */}
      </div>
    </main>
  );
}
