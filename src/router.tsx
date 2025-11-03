import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router"
import App from "./App"
import Home from "./pages/Home"
import Flights from "./pages/Flights"
import Chat from "./pages/Chat"
import Profile from "./pages/Profile"
import About from "./pages/About"

const root = createRootRoute({ component: App })
const home = createRoute({ getParentRoute: () => root, path: "/", component: Home })
const flights = createRoute({ getParentRoute: () => root, path: "/flights", component: Flights })
const chat = createRoute({ getParentRoute: () => root, path: "/chat", component: Chat })
const profile = createRoute({ getParentRoute: () => root, path: "/profile", component: Profile })
const about = createRoute({ getParentRoute: () => root, path: "/about", component: About })

const routeTree = root.addChildren([home, flights, chat, profile, about])
export const router = createRouter({ routeTree })
declare module "@tanstack/react-router" { interface Register { router: typeof router } }
