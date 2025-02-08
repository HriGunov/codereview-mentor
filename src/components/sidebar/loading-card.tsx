import { LoaderCircle, PackageOpen } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { SidebarMenuItem } from "../ui/sidebar";

export function LoadingCard() {
  return (
    <SidebarMenuItem key={"loading"} className="pb-2">
      <Card className="animate-pulse rounded-xl bg-primary/10">
        <CardContent className="flex items-center justify-center">
          <LoaderCircle size={64} className="my-auto w-11 animate-spin" />
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <CardDescription>Loading Submissions...</CardDescription>
        </CardFooter>
      </Card>
    </SidebarMenuItem>
  );
}
