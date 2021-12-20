import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { shortAddress } from "../lib/shortAddres";
import * as moment from "moment";
import Button from "./ui/button";
import { TaskAbi__factory } from "../types/ethers-contracts";

export default function Transactions() {
  const { account, library } = useWeb3React();

  const [transactions, setTransactions] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const taskAddress = "0x02cB34d293e74D3328321c0E32898e42D8594895";
  let signer = library.getSigner(account);
  const taskContract = TaskAbi__factory.connect(taskAddress, signer);

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
      <div className="flex justify-between mb-4 items-center">
        <h3 className="font-bold text-xl">Transactions history:</h3>
        <Button
          title="Refresh data"
          style="outline"
          loading={dataLoading}
          onClick={getLastData}
        />
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
