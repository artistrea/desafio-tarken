import { Link, Stack, Typography } from "@mui/material";
import { Outlet, Link as RouterLink } from "@tanstack/react-router";

export function LayoutWithNavbar() {
  return (
    <Stack direction="row">
      <Typography
        color="primary"
        fontSize={32}
        fontWeight={700}
        paddingLeft={6}
        paddingRight={10}
        paddingY={2}
      >
        Moovy
      </Typography>
      <Stack direction="column" paddingX={5}>
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
        </Stack>
        <Outlet />
      </Stack>
    </Stack>
  );
}
