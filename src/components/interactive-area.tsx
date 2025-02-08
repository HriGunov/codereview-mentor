"use client";

import React from "react";
import { CodeEditor } from "./code-editor";
import { FeedbackForm } from "./feedbackForm";
import { createContext } from "react";
import { useCodeEditor } from "~/hooks/use-code-editor";

export const CodeEditorContext = createContext<ReturnType<
  typeof useCodeEditor
> | null>(null);

export const InteractiveArea: React.FC = () => {
  const codeEditor = useCodeEditor();

  return (
    <CodeEditorContext.Provider value={codeEditor || null}>
      <CodeEditor />
      <FeedbackForm />
    </CodeEditorContext.Provider>
  );
};
