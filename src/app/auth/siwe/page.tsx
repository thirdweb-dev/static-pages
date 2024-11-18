"use client";
import { ConnectButton } from "@/app/auth/siwe/connect-button";
import { Suspense } from "react";

const SIWEPage = () => {
  return (
    <div className="flex flex-col grow justify-center items-center">
      <Suspense>
        <ConnectButton />
      </Suspense>
    </div>

  );
};

SIWEPage.displayName = "SIWEPage";

export default SIWEPage;
