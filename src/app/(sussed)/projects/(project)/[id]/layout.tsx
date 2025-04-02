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

// eslint-disable-next-line react-refresh/only-export-components
export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  const project = await getProject(id);

  return {
    title: {
      template: `${project?.title || "Unknown Project"} | %s`,
      default: project?.title || "Unknown Project",
    },
    description: `View SUS Scores (System Usability Scale) for "${
      project?.title || "Unknown Project"
    }"`,
  };
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
