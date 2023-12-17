/* eslint-disable @typescript-eslint/no-unused-vars */
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import { Main } from "~/components";
import { clientRoutes } from "~/constants";
import { ThemeDropdown } from "./component/Theme";
import { useEditor } from "./hooks/useEditor";
import { themeOptions } from "./utils/theme";

function CodeEditor() {
  const navigate = useNavigate();
  const {
    editorOptions,
    input,
    onChange,
    onMount,
    onSelectTheme,
    onSelectLanguage,
  } = useEditor();

  const handleBackClick = () => {
    navigate(clientRoutes.dashboard.index);
  };

  const handleSelectTheme = (val: string) => {
    onSelectTheme(val);
  };

  return (
    <Main>
      <Main.Header title="Code Editor" onBackClick={handleBackClick}>
        <div>
          <ThemeDropdown
            options={themeOptions}
            onSelect={handleSelectTheme}
            selectedValue={editorOptions.theme || ""}
          />
        </div>
      </Main.Header>
      <Main.Content>
        <Editor {...editorOptions} onChange={onChange} onMount={onMount} />
      </Main.Content>
    </Main>
  );
}

export default CodeEditor;
