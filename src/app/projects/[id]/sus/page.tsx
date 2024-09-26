import SusWrapper from "@/components/projects/project/SusWrapper";
import prisma from "@/db";

async function getProject(id: string) {
  const projects = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  return projects;
}

export default async function SusQuestionnaire({
  params: { id },
}: {
  params: { id: string };
}) {
  const project = await getProject(id);

  return (
    <main className="flex flex-col px-12 items-center py-8">
      <div className="flex flex-col gap-y-4 items-start">
        <h1 className="text-2xl">{project?.title}</h1>
        <SusWrapper />
      </div>
    </main>
  );
}
