import Editor from "@monaco-editor/react";
import {
  Button,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@waitingonalice/design-system";
import { useRouter } from "next/router";
import { Main, Spinner } from "~/components";
import { clientRoutes } from "~/constants";
import { ConsolePanel } from "./component/ConsolePanel";
import { JudgePanel } from "./component/JudgePanel";
import { Language } from "./component/Language";
import { ThemeDropdown } from "./component/ThemeDropdown";
import { useEditor } from "./hooks/useEditor";
import { themeOptions } from "./utils/theme";

function CodeEditor() {
  const {
    editorOptions,
    messages,
    input,
    status,
    preserveLogs,
    allowAutomaticCodeExecution,
    addToCollectionLoading,
    debounceExecute,
    handleOnChange,
    handleSelectedConsoleOption,
    handleOnMount,
    handleSelectTheme,
    handleAddToCollection,
  } = useEditor();
  const { push } = useRouter();

  const handleBackClick = () => {
    push(clientRoutes.dashboard.index);
  };

  const handleRun = () => {
    debounceExecute(input);
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
            disabled={input.length === 0 || addToCollectionLoading}
          >
            {addToCollectionLoading ? <Spinner /> : "Add to collection"}
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
                  onExecuteCode={handleRun}
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
