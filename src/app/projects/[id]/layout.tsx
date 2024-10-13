import { auth } from "@/auth";
import prisma from "@/db";
import { notFound } from "next/navigation";

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  return project;
}

export default async function ProjectLayout({
  params: { id },
  children,
}: Readonly<{
  params: { id: string };
  children: React.ReactNode;
}>) {
  const project = await getProject(id);
  const userId = (await auth())?.user?.id;

  const isOwner = project?.ownerId === userId;

  if (!project) {
    notFound();
  }

  if (!project.isPublic && !isOwner) {
    return (
      <main className="flex w-full">
        <div className="flex flex-1 flex-col px-12 py-8 gap-y-8">
          <h1 className="text-xl">You do not have access to this project.</h1>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
