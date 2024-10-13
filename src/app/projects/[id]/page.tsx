import Campaigns from "@/components/projects/project/Campaigns";
import ProjectMenu from "@/components/projects/project/ProjectMenu";
import prisma from "@/db";
import { Link } from "@nextui-org/react";

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      campaigns: {
        include: { susResponses: true },
      },
    },
  });

  return project;
}

export default async function ProjectPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const project = await getProject(id);

  if (!project) {
    throw new Error("Project not found");
  }

  return (
    <main className="flex w-full justify-center">
      <div className="flex flex-col px-12 py-8 gap-y-8 max-w-[96rem] w-full">
        <div className="flex gap-x-4 justify-between items-start w-full">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-xl">{project.title}</h1>
            <Link size="sm" href={project.link || undefined}>
              {project.link}
            </Link>
            <p className="text-sm">{project.description}</p>
          </div>
          <ProjectMenu />
        </div>
        <Campaigns projectId={project.id} campaigns={project.campaigns || []} />
      </div>
    </main>
  );
}
