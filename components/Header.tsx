import React, { FC } from "react";
import Image from "next/image";
import ReactLoading from "react-loading";

interface HeaderProps {
  handleSendCommand: () => void;
  loading: boolean;
}

const Header: FC<HeaderProps> = ({ handleSendCommand, loading }) => {
  let buttonStyle =
    "rounded-xl text-white p-4 m-4 flex items-center justify-center";
  buttonStyle += loading ? " bg-red-600 " : " bg-blue-500 ";

  return (
    <div className="flex bg-vscode-dark border-b">
      <div className="w-1/2 text-white flex items-center pl-2">
        <Image src="/powershell-icon.svg" height={50} width={50} alt="" />
        <span className="ml-2 font-bold">PowerShell Online</span>
      </div>
      <button className={buttonStyle} type="button" onClick={handleSendCommand}>
        {loading ? (
          <ReactLoading
            type="spin"
            color="rgba(59, 130, 246)"
            height={15}
            width={15}
          />
        ) : (
          <Image src="/play-icon.png" height={15} width={15} alt="" />
        )}

        <span className="ml-2 font-bold text-sm">
          {loading ? "Cancel Command" : "Run"}
        </span>
      </button>
    </div>
  );
};

export default Header;
