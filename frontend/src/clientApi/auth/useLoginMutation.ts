import { useMutation } from "@tanstack/react-query";
import { api } from "../instance";
import { Session } from "./Session";

type LoginInfo = {
  email: string;
  password: string;
};

export function useLoginMutation() {
  return useMutation({
    mutationFn: (login: LoginInfo) => {
      return api.post<Session>("/auth/login", login);
    },
  });
}
