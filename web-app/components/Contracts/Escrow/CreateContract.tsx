import { Dispatch, SyntheticEvent, useReducer, useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { parseEther } from "ethers/lib/utils.js";

import { ManagerContractComponentProps } from "./Contract";

type CreateContractReducer = [
  { arbiter: string; beneficiary: string; amount: string },
  Dispatch<any>
];

export default function CreateContract({
  createNewEscrow,
  getContractsByOwner,
}: ManagerContractComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [addressInputError, setAddressInputError] = useState(false);
  const [event, updateEvent]: CreateContractReducer = useReducer(
    (prev: any, next: any): any => {
      return { ...prev, ...next };
    },
    { arbiter: "", beneficiary: "", amount: "" }
  );

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await createNewEscrow?.(event.arbiter, event.beneficiary, event.amount);
      await getContractsByOwner?.();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error({ error });
    }
  };

  const handleOnChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.classList.contains("address")) {
      if (target.value.length === 42) {
        target.classList.remove("border-red-500");
        target.classList.add("border-green-500");
        setAddressInputError(false);
      } else {
        target.classList.remove("border-green-500");
        target.classList.add("border-red-500");
        setAddressInputError(true);
      }
    }
  };

  return (
    <div className="border rounded-md">
      <h1 className="text-3xl font-bold font-mono border-b my-5 text-center">
        Create Escrow
      </h1>
      <form className="flex flex-col gap-5 p-5">
        <div className="flex flex-col">
          <label htmlFor="arbiter">Arbiter</label>
          <input
            className="address border rounded-sm p-2"
            type="text"
            name="arbiter"
            placeholder="0xf39Fd6e51aad88F6F4aSce6aB..."
            onChange={(e) => {
              handleOnChange(e);
              updateEvent({ arbiter: e.target.value });
            }}
          />
          {addressInputError && <p>Please provide a valid address</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="beneficiary">Beneficiary</label>
          <input
            className="address border rounded-sm p-2"
            type="text"
            name="beneficiary"
            placeholder="0x8F4ce6aB8827279cffFb92266..."
            onChange={(e) => {
              handleOnChange(e);
              updateEvent({ beneficiary: e.target.value });
            }}
          />
          {addressInputError && <p>Please provide a valid address</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="amount">Amount</label>
          <input
            className="border rounded-sm p-2"
            type="text"
            name="amount"
            placeholder="0.5"
            onChange={(e) => {
              handleOnChange(e);
              updateEvent({ amount: e.target.value });
            }}
          />
          <small className="flex gap-1 items-center">
            <CiCircleAlert /> Amount in Wei
          </small>
        </div>
        <button
          className="transition-all duration-300 bg-[#4ae5e5] p-2 text-black hover:rounded-xl"
          onClick={(e) => handleSubmit(e)}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              Creating <AiOutlineLoading3Quarters className="animate-spin" />
            </span>
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
}
