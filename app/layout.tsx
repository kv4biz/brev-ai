import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Providers } from "./providers";
import { ClientThemeProvider } from "./client-theme-provider";

import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BrevAI",
  description: "AI-powered text summarization made simple.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className}`}>
        <Providers>
          <ClientThemeProvider>{children}</ClientThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
