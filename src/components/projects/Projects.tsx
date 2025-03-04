"use client";

import { Card, CardBody, CardFooter } from "@heroui/react";
import { Campaign, Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import SusScore from "./SusScore";

export interface ProjectsProps {
  projects: Array<Project & { campaigns: Array<Pick<Campaign, "id">> }>;
}

export default function Projects(props: ProjectsProps) {
  const { projects } = props;

  const router = useRouter();

  const handlePress = (id: string) => {
    router.push(`/projects/${id}`);
  };

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 gap-4 w-full md:grid-cols-2 max-sm:grid-cols-1">
      {projects.map((project) => (
        <Card
          isPressable
          key={project.id}
          onPress={() => {
            handlePress(project.id);
          }}
          shadow="sm"
        >
          <CardBody className="p-4">{project.title}</CardBody>
          <CardFooter className="text-small justify-between">
            <span>{project.description}</span>
            {project.campaigns[project.campaigns.length - 1] && (
              <SusScore
                campaignId={project.campaigns[project.campaigns.length - 1].id}
              />
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
