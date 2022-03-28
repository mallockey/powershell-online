import React, { FC } from "react";
import Image from "next/image";
import Editor from "@monaco-editor/react";
import ReactLoading from "react-loading";

interface CodeEditorProps {
  setCommand: (value: string) => void;
  command: string | undefined;
}

const CodeEditor: FC<CodeEditorProps> = ({ setCommand, command }) => {
  return (
    <div className="mb-2 sm:mb-0 pr-2 ">
      <div className="flex">
        <div className="text-white flex pl-2 pr-2 rounded-tr-md rounded-tl-md  bg-vscode-dark pb-2">
          <Image src="/powershell-icon.svg" width={20} height={20} alt="" />
          <span className="text-white ml-2"> New-Script.ps1</span>
        </div>
      </div>
      <Editor
        onChange={(value: string | undefined) => {
          if (typeof value === "string") {
            setCommand(value);
          }
        }}
        theme="vs-dark"
        language="powershell"
        defaultValue={command}
        loading={
          <ReactLoading
            type="spin"
            color="rgba(59, 130, 246)"
            height={100}
            width={50}
          />
        }
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
    </div>
  );
};

export default CodeEditor;
