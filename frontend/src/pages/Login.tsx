import {
  Button,
  Container,
  Input,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useState } from "react";
import { useSessionContext } from "../contexts/sessionContext/use";
import { useRouter } from "@tanstack/react-router";

export function LoginPage() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { login } = useSessionContext();

  const router = useRouter();
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
          login(loginDetails)
            .then(() => {
              // set timeout gambiarra pois tanstack router estava rodando o navigate antes do
              // contexto de sessão mudar. Adicionando o navigate à fila de tasks resolve o problema
              setTimeout(() => {
                router.navigate({
                  to: "/library",
                  replace: true,
                });
              }, 0);
            })
            .catch(() => {
              setLoading(false);
              alert("Email ou senha incorretas");
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
        <FormControl>
          <FormLabel htmlFor="email" style={{ display: "block" }}>
            Email
          </FormLabel>
          <Input
            id="email"
            disabled={loading}
            value={loginDetails.email}
            onChange={(e) =>
              setLoginDetails((ps) => ({ ...ps, email: e.target.value }))
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password" style={{ display: "block" }}>
            Senha
          </FormLabel>
          <Input
            id="password"
            disabled={loading}
            value={loginDetails.password}
            onChange={(e) =>
              setLoginDetails((ps) => ({ ...ps, password: e.target.value }))
            }
          />
        </FormControl>
        <br />
        <br />
        <Button disabled={loading} type="submit" variant="outlined">
          Entrar
        </Button>
      </form>
    </Container>
  );
}
