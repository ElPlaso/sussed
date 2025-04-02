"use client";

import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function ProjectsHeader() {
  const router = useRouter();

  const handleNewProject = () => {
    router.push("/projects/new");
  };

  return (
    <div className="flex gap-x-4 justify-between items-center w-full">
      <h2 className="text-lg">Projects</h2>
      <Button
        className="bg-primary-500 dark:bg-primary-400 text-white"
        startContent={<FontAwesomeIcon icon={faAdd} />}
        onPress={handleNewProject}
      >
        New Project
      </Button>
    </div>
  );
}
