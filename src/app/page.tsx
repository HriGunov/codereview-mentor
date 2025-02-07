import { HydrateClient } from "~/trpc/server";
import { FeedbackForm } from "~/components/feedbackForm";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default async function Home() {
  return (
    <HydrateClient>
      <FeedbackForm />
    </HydrateClient>
  );
}
