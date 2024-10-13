import { notFound } from "next/navigation";
import prisma from "@/db";

async function getCampaign(id: string) {
  const project = await prisma.campaign.findUnique({
    where: {
      id,
    },
  });

  return project;
}

export default async function CampaignLayout({
  params: { id, campaignId },
  children,
}: Readonly<{
  params: { id: string; campaignId: string };
  children: React.ReactNode;
}>) {
  const campaign = await getCampaign(campaignId);

  if (!campaign) {
    notFound();
  }

  if (!campaign.projectId && !id) {
    return (
      <main className="flex w-full">
        <div className="flex flex-1 flex-col px-12 py-8 gap-y-8">
          <h1 className="text-xl">
            This campaign does not exist for this project.
          </h1>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
