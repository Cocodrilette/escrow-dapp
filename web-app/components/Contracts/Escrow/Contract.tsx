import { ContractsByOwnerProps } from "../Contracts";
import { useState, useEffect } from "react";
import { ethers, providers } from "ethers";
import useAppContext from "../../../hooks/AppContext";
import { AppContext } from "../../../hooks/AppContext";

export default function Contract({ key, contract }: ContractsByOwnerProps) {
  const { getProviderOrSigner } = useAppContext() as AppContext;
  const [beneficiary, setBeneficiary] = useState("");
  const [depositor, setDepositor] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [balance, setBalance] = useState("0");

  const getBeneficiary = async () => {
    const beneficiary = await contract.beneficiary();
    setBeneficiary(beneficiary);
  };

  const getDepositor = async () => {
    const depositor = await contract.depositer();
    setDepositor(depositor);
  };

  const getApprovement = async () => {
    const isApproved = await contract.isApproved();

    setIsApproved(isApproved);
  };

  const handleApprove = async () => {
    await contract.approve();
  };

  const getBalance = async () => {
    const provider = await getProviderOrSigner();
    const balance = await provider.getBalance(contract.address);
    setBalance((balance / 10e18).toString());
  };

  useEffect(() => {
    getApprovement();

    if (!isApproved) {
      getBeneficiary();
      getDepositor();
      getBalance();
    }
  }, []);

  return isApproved ? (
    <></>
  ) : (
    <div className="flex flex-col border gap-1" key={key}>
      <div className="flex justify-between items-center border-b p-2">
        <p className="">Waiting for approvement</p>
        <button
          onClick={handleApprove}
          className="transition-all duration-300 bg-green-400 px-3 py-1 rounded-sm hover:rounded-xl border-2 border-green-700 text-black"
        >
          Approve
        </button>
      </div>
      <div className="p-2">
        <h1 className="">Beneficiary: {beneficiary}</h1>
        <h1 className="">Depositor: {depositor}</h1>
      </div>
      <p className="p-2 flex justify-between items-center bg-green-200 font-semibold">
        Amount locked: <span>{balance} ETH</span>
      </p>
    </div>
  );
}
