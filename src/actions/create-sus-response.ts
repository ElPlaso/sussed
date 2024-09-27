"use server";

import prisma from "../db";
import { z } from "zod";
import { SusRating } from '@prisma/client'


const susResponseSchema = z.object({
    questionOne: z.nativeEnum(SusRating),
    questionTwo: z.nativeEnum(SusRating),
    questionThree: z.nativeEnum(SusRating),
    questionFour: z.nativeEnum(SusRating),
    questionFive: z.nativeEnum(SusRating),
    questionSix: z.nativeEnum(SusRating),
    questionSeven: z.nativeEnum(SusRating),
    questionEight: z.nativeEnum(SusRating),
    questionNine: z.nativeEnum(SusRating),
    questionTen: z.nativeEnum(SusRating),
});

const parseSusResponse = (formData: FormData) => {
    return susResponseSchema.safeParse({
        questionOne: formData.get("1"),
        questionTwo: formData.get("2"),
        questionThree: formData.get("3"),
        questionFour: formData.get("4"),
        questionFive: formData.get("5"),
        questionSix: formData.get("6"),
        questionSeven: formData.get("7"),
        questionEight: formData.get("8"),
        questionNine: formData.get("9"),
        questionTen: formData.get("10"),
    });
};


export async function createSusResponse(projectId: string, formData: FormData, invitationCode: string) {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    });

    if (!project) {
        throw new Error("Project not found.");
    }

    const response = await prisma.susResponse.findFirst({
        where: {
            projectId,
            invitationId: invitationCode,
        }
    })

    if (response !== null) {
        return {
            errors: ["A response with this invitation code has already been submitted for this project."],
        };
    }

    const validatedFields = parseSusResponse(formData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.errors.map((error) => error.message),
        };
    }

    try {
        await prisma.susResponse.create({
            data: {
                ...validatedFields.data,
                projectId,
                invitationId: invitationCode,
            },
        });
    } catch (error) {
        return {
            errors: [
                "An unexpected error occurred while tying to submit your sus response. Please try again.",
            ],
        };
    }
}
