"use client";

import React from "react";
import { CodeEditor } from "./code-editor";
import { FeedbackForm } from "./feedback-form";
import { createContext } from "react";
import { useCodeEditor } from "~/hooks/use-code-editor";

export const CodeEditorContext = createContext<ReturnType<
  typeof useCodeEditor
> | null>(null);

type AreaStateProps = {
  solution?: {
    code: string;
    id: string;
    language: string;
    feedbackId: string;
    createdAt: Date;
    feedback: {
      keyFindings: string[];
      feedback: {
        id: string;
        shortSummary: string;
        criticalRecommendations: string | null;
        keyFindings: string;
        createdAt: Date;
      };
    };
  };
};

export const InteractiveArea: React.FC<AreaStateProps> = (props) => {
  const codeEditor = useCodeEditor(props.solution);

  return (
    <CodeEditorContext.Provider value={codeEditor || null}>
      <CodeEditor />
      <FeedbackForm initialFeedback={props?.solution?.feedback} />
    </CodeEditorContext.Provider>
  );
};
