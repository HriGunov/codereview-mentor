import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { CodeEditorContext } from "./interactive-area";

const LANGUAGES = ["JavaScript", "TypeScript", "Python"] as const;

export function LanguagePicker() {
  const editorContext = React.useContext(CodeEditorContext);
  if (!editorContext?.editorLanguage && !editorContext?.setEditorLanguage) {
    return;
  }

  return (
    <Select
      value={editorContext.editorLanguage}
      onValueChange={editorContext.setEditorLanguage}
    >
      <SelectTrigger className="w-[180px] border-[1px] border-white">
        <SelectValue placeholder="Select a Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          {LANGUAGES.map((lang) => (
            <SelectItem value={lang} key={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
