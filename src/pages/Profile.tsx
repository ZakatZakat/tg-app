import * as React from "react"
import { Button, Card, Heading, Stack, Text } from "@chakra-ui/react"
import { client } from "../lib/client"
import { tokenStore } from "../lib/client"

export default function Profile() {
  const [me, setMe] = React.useState<any>(null)
  const [err, setErr] = React.useState<string | null>(null)

  React.useEffect(() => {
    let active = true
    client.users.me().then((d) => active && setMe(d)).catch((e) => active && setErr(String(e?.message || e)))
    return () => { active = false }
  }, [])

  return (
    <Stack gap="4" py="6">
      <Heading size="lg">Профиль</Heading>
      <Card.Root><Card.Body>
        {me ? (
          <>
            <Text>email: {me.email}</Text>
            <Text>full_name: {me.full_name ?? "—"}</Text>
            <Text>id: {me.id}</Text>
          </>
        ) : err ? (
          <Text color="red.500">{err}</Text>
        ) : (
          <Text color="gray.500">Загрузка...</Text>
        )}
        <Button mt="3" onClick={() => { tokenStore.clear(); location.reload() }}>Выйти</Button>
      </Card.Body></Card.Root>
    </Stack>
  )
}
