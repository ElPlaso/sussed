"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import prisma from "../db";
import { parseProject } from "./utils";

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

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return {
      errors: [
        "An unexpected error occurred while trying to create this project. Please try again.",
      ],
    };
  }
}
