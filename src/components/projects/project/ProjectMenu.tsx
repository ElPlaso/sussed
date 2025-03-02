"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { Key } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisVertical,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { deleteProject } from "@/actions/delete-project";
import { useRouter } from "next/navigation";
import EditProject from "./EditProject";
import useToggleState from "@/hooks/useToggleState";
import { Project } from "@prisma/client";
import { updateProject } from "@/actions/update-project";
import DangerousActionConfirmation from "@/components/shared/DangerousActionConfirmation";

export interface ProjectMenuProps {
  project: Project;
}

export default function ProjectMenu(props: ProjectMenuProps) {
  const { project } = props;

  const [isEditProjectModalOpen, toggleEditProjectModal] = useToggleState();
  const [isDeleteProjectModalOpen, toggleDeleteProjectModal] = useToggleState();

  const router = useRouter();

  const handleAction = async (key: Key) => {
    switch (key) {
      case "edit":
        toggleEditProjectModal();
        break;
      case "share":
        // TODO
        break;
      case "delete":
        toggleDeleteProjectModal();
        break;
      default:
        break;
    }
  };

  const handleUpdateProject = async (formData: FormData) => {
    return await updateProject(project.id, formData);
  };

  const handleDeleteProject = async () => {
    await deleteProject(project.id);
    router.push("/");
  };

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button variant="light" isIconOnly>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              size="lg"
              className="text-default-500"
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu onAction={handleAction}>
          <DropdownSection aria-label="Actions">
            <DropdownItem
              key="edit"
              startContent={
                <FontAwesomeIcon className="text-default-500" icon={faEdit} />
              }
            >
              Edit
            </DropdownItem>
            <DropdownItem
              key="share"
              startContent={
                <FontAwesomeIcon className="text-default-500" icon={faShare} />
              }
            >
              Share
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              startContent={<FontAwesomeIcon icon={faTrash} size="lg" />}
            >
              Delete
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <EditProject
        project={project}
        isModalOpen={isEditProjectModalOpen}
        toggleModal={toggleEditProjectModal}
        onSubmit={handleUpdateProject}
      />
      <DangerousActionConfirmation
        title="Delete Project"
        message="Are you sure you want to delete this project? All of its data will be
          lost."
        confirmLabel="Yes, Delete"
        isModalOpen={isDeleteProjectModalOpen}
        toggleModal={toggleDeleteProjectModal}
        onDelete={handleDeleteProject}
      />
    </>
  );
}
