"use client"

import {TabsProvider, useTabs} from "@mui/base/useTabs"
import {useTab} from "@mui/base/useTab"
import {useTabPanel} from "@mui/base/useTabPanel"
import {TabsListProvider, useTabsList} from "@mui/base/useTabsList"
import {HTMLAttributes, SyntheticEvent, useRef} from "react"
import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {UseTabsParameters} from "@mui/base/useTabs/useTabs.types"
import {useRouter, useSearchParams} from "next/navigation"
import {useScreen} from "usehooks-ts"

// View the API for all the tab components here: https://mui.com/base-ui/react-tabs/hooks-api/.
type TabsProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The query parameter in the URL for sharing or reloading.
   */
  paramId?: string
  /**
   * Default tab for initial rendering.
   */
  defaultTab?: UseTabsParameters["defaultValue"]
  /**
   * Which direction the tabs are displayed.
   */
  orientation?: UseTabsParameters["orientation"]
}

export const Tabs = ({paramId = "tab", orientation, defaultTab, children, ...props}: TabsProps) => {
  const screen = useScreen({initializeWithValue: false})
  const isVertical = (screen && screen.width < 768) || orientation === "vertical"

  const searchParams = useSearchParams()
  const router = useRouter()
  const onChange = (_e: SyntheticEvent | null, value: number | string | null) => {
    const params = new URLSearchParams(searchParams)
    params.delete(paramId)
    value && params.set(paramId, `${value}`)
    router.replace(`?${params.toString()}${window.location.hash || ""}`, {scroll: false})
  }
  const paramValue = searchParams.get(paramId)
  const initialTab = (paramValue && parseInt(paramValue)) || defaultTab

  const {contextValue} = useTabs({
    orientation: isVertical ? "vertical" : "horizontal",
    defaultValue: initialTab || 0,
    onChange,
    selectionFollowsFocus: true,
  })

  return (
    <TabsProvider value={contextValue}>
      <div {...props}>{children}</div>
    </TabsProvider>
  )
}

export const TabsList = ({children, ...props}: HTMLAttributes<HTMLDivElement>) => {
  const screen = useScreen({initializeWithValue: false})
  const rootRef = useRef<HTMLDivElement>(null)
  const {contextValue, orientation, getRootProps} = useTabsList({rootRef})
  const isVertical = (screen && screen.width < 768) || orientation === "vertical"

  return (
    <TabsListProvider value={contextValue}>
      <div {...props} {...getRootProps()} className={twMerge("flex", clsx({"flex-col": isVertical}), props.className)}>
        {children}
      </div>
    </TabsListProvider>
  )
}

export const Tab = ({children, ...props}: HTMLAttributes<HTMLButtonElement>) => {
  const rootRef = useRef<HTMLButtonElement>(null)
  const {getRootProps} = useTab({rootRef})

  return (
    <button {...props} {...getRootProps()}>
      {children}
    </button>
  )
}

export const TabPanel = ({children, ...props}: HTMLAttributes<HTMLElement>) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const {getRootProps} = useTabPanel({rootRef})

  return (
    <section {...props} {...getRootProps()} role="tabpanel">
      {children}
    </section>
  )
}
