import { client } from "./client"

export type Me = { id: string; email: string; full_name: string | null; is_active: boolean; is_superuser: boolean }
export function getMe(): Promise<Me> { return client.users.me() }

import { client } from "./client"

export type Me = {
  id: string
  email: string
  full_name: string | null
  is_active: boolean
  is_superuser: boolean
}

export function getMe(): Promise<Me> {
  return client.users.me()
}


