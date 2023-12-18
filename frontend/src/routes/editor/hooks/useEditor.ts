/* eslint-disable @typescript-eslint/no-empty-function */
import { EditorProps, Monaco } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { getLocalStorage, setLocalStorage } from "~/utils/localStorage";
import { defaultEditorThemes, defineTheme, monacoThemes } from "../utils/theme";

const defaultString = `// Welcome to Code Editor!
console.log("Hi Mom")`;

const initialOptions: EditorProps = {
  height: "50vh",
  defaultLanguage: "typescript",
  defaultValue: defaultString,
  options: {
    wrappingIndent: "indent",
    wrappingStrategy: "advanced",
    fontSize: 16,
    tabSize: 2,
    minimap: {
      enabled: false,
    },
    formatOnPaste: true,
    formatOnType: true,
  },
};

let initMount = true;

export const useEditor = () => {
  const [editorOptions, setEditorOptions] =
    useState<EditorProps>(initialOptions);
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
    const updateOptions = (options: EditorProps) => {
      const newOptions = { ...options, theme: value };
      setLocalStorage("editorTheme", value);
      return newOptions;
    };
    if (defaultEditorThemes[value as keyof typeof defaultEditorThemes]) {
      setEditorOptions(updateOptions);
    } else {
      await defineTheme(value as keyof typeof monacoThemes);
      setEditorOptions(updateOptions);
    }
  };

  useEffect(() => {
    if (initMount) {
      const theme = getLocalStorage<string>("editorTheme");
      if (theme) onSelectTheme(theme ?? "light");
    }

    return () => {
      initMount = false;
    };
  }, []);

  return {
    editorOptions,
    editorRef,
    input,
    onChange,
    onMount,
    onSelectTheme,
  };
};
