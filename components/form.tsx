import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Form() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const usdtAddress = "0x18696aE68855e95674765d4Dbbc54dF6F8a66290";
  const taskAddress = "0x02cB34d293e74D3328321c0E32898e42D8594895";

  const usdtAbi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "newPrice",
          type: "uint256",
        },
      ],
      name: "changePrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "subtractedValue",
          type: "uint256",
        },
      ],
      name: "decreaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "ethBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "addedValue",
          type: "uint256",
        },
      ],
      name: "increaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "price",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const taskAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_tokenAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Provide",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Withdraw",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "balance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "provide",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenAddress",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  let signer = library.getSigner(account);

  const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, signer);
  const taskContract = new ethers.Contract(taskAddress, taskAbi, signer);

  const [usdtBalance, setUsdtBalance] = useState(0);
  const [taskBalance, setTaskBalance] = useState(0);

  const [provideInput, setProvideInput] = useState<number>();
  const [provideLoading, setProvideLoading] = useState(false);

  const [withdrawInput, setWithdrawInput] = useState<number>();
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  useEffect(() => {
    getUsdtBalance();
    getTaskBalance();
    checkAllowance();
  }, [account]);

  const getUsdtBalance = async () => {
    const weiBalance = await usdtContract.balanceOf(account);
    const balance = weiBalance.toString() / 10 ** 18;
    return setUsdtBalance(balance);
  };

  const provideUsdt = async (e) => {
    e.preventDefault();

    if (usdtBalance < provideInput && usdtBalance !== 0)
      return alert("Not enought balance of USDT");

    if (!provideInput) return alert("Set USDT value to provide");

    const correctUsdt = provideInput * 10 ** 18;

    const allowed = await checkAllowance();

    if (allowed >= provideInput) {
      const approveProvide = await taskContract.provide(correctUsdt.toString());
      return console.log("Отправили", approveProvide);
    } else {
      const addAllowedValue = (allowed + (provideInput - allowed)) * 10 ** 18;
      console.log("Увеличиваем лимит", addAllowedValue);
      const approveUsdt = await usdtContract.approve(
        taskAddress,
        addAllowedValue.toString()
      );
      console.log("approveUsdt лимит", approveUsdt);
      setProvideLoading(true);
      const done = await library.waitForTransaction(approveUsdt.hash);
      if (done) {
        const approveProvide = await taskContract.provide(
          correctUsdt.toString()
        );
        const sent = await library.waitForTransaction(approveProvide.hash);
        if (sent) {
          getUsdtBalance();
          getTaskBalance();
          setProvideLoading(false);
          return console.log("Отправили", approveProvide);
        }
      }
    }
  };

  const withdrawUsdt = async (e) => {
    e.preventDefault();
    if (taskBalance < withdrawInput && withdrawInput !== 0)
      return alert("Not enought USDT for withdrawt");
    if (!withdrawInput) return alert("Set USDT value to withdraw");

    setWithdrawLoading(true);

    const value = ethers.utils.parseEther(withdrawInput.toString());

    const withdrawRequest = await taskContract.withdraw(value);
    const done = await library.waitForTransaction(withdrawRequest.hash);
    if (done) {
      getUsdtBalance();
      getTaskBalance();
      setWithdrawLoading(false);
    }
  };

  const getTaskBalance = async () => {
    const weiBalance = await taskContract.balance(account);
    const balance = weiBalance.toString() / 10 ** 18;
    return setTaskBalance(balance);
  };

  const checkAllowance = async () => {
    const allow = await usdtContract.allowance(account, taskAddress);
    console.log(allow);
    return allow.toString() / 10 ** 18;
  };

  return (
    <div className="flex w-full justify-between space-x-44">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold">Provide Tokens</h2>
        <form onSubmit={provideUsdt}>
          <input
            type="number"
            step="0.000000000000000001"
            min="0"
            value={provideInput}
            onChange={(e) => setProvideInput(parseFloat(e.target.value))}
            placeholder="Ammount"
            className="focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-200 focus:bg-gray-100 rounded-md px-2 py-1"
          />
          <p className="text-sm mt-1">
            Your balance:{" "}
            <span className="pl-2 font-bold">{usdtBalance.toFixed(3)}</span>{" "}
            USDT
          </p>
          <button
            disabled={provideLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full rounded-md px-2 py-1 mt-4"
            type="submit"
          >
            {provideLoading ? (
              <div className="flex space-x-2 justify-center items-center">
                <svg
                  className="animate-spin -ml-1 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p>Providing</p>
              </div>
            ) : (
              <p>Provide</p>
            )}
          </button>
        </form>
      </div>
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold">Withdraw Tokens</h2>
        <form onSubmit={withdrawUsdt}>
          <input
            type="number"
            step="0.000000000000000001"
            min="0"
            value={withdrawInput}
            onChange={(e) => setWithdrawInput(parseFloat(e.target.value))}
            placeholder="Ammount"
            className="focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-200 focus:bg-gray-100 rounded-md px-2 py-1"
          />
          <p className="text-sm mt-1">
            Available:{" "}
            <span className="pl-2 font-bold">{taskBalance.toFixed(3)}</span>{" "}
            USDT
          </p>
          <button
            disabled={withdrawLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full rounded-md px-2 py-1 mt-4"
            type="submit"
          >
            {withdrawLoading ? (
              <div className="flex space-x-2 justify-center items-center">
                <svg
                  className="animate-spin -ml-1 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p>Processing</p>
              </div>
            ) : (
              <p>Withdraw</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
