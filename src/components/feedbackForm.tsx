"use client";
import React from "react";

import {
  readStreamableValue,
  StreamableValue,
  useStreamableValue,
} from "ai/rsc";
import { useState } from "react";
import { PartialFeedback } from "~/schemas/feedback-schema";
import { generateFeedback } from "~/app/actions";

export const FeedbackForm: React.FC = (props) => {
  const [feedbackStream, setFeedbackStream] =
    useState<StreamableValue<PartialFeedback> | null>(null);

  const [generation, setGeneration] = useState<string>("");

  return (
    <>
      <div className="flex min-h-screen flex-col justify-end bg-neutral-800">
        <div className="container flex w-full grow flex-col gap-6">
          <div className="">{generation}</div>
        </div>
        <div className="flex items-center justify-center gap-4 bg-neutral-900 p-8">
          <button
            onClick={async () => {
              const stream = await generateFeedback(`
              function useSidebar() {
                const context = React.useContext(SidebarContext);
                if (!context) {
                  throw new Error("useSidebar must be used within a SidebarProvider.");
                }
              
                return context;
              }`);

              for await (const partialObject of readStreamableValue(
                stream.object,
              )) {
                if (partialObject) {
                  console.log({ partialObject });
                  setGeneration(JSON.stringify(partialObject, null, 2));
                }
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

function FeedbackView({
  feedbackStream,
}: {
  feedbackStream: StreamableValue<PartialFeedback>;
}) {
  const [data, pending, error] = useStreamableValue(feedbackStream);

  return (
    <div className="mt-4 flex flex-col gap-4">
      {data && JSON.stringify(data, null, 2)}
    </div>
  );
}
