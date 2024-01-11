import { type PropsWithChildren, useState, useEffect } from "react";
import { sessionContext } from "./use";
import {
  useLoginMutation,
  api,
  useRegisterMutation,
  type Session,
} from "client-api";

// only works on android and ios:
import * as SecureStore from "expo-secure-store";

export function SessionContextProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | undefined>(undefined);

  useEffect(() => {
    async function checkIfSignedIn() {
      const access_token = await SecureStore.getItemAsync("access_token");
      const email = await SecureStore.getItemAsync("email");
      if (access_token && email) {
        setSession({ access_token, email });
      }
    }

    checkIfSignedIn();
  }, []);

  useEffect(() => {
    if (session) {
      api.defaults.headers["Authorization"] = `Bearer ${session.access_token}`;
      SecureStore.setItemAsync("access_token", session.access_token);
      SecureStore.setItemAsync("email", session.email);
    } else {
      api.defaults.headers["Authorization"] &&
        delete api.defaults.headers["Authorization"];
      SecureStore.deleteItemAsync("access_token").catch(() => {});
      SecureStore.deleteItemAsync("email").catch(() => {});
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
