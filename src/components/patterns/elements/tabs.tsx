import {useTab, useTabList, useTabPanel} from "react-aria"
import {Orientation, TabListState, useTabListState} from "react-stately"
import {PropsWithChildren, useRef} from "react"
import {Node} from "@react-types/shared/src/collections"
import {TabListStateOptions} from "@react-stately/tabs"

type TabsProps = {
  className?: string
  tabListClass?: string
  tabClass?: string
  tabPanelClass?: string
  orientation?: Orientation
}

export const Tabs = ({
  className,
  tabListClass,
  tabClass,
  tabPanelClass,
  ...props
}: PropsWithChildren<TabsProps> & TabListStateOptions<any>) => {
  let state = useTabListState(props)
  let ref = useRef<HTMLDivElement>(null)
  let {tabListProps} = useTabList(props, state, ref)

  return (
    <div className={className}>
      <div className={tabListClass} {...tabListProps} ref={ref}>
        {[...state.collection].map(item => (
          <Tab key={item.key} item={item} state={state} className={tabClass} />
        ))}
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} className={tabPanelClass} />
    </div>
  )
}

export const Tab = ({item, state, className}: {item: Node<any>; state: TabListState<any>; className?: string}) => {
  let {key, rendered} = item
  let ref = useRef(null)
  let {tabProps} = useTab({key}, state, ref)
  return (
    <button type="button" className={className} {...tabProps} ref={ref}>
      {rendered}
    </button>
  )
}

export const TabPanel = ({state, className, ...props}: {state: TabListState<any>; className?: string}) => {
  let ref = useRef(null)
  let {tabPanelProps} = useTabPanel(props, state, ref)
  return (
    <div className={className} {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </div>
  )
}
