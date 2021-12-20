import { useWeb3React } from "@web3-react/core";
import { injected } from "../lib/connector";
import Button from "./ui/button";

export default function Login() {

  const { activate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Button 
      title="Connect with Metamask"
      onClick={connect} />
    </div>
  );
}
