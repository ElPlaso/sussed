"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisVertical,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

// TODO: implement actions
export default function ProjectDropdown() {
  return (
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
      <DropdownMenu>
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
  );
}
