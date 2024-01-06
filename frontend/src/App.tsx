import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { SessionContextProvider } from "./contexts/sessionContext/Provider";
import { useSessionContext } from "./contexts/sessionContext/use";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f2911b",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
});

function App() {
  return (
    <SessionContextProvider>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </SessionContextProvider>
  );
}

export default App;

function Router() {
  const authContext = useSessionContext();

  return (
    <RouterProvider
      router={router}
      context={{ session: authContext.session }}
    />
  );
}
