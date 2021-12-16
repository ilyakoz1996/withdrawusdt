import { useWeb3React } from "@web3-react/core";
import { injected } from "../lib/connector";

export default function Login() {
  const { activate } = useWeb3React();

  async function connect() {
    try {
      console.log('нажал')
      await activate(injected);
      console.log(injected)
      
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={connect}
        className="py-1 px-2 text-lg font-bold text-white rounded-lg bg-blue-500 hover:bg-blue-600"
      >
        Connect to MetaMask
      </button>
    </div>
  );
}
