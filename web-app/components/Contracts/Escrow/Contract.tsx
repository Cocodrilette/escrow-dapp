import { useState } from "react";

import ContractsByOwner from "./ContractsByOwner";
import CreateContract from "./CreateContract";
import useAppContext, { AppContext } from "../../../hooks/AppContext";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils.js";
import {
  managerContractAddress,
  managerContractAbi,
} from "../../../constants/index";

export interface ManagerContractComponentProps {
  createNewEscrow?: (
    arbiter: string,
    beneficiary: string,
    amount: string
  ) => Promise<boolean | Error>;

  getContractsByOwner?: () => Promise<any>;

  contractsByOwner?: string[];
}

export default function Contract() {
  const { getProviderOrSigner } = useAppContext() as AppContext;
  const [contractsByOwner, setContractsByOwner] = useState([]);

  const createNewEscrow = async (
    arbiter: string,
    beneficiary: string,
    amount: string
  ): Promise<boolean | Error> => {
    try {
      const signer = await getProviderOrSigner(true);
      const managerContract = new ethers.Contract(
        managerContractAddress,
        managerContractAbi,
        signer
      );

      const tx = await managerContract.deployNewEscrow(arbiter, beneficiary, {
        value: parseEther(amount),
      });

      const res = await tx.wait();
      console.log({ res });

      return true;
    } catch (error) {
      console.error({ error });
      return Error(JSON.stringify(error));
    }
  };

  const getContractsByOwner = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const managerContract = new ethers.Contract(
        managerContractAddress,
        managerContractAbi,
        signer
      );

      const tx = await managerContract.getContractsByOwner();

      console.log({ tx });
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 mx-5 gap-10">
      <CreateContract
        createNewEscrow={createNewEscrow}
        getContractsByOwner={getContractsByOwner}
      />
      <ContractsByOwner
        getContractsByOwner={getContractsByOwner}
        contractsByOwner={contractsByOwner}
      />
    </div>
  );
}
