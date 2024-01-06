import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { SessionContextProvider } from "./contexts/sessionContext/Provider";
import { useSessionContext } from "./contexts/sessionContext/use";

function App() {
  return (
    <SessionContextProvider>
      <Router />
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
