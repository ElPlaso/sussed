import SignInDropdown from "@/components/layout/navbar/SignInDropdown";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function WelcomeWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar position="sticky" shouldHideOnScroll isBordered>
        <NavbarBrand>
          <Link href="/welcome" className="flex gap-x-2 items-center">
            <Image
              src="/favicon.ico"
              alt="Sussed Logo"
              className="dark:invert"
              width={40}
              height={40}
            />
            <h1 className="text-2xl font-semibold">Sussed.</h1>
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end" className="w-full">
          <SignInDropdown />
        </NavbarContent>
      </Navbar>
      {children}
      <footer className="w-full flex flex-col gap-y-6 bottom-0 mt-12 pb-6 px-16">
        <Divider />
        <div className="flex gap-x-4 justify-between items-center">
          <div>© {new Date().getFullYear()} Sussed</div>
          <Button
            as="a"
            target="_blank"
            href="https://github.com/ElPlaso/sussed"
            startContent={<FontAwesomeIcon icon={faGithub} size="sm" />}
            variant="flat"
          >
            View on GitHub
          </Button>
        </div>
      </footer>
    </div>
  );
}
