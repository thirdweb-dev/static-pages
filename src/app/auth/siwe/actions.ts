"use server";
import { auth } from "@/components/thirdweb.server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Address } from "thirdweb";
import { VerifyLoginPayloadParams } from "thirdweb/auth";

export const generatePayload = async (address: Address) => auth.generatePayload({ address });

export const login = async (payload: VerifyLoginPayloadParams) => {
  const verifiedPayload = await auth.verifyPayload(payload);
  if (verifiedPayload.valid) {
    const jwt = await auth.generateJWT({ payload: verifiedPayload.payload });
    const cookieStore = await cookies();
    cookieStore.set("jwt", jwt);
    const params = new URLSearchParams({ signature: payload.signature, payload: JSON.stringify(payload.payload) });
    redirect(`/auth/complete?${params}`);
  }
};

export const isLoggedIn = async (address: Address) => {
  const cookieStore = await cookies();
  if (!cookieStore.has("jwt")) {
    return false;
  }
  const result = await auth.verifyJWT({ jwt: cookieStore.get("jwt")!.value });
  return result.valid && result.parsedJWT.sub === address;
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
  redirect(`/auth/siwe`);
};
