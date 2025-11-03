import * as React from "react"
import { Outlet } from "@tanstack/react-router"
import { Box, Container, Flex, Heading, Spacer, Badge } from "@chakra-ui/react"
import { NavBar } from "./components/NavBar"
import { ensureAuth } from "./lib/auth"
import { getWebApp } from "./lib/telegram"
import { setMainButton, hapticImpact } from "./lib/tgui"
import { router } from "./router"

export default function App() {
  const tg = getWebApp()
  const [auth, setAuth] = React.useState<"idle" | "loading" | "ok" | "error">("idle")

  React.useEffect(() => {
    tg?.ready?.()
    tg?.expand?.()
    const token = (() => { try { return localStorage.getItem("authToken") } catch { return null } })()
    if (token) { setAuth("ok"); return }
    setAuth("loading")
    ensureAuth().then((t) => {
      if (t) { setAuth("ok"); hapticImpact("medium"); setMainButton({ text: "Открыть профиль", onClick: () => router.navigate({ to: "/profile" as any }) }) }
      else setAuth("idle")
    }).catch(() => setAuth("error"))
  }, [tg])

  return (
    <Box minH="100dvh">
      <Container maxW="container.md" py="4">
        <Flex align="center" gap="4">
          <Heading size="md">MakeTour Mini App</Heading>
          <Spacer />
          {auth === "loading" && <Badge colorPalette="blue">auth...</Badge>}
          {auth === "ok" && <Badge colorPalette="green">authorized</Badge>}
          {auth === "error" && <Badge colorPalette="red">auth failed</Badge>}
        </Flex>
      </Container>
      <Container maxW="container.md" pb="16">
        <Outlet />
      </Container>
      <NavBar />
    </Box>
  )
}

