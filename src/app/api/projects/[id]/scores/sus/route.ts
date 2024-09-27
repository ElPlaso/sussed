import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { calculateSusScore } from "@/utils";


export async function GET(_req: NextRequest,
    { params }: { params: { id: string } }): Promise<NextResponse<number | Error>> {
    const { id } = params;

    const project = await prisma.project.findUnique({
        where: {
            id,
        },
        include: {
            susResponses: true,
        }
    })

    if (!project) {
        return NextResponse.json(new Error('Project not found'), { status: 404 });
    }

    const scores = project.susResponses.map(calculateSusScore);

    const averageScore = scores.reduce((acc, score) => acc + score, 0) / scores.length;

    return NextResponse.json(averageScore, { status: 200 });
}


