import { client } from "./client"
import { getInitData } from "./telegram"

export async function exchangeInitData(initData: string): Promise<string> {
  const data = await client.auth.exchangeTelegramInitData(initData)
  return data.access_token
}

export async function ensureAuth(): Promise<string | null> {
  try {
    const init = getInitData()
    if (!init) return null
    const data = await client.auth.exchangeTelegramInitData(init)
    return data.access_token || null
  } catch {
    return null
  }
}
