import { type PropsWithChildren, useState, useEffect } from "react";
import { sessionContext } from "./use";
import {
  Session,
  useLoginMutation,
} from "../../clientApi/auth/useLoginMutation";
import { api } from "../../clientApi/instance";
import Cookie from "js-cookie";

export function SessionContextProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | undefined>(undefined);

  const { mutateAsync } = useLoginMutation();

  useEffect(() => {
    const access_token = Cookie.get("access_token");
    if (access_token) {
      setSession({ access_token });
    }
  }, []);

  useEffect(() => {
    if (session) {
      api.defaults.headers["Authorization"] = `Bearer ${session.access_token}`;
      Cookie.set("access_token", session.access_token, {
        sameSite: "strict",
        expires: 365,
      });
    } else {
      api.defaults.headers["Authorization"] &&
        delete api.defaults.headers["Authorization"];
      Cookie.remove("access_token");
    }
  }, [session]);

  async function login(details: { email: string; password: string }) {
    return mutateAsync(details)
      .then((res) => res.data)
      .then((sess) => {
        setSession(sess);

        return sess;
      });
  }

  function logout() {
    setSession(undefined);
  }

  return (
    <sessionContext.Provider value={{ session, login, logout }}>
      {children}
    </sessionContext.Provider>
  );
}
