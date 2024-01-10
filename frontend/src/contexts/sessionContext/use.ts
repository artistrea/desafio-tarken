import { createContext, useContext } from "react";
import type { Session } from "client-api";

export type SessionContext = null | {
  session?: Session;
  login: (details: {
    email: string;
    password: string;
  }) => Promise<Session | undefined>;
  register: (details: {
    email: string;
    password: string;
    password_confirmation: string;
  }) => Promise<Session | undefined>;
  logout: () => void;
};

export const sessionContext = createContext<SessionContext>(null);

export function useSessionContext() {
  const ctx = useContext(sessionContext);

  if (!ctx) {
    throw new Error("useSessionContext must be called inside its provider");
  }

  return ctx;
}
