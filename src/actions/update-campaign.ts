"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import prisma from "../db";
import { parseCampaign } from "./utils";

export async function updateCampaign(campaignId: string, formData: FormData) {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) throw new Error("User not found");

    const campaign = await prisma.campaign.findUnique({
        where: {
            id: campaignId,
        },
        include: {
            project: true,
        },
    });

    if (campaign?.project.ownerId !== userId) {
        throw new Error("Unauthorized to update campaign");
    }

    const validatedFields = parseCampaign(formData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.errors.map((error) => error.message),
        };
    }

    try {
        await prisma.campaign.update({
            where: {
                id: campaignId,
            },
            data: {
                ...validatedFields.data,
            },
        });

        revalidatePath(`/projects/${campaign.projectId}/`);
    } catch (error) {
        return {
            errors: [
                "An unexpected error occurred while tying to update this campaign. Please try again.",
            ],
        };
    }
}
