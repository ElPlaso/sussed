'use server';

import { auth } from "@/auth";
import prisma from "@/db";
import { revalidatePath } from "next/cache";

export async function deleteCampaign(id: string) {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) throw new Error("User not found");

    const campaign = await prisma.campaign.findUnique({
        where: {
            id,
        },
        include: {
            project: true,
        }
    });

    if (campaign?.project.ownerId !== userId) {
        throw new Error("User unauthorized to delete project");
    }

    await prisma.campaign.delete({
        where: {
            id,
        },
    });

    revalidatePath(`/projects/[${campaign.project.id}]/`);
}
