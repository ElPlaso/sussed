"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import prisma from "../db";
import { parseProject } from "./utils";

export async function updateProject(projectId: string, formData: FormData) {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (project?.ownerId !== userId) {
    throw new Error("Unauthorized to update project");
  }

  const validatedFields = parseProject(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.errors.map((error) => error.message),
    };
  }

  try {
    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        ...validatedFields.data,
      },
    });

    revalidatePath("/");
  } catch (error) {
    return {
      errors: [
        "An unexpected error occurred while trying to update this project. Please try again.",
      ],
    };
  }
}
