/* eslint-disable @typescript-eslint/no-empty-function */
import { EditorProps, Monaco } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { defaultEditorThemes, defineTheme, monacoThemes } from "../utils/theme";

export const useEditor = () => {
  const [editorOptions, setEditorOptions] = useState<EditorProps>({
    height: "50vh",
    defaultLanguage: "typescript",
    defaultValue: "// Start coding here...",
    className: "",
    options: {
      wrappingIndent: "indent",
      wrappingStrategy: "advanced",
      fontSize: 16,
      tabSize: 2,
      minimap: {
        enabled: false,
      },
    },
  });
  const editorRef = useRef<Monaco>(null);
  const [input, setInput] = useState<string | undefined>(
    editorOptions.defaultValue
  );

  const onChange = (newValue?: string) => {
    setInput(newValue);
  };
  const onMount = (editor: Monaco) => {
    editorRef.current = editor;
    editorRef.current.focus();
  };

  const onSelectTheme = async (value: string) => {
    if (defaultEditorThemes[value as keyof typeof defaultEditorThemes]) {
      setEditorOptions((prev) => ({ ...prev, theme: value }));
    } else {
      await defineTheme(value as keyof typeof monacoThemes);
      setEditorOptions((prev) => ({ ...prev, theme: value }));
    }
  };

  const onSelectLanguage = () => {};

  return {
    editorOptions,
    editorRef,
    input,
    onChange,
    onMount,
    onSelectTheme,
    onSelectLanguage,
  };
};
