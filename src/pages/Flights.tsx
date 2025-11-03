import * as React from "react"
import { Card, Grid, GridItem, Heading, Stack, Text } from "@chakra-ui/react"
import { getPopularRoutes, getRecentQueries, PopularRoute, RecentQuery } from "../lib/flights"
import { setBackButton, hideBackButton, setMainButton } from "../lib/tgui"
import { router } from "../router"

export default function Flights() {
  const [popular, setPopular] = React.useState<PopularRoute[] | null>(null)
  const [recent, setRecent] = React.useState<RecentQuery[] | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const load = React.useCallback(async () => {
    try {
      setError(null)
      const [p, r] = await Promise.all([getPopularRoutes(), getRecentQueries()])
      setPopular(p)
      setRecent(r)
    } catch (e: any) {
      setError(String(e?.message || e))
    }
  }, [])

  React.useEffect(() => {
    load()
    setBackButton(() => router.navigate({ to: "/" }))
    setMainButton({ text: "Обновить", onClick: load })
    return () => hideBackButton()
  }, [load])

  return (
    <Stack gap="4" py="6">
      <Heading size="lg">Перелёты</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <Card.Root>
        <Card.Header><Heading size="md">Популярные направления</Heading></Card.Header>
        <Card.Body>
          {popular && popular.length ? (
            <Grid columns={{ base: 1, md: 2 }} gap="3">
              {popular.map((r, i) => (
                <GridItem key={`${r.origin}-${r.destination}-${i}`}>
                  <Card.Root><Card.Body><Text>{r.origin} → {r.destination}</Text></Card.Body></Card.Root>
                </GridItem>
              ))}
            </Grid>
          ) : <Text color="gray.500">Нет данных</Text>}
        </Card.Body>
      </Card.Root>
      <Card.Root>
        <Card.Header><Heading size="md">Недавние запросы</Heading></Card.Header>
        <Card.Body>
          {recent && recent.length ? (
            <Stack gap="2">
              {recent.map((q, i) => (
                <Card.Root key={`${q.from}-${q.to}-${i}`}><Card.Body><Text>{q.from ?? "?"} → {q.to ?? "?"}</Text></Card.Body></Card.Root>
              ))}
            </Stack>
          ) : <Text color="gray.500">Нет данных</Text>}
        </Card.Body>
      </Card.Root>
    </Stack>
  )
}


