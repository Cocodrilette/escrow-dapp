import { createClient } from "wagmi";
import { MUMBAI_URL } from "../constants/index";
import { getDefaultClient } from "connectkit";
import { polygonMumbai, hardhat } from "wagmi/chains";

const alchemyId = MUMBAI_URL;

export const client = createClient(
  getDefaultClient({
    autoConnect: false,
    appName: "Escrowing",
    alchemyId,
    chains: [polygonMumbai],
  })
);
