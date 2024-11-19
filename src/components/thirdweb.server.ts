import { client } from "@/components/thirdweb";
import { createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";

const privateKey = process.env.THIRDWEB_AUTH_PRIVATE_KEY;

if (!privateKey) {
  throw new Error("No private key provided");
}

const adminAccount = privateKeyToAccount({ client, privateKey });

export const auth = createAuth({ domain: "https://static.thirdweb.com", client, adminAccount });
