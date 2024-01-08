import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSessionContext } from "../contexts/sessionContext/use";
import { useRouter } from "@tanstack/react-router";
import { AxiosError } from "axios";

export function LoginPage() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  // geralmente uso zod validando no front e server side, daí consigo
  // deixar mais bonitos os erros
  const [errors, setErrors] = useState<string[]>([]);

  const [isRegistering, setIsRegistering] = useState(false);

  const [loading, setLoading] = useState(false);

  const { login, session, register } = useSessionContext();

  const router = useRouter();

  useEffect(() => {
    if (session)
      router.navigate({
        to: "/library",
        replace: true,
      });
  }, [session, router]);

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const sign = isRegistering ? register : login;

          sign(loginDetails)
            .then(() => {
              // set timeout gambiarra pois tanstack router estava rodando o navigate antes do
              // contexto de sessão mudar. Adicionando o navigate à fila de tasks resolve o problema
              setTimeout(() => {
                router.navigate({
                  to: "/library",
                  replace: true,
                });
              }, 100);
            })
            .catch((err) => {
              if (typeof err.response?.data?.message === "string") {
                alert(err.response?.data?.message);
                setErrors([]);
              } else if (err instanceof AxiosError)
                setErrors((err.response?.data?.message as string[]) || []);
              else alert("Ocorreu um erro inesperado");

              setLoading(false);
            });
          setLoading(true);
        }}
        style={{
          background: "#fff",
          display: "flex",
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flex: 1,
          width: "max(320px, 30%)",
        }}
      >
        <FormControl error={!!errors.find((e) => e.includes("email"))}>
          <TextField
            label="Email"
            id="email"
            disabled={loading}
            value={loginDetails.email}
            onChange={(e) =>
              setLoginDetails((ps) => ({ ...ps, email: e.target.value }))
            }
            error={!!errors.find((e) => e.includes("email"))}
          />
          <FormHelperText>
            {errors.find((e) => e.includes("email"))}
          </FormHelperText>
        </FormControl>
        <FormControl error={!!errors.find((e) => e.includes("password"))}>
          <TextField
            label="Password"
            id="password"
            type="password"
            disabled={loading}
            value={loginDetails.password}
            onChange={(e) =>
              setLoginDetails((ps) => ({ ...ps, password: e.target.value }))
            }
            error={!!errors.find((e) => e.includes("password"))}
          />
          <FormHelperText>
            {errors.find((e) => e.includes("password"))}
          </FormHelperText>
        </FormControl>
        {isRegistering && (
          <FormControl>
            <TextField
              label="Password Confirmation"
              id="password_confirmation"
              type="password"
              disabled={loading}
              value={loginDetails.password_confirmation}
              onChange={(e) =>
                setLoginDetails((ps) => ({
                  ...ps,
                  password_confirmation: e.target.value,
                }))
              }
              error={!!errors.find((e) => e.includes("password_confirmation"))}
            />
          </FormControl>
        )}
        <br />
        <br />
        <Button disabled={loading} type="submit" variant="outlined">
          {isRegistering ? "Register" : "Login"}
        </Button>
        <Button
          color="secondary"
          sx={{
            textTransform: "none",
          }}
          onClick={() => setIsRegistering((r) => !r)}
        >
          I{isRegistering ? " already " : " don't "}
          have an account
        </Button>
      </form>
    </Container>
  );
}
