"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { Key, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisVertical,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { deleteProject } from "@/actions/delete-project";
import { useRouter } from "next/navigation";
import DeleteProject from "./DeleteProject";

export interface ProjectDropdownProps {
  projectId: string;
}

export default function ProjectDropdown(props: ProjectDropdownProps) {
  const { projectId } = props;

  const [isDeleteProjectModalOpen, setDeleteProjectModalOpen] = useState(false);
  const toggleDeleteProjectMOdal = () => {
    setDeleteProjectModalOpen((prev) => !prev);
  };

  const router = useRouter();

  const handleAction = async (key: Key) => {
    switch (key) {
      case "edit":
        // TODO
        break;
      case "share":
        // TODO
        break;
      case "delete":
        toggleDeleteProjectMOdal();
        break;
      default:
        break;
    }
  };

  const handleDeleteProject = async () => {
    await deleteProject(projectId);
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
      <DeleteProject
        isModalOpen={isDeleteProjectModalOpen}
        toggleModal={toggleDeleteProjectMOdal}
        onDelete={handleDeleteProject}
      />
    </>
  );
}
