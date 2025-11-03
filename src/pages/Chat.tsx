import * as React from "react"
import { Box, Button, Card, Heading, Input, Stack, Text } from "@chakra-ui/react"
import { hideBackButton, setBackButton, setMainButton, hapticImpact } from "../lib/tgui"
import { router } from "../router"

export default function Chat() {
  const [messages, setMessages] = React.useState<string[]>([])
  const [text, setText] = React.useState("")
  const send = React.useCallback(() => {
    if (!text.trim()) return
    setMessages((prev) => [...prev, text.trim()])
    setText("")
    hapticImpact("light")
  }, [text])

  React.useEffect(() => {
    setBackButton(() => router.navigate({ to: "/" }))
    setMainButton({ text: "Отправить", onClick: send })
    return () => hideBackButton()
  }, [send])

  return (
    <Stack gap="4" py="6">
      <Heading size="lg">Чат</Heading>
      <Card.Root><Card.Body>
        <Stack gap="2">
          {messages.length === 0 && <Text color="gray.500">Нет сообщений</Text>}
          {messages.map((m, i) => (<Box key={i} bg="gray.50" _dark={{ bg: "gray.800" }} p="2" borderRadius="md">{m}</Box>))}
        </Stack>
      </Card.Body></Card.Root>
      <Stack direction="row" gap="2">
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Напишите сообщение" />
        <Button onClick={send}>Send</Button>
      </Stack>
    </Stack>
  )
}
