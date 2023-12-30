/* eslint-disable @typescript-eslint/no-empty-function */
import Editor from "@monaco-editor/react";
import {
  Toaster,
  useToast,
} from "@waitingonalice/design-system/components/toast";
import { useRouter } from "next/router";
import { Main } from "~/components";
import { clientRoutes } from "~/constants";
import { useKeybind } from "~/utils";
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
  const { renderToast } = useToast();

  const [addToCollection, options] = useAddToCollection({
    onSuccess: () => {
      handleClearInput();
      renderToast({
        title: "Successfully added to collection",
        variant: "success",
      });
    },
    onError: () => {},
  });

  const handleAddToCollection = async () => {
    if (input.length === 0 || options.isLoading) return;
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

  useKeybind(["ControlLeft", "KeyS"], handleAddToCollection);
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
            disabled={input.length === 0 || options.isLoading}
            loading={options.isLoading}
          />
        }
      />

      <Main.Content>
        <Toaster />
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
