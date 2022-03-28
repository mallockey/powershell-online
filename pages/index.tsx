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
  const [command, setCommand] = useState<string | undefined>("");
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
        if (!command) return;
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
      `$RedditRequest = Invoke-RestMethod -Uri https://www.reddit.com/r/powershell/hot/.json\n$RedditLinks = $RedditRequest.data.children.data\n\n$RedditLinks | Foreach-Object {	$_.Title }`
    );
  }, []);

  return (
    <div className="flex-col h-5/6">
      <Head>
        <link rel="icon" href="/powershell-icon.svg" />
        <title>{loading ? "Running command..." : "PowerShell Online"}</title>
      </Head>
      <Header loading={loading} handleSendCommand={handleSendCommand} />
      <Split className="flex h-full shadow-xl  mt-4 mr-4 ml-4 " gutterSize={10}>
        <CodeEditor command={command} setCommand={setCommand} />
        <CommandResponse loading={loading} commandResponse={commandResponse} />
      </Split>
    </div>
  );
};

export default Home;
