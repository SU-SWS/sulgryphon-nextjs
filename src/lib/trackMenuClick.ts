import {sendGAEvent} from "@next/third-parties/google"

export const trackMenuClick = (menuItem: {
  label: string
  url: string
  menuLevel?: number
  parentMenu?: string
}): void => {
  sendGAEvent("event", "menu_click", {
    menu_label: menuItem.label,
    menu_url: menuItem.url,
    menu_level: menuItem.menuLevel || 1,
    parent_menu: menuItem.parentMenu || "main",
    event_category: "navigation",
    event_action: "click",
  })
}
