import { useWeb3React } from "@web3-react/core";
import { shortAddress } from "../lib/shortAddres";
import Button from "./ui/button";

export default function Header() {
  const { account, deactivate } = useWeb3React();

  async function disconnect() {
    try {
      deactivate();
    } catch (err) {
      console.log("Error: ", err);
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
      <Button title="Disconnect" onClick={disconnect} style="outline" />
    </div>
  );
}
