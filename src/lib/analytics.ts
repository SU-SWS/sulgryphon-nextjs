declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, string | number | boolean | undefined>
    ) => void
  }
}

export const trackEvent = (eventName: string, eventParams?: Record<string, string | number | boolean | undefined>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams)
  }
}

export const trackMenuClick = (menuItem: {
  label: string
  url: string
  menuLevel?: number
  parentMenu?: string
}): void => {
  trackEvent("menu_click", {
    menu_label: menuItem.label,
    menu_url: menuItem.url,
    menu_level: menuItem.menuLevel || 1,
    parent_menu: menuItem.parentMenu || "main",
    event_category: "navigation",
    event_action: "click",
  })
}
