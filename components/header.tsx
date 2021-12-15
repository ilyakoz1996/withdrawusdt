import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { shortAddress } from "../lib/shortAddres";

export default function Header() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const [usdtBalance, setUsdtBalance] = useState("-");

  useEffect(() => {
    setUsdtBalance(account)
  }, [account]);

  async function disconnect() {
    try {
      deactivate()
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  return (
    <div className="flex justify-between items-center mt-8">
      <div className="flex space-x-2 items-end font-bold bg-lightBlueBg rounded-3xl">

                <h3 className="text-xl font-bold">Wallet</h3>

              <div className="hidden lg:block">{}</div>
              <div title={account} className="bg-lightGrayBg rounded-xl px-2">
                {shortAddress(account)}
              </div>
            </div>
      <button onClick={disconnect} className="py-1 px-2 font-bold hover:text-white rounded-md border hover:bg-red-500">Disconnect</button>
    </div>
  );
}
