"use client";
import { ScrollArea } from "~/components/ui/scroll-area";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "~/components/ui/sidebar";
import { api } from "~/trpc/react";
import { NoSubmissions } from "./no-submissions-card";
import { SubmissionsErrorCard } from "./error-card";
import { SubmissionCard } from "./submission-card";
import { LoadingCard } from "./loading-card";

export function SubmissionHistory() {
  const { data, isError, isFetching } = api.submissions.getAll.useQuery();

  return (
    <Sidebar>
      <SidebarContent className="h-full overflow-hidden">
        <SidebarGroup className="h-full">
          <SidebarGroupLabel>
            Submission History {(data?.length ?? 0) > 0 && `(${data?.length})`}
          </SidebarGroupLabel>
          <SidebarGroupContent className="h-full">
            <SidebarMenu className="h-full">
              <ScrollArea type="scroll" className="flex grow">
                {isError && <SubmissionsErrorCard />}
                {isFetching && <LoadingCard />}
                {data?.length === 0 && <NoSubmissions />}
                {data?.map((item) => {
                  return (
                    <SubmissionCard
                      key={item.id}
                      id={item.id}
                      summary={item.feedback.shortSummary}
                      language={item.language}
                      createAt={item.createdAt}
                    />
                  );
                })}
              </ScrollArea>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
