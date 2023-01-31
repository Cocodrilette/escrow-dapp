import { useRef, useEffect, createContext, useMemo, useContext } from "react";
import { providers } from "ethers";
import Web3Modal from "web3modal";

export interface AppContext {
  getProviderOrSigner: (needSigner?: boolean) => Promise<any>;
}

export const AppContext = createContext<AppContext | null>(null);

export const AppContextProvider = ({ children }: any) => {
  const web3ModalRef = useRef() as React.MutableRefObject<Web3Modal>;

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      network: "goerli",
      providerOptions: {},
      disableInjectedProvider: false,
    });
  });

  const values: AppContext = useMemo(
    () => ({
      getProviderOrSigner,
    }),
    []
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  const appContext = useContext(AppContext);

  if (!appContext) {
    return console.error({ error: "ERROR_DEPLOYING_ETHEREUM_CONTEXT" });
  }

  return appContext;
}

export default useAppContext;
