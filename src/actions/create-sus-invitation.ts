"use server";

import { auth } from "../auth";
import prisma from "../db";


export async function createSusInvitation(projectId: string, uniqueCode: string) {
    if (!uniqueCode.trim()) {
        throw new Error("Unique code not provided.");
    }

    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) throw new Error("User not found");

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    });

    if (!project) {
        throw new Error("Project not found.");
    }

    if (project.ownerId !== userId) {
        throw new Error("Unauthorized.");
    }

    try {
        await prisma.susInvitation.create({
            data: {
                id: uniqueCode,
                projectId,
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
