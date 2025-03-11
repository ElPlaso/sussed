import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { auth } from "@/auth";
import { susRatingNumbers } from "@/utils";

export async function GET(
    _req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    const campaign = await prisma.campaign.findUnique({
        where: {
            id,
        },
        include: {
            susResponses: true,
            project: true,
        },
    });

    if (!campaign) {
        return NextResponse.json("Campaign not found", { status: 404 });
    }

    if (!campaign.project.isPublic) {
        const userId = (await auth())?.user?.id;

        if (userId !== campaign.project.ownerId) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }
    }

    const rows = campaign.susResponses.map((response, i) => {
        const {
            questionOne,
            questionTwo,
            questionThree,
            questionFour,
            questionFive,
            questionSix,
            questionSeven,
            questionEight,
            questionNine,
            questionTen,
        } = response;

        const responses = [
            questionOne,
            questionTwo,
            questionThree,
            questionFour,
            questionFive,
            questionSix,
            questionSeven,
            questionEight,
            questionNine,
            questionTen,
        ];

        return [`#${i + 1}`, ...responses.map((response) => susRatingNumbers[response])];
    });

    const csvString = [
        ["Response #", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"],
        ...rows,
    ]
        .map((e) => e.join(","))
        .join("\n");

    console.log(rows);

    const headers = new Headers();

    headers.set("Content-Type", "text/csv");
    headers.set(
        "Content-Disposition",
        `attachment; filename=sussed-${campaign.project.title}-${campaign.title}-results-download.csv`
    );

    return new NextResponse(csvString, {
        status: 200,
        statusText: "OK",
        headers,
    });
}
