import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { shortAddress } from "../lib/shortAddres";
import * as moment from "moment";

export default function Transactions() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const [transactions, setTransactions] = useState([]);
  const taskAddress = "0x02cB34d293e74D3328321c0E32898e42D8594895";
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
  const taskContract = new ethers.Contract(taskAddress, taskAbi, signer);

  const [dataLoading, setDataLoading] = useState(false);

  const getLastData = async () => {
    setDataLoading(true);

    let transactionsArr = [];

    const currentBlock = await library.getBlockNumber();

    let history = await taskContract.queryFilter(
      { address: taskAddress },
      0,
      currentBlock
    );
    const historyLastTen = history.slice(Math.max(history.length - 10, 1));
    for (const item of historyLastTen) {
      console.log(item);
      const date = await library.getBlock(item.blockNumber);
      const time = moment.unix(date.timestamp).format("MM/DD/YYYY HH:mm:ss");
      const event = item.event;
      const amount = ethers.utils.formatUnits(item.args.amount);
      const from = item.args.from ? item.args.from : item.address;

      transactionsArr.push({
        from: from,
        amount: amount,
        event: event,
        time: time,
      });
    }

    setTransactions(transactionsArr);
    setDataLoading(false);
  };

  useEffect(() => {
    getLastData();
    taskContract.on("Provide", function () {
      getLastData();
    });
    taskContract.on("Withdraw", function () {
      getLastData();
    });
  }, [account]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold text-xl">Transactions history:</h3>
        <button
          disabled={dataLoading}
          onClick={getLastData}
          className={`py-1 px-2 font-bold hover:text-white rounded-md border hover:bg-blue-500 ${
            dataLoading && "bg-blue-400 text-white"
          }`}
        >
          {dataLoading ? (
            <div className="flex space-x-2 items-center">
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
              <p>Updating</p>
            </div>
          ) : (
            <p>Refresh data</p>
          )}
        </button>
      </div>
      <table className="table-auto">
        <thead className="bg-gray-300 ">
          <tr>
            <th>From</th>
            <th>Amount</th>
            <th>Event</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length !== 0 &&
            transactions
              .map((tx) => {
                return (
                  <tr
                    key={tx.time}
                    className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  >
                    <td className="text-center px-2">
                      {tx.from ? shortAddress(tx.from) : "unknown"}
                    </td>
                    <td className="text-center px-2">{tx.amount}</td>
                    <td className="text-center px-2 b">
                      <span
                        className={`px-2 bg-${
                          tx.event === "Provide" ? "blue-300" : "green-200"
                        } rounded-md`}
                      >
                        {tx.event}
                      </span>
                    </td>
                    <td className="text-center px-2">{tx.time}</td>
                  </tr>
                );
              })
              .reverse()}
        </tbody>
      </table>
    </div>
  );
}
