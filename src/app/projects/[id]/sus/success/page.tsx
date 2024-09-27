import SusSuccess from "@/components/projects/project/SusSuccess";
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

export default async function SusSuccessPage({
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
      <SusSuccess project={project} />
    </main>
  );
}
