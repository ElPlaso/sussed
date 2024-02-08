import { Navbar as NextNavbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import SidebarButton from "./SidebarButton";
import NotificationsDropdown from "./NotificationsDropdown";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  return (
    <NextNavbar
      isBordered
      className="w-full sticky top-0"
      classNames={{
        wrapper: "w-full max-w-full",
      }}
    >
      <NavbarContent className="md:hidden">
        <SidebarButton />
      </NavbarContent>
      <NavbarContent justify="end" className="w-full">
        <NotificationsDropdown />
        <UserDropdown />
      </NavbarContent>
    </NextNavbar>
  );
}
