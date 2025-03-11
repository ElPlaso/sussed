import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { calculateSusScore } from "@/utils";

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

  const scores = campaign.susResponses.map(calculateSusScore);

  const averageScore =
    scores.reduce((acc, score) => acc + score, 0) / scores.length;

  return NextResponse.json(averageScore, { status: 200 });
}
