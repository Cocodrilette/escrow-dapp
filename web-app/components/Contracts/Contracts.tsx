import { useState, useEffect } from "react";

import ContractsByOwner from "./Escrow/ContractsByOwner";
import CreateContract from "./Manager/CreateContract";
import useAppContext, { AppContext } from "../../hooks/AppContext";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils.js";
import Contract from "./Escrow/Contract";
import { escrowContractAbi } from "../../constants/index";
import { Escrow } from "../../../hardhat-env/typechain-types/Escrow";
import {
  managerContractAddress,
  managerContractAbi,
} from "../../constants/index";

export interface ContractComponentProps {
  createNewEscrow?: (
    arbiter: string,
    beneficiary: string,
    amount: string
  ) => Promise<boolean | Error | undefined>;

  getContractsByOwner?: () => Promise<any>;

  contractsByOwner?: string[];
}

export interface ContractsByOwnerProps {
  contract: Escrow;
  key: number;
}

export default function Contracts() {
  const { getProviderOrSigner } = useAppContext() as AppContext;
  const [addressesByOwner, setAddressesByOwner] = useState([]);
  const [contractsByOwner, setContractsByOwner] = useState<
    ContractsByOwnerProps[]
  >([]);

  const createNewEscrow = async (
    arbiter: string,
    beneficiary: string,
    amount: string
  ): Promise<boolean | Error | undefined> => {
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

      await tx.wait();

      await getContractsByOwner_();

      if (tx) return true;
    } catch (error) {
      console.error({ error });
      return Error(JSON.stringify(error));
    }
  };

  const getContractsByOwner_ = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const managerContract = new ethers.Contract(
        managerContractAddress,
        managerContractAbi,
        signer
      );

      const tx = await managerContract.getContractsByOwner();
      setAddressesByOwner(tx);

      const escrowContracts = await Promise.all(
        tx.map(async (address: string) => {
          const escrowContract = new ethers.Contract(
            address,
            escrowContractAbi,
            signer
          ) as Escrow;
          return {
            contract: escrowContract,
          };
        })
      );

      setContractsByOwner(escrowContracts);

      if (tx) return true;
    } catch (error) {
      console.error({ error });
    }
  };

  const renderContractsByOwner = () => {
    return contractsByOwner.map(
      (contract: ContractsByOwnerProps, key: number) => {
        return <Contract contract={contract.contract} key={key}></Contract>;
      }
    );
  };

  useEffect(() => {
    getContractsByOwner_();
  }, []);

  return (
    <div className="lg:flex lg:flex-row flex-col mx-5 gap-10">
      <div className="flex-1 my-3">
        <CreateContract createNewEscrow={createNewEscrow} />
      </div>
      <div className="flex-1 my-3">
        <ContractsByOwner contractsByOwner={contractsByOwner}>
          {renderContractsByOwner()}
        </ContractsByOwner>
      </div>
    </div>
  );
}
