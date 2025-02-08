import { useCallback, useMemo, useState } from "react";

type Props =
  | {
      language: string;
      code: string;
      createdAt: Date;
      feedbackId: string;
    }
  | undefined;

type Languages = "JavaScript" | "TypeScript" | "Python";
export function useCodeEditor(initialValues: Props) {
  const [editorValue, setEditorValue] = useState(
    initialValues?.code ||
      `function helloWorld() {
        console.log('Hello World!');
}`,
  );

  const [editorLanguage, setEditorLanguage] = useState<Languages>(
    (initialValues?.language as Languages) || "JavaScript",
  );

  const clearEditor = useCallback(() => {
    setEditorValue("");
  }, [setEditorValue]);

  return useMemo(
    () => ({
      editorValue,
      setEditorValue,
      clearEditor,
      editorLanguage,
      setEditorLanguage,
    }),
    [
      editorValue,
      clearEditor,
      setEditorValue,
      editorLanguage,
      setEditorLanguage,
    ],
  );
}
