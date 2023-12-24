/* eslint-disable @typescript-eslint/no-empty-function */
import Editor from "@monaco-editor/react";
import { Main } from "~/components";
import { ConsolePanel } from "./component/ConsolePanel";
// import { clientRoutes } from "~/constants";
import { Language } from "./component/Language";
import { ThemeDropdown } from "./component/ThemeDropdown";
import { useEditor } from "./hooks/useEditor";
import { themeOptions } from "./utils/theme";

function CodeEditor() {
  const {
    editorOptions,
    messages,
    status,
    handleOnChange,
    handleOnMount,
    handleSelectTheme,
  } = useEditor();

  const handleBackClick = () => {
    // navigate(clientRoutes.dashboard.index);
  };

  const handleTogglePreserveLogs = () => {};
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
      <Main.Content>
        <Editor
          {...editorOptions}
          onChange={handleOnChange}
          onMount={handleOnMount}
        />
        <div className="flex">
          <ConsolePanel
            messages={messages}
            status={status}
            onTogglePreserveLogs={handleTogglePreserveLogs}
            preserveLogs
          />
          {/* Judge panel */}
          <ConsolePanel
            messages={messages}
            status={status}
            onTogglePreserveLogs={handleTogglePreserveLogs}
            preserveLogs
          />
        </div>
      </Main.Content>
    </Main>
  );
}

export default CodeEditor;
