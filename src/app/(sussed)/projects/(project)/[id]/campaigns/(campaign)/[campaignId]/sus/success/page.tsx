import SusSuccess from "@/components/projects/project/SusSuccess";
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

export default async function SusSuccessPage({
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
      <SusSuccess campaign={campaign} />
    </main>
  );
}
