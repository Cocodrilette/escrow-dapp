import { ManagerContractComponentProps } from "./Contract";
export default function ContractsByOwner({
  getContractsByOwner,
}: ManagerContractComponentProps) {
  return (
    <div className="border rounded-md">
      <h1 className="text-3xl font-bold font-mono border-b my-5 text-center">
        Your contracts
      </h1>
    </div>
  );
}
