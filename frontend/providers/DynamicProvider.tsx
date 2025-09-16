"use client";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import {
  DynamicContextProvider,
  IsBrowser,
} from "@dynamic-labs/sdk-react-core";

export default function DynamicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IsBrowser>
      <DynamicContextProvider
        settings={{
          environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID || "",
          walletConnectors: [EthereumWalletConnectors],
          useMetamaskSdk: true,
        }}
      >
        {children}
      </DynamicContextProvider>
    </IsBrowser>
  );
}
