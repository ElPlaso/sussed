import { auth } from "@/auth";
import Projects from "@/components/projects/Projects";
import ProjectsHeader from "@/components/projects/ProjectsHeader";
import prisma from "@/db";

async function getProjects() {
  const userId = (await auth())?.user?.id;

  const projects = await prisma.project.findMany({
    where: {
      ownerId: userId,
    },
  });

  return projects;
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="flex flex-col px-12 py-8 gap-y-4">
      <ProjectsHeader />
      <Projects projects={projects} />
    </main>
  );
}
