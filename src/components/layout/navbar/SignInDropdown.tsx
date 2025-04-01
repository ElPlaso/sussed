"use client";

import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dropdown,
  NavbarItem,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import ThemeToggle from "./ThemeToggle";

export default function SignInDropdown() {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar as="button" color="default" size="sm" />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu aria-label="User menu actions">
        <DropdownItem key="login" href="/api/auth/signin">
          Log In
        </DropdownItem>
        <DropdownItem
          key="switch"
          startContent={
            <FontAwesomeIcon className="text-default-500" icon={faMoon} />
          }
        >
          <ThemeToggle />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
