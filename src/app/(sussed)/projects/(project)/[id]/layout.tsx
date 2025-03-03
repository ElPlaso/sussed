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

  if (!project) {
    notFound();
  }

  return <>{children}</>;
}
