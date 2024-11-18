import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { ThirdwebProvider } from "thirdweb/react";

export const metadata: Metadata = {
  title: "SIWE",
};

const SIWELayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  );
};

SIWELayout.displayName = "SIWELayout";

export default SIWELayout;
