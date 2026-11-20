"use client"

import {Tabs as BaseTabs, type TabsTab} from "@base-ui/react/tabs"
import {HTMLAttributes, ReactNode, useEffect, useState} from "react"
import cn from "@/lib/utils/className"
import {useScreen} from "usehooks-ts"

type TabsProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> & {
  /**
   * The query parameter in the URL for sharing or reloading.
   */
  paramId?: string
  /**
   * Default tab for initial rendering.
   */
  defaultTab?: number
  /**
   * Which direction the tabs are displayed.
   */
  orientation?: "horizontal" | "vertical"
}

/**
 * The prerendered page shows the default tab. The URL's tab is selected once hydrated: reading
 * `useSearchParams()` during render would bail the tabs out of the prerender, so they'd be rendered client side only.
 */
export const Tabs = ({paramId = "tab", orientation, defaultTab, children, ...props}: TabsProps) => {
  const screen = useScreen({initializeWithValue: false})
  const isVertical = (screen && screen.width < 768) || orientation === "vertical"

  // Controlled, and seeded from the URL once. Base UI rejects an uncontrolled `defaultValue` that changes after mount.
  const [activeTab, setActiveTab] = useState<TabsTab.Value>(defaultTab || 0)

  useEffect(() => {
    const urlTab = parseInt(new URLSearchParams(window.location.search).get(paramId) || "")
    // eslint-disable-next-line react-hooks/set-state-in-effect -- The URL is only readable after hydration.
    if (urlTab) setActiveTab(urlTab)
  }, [paramId])

  const onValueChange = (value: TabsTab.Value) => {
    setActiveTab(value)
    const params = new URLSearchParams(window.location.search)
    params.delete(paramId)
    if (value) params.set(paramId, `${value}`)
    // The native History API updates the URL without fetching the page from the server again.
    window.history.replaceState(null, "", `?${params.toString()}${window.location.hash || ""}`)
  }

  return (
    <BaseTabs.Root
      {...props}
      value={activeTab}
      orientation={isVertical ? "vertical" : "horizontal"}
      onValueChange={onValueChange}
    >
      {children}
    </BaseTabs.Root>
  )
}

export const TabsList = ({children, className, ...props}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <BaseTabs.List
      {...props}
      // Moving focus with the arrow keys also selects the tab.
      activateOnFocus
      className={({orientation}) => cn("flex", {"flex-col": orientation === "vertical"}, className)}
    >
      {children}
    </BaseTabs.List>
  )
}

export const Tab = ({
  value,
  children,
  ...props
}: Omit<HTMLAttributes<HTMLButtonElement>, "defaultValue"> & {value: number; children?: ReactNode}) => {
  return (
    <BaseTabs.Tab {...props} value={value}>
      {children}
    </BaseTabs.Tab>
  )
}

export const TabPanel = ({value, children, ...props}: HTMLAttributes<HTMLElement> & {value: number}) => {
  return (
    // Inactive panels stay mounted (hidden), so every panel's content is in the page HTML.
    <BaseTabs.Panel {...props} value={value} keepMounted render={<section />}>
      {children}
    </BaseTabs.Panel>
  )
}
