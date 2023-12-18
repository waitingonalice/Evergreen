/* eslint-disable @typescript-eslint/no-unused-vars */
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import { Main } from "~/components";
import { clientRoutes } from "~/constants";
import { Language } from "./component/Language";
import { Preview } from "./component/Preview";
import { ThemeDropdown } from "./component/ThemeDropdown";
import { useEditor } from "./hooks/useEditor";
import { themeOptions } from "./utils/theme";

function CodeEditor() {
  const navigate = useNavigate();
  const { editorOptions, input, onChange, onMount, onSelectTheme } =
    useEditor();

  const handleBackClick = () => {
    navigate(clientRoutes.dashboard.index);
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
      <Main.Content>
        <div className="border">
          <Editor {...editorOptions} onChange={onChange} onMount={onMount} />
        </div>
        <div className="flex">
          <Preview />
          <Preview />
        </div>
      </Main.Content>
    </Main>
  );
}

export default CodeEditor;
