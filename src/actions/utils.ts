import { z } from "zod";

const projectSchema = z.object({
    title: z.string().min(1),
    description: z.string(),
    link: z.string().url().or(z.literal('')),
});

export const parseProject = (formData: FormData) => {
    return projectSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        link: formData.get("link"),
    });
};