import ManagerContract from "../contracts/Manager.json";
import EscrowContract from "../contracts/Escrow.json";

export const WALLET_CONNECT_KEY =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_KEY || "";

export const MUMBAI_URL = process.env.NEXT_PUBLIC_MUMBAI_URL || "";

export const escrowContractAddress = EscrowContract.address as `0x${string}`;

export const escrowContractAbi = EscrowContract.abi;

export const managerContractAddress = ManagerContract.address as `0x${string}`;

export const managerContractAbi = ManagerContract.abi;
