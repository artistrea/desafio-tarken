import { useMutation } from "@tanstack/react-query";
import { api } from "../instance";

type LoginInfo = {
  email: string;
  password: string;
};

export type Session = {
  access_token: string;
};

export function useLoginMutation() {
  return useMutation({
    mutationFn: (login: LoginInfo) => {
      return api.post<Session>("/auth/login", login);
    },
  });
}
