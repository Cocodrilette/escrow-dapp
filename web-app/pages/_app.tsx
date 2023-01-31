import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import "@/styles/globals.css";
import { AppContextProvider } from "../hooks/AppContext";
import { WagmiConfig } from "wagmi";
import { client } from "../ConnectKit/config";
import { ConnectKitProvider } from "connectkit";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppContextProvider>
        <WagmiConfig client={client}>
          <ThemeProvider enableSystem={true} attribute="class">
            <ConnectKitProvider>
              <Component {...pageProps} />
            </ConnectKitProvider>
          </ThemeProvider>
        </WagmiConfig>
      </AppContextProvider>
    </>
  );
}
