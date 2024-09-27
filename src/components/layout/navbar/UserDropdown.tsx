import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSignOut } from "@fortawesome/free-solid-svg-icons";

export default function UserDropdown() {
  const user = useSession().data?.user;

  if (!user) return null;

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="default"
            size="md"
            src={user.image || ""}
            name={user.name || ""}
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          <p>{user.email}</p>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onClick={handleSignOut}
          startContent={<FontAwesomeIcon icon={faSignOut} />}
        >
          Log Out
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
