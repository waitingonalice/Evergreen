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
import { useAddToCollection } from "./loaders/collection";
import { themeOptions } from "./utils/theme";

function CodeEditor() {
  const {
    editorOptions,
    messages,
    input,
    status,
    preserveLogs,
    handleOnChange,
    handleClearInput,
    handleOnMount,
    handleSelectTheme,
    handleClearConsole,
    handlePreserveLog,
    handleToggleExpand,
  } = useEditor();
  const { push } = useRouter();
  const [addToCollection, options] = useAddToCollection({
    onSuccess: () => handleClearInput(),
    onError: () => {},
  });

  const handleAddToCollection = async () => {
    await addToCollection(input);
  };

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
        rightChildren={
          <AddCollection
            onAdd={handleAddToCollection}
            disabled={input.length === 0}
            loading={options.isLoading}
          />
        }
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
            onToggleView={handleToggleExpand}
          />
          {/* Judge panel */}
          <ConsolePanel
            result={messages}
            status={status}
            onSelectOption={handleSelectedConsoleOption}
            preserveLogs={preserveLogs}
            onToggleView={handleToggleExpand}
          />
        </div>
      </Main.Content>
    </Main>
  );
}

export default CodeEditor;
