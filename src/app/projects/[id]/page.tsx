import ProjectInviter from "@/components/projects/project/ProjectInviter";
import ProjectMenu from "@/components/projects/project/ProjectMenu";
import ProjectSideBar from "@/components/projects/project/ProjectSideBar";
import ProjectSusResponses from "@/components/projects/project/ProjectSusResponses";
import prisma from "@/db";
import { Link } from "@nextui-org/react";

async function getProject(id: string) {
  const projects = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      susResponses: true,
    },
  });

  return projects;
}

// TODO: Handle permissions
export default async function ProjectPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const project = await getProject(id);

  return (
    <main className="flex w-full">
      <div className="flex flex-1 flex-col px-12 py-8 gap-y-8">
        <div className="flex gap-x-4 justify-between items-start w-full">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-xl">{project?.title}</h1>
            <Link size="sm" href={project?.link || undefined}>
              {project?.link}
            </Link>
            <p className="text-sm">{project?.description}</p>
          </div>
          <ProjectMenu />
        </div>
        <ProjectInviter />
        <ProjectSusResponses responses={project?.susResponses || []} />
      </div>
      <ProjectSideBar />
    </main>
  );
}
