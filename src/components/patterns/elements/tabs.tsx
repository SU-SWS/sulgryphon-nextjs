"use client"

import {TabsProvider, useTabs} from "@mui/base/useTabs"
import {useTab} from "@mui/base/useTab"
import {useTabPanel} from "@mui/base/useTabPanel"
import {TabsListProvider, useTabsList} from "@mui/base/useTabsList"
import {HTMLAttributes, Suspense, SyntheticEvent, useRef} from "react"
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

  const router = useRouter()
  const onChange = (_e: SyntheticEvent | null, value: number | string | null) => {
    const params = new URLSearchParams(window.location.search)
    params.delete(paramId)
    if (value) params.set(paramId, `${value}`)
    router.replace(`?${params.toString()}${window.location.hash || ""}`, {scroll: false})
  }
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
