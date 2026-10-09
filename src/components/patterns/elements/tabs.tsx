"use client"

import {Tabs as BaseTabs, type TabsTab} from "@base-ui/react/tabs"
import {HTMLAttributes, ReactNode, Suspense, useState} from "react"
import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {useSearchParams} from "next/navigation"
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
 * The selected tab comes from the URL, which isn't known while the page is prerendered. The fallback
 * renders the default tab so the content is still in the static HTML, then the URL's tab takes over.
 */
export const Tabs = (props: TabsProps) => (
  <Suspense fallback={<TabsBase {...props} />}>
    <TabsFromUrl {...props} />
  </Suspense>
)

const TabsFromUrl = ({paramId = "tab", ...props}: TabsProps) => {
  const paramValue = useSearchParams().get(paramId)
  return <TabsBase paramId={paramId} paramValue={paramValue} {...props} />
}

const TabsBase = ({
  paramId = "tab",
  paramValue,
  orientation,
  defaultTab,
  children,
  ...props
}: TabsProps & {paramValue?: string | null}) => {
  const screen = useScreen({initializeWithValue: false})
  const isVertical = (screen && screen.width < 768) || orientation === "vertical"

  // Controlled, and only seeded from the URL. Writing the selection back to the URL re-renders this with a
  // new param, and Base UI rejects an uncontrolled `defaultValue` that changes after mount.
  const [activeTab, setActiveTab] = useState<TabsTab.Value>(
    () => (paramValue && parseInt(paramValue)) || defaultTab || 0
  )

  const onValueChange = (value: TabsTab.Value) => {
    setActiveTab(value)
    const params = new URLSearchParams(window.location.search)
    params.delete(paramId)
    if (value) params.set(paramId, `${value}`)
    // The native History API keeps useSearchParams in sync without fetching the page from the server again.
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
      className={({orientation}) => twMerge("flex", clsx({"flex-col": orientation === "vertical"}), className)}
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
