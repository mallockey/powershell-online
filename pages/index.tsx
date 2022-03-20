import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { CommandResponseType } from "../components/types";

import Split from "react-split";
import Axios from "axios";

import Header from "../components/Header";
import CodeEditor from "../components/CodeEditor";
import CommandResponse from "../components/CommandResponse";
import Head from "next/head";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [command, setCommand] = useState("");
  const [commandResponse, setCommandResponse] = useState<CommandResponseType>({
    error: false,
    commandOutput: "",
  });

  async function handleSendCommand() {
    if (loading) {
      setCommandResponse({
        error: false,
        commandOutput: "",
      });
      setLoading(false);
    } else {
      try {
        setLoading(true);
        const { data } = await Axios.post(
          "https://powershell-repl.herokuapp.com/send-command",
          {
            scriptToExecute: command,
          }
        );
        setCommandResponse(data);
        setLoading(false);
      } catch (err) {
        console.log("There was an error running the commmand");
        console.error(err);
      }
    }
  }

  useEffect(() => {
    setCommand(
      "$MyLuckyNums = @(14,29,54,42) \n \rforeach($Num in $MyLuckyNums) {\n\t Write-Host $Num\n}"
    );
  }, []);

  return (
    <div className="flex-col h-5/6">
      <Head>
        <link rel="icon" href="/powershell-icon.svg" />
        <title>PowerShell Online</title>
      </Head>
      <Header loading={loading} handleSendCommand={handleSendCommand} />
      <Split
        className="flex h-full shadow-xl bg-black mt-4 mr-4 ml-4 "
        gutterSize={5}
      >
        <CodeEditor command={command} setCommand={setCommand} />
        <CommandResponse loading={loading} commandResponse={commandResponse} />
      </Split>
    </div>
  );
};

export default Home;
