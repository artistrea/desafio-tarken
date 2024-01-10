import { type PropsWithChildren, useState, useEffect } from "react";
import { sessionContext } from "./use";
import { useLoginMutation } from "../../clientApi/auth/useLoginMutation";
import { api } from "../../clientApi/instance";
import { useRegisterMutation } from "../../clientApi/auth/useRegisterMutation";
import type { Session } from "../../clientApi/auth/Session";

// only works on android and ios:
import * as SecureStore from "expo-secure-store";

export function SessionContextProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | undefined>(undefined);

  useEffect(() => {
    async function checkIfSignedIn() {
      const access_token = await SecureStore.getItemAsync("access_token");
      if (access_token) {
        setSession({ access_token });
      }
    }

    checkIfSignedIn();
  }, []);

  useEffect(() => {
    if (session) {
      api.defaults.headers["Authorization"] = `Bearer ${session.access_token}`;
      SecureStore.setItemAsync("access_token", session.access_token);
    } else {
      api.defaults.headers["Authorization"] &&
        delete api.defaults.headers["Authorization"];
      SecureStore.deleteItemAsync("access_token").catch(() => {});
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
