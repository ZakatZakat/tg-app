declare global { interface Window { Telegram?: { WebApp?: any } } }

export const getWebApp = () => (typeof window !== "undefined" ? window.Telegram?.WebApp : undefined)

export const getInitData = (): string => {
  const tg = getWebApp()
  const initData = tg?.initData
  if (typeof initData === "string" && initData) return initData
  // Dev fallback: allow passing initData via query param or hash when not in Telegram
  const isDev = import.meta?.env?.MODE !== "production"
  if (typeof window !== "undefined" && isDev) {
    const sp = new URLSearchParams(window.location.search)
    const fromQuery = sp.get("__initData") || sp.get("initData") || sp.get("InitData")
    if (fromQuery) return fromQuery
    const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : window.location.hash
    const hp = new URLSearchParams(hash)
    const fromHash = hp.get("tgWebAppData") || hp.get("initData") || hp.get("InitData")
    if (fromHash) return fromHash
  }
  return ""
}

