import SusWrapper from "@/components/projects/project/SusWrapper";
import prisma from "@/db";

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
    <main className="flex flex-col px-12 items-center py-8">
      <div className="flex flex-col gap-y-4 items-start min-w-96">
        <h1 className="text-2xl">{campaign.project.title}</h1>
        <SusWrapper campaign={campaign} />
      </div>
    </main>
  );
}
