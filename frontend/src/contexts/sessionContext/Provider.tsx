import { type PropsWithChildren, useState, useEffect } from "react";
import { sessionContext } from "./use";
import {
  api,
  useLoginMutation,
  useRegisterMutation,
  type Session,
} from "client-api";
import Cookie from "js-cookie";

export function SessionContextProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | undefined>(undefined);

  useEffect(() => {
    const access_token = Cookie.get("access_token");
    const email = Cookie.get("email");
    if (access_token && email) {
      setSession({ email, access_token });
    }
  }, []);

  useEffect(() => {
    if (session) {
      api.defaults.headers["Authorization"] = `Bearer ${session.access_token}`;
      Cookie.set("access_token", session.access_token, {
        sameSite: "strict",
        expires: 365,
      });
      Cookie.set("email", session.email, {
        sameSite: "strict",
        expires: 365,
      });
    } else {
      api.defaults.headers["Authorization"] &&
        delete api.defaults.headers["Authorization"];
      Cookie.remove("access_token");
      Cookie.remove("email");
    }
  }, [session]);
  const { mutateAsync: loginAsync } = useLoginMutation();

  async function login(details: { email: string; password: string }) {
    return loginAsync(details)
      .then((res) => res.data)
      .then((sess) => {
        setSession(sess);

        return sess;
      });
  }

  const { mutateAsync: apiRegister } = useRegisterMutation();
  async function register(details: {
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    return apiRegister(details)
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
    <sessionContext.Provider value={{ session, login, logout, register }}>
      {children}
    </sessionContext.Provider>
  );
}
