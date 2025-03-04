"use client";

import { Navbar as NextNavbar, NavbarContent } from "@heroui/react";
import React from "react";
import SidebarButton from "./SidebarButton";
import NotificationsDropdown from "./NotificationsDropdown";
import UserDropdown from "./UserDropdown";
import { useSession } from "next-auth/react";
import SignInDropdown from "./SignInDropdown";

export default function Navbar() {
  const user = useSession().data?.user;

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
        {user ? (
          <>
            <NotificationsDropdown />
            <UserDropdown />
          </>
        ) : (
          <SignInDropdown />
        )}
      </NavbarContent>
    </NextNavbar>
  );
}
