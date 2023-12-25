/* eslint-disable @typescript-eslint/no-empty-function */
import Editor from "@monaco-editor/react";
import { useRouter } from "next/router";
import { Main } from "~/components";
import { clientRoutes } from "~/constants";
import { AddCollection } from "./component/AddToCollection";
import { ConsolePanel, ConsoleType } from "./component/ConsolePanel";
import { Language } from "./component/Language";
import { ThemeDropdown } from "./component/ThemeDropdown";
import { useEditor } from "./hooks/useEditor";
import { themeOptions } from "./utils/theme";

function CodeEditor() {
  const {
    editorOptions,
    messages,
    status,
    preserveLogs,
    handleOnChange,
    handleOnMount,
    handleSelectTheme,
    handleClearConsole,
    handlePreserveLog,
  } = useEditor();
  const { push } = useRouter();

  const handleAddToCollection = () => {};

  const handleBackClick = () => {
    push(clientRoutes.dashboard.index);
  };

  const handleSelectedConsoleOption = (val: ConsoleType) => {
    if (val === "clear" && messages.length > 0) {
      handleClearConsole();
    }
    if (val === "preserve") {
      handlePreserveLog();
    }
  };

  return (
    <Main>
      <Main.Header
        title="Code Editor"
        onBackClick={handleBackClick}
        leftChildren={
          <>
            <ThemeDropdown
              options={themeOptions}
              onSelect={handleSelectTheme}
              selectedValue={editorOptions.theme || ""}
            />
            <Language />
          </>
        }
        rightChildren={<AddCollection onAdd={handleAddToCollection} disabled />}
      />

      <Main.Content>
        <Editor
          {...editorOptions}
          onChange={handleOnChange}
          onMount={handleOnMount}
        />
        <div className="flex">
          <ConsolePanel
            result={messages}
            status={status}
            onSelectOption={handleSelectedConsoleOption}
            preserveLogs={preserveLogs}
          />
          {/* Judge panel */}
          <ConsolePanel
            result={messages}
            status={status}
            onSelectOption={handleSelectedConsoleOption}
            preserveLogs={preserveLogs}
          />
        </div>
      </Main.Content>
    </Main>
  );
}

export default CodeEditor;
