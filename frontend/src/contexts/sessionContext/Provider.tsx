import { type PropsWithChildren, useState } from "react";
import { sessionContext } from "./use";
import { login as apiLogin, type Session } from "../../api/login";

export function SessionContextProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | undefined>(undefined);

  async function login(details: { email: string; password: string }) {
    return apiLogin(details)
      .then((sess) => {
        setSession(sess);
        return sess;
      })
      .catch(() => undefined);
  }

  return (
    <sessionContext.Provider value={{ session, login }}>
      {children}
    </sessionContext.Provider>
  );
}
