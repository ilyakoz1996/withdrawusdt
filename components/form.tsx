import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { UsdtAbi__factory } from "../types/ethers-contracts/factories/UsdtAbi__factory";
import { TaskAbi__factory } from "../types/ethers-contracts/factories/TaskAbi__factory";
import NumberInput from "./ui/numberInput";

export default function Form() {
  const { account, library } = useWeb3React();

  const usdtAddress = "0x18696aE68855e95674765d4Dbbc54dF6F8a66290";
  const taskAddress = "0x02cB34d293e74D3328321c0E32898e42D8594895";

  const signer = library.getSigner(account);
  const usdtContract = UsdtAbi__factory.connect(usdtAddress, signer);
  const taskContract = TaskAbi__factory.connect(taskAddress, signer);

  const [formValue, setFormValue] = useState({
    provide: {
      value: 0,
      balance: 0,
      loading: false,
    },
    withdraw: {
      value: 0,
      balance: 0,
      loading: false,
    },
  });

  useEffect(() => {
    getBalance();
  }, [account]);

  const getBalance = async () => {
    const weiUsdt = await usdtContract.balanceOf(account);
    const weiWithdraw = await taskContract.balance(account);
    const usdt = parseFloat(weiUsdt.toString()) / 10 ** 18;
    const withdraw = parseFloat(weiWithdraw.toString()) / 10 ** 18;
    return setFormValue((prevValue) => ({
      ...prevValue,
      provide: {
        ...prevValue.provide,
        balance: usdt,
      },
      withdraw: {
        ...prevValue.withdraw,
        balance: withdraw,
      },
    }));
  };

  const checkAllowance = async () => {
    const weiAllowed = await usdtContract.allowance(account, taskAddress);
    const allowed = parseFloat(weiAllowed.toString()) / 10 ** 18;
    return allowed;
  };

  const provideUsdt = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormValue((prevValue) => ({
      ...prevValue,
      provide: {
        ...prevValue.provide,
        loading: true,
      },
    }));

    const waiUsdt = formValue.provide.value * 10 ** 18;

    const allowed = await checkAllowance();

    if (allowed >= formValue.provide.value) {
      const withdraw = await taskContract.provide(waiUsdt.toString());
      const sent = await library.waitForTransaction(withdraw.hash);
      if (sent) {
        getBalance();
        setFormValue((prevValue) => ({
          ...prevValue,
          provide: {
            ...prevValue.provide,
            loading: false,
          },
        }));
      }
    } else {
      const difference = (formValue.provide.value - allowed) * 10 ** 18;
      const approveUsdt = await usdtContract.approve(
        taskAddress,
        difference.toString()
      );
      const approved = await library.waitForTransaction(approveUsdt.hash);
      if (approved) {
        const withdraw = await taskContract.provide(waiUsdt.toString());
        const sent = await library.waitForTransaction(withdraw.hash);
        if (sent) {
          getBalance();
          setFormValue((prevValue) => ({
            ...prevValue,
            provide: {
              ...prevValue.provide,
              loading: false,
            },
          }));
        }
      }
    }
  };

  const withdrawUsdt = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormValue((prevValue) => ({
      ...prevValue,
      withdraw: {
        ...prevValue.withdraw,
        loading: true,
      },
    }));

    const value = formValue.withdraw.value * 10 ** 18;
    const withdrawRequest = await taskContract.withdraw(value.toString());
    const done = await library.waitForTransaction(withdrawRequest.hash);

    if (done) {
      getBalance();
      setFormValue((prevValue) => ({
        ...prevValue,
        withdraw: {
          ...prevValue.withdraw,
          loading: false,
        },
      }));
    }
  };

  return (
    <div className="flex w-full justify-between space-x-44">
      <NumberInput
        type="provide"
        title="Provide Tokens"
        onSubmit={provideUsdt}
        value={formValue.provide.value}
        onChange={(e) =>
          setFormValue((prevValue) => ({
            ...prevValue,
            provide: {
              ...prevValue.provide,
              value: e.target.value,
            },
          }))
        }
        balance={formValue.provide.balance}
        loading={formValue.provide.loading}
      />

      <NumberInput
        type="withdraw"
        title="Withdraw Tokens"
        onSubmit={withdrawUsdt}
        value={formValue.withdraw.value}
        onChange={(e) =>
          setFormValue((prevValue) => ({
            ...prevValue,
            withdraw: {
              ...prevValue.withdraw,
              value: e.target.value,
            },
          }))
        }
        balance={formValue.withdraw.balance}
        loading={formValue.withdraw.loading}
      />
    </div>
  );
}
