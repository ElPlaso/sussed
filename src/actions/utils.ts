import { z } from "zod";

const projectSchema = z.object({
    title: z.string().min(1),
    description: z.string(),
    link: z.string().url().or(z.literal('')),
    isPublic: z.boolean(),
});

export const parseProject = (formData: FormData) => {
    return projectSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        link: formData.get("link"),
        isPublic: formData.get("is-public") === "on",
    });
};

const campaignSchema = z.object({
    title: z.string().min(1),
    description: z.string(),
});

export const parseCampaign = (formData: FormData) => {
    return campaignSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
    });
};