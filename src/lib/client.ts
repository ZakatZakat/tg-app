import { createClient } from "@maketour/client"

const DEFAULT_BASE_URL = "http://localhost:8000/api/v1"

const getBaseUrl = (): string => {
  const v = import.meta?.env?.VITE_API_BASE_URL as string | undefined
  return (v && v.trim()) || DEFAULT_BASE_URL
}

const token = {
  get: (): string | null => { try { return localStorage.getItem("authToken") } catch { return null } },
  set: (t: string): void => { try { localStorage.setItem("authToken", t) } catch {} },
  clear: (): void => { try { localStorage.removeItem("authToken") } catch {} },
}

export const client = createClient({ baseUrl: getBaseUrl(), getToken: token.get, setToken: token.set, clearToken: token.clear })
export const tokenStore = token

