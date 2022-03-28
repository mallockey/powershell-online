import React, { FC } from "react";
import ReactLoading from "react-loading";
import { CommandResponseType } from "./types";

interface CommandResponseProps {
  loading: boolean;
  commandResponse: CommandResponseType;
}

const CommandResponse: FC<CommandResponseProps> = ({
  loading,
  commandResponse,
}) => {
  return (
    <div className="mt-2  w-full mb-6 h-full ">
      <div className="text-white ml-2 justify-center rounded-tl-md rounded-tr-md flex w-16 bg-vscode-dark">
        <span>Output</span>
      </div>
      <div className="bg-vscode-dark h-full ml-2 rounded-tr-md overflow-y-auto">
        {loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <ReactLoading
              type="spin"
              color="rgba(59, 130, 246)"
              height={100}
              width={50}
            />
          </div>
        ) : (
          <div className="p-4 text-sm">
            {commandResponse.error ? (
              <pre className="text-red-600">
                {commandResponse.commandOutput}
              </pre>
            ) : (
              <pre className="text-white">{commandResponse.commandOutput}</pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandResponse;
