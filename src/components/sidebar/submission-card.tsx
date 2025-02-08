import Image from "next/image";
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

const units: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
  { unit: "year", ms: 31536000000 },
  { unit: "month", ms: 2628000000 },
  { unit: "day", ms: 86400000 },
  { unit: "hour", ms: 3600000 },
  { unit: "minute", ms: 60000 },
  { unit: "second", ms: 1000 },
];
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

/**
 * Get language-sensitive relative time message from Dates.
 * @param relative  - the relative dateTime, generally is in the past or future
 * @param pivot     - the dateTime of reference, generally is the current time
 */
export function relativeTimeFromDates(
  relative: Date | null,
  pivot: Date = new Date(),
): string {
  if (!relative) return "";
  const elapsed = relative.getTime() - pivot.getTime();
  return relativeTimeFromElapsed(elapsed);
}

/**
 * Get language-sensitive relative time message from elapsed time.
 * @param elapsed   - the elapsed time in milliseconds
 */
export function relativeTimeFromElapsed(elapsed: number): string {
  for (const { unit, ms } of units) {
    if (Math.abs(elapsed) >= ms || unit === "second") {
      return rtf.format(Math.round(elapsed / ms), unit);
    }
  }
  return "";
}

export function SubmissionCard(props: CardProps) {
  const { id, summary, language, createAt } = props;
  const timeAgo = relativeTimeFromElapsed(
    createAt.getTime() - new Date().getTime(),
  );

  let iconSrc = "./javascript-logo.svg";

  if (language === "TypeScript") {
    iconSrc = "./typescript-logo.svg";
  } else if (language === "Python") {
    iconSrc = "/python-logo.png";
  }

  return (
    <SidebarMenuItem key={id} className="pb-2">
      <a href={id}>
        <Card>
          <CardHeader>
            <CardTitle>{`${language} submission`}</CardTitle>
            <CardDescription>{summary}</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="space flex justify-between">
            <Image width={24} height={24} alt="language icon" src={iconSrc} />
            <p>Created {timeAgo}</p>
          </CardFooter>
        </Card>
      </a>
    </SidebarMenuItem>
  );
}
