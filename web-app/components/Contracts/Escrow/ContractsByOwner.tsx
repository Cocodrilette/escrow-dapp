export default function ContractsByOwner({ children }: any) {
  return (
    <div className="border-2 rounded-md w-full">
      <h1 className="text-3xl font-bold font-mono border-b-2 my-5 text-center">
        Your contracts
      </h1>
      <div className="flex flex-col gap-5 p-5">{children}</div>
    </div>
  );
}
