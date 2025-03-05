"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import prisma from "../db";


export async function deleteSusInvitation(id: string) {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) throw new Error("User not found");

    const invitation = await prisma.susInvitation.findUnique({
        where: {
            id,
        },
        include: {
            susResponse: true,
            campaign: {
                select: {
                    project: {
                        select: {
                            id: true,
                            ownerId: true,
                        }
                    },
                    susResponses: true,
                }
            }
        }
    });

    if (!invitation) {
        throw new Error("Invitation not found.");
    }

    if (invitation.campaign.project.ownerId !== userId) {
        throw new Error("Unauthorized.");
    }

    if (invitation.susResponse) {
        throw new Error("Invitation already has a response.");
    }

    try {
        await prisma.susInvitation.delete({
            where: {
                id,
            }
        });

        revalidatePath(`/projects/${invitation.campaign.project.id}/campaigns/${invitation.campaignId}`);
    } catch (error) {
        return {
            errors: [
                "An unexpected error occurred while tying to delete a sus invitation. Please try again.",
            ],
        };
    }
}
