import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { Imprint } from "./pages/Imprint";
import { Privacy } from "./pages/Privacy";

const rootRoute = createRootRoute({ component: Root });
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const imprintRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/imprint",
  component: Imprint,
});
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: Privacy,
});
const routeTree = rootRoute.addChildren([indexRoute, imprintRoute, privacyRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

