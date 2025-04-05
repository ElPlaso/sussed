import SusWrapper from "@/components/projects/project/SusWrapper";
import prisma from "@/db";

async function getCampaign(id: string) {
  const campaign = await prisma.campaign.findUnique({
    where: {
      id,
    },
    include: {
      project: {
        include: {
          user: true,
        },
      },
      susResponses: true,
      susInvitations: true,
    },
  });

  return campaign;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function generateMetadata({
  params: { campaignId },
}: {
  params: { campaignId: string };
}) {
  const campaign = await getCampaign(campaignId);

  return {
    title: {
      default: "SUS Survey",
    },
    description: `${
      campaign?.project.user.name || "Unknown user"
    } invites you to fill out a survey for user testing of "${
      campaign?.project.title || "Unknown project"
    }"`,
  };
}

export default async function SusQuestionnaire({
  params: { campaignId },
}: {
  params: { campaignId: string };
}) {
  const campaign = await getCampaign(campaignId);

  if (!campaign) {
    throw new Error("Campaign not found");
  }

  return (
    <main className="flex flex-col items-center py-8">
      <div className="flex flex-col gap-y-4 items-start min-w-96 px-12 max-sm:px-8">
        <h1 className="text-2xl">{campaign.project.title}</h1>
        <SusWrapper campaign={campaign} />
      </div>
    </main>
  );
}
