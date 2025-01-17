import { createThirdwebClient } from "thirdweb";
import { darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "";

if (!clientId) {
  throw new Error("No client ID provided");
}

const client = createThirdwebClient({ clientId });

const theme = darkTheme({
  colors: {
    modalBg: "hsl(0, 0%, 10%)",
    borderColor: "hsl(0, 0%, 100%)",
    accentText: "hsl(246, 100%, 69%)",
  },
});

export { clientId, client, theme };
