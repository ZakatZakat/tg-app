import * as React from "react"
import { Flex, Button } from "@chakra-ui/react"
import { Link, useRouterState } from "@tanstack/react-router"

export function NavBar() {
  const { location } = useRouterState()
  const path = location.pathname
  return (
    <Flex position="sticky" bottom="0" bg="bg" borderTopWidth="1px" p="2" gap="2" justify="space-between">
      <Button asChild variant={path === "/" ? "solid" : "ghost"} flex="1"><Link to="/">Home</Link></Button>
      <Button asChild variant={path === "/flights" ? "solid" : "ghost"} flex="1"><Link to="/flights">Flights</Link></Button>
      <Button asChild variant={path === "/chat" ? "solid" : "ghost"} flex="1"><Link to="/chat">Chat</Link></Button>
      <Button asChild variant={path === "/profile" ? "solid" : "ghost"} flex="1"><Link to="/profile">Profile</Link></Button>
    </Flex>
  )
}
