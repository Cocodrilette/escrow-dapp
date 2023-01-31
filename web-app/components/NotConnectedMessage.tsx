export default function NotConnectedMessage() {
  return (
    <div className="flex justify-center bg-yellow-200 border-2 border-yellow-400 mx-5 rounded-md p-5">
      <h1 className="text-3xl font-bold text-black">
        Your wallet is not connected. Please connect it to access. 👆
      </h1>
    </div>
  );
}
