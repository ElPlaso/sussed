"use server";

import { auth } from "../auth";
import prisma from "../db";


export async function createSusInvitation(campaignId: string, uniqueCode: string) {
    if (!uniqueCode.trim()) {
        throw new Error("Unique code not provided.");
    }

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
        await prisma.susInvitation.create({
            data: {
                id: uniqueCode,
                campaignId,
            },
        });
    } catch (error) {
        return {
            errors: [
                "An unexpected error occurred while tying to create a sus invitation. Please try again.",
            ],
        };
    }
}
