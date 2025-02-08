import { Bomb } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { SidebarMenuItem } from "../ui/sidebar";

export function SubmissionsErrorCard() {
  return (
    <SidebarMenuItem key="error" className="pb-2">
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Could not get Submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Bomb />
        </CardContent>
      </Card>
    </SidebarMenuItem>
  );
}
