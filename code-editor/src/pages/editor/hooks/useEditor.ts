/* eslint-disable no-new-func */
import { EditorProps, Monaco } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import {
  getLocalStorage,
  setLocalStorage,
  useDebouncedCallback,
} from "~/utils";
import { transpile } from "~/utils/transpile";
import { ConsoleMethod, interceptConsole } from "../utils/interceptor";
import { defaultEditorThemes, defineTheme, monacoThemes } from "../utils/theme";

export type Status = "error" | "success";

const initialOptions: EditorProps = {
  height: "36vh",
  defaultLanguage: "typescript",
  defaultValue: `// Welcome to Code Editor!`,
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
// temporary storage to capture console statements
let consoleResults: string[] = [];
let status: Status = "success";

/** Flow of execution
 * 1. user types code
 * 2. transpile
 * 3. run eval
 * 4. while executing eval, capture console statements
 * 5. after end of eval, set display
 * 6. reset captured results to not duplicate them on the next eval.
 * */
export const useEditor = () => {
  const [editorOptions, setEditorOptions] =
    useState<EditorProps>(initialOptions);
  const editorRef = useRef<Monaco>(null);
  const [executedCode, setExecutedCode] = useState<string[]>([]);

  const handleClearConsole = () => {
    setExecutedCode([]);
    consoleResults = [];
  };
  const debounceExecute = useDebouncedCallback(async (value: string) => {
    try {
      const code = await transpile(value);
      new Function(code)();
      setExecutedCode(consoleResults);
      status = "success";
      consoleResults = [];
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        status = "error";
        consoleResults = [];
        setExecutedCode([err.message]);
      }
    }
  }, 300);

  const handleOnMount = (editor: Monaco) => {
    editorRef.current = editor;
    editorRef.current.focus();
  };

  const handleOnChange = (newValue?: string) => {
    debounceExecute(newValue || "");
  };

  const handleIntercept = (result: string, type: ConsoleMethod) => {
    if (type === "clear") {
      handleClearConsole();
      return;
    }
    if (!result) return;
    consoleResults.push(result);
  };

  const handleSelectTheme = async (value: string) => {
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
      if (theme) handleSelectTheme(theme ?? "light");
      interceptConsole(handleIntercept);
    }
    return () => {
      initMount = false;
    };
  }, []);

  return {
    editorOptions,
    editorRef,
    handleOnChange,
    handleOnMount,
    handleSelectTheme,
    messages: executedCode,
    status,
  };
};
