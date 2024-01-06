type LoginInfo = {
  email: string;
  password: string;
};

export type Session = {
  authentication_token: string;
  email: string;
};

export function login({ email, password }: LoginInfo): Promise<Session> {
  return new Promise<Session>((res) => {
    setTimeout(() => {
      res({
        email: email,
        authentication_token: password,
      });
    }, 1000);
  });
}
