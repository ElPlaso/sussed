import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { calculateAverageSusScore } from "@/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<number | null | string>> {
  const { id } = params;

  const campaign = await prisma.campaign.findUnique({
    where: {
      id,
    },
    include: {
      susResponses: true,
    },
  });

  if (!campaign) {
    return NextResponse.json("Campaign not found", { status: 404 });
  }

  if (campaign.susResponses.length === 0) {
    return NextResponse.json(null, { status: 200 });
  }

  const averageScore = calculateAverageSusScore(campaign.susResponses);

  return NextResponse.json(averageScore, { status: 200 });
}
