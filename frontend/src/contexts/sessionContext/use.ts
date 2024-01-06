import { createContext, useContext } from "react";

export type Session = {
  authentication_token: string;
  email: string;
};

export type SessionContext = null | {
  session?: Session;
  login: (details: {
    email: string;
    password: string;
  }) => Promise<Session | undefined>;
};

export const sessionContext = createContext<SessionContext>(null);

export function useSessionContext() {
  const ctx = useContext(sessionContext);

  if (!ctx) {
    throw new Error("useSessionContext must be called inside its provider");
  }

  return ctx;
}
