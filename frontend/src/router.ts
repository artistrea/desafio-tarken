import {
  Router,
  Route,
  rootRouteWithContext,
  redirect,
} from "@tanstack/react-router";
import { LayoutWithNavbar } from "./layouts/WithNavbar";
import { LoginPage } from "./pages/Login";
import { MyLibraryPage } from "./pages/MyLibrary";
import { SearchPage } from "./pages/Search";
import { Session } from "./clientApi/auth/Session";

const rootRoute = rootRouteWithContext<{
  session?: Session;
}>()();

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginPage,
  beforeLoad: ({ context }) => {
    console.log("context.session", context.session);
    if (context.session) {
      throw redirect({
        to: "/library",
      });
    }
  },
});

const navbarLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  component: LayoutWithNavbar,
  id: "LayoutWithNavbar",
  beforeLoad: ({ context }) => {
    console.log("context.session", context.session);
    if (!context.session) {
      throw redirect({
        to: "/",
      });
    }
  },
});

const libraryRoute = new Route({
  getParentRoute: () => navbarLayoutRoute,
  path: "/library",
  component: MyLibraryPage,
});

const searchRoute = new Route({
  getParentRoute: () => navbarLayoutRoute,
  path: "/search",
  component: SearchPage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  navbarLayoutRoute.addChildren([libraryRoute, searchRoute]),
]);

export const router = new Router({ routeTree, context: undefined! });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
