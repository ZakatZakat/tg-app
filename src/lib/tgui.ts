declare global { interface Window { Telegram?: { WebApp?: any } } }
const tg = typeof window !== "undefined" ? window.Telegram?.WebApp : undefined

export function setMainButton(options: { text: string; onClick: () => void }): void {
  if (!tg?.MainButton) return
  tg.MainButton.setParams({ text: options.text, is_active: true, is_visible: true })
  tg.MainButton.onClick(options.onClick)
  tg.MainButton.show()
}

export function setBackButton(onClick: () => void): void {
  if (!tg?.BackButton) return
  tg.BackButton.show()
  tg.BackButton.onClick(onClick)
}

export function hideBackButton(): void { tg?.BackButton?.hide?.() }

export function hapticImpact(style: "light" | "medium" | "heavy" = "medium"): void {
  try { tg?.HapticFeedback?.impactOccurred?.(style) } catch {}
}


