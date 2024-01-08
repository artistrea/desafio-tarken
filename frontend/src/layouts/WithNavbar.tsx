import { Logout } from "@mui/icons-material";
import { Button, Link, Stack, Typography } from "@mui/material";
import { Outlet, Link as RouterLink, useRouter } from "@tanstack/react-router";
import { useSessionContext } from "../contexts/sessionContext/use";

export function LayoutWithNavbar() {
  const { logout } = useSessionContext();
  const router = useRouter();

  return (
    <Stack direction="row" width={"100%"} minHeight={"100vh"}>
      <Typography
        color="primary"
        fontSize={32}
        fontWeight={700}
        paddingLeft={6}
        paddingY={2}
      >
        Moovy
      </Typography>
      <Stack direction="column" paddingX={15} width={"100%"} flex={1}>
        <Stack direction="row">
          <Link
            component={RouterLink}
            to="/search"
            style={{ textDecoration: "none" }}
            paddingRight={5}
            fontWeight={600}
            paddingY={4}
            color="rgb(50,50,50)"
            activeProps={{
              style: { color: "var(--clr-primary)" },
            }}
          >
            Search
          </Link>
          <Link
            component={RouterLink}
            to="/library"
            style={{ textDecoration: "none" }}
            paddingX={5}
            fontWeight={600}
            paddingY={4}
            color="rgb(50,50,50)"
            activeProps={{
              style: { color: "var(--clr-primary)" },
            }}
          >
            My Library
          </Link>
          <Button
            endIcon={<Logout />}
            sx={{ marginLeft: "auto" }}
            color="secondary"
            onClick={() => {
              logout();
              router.navigate({
                to: "/",
              });
            }}
          >
            Sair
          </Button>
        </Stack>
        <Outlet />
      </Stack>
    </Stack>
  );
}
