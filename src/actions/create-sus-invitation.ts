"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import prisma from "../db";
import { createId } from "@paralleldrive/cuid2";


export async function createSusInvitation(campaignId: string) {
    const uniqueCode = createId();

    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) throw new Error("User not found");

    const campaign = await prisma.campaign.findUnique({
        where: {
            id: campaignId,
        },
        include: {
            project: true,
        }
    });

    if (!campaign) {
        throw new Error("Campaign not found.");
    }

    if (campaign.project.ownerId !== userId) {
        throw new Error("Unauthorized.");
    }

    try {
        const result = await prisma.susInvitation.create({
            data: {
                id: uniqueCode,
                campaignId,
            },
        });

        revalidatePath(`/projects/${campaign.projectId}/campaigns/${campaignId}`);

        return {
            type: "result", result
        };
    } catch (error) {
        return {
            type: "errors",
            errors: [
                "An unexpected error occurred while tying to create a sus invitation. Please try again.",
            ],
        };
    }
}
