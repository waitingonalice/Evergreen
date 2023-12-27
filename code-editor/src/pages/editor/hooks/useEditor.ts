/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable no-new-func */
import { EditorProps } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
  useDebouncedCallback,
  useKeybind,
} from "~/utils";
import { transpile } from "~/utils/transpile";
import { ConsoleMethod, interceptConsole } from "../utils/interceptor";
import { defaultEditorThemes, defineTheme, monacoThemes } from "../utils/theme";

export type Status = "error" | "success";
export type Result = {
  args: unknown;
  formattedMessage: string;
  toggled: boolean;
};

const initialOptions: EditorProps = {
  height: "50vh",
  defaultLanguage: "typescript",
  defaultValue: `// Welcome to Code Editor!`,
  options: {
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
let consoleResults: Result[] = [];
let status: Status = "success";
let babelParser: typeof import("prettier/parser-babel") | null = null;
let prettier: typeof import("prettier/standalone") | null = null;

/** Flow of execution
 * 1. user types code
 * 2. transpile
 * 3. run eval
 * 4. while executing eval, capture console statements
 * 5. after end of eval, set display
 * 6. reset captured results to not duplicate them on the next eval.
 * */
export const useEditor = () => {
  const editorRef = useRef<any>(null);
  const [editorOptions, setEditorOptions] =
    useState<EditorProps>(initialOptions);
  const [executedCode, setExecutedCode] = useState<Result[]>([]);
  const [preserveLogs, setPreserveLogs] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const handleClearConsole = () => {
    consoleResults = [];
    setExecutedCode(consoleResults);
  };

  const handleClearInput = () => {
    setInput("");
  };

  const handlePreserveLog = () => {
    setPreserveLogs((prev) => {
      setLocalStorage("logStatus", String(!prev));
      if (!prev === false) {
        removeLocalStorage("preserveLogs");
        removeLocalStorage("logStatus");
      }
      return !prev;
    });
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

  const debounceExecute = useDebouncedCallback(
    async (value: string) => {
      try {
        const code = await transpile(value);
        new Function(code)();
        setExecutedCode(consoleResults);
        status = "success";
        consoleResults = [];
        if (preserveLogs) setLocalStorage("preserveLogs", value);
      } catch (err) {
        console.error(err);
        if (err instanceof Error) {
          status = "error";
          consoleResults = [];
          setExecutedCode([
            {
              args: err.message,
              formattedMessage: err.message,
              toggled: false,
            },
          ]);
        }
      }
    },
    300,
    [preserveLogs]
  );

  const handleOnChange = (newValue?: string) => {
    setInput(newValue || "");
    debounceExecute(newValue || "");
  };

  const handleIntercept = (consoleArgs: unknown[], type: ConsoleMethod) => {
    if (type === "clear") {
      handleClearConsole();
      return;
    }
    if (!consoleArgs || consoleArgs.length === 0) return;
    const input: Array<unknown> = [];

    consoleArgs.forEach((arg) => {
      if (typeof arg === "object") {
        input.push(JSON.stringify(arg));
      } else {
        input.push(arg);
      }
    });

    // Join the arguments that are passed into the same console.log as a singular string, so we can display it as a single message.
    // TODO: Upgrade this to support showing prototypes of objects.
    const jointInputs = input.join(" ");
    consoleResults.push({
      args: consoleArgs,
      formattedMessage: jointInputs,
      toggled: false,
    });
  };

  const handleToggleExpand = (index: number) => {};

  const handleOnMountEditor = (editor: any) => {
    editorRef.current = editor;
    editorRef.current.focus();
  };

  const handleMountLocalStorage = () => {
    const code = getLocalStorage<string>("preserveLogs");
    const logStatus = getLocalStorage<string>("logStatus");
    const theme = getLocalStorage<string>("editorTheme");
    setPreserveLogs(Boolean(logStatus));
    if (code) {
      setEditorOptions((prev) => ({ ...prev, defaultValue: code }));
      handleOnChange(code);
    }
    if (theme) handleSelectTheme(theme ?? "light");
  };

  useEffect(() => {
    if (initMount) {
      handleMountLocalStorage();
      interceptConsole(handleIntercept);
    }
    return () => {
      initMount = false;
    };
  }, []);

  useKeybind(["MetaLeft", "KeyS"], (e) => {
    const handleFormatCode = async () => {
      e.preventDefault();
      const unformattedCode = editorRef.current?.getValue();
      if (!babelParser || !prettier) {
        babelParser = await import("prettier/parser-babel");
        prettier = await import("prettier/standalone");
      }
      const formattedCode = prettier?.format(unformattedCode, {
        parser: "babel",
        ...(babelParser && { plugins: [babelParser] }),
        printWidth: 80,
      });
      editorRef.current?.setValue(formattedCode);
    };
    handleFormatCode();
  });

  return {
    editorOptions,
    editorRef,
    messages: executedCode,
    input,
    status,
    preserveLogs,
    handleClearInput,
    handleOnChange,
    handleOnMount: handleOnMountEditor,
    handleSelectTheme,
    handleClearConsole,
    handlePreserveLog,
    handleToggleExpand,
  };
};
