"use client";
//'codemirror/mode/javascript/javascript'
import React, { useContext, useMemo } from "react";

import { useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript as javaScriptLanguage } from "@codemirror/lang-javascript";
import { python as pythonLanguage } from "@codemirror/lang-python";
import { CodeEditorContext } from "./interactive-area";
import { Button } from "./ui/button";
import { Select } from "./ui/select";
import { LanguagePicker } from "./language-picker";
const DEFAULT_LANGUAGE = "JavaScript";

const COPY_BUTTON_ACTION_LABEL = "Copy to Clipboard";
const COPY_BUTTON_SUCCESS_LABEL = "Copied!";

export const CodeEditor: React.FC = () => {
  const editorContext = useContext(CodeEditorContext);
  const [copyButtonText, setSetCopyButtonText] = useState(
    COPY_BUTTON_ACTION_LABEL,
  );
  const language = editorContext?.editorLanguage || DEFAULT_LANGUAGE;

  let languageSupport = useMemo(() => {
    console.log({ language });

    switch (language) {
      case "TypeScript":
        return javaScriptLanguage({ jsx: true, typescript: true });
      case "Python":
        return pythonLanguage();
      case "JavaScript":
      default:
        return javaScriptLanguage({ jsx: true });
    }
  }, [language]);

  const onChange = useCallback(
    (value: string) => {
      editorContext?.setEditorValue(value);
    },
    [editorContext?.setEditorValue],
  );

  const onCopyToClipboard = useCallback(async () => {
    if (!editorContext?.editorValue) {
      return;
    }

    await navigator.clipboard.writeText(editorContext?.editorValue);

    setSetCopyButtonText(COPY_BUTTON_SUCCESS_LABEL);
    setTimeout(() => setSetCopyButtonText(COPY_BUTTON_ACTION_LABEL), 2000);
  }, [editorContext, setSetCopyButtonText]);

  const onClearEditor = useCallback(async () => {
    editorContext?.clearEditor();
  }, [editorContext?.clearEditor]);

  return (
    <div className="w-full">
      <CodeMirror
        theme={vscodeDark}
        value={editorContext?.editorValue}
        extensions={[languageSupport]}
        height="35rem"
        style={{ fontSize: "16px" }}
        autoFocus
        onChange={onChange}
      />

      <div className="gap flex flex-col justify-start gap-4 px-1 py-2 md:flex-row md:justify-between">
        <LanguagePicker />
        <div className="flex flex-col gap-4 md:flex-row">
          <Button onClick={onCopyToClipboard} className="min-w-40">
            {copyButtonText}
          </Button>
          <Button onClick={onClearEditor}>Clear Editor</Button>
        </div>
      </div>
    </div>
  );
};
