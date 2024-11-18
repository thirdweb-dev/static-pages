"use client";
import { generatePayload, isLoggedIn, login, logout } from "@/app/auth/siwe/actions";
import { client, theme, wallets } from "@/components/thirdweb";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { Address } from "thirdweb";
import { ConnectButton } from "thirdweb/react";

const SIWEPage = () => {
  const searchParams = useSearchParams();
  return (
    <div className="flex flex-col grow justify-center items-center">
      <Suspense>
        <ConnectButton
          client={client}
          wallets={wallets}
          theme={theme}
          appMetadata={{ name: "Thirdweb", url: "https://static.thirdweb.com" }}
          connectModal={{ size: "compact" }}
          auth={{
            isLoggedIn: (address) => isLoggedIn(address as Address),
            doLogin: (params) => login(params, searchParams.get("redirectUrl")),
            getLoginPayload: async ({ address }) => generatePayload(address as Address),
            doLogout: () => logout(),
          }}
        />
      </Suspense>
    </div>

  );
};

SIWEPage.displayName = "SIWEPage";

export default SIWEPage;
