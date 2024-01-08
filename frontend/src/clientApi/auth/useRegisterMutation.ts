import { useMutation } from "@tanstack/react-query";
import { api } from "../instance";
import { Session } from "./Session";

type RegisterInfo = {
  email: string;
  password: string;
  password_confirmation: string;
};

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (info: RegisterInfo) => {
      return api.post<Session>("/auth/register", info);
    },
  });
}
