"use client";
import React, { useCallback, useContext } from "react";

import { readStreamableValue } from "ai/rsc";
import { useState } from "react";
import { generateFeedback } from "~/app/actions";
import { CodeEditorContext } from "./interactive-area";

export const FeedbackForm: React.FC = () => {
  const [generation, setGeneration] = useState<string>("");
  const editorContext = useContext(CodeEditorContext);

  const disableGenerateFeedback =
    !!editorContext?.editorValue && editorContext?.editorValue.length <= 3;

  const handleGenerateFeedback = useCallback(async () => {
    if (!editorContext?.editorValue) {
      return;
    }

    const stream = await generateFeedback(editorContext.editorValue);

    for await (const partialObject of readStreamableValue(stream.object)) {
      if (partialObject) {
        console.log({ partialObject });
        setGeneration(JSON.stringify(partialObject, null, 2));
      }
    }
  }, [editorContext?.editorValue]);

  return (
    <>
      <div className="container flex w-full grow flex-col gap-6">
        <div className="">{generation}</div>
        {editorContext?.editorValue}
      </div>
      <div className="flex items-center justify-center gap-4 bg-neutral-900 p-8">
        <button
          disabled={disableGenerateFeedback}
          onClick={handleGenerateFeedback}
        >
          Submit
        </button>
      </div>
    </>
  );
};
