import { PackageOpen } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { SidebarMenuItem } from "../ui/sidebar";

export function NoSubmissions() {
  return (
    <SidebarMenuItem key="no-submissions" className="pb-2">
      <Card>
        <CardHeader>
          <CardTitle>Empty</CardTitle>
          <CardDescription>
            Submissions you make will show up here. {":)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PackageOpen />
        </CardContent>
      </Card>
    </SidebarMenuItem>
  );
}
