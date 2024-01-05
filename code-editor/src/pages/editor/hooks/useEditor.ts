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
import { defaultEditorThemes, defineTheme, monacoThemes } from "../utils/theme";

export type Status = "error" | "success" | "running";
export type Result = unknown[][];

const initialOptions: EditorProps = {
  height: "49vh",
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
let babelParser: typeof import("prettier/parser-babel") | null = null;
let prettier: typeof import("prettier/standalone") | null = null;
let status: Status = "success";
let currentWorker: Worker | null = null;
/** Flow of execution
 * 1. user types code
 * 2. transpile
 * 3. run eval in worker
 * 4. while executing eval, capture console statements
 * 5. after end of eval, set display
 * 6. reset captured results to not duplicate them on the next eval.
 * 7. handle errors if necessary
 * */

export const useEditor = () => {
  const editorRef = useRef<any>(null);
  const [editorOptions, setEditorOptions] =
    useState<EditorProps>(initialOptions);
  const [executedCode, setExecutedCode] = useState<Result>([]);
  const [preserveLogs, setPreserveLogs] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const handleClearConsole = () => {
    setExecutedCode([]);
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

  const handleExecutionError = (message: string) => {
    status = "error";
    setExecutedCode([[`Error: ${message}`]]);
    currentWorker?.terminate();
    currentWorker = null;
  };

  const handleDelayedExecutionError = () => {
    if (currentWorker && status === "running") {
      setTimeout(() => handleExecutionError("Code execution timed out."), 2000);
    }
  };

  handleDelayedExecutionError();

  const debounceExecute = useDebouncedCallback(
    async (value: string) => {
      if (!value) {
        setExecutedCode([]);
        return;
      }
      currentWorker = new Worker("worker.js", { type: "module" });
      const code = await transpile(value);
      status = "running";
      currentWorker.postMessage(code);
      currentWorker.onmessage = (e) => {
        const result: Result = e.data;
        if ("error" in result) {
          handleExecutionError(result.error as string);
          return;
        }
        status = "success";
        setExecutedCode(result);
        currentWorker?.terminate();
        currentWorker = null;
        if (preserveLogs) setLocalStorage("preserveLogs", value);
      };
    },
    500,
    [preserveLogs]
  );

  const handleOnChange = (newValue?: string) => {
    const value = newValue || "";
    setInput(value);
    debounceExecute(value);
  };

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
    }
    return () => {
      initMount = false;
      if (currentWorker) currentWorker.terminate();
      currentWorker = null;
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
  };
};
