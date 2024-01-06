import { PropsWithChildren, useState } from "react";
import { Session, sessionContext } from "./use";

export function SessionContextProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | undefined>(undefined);

  function login(details: { email: string; password: string }) {
    return new Promise<Session>((res) => {
      setTimeout(() => {
        setSession({
          email: details.email,
          authentication_token: details.password,
        });
        res({
          email: details.email,
          authentication_token: details.password,
        });
      }, 1000);
    });
  }

  return (
    <sessionContext.Provider value={{ session, login }}>
      {children}
    </sessionContext.Provider>
  );
}
