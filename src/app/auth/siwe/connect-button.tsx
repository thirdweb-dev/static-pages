import {
  doLogout,
  getLoginPayload,
  isLoggedIn,
  login,
} from "@/app/auth/siwe/actions";
import { client, theme } from "@/components/thirdweb";
import { useSearchParams } from "next/navigation";
import { ConnectButton as ThirdwebConnectButton } from "thirdweb/react";
import { createWallet, WalletId } from "thirdweb/wallets";

const ConnectButton = () => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");
  const walletParam = searchParams.get("wallets");
  const walletOverrides = walletParam
    ? (walletParam.split(",") as WalletId[])
    : [];
  const hasWalletOverrides = walletOverrides.length > 0;
  const wallets = hasWalletOverrides
    ? walletOverrides.map((walletId) => createWallet(walletId))
    : [
        createWallet("io.metamask"),
        createWallet("com.coinbase.wallet"),
        createWallet("xyz.abs"),
      ];

  const doLogin = login.bind(null, redirectUrl);
  return (
    <ThirdwebConnectButton
      client={client}
      wallets={wallets}
      showAllWallets={!hasWalletOverrides}
      theme={theme}
      appMetadata={{ name: "Thirdweb", url: "https://static.thirdweb.com" }}
      connectModal={{ size: "compact" }}
      auth={{ isLoggedIn, doLogin, getLoginPayload, doLogout }}
      autoConnect={false}
    />
  );
};

ConnectButton.displayName = "ConnectButton";
export { ConnectButton };
