import { useCallback, useMemo, useState } from "react";

export function useCodeEditor() {
  const [editorValue, setEditorValue] = useState(`function helloWorld() {
        console.log('Hello World!');
}`);

  const [editorLanguage, setEditorLanguage] = useState<
    "JavaScript" | "TypeScript" | "Python"
  >("JavaScript");

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
