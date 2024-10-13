"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import prisma from "../db";
import { z } from "zod";


const campaignSchema = z.object({
    title: z.string().min(1),
    description: z.string(),
});

const parseCampaign = (formData: FormData) => {
    return campaignSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
    });
};

export async function createCampaign(formData: FormData, projectId: string) {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) throw new Error("User not found");

    const validatedFields = parseCampaign(formData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.errors.map((error) => error.message),
        };
    }

    try {
        await prisma.campaign.create({
            data: {
                ...validatedFields.data,
                projectId,
            },
        });

        revalidatePath(`/projects/${projectId}`);
    } catch (error) {
        return {
            errors: [
                "An unexpected error occurred while tying to create this campaign. Please try again.",
            ],
        };
    }
}
