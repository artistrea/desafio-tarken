import { createContext, useContext } from "react";
import { Session } from "../../clientApi/auth/useLoginMutation";

export type SessionContext = null | {
  session?: Session;
  login: (details: {
    email: string;
    password: string;
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
