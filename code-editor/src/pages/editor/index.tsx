import Editor from "@monaco-editor/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Toaster,
  useToast,
} from "@waitingonalice/design-system";
import { useRouter } from "next/router";
import { Main } from "~/components";
import { clientRoutes } from "~/constants";
import { useKeybind } from "~/utils";
import { AddCollection } from "./component/AddToCollection";
import { ConsolePanel, ConsoleType } from "./component/ConsolePanel";
import { JudgePanel } from "./component/JudgePanel";
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
  } = useEditor();
  const { push } = useRouter();
  const { renderToast } = useToast();

  const [addToCollection, options] = useAddToCollection({
    onSuccess: () => {
      handleClearInput();
      renderToast({
        title: "Successfully saved!",
        description: "Code snippet was added to collection.",
        variant: "success",
      });
    },
    onError: () => {
      renderToast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
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
              selectedValue={editorOptions.theme}
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
        <ResizablePanelGroup
          direction="vertical"
          className="min-h-[calc(100vh-54px)]"
        >
          <ResizablePanel defaultSize={50}>
            <Editor
              {...editorOptions}
              onChange={handleOnChange}
              onMount={handleOnMount}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50}>
                <ConsolePanel
                  result={messages}
                  status={status}
                  onSelectOption={handleSelectedConsoleOption}
                  preserveLogs={preserveLogs}
                />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                {/* Judge panel */}
                <JudgePanel code={input} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Main.Content>
    </Main>
  );
}

export default CodeEditor;
