import { createThirdwebClient } from "thirdweb";
import { darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({ clientId });

export const wallets = [ createWallet("io.metamask"), createWallet("com.coinbase.wallet") ];

export const theme = darkTheme({
  colors: {
    modalBg: "hsl(0, 0%, 10%)",
    borderColor: "hsl(0, 0%, 100%)",
    accentText: "hsl(246, 100%, 69%)",
  },
});
