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
  return (
    <Sidebar>
      <SidebarContent className="h-full overflow-hidden">
        <SidebarGroup className="h-full">
          <SidebarGroupLabel>Submission History</SidebarGroupLabel>
          <SidebarGroupContent className="h-full">
            <SidebarMenu className="h-full">
              <ScrollArea type="scroll" className="flex grow">
                {...items.map((item, i) => (
                  <SidebarMenuItem key={item.title + i}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuItem>
                ))}
              </ScrollArea>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
