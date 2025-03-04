import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function NotificationsDropdown() {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button variant="light" isIconOnly>
          <FontAwesomeIcon
            icon={faBell}
            size="lg"
            className="text-default-500"
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu className="w-80">
        <DropdownSection title="Notifications">
          <DropdownItem
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            key="welcome"
            description="Get started by creating a new project and inviting your respondees 🚀"
          >
            📣 Welcome to Sussed!
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
