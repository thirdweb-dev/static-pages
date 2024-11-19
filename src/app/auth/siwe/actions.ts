"use server";
import { clientId } from "@/components/thirdweb";
import { auth } from "@/components/thirdweb.server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Address } from "thirdweb";
import { type GenerateLoginPayloadParams, type LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth";

const embeddedWalletBase = new URL("2024-05-05/", "https://embedded-wallet.thirdweb.com/api/");

export const getLoginPayload = async (params: GenerateLoginPayloadParams) => {
  const url = new URL("login/siwe", embeddedWalletBase);
  url.searchParams.set("clientId", clientId);
  if (params.chainId) {
    url.searchParams.set("chainId", params.chainId.toString());
  }
  url.searchParams.set("address", params.address);

  const res = await fetch(url, { headers: { origin: "https://static.thirdweb.com"}});
  if (res.ok) {
    const payload: LoginPayload = await res.json();
    console.log(payload);
    return payload;
  } else {
    throw new Error("Unable to get login payload");
  }
};

export const login = async (redirectUrl: string | null, { payload, signature }: VerifyLoginPayloadParams) => {
  const verifiedPayload = await auth.verifyPayload({ payload, signature });
  if (verifiedPayload.valid) {
    const jwt = await auth.generateJWT({ payload: verifiedPayload.payload });
    const cookieStore = await cookies();
    cookieStore.set(`tw-auth-${payload.address.toLowerCase()}`, jwt);
    console.log(payload);
    const params = new URLSearchParams({ signature, payload: encodeURIComponent(JSON.stringify(payload)) });
   if (redirectUrl === null) {
     redirectUrl = "/auth/complete";
   }
   redirect(`${redirectUrl}?${params}`);
  } else {
    console.log("Payload invalid:", verifiedPayload)
  }

};

export const isLoggedIn = async (address: Address | string) => {
  const cookieStore = await cookies();
  const jwt = cookieStore.get(`tw-auth-${address.toLowerCase()}`);
  if (jwt === undefined) {
    return false;
  }
  const result = await auth.verifyJWT({ jwt: jwt.value });
  // verbosely-typed to help error logging
  if (!result.valid) {
    console.log("jwt is no longer valid");
    return false;
  }
  if (result.parsedJWT.sub !== address) {
    console.log("jwt is invalid");
    return false;
  }

  return true;
};

export const doLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
};
