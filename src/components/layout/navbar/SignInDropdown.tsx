import {
  Dropdown,
  NavbarItem,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

export default function SignInDropdown() {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar as="button" color="default" size="sm" />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem key="login" href="/api/auth/signin">
          Log In
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
