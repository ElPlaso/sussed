import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";

export default function DarkModeSwitch() {
  const { setTheme, resolvedTheme } = useNextTheme();
  return (
    <Switch
      isSelected={resolvedTheme === "dark" ? true : false}
      onValueChange={(e) => setTheme(e ? "dark" : "light")}
    />
  );
}
