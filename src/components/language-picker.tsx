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
import { useCallback, useContext } from "react";

const LANGUAGES = ["JavaScript", "TypeScript", "Python"] as const;

export function LanguagePicker() {
  const editorContext = useContext(CodeEditorContext);
  const selectLanguage = useCallback(
    (option: string) => {
      editorContext?.setEditorLanguage(option as (typeof LANGUAGES)[number]);
    },
    [editorContext],
  );

  if (!editorContext?.editorLanguage && !editorContext?.setEditorLanguage) {
    return;
  }

  return (
    <Select value={editorContext.editorLanguage} onValueChange={selectLanguage}>
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
