import SignInDropdown from "@/components/layout/navbar/SignInDropdown";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import Image from "next/image";

export default function WelcomeWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar position="sticky" shouldHideOnScroll isBordered>
        <NavbarBrand>
          <div className="flex gap-x-2 items-center">
            <Image
              src="/favicon.ico"
              alt="Sussed Logo"
              className="dark:invert"
              width={40}
              height={40}
            />
            <h1 className="text-2xl font-semibold">Sussed.</h1>
          </div>
        </NavbarBrand>
        <NavbarContent justify="end" className="w-full">
          <SignInDropdown />
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
}
