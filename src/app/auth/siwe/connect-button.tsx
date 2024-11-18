import { doLogout, getLoginPayload, isLoggedIn, login } from "@/app/auth/siwe/actions";
import { client, theme, wallets } from "@/components/thirdweb";
import { useSearchParams } from "next/navigation";
import { ConnectButton as ThirdwebConnectButton } from "thirdweb/react";

const ConnectButton = () => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl") || "/auth/complete";
  const doLogin = login.bind(null, redirectUrl);
  return (
    <ThirdwebConnectButton
      client={client}
      wallets={wallets}
      theme={theme}
      appMetadata={{ name: "Thirdweb", url: "https://static.thirdweb.com" }}
      connectModal={{ size: "compact" }}
      auth={{ isLoggedIn, doLogin, getLoginPayload, doLogout }}
    />
  );
};

ConnectButton.displayName = "ConnectButton";
export { ConnectButton };
