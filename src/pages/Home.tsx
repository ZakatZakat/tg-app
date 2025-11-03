import * as React from "react"
import { Button, Card, Heading, Stack, Text } from "@chakra-ui/react"
import { Link } from "@tanstack/react-router"

export default function Home() {
  return (
    <Stack gap="4" py="6">
      <Heading size="lg">Привет из Telegram 👋</Heading>
      <Card.Root>
        <Card.Body>
          <Text>Chakra + TanStack Router + Telegram WebApp.</Text>
        </Card.Body>
      </Card.Root>
      <Stack direction={{ base: "column", md: "row" }} gap="3">
        <Button asChild variant="solid"><Link to="/flights">Перелёты</Link></Button>
        <Button asChild variant="outline"><Link to="/about">About</Link></Button>
      </Stack>
    </Stack>
  )
}


