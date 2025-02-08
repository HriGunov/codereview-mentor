import { FeedbackForm } from "~/components/feedbackForm";
import { CodeEditor } from "~/components/code-editor";
import { InteractiveArea } from "~/components/interactive-area";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-end bg-neutral-800">
      <InteractiveArea />
    </div>
  );
}
