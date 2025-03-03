import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Sussed",
  description:
    "Manage and administer SUS (System Usability Scale) surveys for your projects with ease. Keep track of responses and analyze results with automatic score calculation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
