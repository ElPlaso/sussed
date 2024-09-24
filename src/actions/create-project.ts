"use server";

import { auth } from "../auth";
import prisma from "../db";
import { z } from "zod";


const projectSchema = z.object({
    title: z.string().min(1,),
    description: z.string(),
    link: z.string().url().or(z.literal('')),
});

const parseProject = (formData: FormData) => {
    return projectSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        link: formData.get("link"),
    });
};

export async function createProject(formData: FormData) {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) throw new Error("User not found");

    const validatedFields = parseProject(formData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.errors.map((error) => error.message),
        };
    }

    try {
        await prisma.project.create({
            data: {
                ...validatedFields.data,
                ownerId: userId,
            },
        });
    } catch (error) {
        return {
            errors: [
                "An unexpected error occurred while tying to create this project. Please try again.",
            ],
        };
    }
}
