"use client";

import Layout from "@/components/layout/Layout";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { ThemeProviderProps } from "next-themes/dist/types";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export default function Providers(props: ProvidersProps) {
  const { children, themeProps } = props;

  return (
    <SessionProvider>
      <NextUIProvider>
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          {...themeProps}
        >
          <Layout>{children}</Layout>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
