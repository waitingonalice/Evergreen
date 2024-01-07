import Editor from "@monaco-editor/react";
import {
  Button,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@waitingonalice/design-system";
import { useRouter } from "next/router";
import { Main, Spinner } from "~/components";
import { useAppContext } from "~/components/app-context";
import { clientRoutes } from "~/constants";
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
    allowAutomaticCodeExecution,
    handleOnChange,
    handleClearInput,
    handleOnMount,
    handleSelectTheme,
    handleClearConsole,
    handlePreserveLog,
    handleExecute,
    handleAutomaticCodeExecution,
  } = useEditor();
  const { push } = useRouter();
  const { renderToast } = useAppContext();

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
    if (val === "automaticCompilation") {
      handleAutomaticCodeExecution();
      if (!allowAutomaticCodeExecution)
        renderToast({
          title: "Automatic compilation enabled",
          description:
            "Warning: Enabling this feature may negatively impact browser performance. Preserving of logs will be disabled.",
          variant: "warning",
        });
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
              selectedValue={editorOptions.theme}
            />
            <Language />
          </>
        }
        rightChildren={
          <Button
            className="relative"
            size="small"
            onClick={handleAddToCollection}
            disabled={input.length === 0 || options.isLoading}
          >
            {options.isLoading ? <Spinner /> : "Add to collection"}
          </Button>
        }
      />

      <Main.Content>
        <ResizablePanelGroup
          direction="vertical"
          className="min-h-[calc(100vh-54px)]"
        >
          <ResizablePanel defaultSize={75}>
            <Editor
              {...editorOptions}
              onChange={handleOnChange}
              onMount={handleOnMount}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={25}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50}>
                <ConsolePanel
                  result={messages}
                  status={status}
                  preserveLogs={preserveLogs}
                  allowAutomaticCompilation={allowAutomaticCodeExecution}
                  onExecuteCode={handleExecute}
                  onSelectOption={handleSelectedConsoleOption}
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
