"use client";
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { LoaderCircle } from "lucide-react";
import { readStreamableValue } from "ai/rsc";
import { useState } from "react";
import { generateFeedback } from "~/app/actions";
import { CodeEditorContext } from "./interactive-area";
import { PartialFeedback } from "~/schemas/feedback-schema";
import { Skeleton } from "./ui/skeleton";

export const FeedbackForm: React.FC = () => {
  const [generation, setGeneration] = useState<PartialFeedback | null>(null);
  const feedbackAreaRef = useRef<HTMLDivElement | null>(null);

  const editorContext = useContext(CodeEditorContext);

  const [loadingFeedback, setLoading] = useState(false);

  const disableGenerateFeedback =
    (!!editorContext?.editorValue && editorContext?.editorValue.length <= 3) ||
    loadingFeedback;

  useEffect(() => {
    if (feedbackAreaRef.current && loadingFeedback) {
      feedbackAreaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [generation, loadingFeedback]);

  const handleGenerateFeedback = useCallback(async () => {
    if (!editorContext?.editorValue) {
      return;
    }

    setLoading(true);
    setGeneration(null);

    const stream = await generateFeedback(editorContext.editorValue);

    for await (const partialObject of readStreamableValue(stream.object)) {
      if (partialObject) {
        setGeneration(partialObject);
      }
    }

    setLoading(false);
  }, [editorContext?.editorValue]);

  return (
    <>
      <button
        disabled={disableGenerateFeedback}
        onClick={handleGenerateFeedback}
        className="mx-2 mt-4 flex items-center justify-center gap-4 rounded-xl border-[1px] border-white bg-neutral-700 p-5 text-xl"
      >
        {!loadingFeedback ? (
          "Generate Feedback"
        ) : (
          <LoaderCircle className="animate-spin" />
        )}
      </button>

      <div className="flex w-full grow flex-col gap-6 p-4">
        {loadingFeedback && !generation && (
          <div className="flex flex-col space-y-3">
            <Skeleton className="mb-2 h-8 w-[calc(45%)] rounded-xl" />
            <Skeleton className="h-4 w-[calc(45%-1rem)]" />
            <Skeleton className="h-4 w-[calc(42%)]" />
            <Skeleton className="h-4 w-[calc(47%)]" />
            <Skeleton className="mt-6 h-8 w-[calc(40%)] rounded-xl" />
            <Skeleton className="h-4 w-[calc(41%)]" />
            <Skeleton className="h-4 w-[calc(45%)]" />
            <Skeleton className="h-4 w-[calc(49%)]" />
          </div>
        )}

        {generation && (
          <FeedbackElement ref={feedbackAreaRef} {...generation} />
        )}
      </div>
    </>
  );
};

const FeedbackElement = forwardRef<HTMLDivElement, PartialFeedback>(
  (feedback, ref) => {
    return (
      <div
        ref={ref}
        className="inset-shadow inset-shadow-indigo-500 m-4 box-border rounded-2xl bg-gray-800 stroke-white p-4 text-xl shadow-[-5px_-6px_5px_rgba(121,22,87,0.3),4px_5px_15px_#9966ff]"
      >
        {!!feedback?.shortSummary && (
          <>
            <h2 className="font-semibol text-5xl">Feedback Overview</h2>
            <p className="mt-2">{feedback.shortSummary}</p>
          </>
        )}

        {!!feedback?.criticalRecommendations &&
          feedback?.criticalRecommendations.length > 0 && (
            <div className="mt-4">
              <h3 className="font-bol text-3xl">Critical Recommendations:</h3>
              <ul className="list-inside list-disc">
                {feedback.criticalRecommendations}
              </ul>
            </div>
          )}

        {!!feedback?.keyFindings && feedback?.keyFindings.length > 0 && (
          <div className="mt-4">
            <h3 className="text-3xl font-bold">Key Findings:</h3>
            <ul className="list-inside list-disc">
              {feedback.keyFindings.map((finding, index) => (
                <li key={index} className="">
                  {finding}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
);
