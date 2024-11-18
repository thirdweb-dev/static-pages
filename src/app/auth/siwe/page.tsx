"use client";
import { generatePayload, isLoggedIn, login, logout } from "@/app/auth/siwe/actions";
import { client, theme, wallets } from "@/components/thirdweb";
import type { Address } from "thirdweb";
import { ConnectButton } from "thirdweb/react";



const SIWEPage = () => {
  return (
    <div className="flex flex-col grow justify-center items-center">
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={theme}
        appMetadata={{ name: "Thirdweb", url: "https://static.thirdweb.com" }}
        connectModal={{ size: "compact" }}
        auth={{
          isLoggedIn: (address) => isLoggedIn(address as Address),
          doLogin: (params) => login(params),
          getLoginPayload: async ({ address }) => generatePayload(address as Address),
          doLogout:  () => logout(),
        }}
      />

    </div>

  );
};

SIWEPage.displayName = "SIWEPage";

export default SIWEPage;
