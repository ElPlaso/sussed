'use server';

import { auth } from "@/auth";
import prisma from "@/db";
import { revalidatePath } from "next/cache";

export async function deleteProject(id: string) {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) throw new Error("User not found");

    const project = await prisma.project.findUnique({
        where: {
            id,
        },
    });

    if (project?.ownerId !== userId) {
        throw new Error("User unauthorized to delete project");
    }

    await prisma.project.delete({
        where: {
            id,
        },
    });

    revalidatePath("/");
}
