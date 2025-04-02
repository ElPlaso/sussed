import { auth } from "@/auth";
import Campaigns from "@/components/projects/project/Campaigns";
import ProjectMenu from "@/components/projects/project/ProjectMenu";
import prisma from "@/db";
import { Chip, Link } from "@heroui/react";

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

  const userId = (await auth())?.user?.id;

  const isOwner = project.ownerId === userId;

  if (!project.isPublic && !isOwner) {
    return (
      <main className="flex w-full">
        <div className="flex flex-1 flex-col px-12 py-8 gap-y-8">
          <h1 className="text-xl">You do not have access to this project.</h1>
        </div>
      </main>
    );
  }

  // TODO: Display owner if project is public

  return (
    <main className="flex w-full justify-center">
      <div className="flex flex-col px-12 py-8 gap-y-8 max-w-[96rem] w-full">
        <div className="flex gap-x-4 justify-between items-start w-full">
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2 items-center">
              <h1 className="text-xl">{project.title}</h1>
              <Chip
                variant="dot"
                color={project.isPublic ? "primary" : "danger"}
                size="sm"
              >
                {project.isPublic ? "Public" : "Private"}
              </Chip>
            </div>
            {project.link && (
              <Link isExternal showAnchorIcon size="sm" href={project.link}>
                {project.link}
              </Link>
            )}

            <p className="text-sm">{project.description}</p>
          </div>
          {isOwner && <ProjectMenu project={project} />}
        </div>
        <Campaigns project={project} />
      </div>
    </main>
  );
}
