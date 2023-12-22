/* eslint-disable react/no-array-index-key */
import Editor from "@monaco-editor/react";
import clsx from "clsx";
import { Main } from "~/components";
// import { clientRoutes } from "~/constants";
import { Language } from "./component/Language";
import { Preview } from "./component/Preview";
import { ThemeDropdown } from "./component/ThemeDropdown";
import { useEditor } from "./hooks/useEditor";
import { themeOptions } from "./utils/theme";

function CodeEditor() {
  const {
    editorOptions,
    messages,
    onChange: handleOnChange,
    onMount: handleOnMount,
    onSelectTheme,
  } = useEditor();

  const handleBackClick = () => {
    // navigate(clientRoutes.dashboard.index);
  };

  const handleSelectTheme = (val: string) => {
    onSelectTheme(val);
  };

  return (
    <Main>
      <Main.Header title="Code Editor" onBackClick={handleBackClick}>
        <ThemeDropdown
          options={themeOptions}
          onSelect={handleSelectTheme}
          selectedValue={editorOptions.theme || ""}
        />
        <Language />
      </Main.Header>
      <Main.Content className="min-h-screen">
        <div className="border border-gray-500">
          <Editor
            {...editorOptions}
            onChange={handleOnChange}
            onMount={handleOnMount}
          />
        </div>
        <div
          className="flex overflow-y-auto h-[60vh] flex-col text-primary w-1/2 border border-gray-600"
          id="console"
        >
          {messages.map((message, index, arr) => (
            <div
              key={index}
              className={clsx(
                "flex items-center p-2",
                arr.length > 1 && "border border-gray-600"
              )}
            >
              <span className="mr-2 whitespace-nowrap">{index + 1}: </span>
              <Preview message={message} className="truncate" />
            </div>
          ))}
        </div>
      </Main.Content>
    </Main>
  );
}

export default CodeEditor;
