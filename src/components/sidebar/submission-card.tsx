import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { SidebarMenuItem } from "../ui/sidebar";

type CardProps = {
  id: string;
  summary: string;
  createAt: Date;
  language: string;
};

export function SubmissionCard(props: CardProps) {
  const { id, summary, language, createAt } = props;

  return (
    <SidebarMenuItem key={id} className="pb-2">
      <a href={id}>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </a>
    </SidebarMenuItem>
  );
}
