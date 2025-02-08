"use client";
import { ScrollArea } from "~/components/ui/scroll-area";

import { Braces } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { api } from "~/trpc/react";
import { NoSubmissions } from "./sidebar/no-submissions-card";
import { SubmissionsErrorCard } from "./sidebar/error-card";
import { SubmissionCard } from "./sidebar/submission-card";

// Menu items.
const items = [
  {
    title: "Submission",
    url: "#",
    icon: Braces,
  },
  {
    title: "Submission",
    url: "#",
    icon: Braces,
  },
  {
    title: "Submission",
    url: "#",
    icon: Braces,
  },
  {
    title: "Submission",
    url: "#",
    icon: Braces,
  },
  {
    title: "Submission",
    url: "#",
    icon: Braces,
  },
];

export function SubmissionHistory() {
  const { isLoading, data } = api.submissions.getAll.useQuery();

  return (
    <Sidebar>
      <SidebarContent className="h-full overflow-hidden">
        <SidebarGroup className="h-full">
          <SidebarGroupLabel>Submission History</SidebarGroupLabel>
          <SidebarGroupContent className="h-full">
            <SidebarMenu className="h-full">
              <ScrollArea type="scroll" className="flex grow">
                {data &&
                  data.map((item, i) => (
                    <SubmissionCard
                      id={"" + i}
                      summary=""
                      language=""
                      createAt={new Date()}
                    />
                  ))}
                <SubmissionsErrorCard />
                <NoSubmissions />
                {!data && <SidebarMenuItem>Loading</SidebarMenuItem>}
              </ScrollArea>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
