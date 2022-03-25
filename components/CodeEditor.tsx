import React, { FC } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");

if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  require("codemirror/mode/powershell/powershell.js");
  require("codemirror/addon/edit/closebrackets");
  require("codemirror/addon/hint/show-hint");
}

interface CodeEditorProps {
  command: string;
  setCommand: (value: string) => void;
}

const CodeEditor: FC<CodeEditorProps> = ({ command, setCommand }) => {
  return (
    <div className="pr-2 overflow-hidden">
      <div className="flex">
        <span className="text-white pl-2 pr-2 rounded-tr-md rounded-tl-md font-bold bg-gray-700 border-b">
          Editor
        </span>
      </div>
      <CodeMirror
        className="CodeMirror"
        autoCursor={false}
        value={command}
        options={{
          mode: "powershell",
          theme: "material",
          lineNumbers: true,
          spellCheck: true,
          indentWithTabs: true,
          autoCorrect: true,
          autoCloseBrackets: true,
          autoIndent: true,
          autoComplete: true,
          showHint: true,
          Tab: "autocomplete",
        }}
        onChange={(editor, data, value: string) => {
          setCommand(value);
        }}
      />
    </div>
  );
};

export default CodeEditor;
