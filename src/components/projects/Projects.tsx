import {
  Card,
  CardBody,
  CardFooter,
  CircularProgress,
} from "@nextui-org/react";
import { Project } from "@prisma/client";

export interface ProjectsProps {
  projects: Array<Project>;
}

export default function Projects(props: ProjectsProps) {
  const { projects } = props;

  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      {projects.map((project) => (
        <Card isPressable key={project.id} shadow="sm">
          <CardBody className="p-4">{project.title}</CardBody>
          <CardFooter className="text-small justify-between">
            <span>{project.description}</span>
            <CircularProgress
              size="lg"
              value={0} // TODO: Add score here
              color="success"
              formatOptions={{ style: "percent" }}
              showValueLabel={true}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
