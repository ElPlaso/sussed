import SusWrapper from "@/components/projects/project/SusWrapper";
import prisma from "@/db";
import { notFound } from "next/navigation";

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      susResponses: true,
      susInvitations: true,
    },
  });

  return project;
}

export default async function SusQuestionnaire({
  params: { id },
}: {
  params: { id: string };
}) {
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex flex-col px-12 items-center py-8">
      <div className="flex flex-col gap-y-4 items-start min-w-96">
        <h1 className="text-2xl">{project.title}</h1>
        <SusWrapper project={project} />
      </div>
    </main>
  );
}
