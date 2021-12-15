import { useWeb3React } from "@web3-react/core";
import Login from "../components/login";
import Header from "../components/header";
import Form from "../components/form";
import Transactions from "../components/transactions";

export default function Home() {
  const { active } = useWeb3React();

  return (
    <div className="w-full flex justify-center h-screen">
      {active == true ? (
        <div className="flex flex-col space-y-8">
          <Header />
          <Form />
          <Transactions />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
