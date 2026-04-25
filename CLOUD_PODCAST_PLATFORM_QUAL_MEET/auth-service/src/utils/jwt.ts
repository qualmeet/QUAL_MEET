import { requireEnv } from "../config/env";

export function getPrivateKey(): string {
  return requireEnv("JWT_PRIVATE_KEY").replace(/\\n/g, "\n");
}

export function getPublicKey(): string {
  return requireEnv("JWT_PUBLIC_KEY").replace(/\\n/g, "\n");
}