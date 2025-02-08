import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { SubmissionHistory } from "~/components/submission-history";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "CodeReview Mentor",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body>
        <SidebarProvider>
          <SubmissionHistory />
          <header className="inline-block"></header>
          <main className="flex w-full flex-col">
            <div className="sticky top-0 h-8 bg-neutral-900">
              <SidebarTrigger className="my-auto" />
            </div>
            <TRPCReactProvider>
              <HydrateClient>{children}</HydrateClient>
            </TRPCReactProvider>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
