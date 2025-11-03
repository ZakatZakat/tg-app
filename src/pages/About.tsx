import * as React from "react"
import { Badge, Code, Heading, Stack, Text } from "@chakra-ui/react"
import { hideBackButton, setBackButton } from "../lib/tgui"
import { router } from "../router"

export default function About() {
  React.useEffect(() => { setBackButton(() => router.navigate({ to: "/" })); return () => hideBackButton() }, [])
  return (
    <Stack gap="3" py="6">
      <Heading size="lg">About</Heading>
      <Text>Этот экран использует компоненты Chakra. Попробуйте <Badge>Toggle mode</Badge>.</Text>
      <Code>window.Telegram.WebApp</Code>
    </Stack>
  )
}


