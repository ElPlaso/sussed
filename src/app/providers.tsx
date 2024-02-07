"use client";

import Layout from "@/components/layout/Layout";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <Layout>{children}</Layout>
      </NextUIProvider>
    </SessionProvider>
  );
}
