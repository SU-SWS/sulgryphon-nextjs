import {useTab, useTabList, useTabPanel} from 'react-aria';
import {useTabListState} from 'react-stately';
import {useRef} from "react";

export const Tabs = (props) => {
  let state = useTabListState(props);
  let ref = useRef(null);
  let {tabListProps} = useTabList(props, state, ref);
  return (
    <div className={props.className}>
      <div className={props.tabListClass} {...tabListProps} ref={ref}>
        {/* @ts-ignore */}
        {[...state.collection].map((item) => (
          <Tab
            key={item.key}
            item={item}
            state={state}
            className={props.tabClass}
          />
        ))}
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} className={props.tabPanelClass}/>
    </div>
  );
}

export const Tab = ({item, state, className}) => {
  let {key, rendered} = item;
  let ref = useRef(null);
  let {tabProps} = useTab({key}, state, ref);
  return (
    <button type="button" className={className} {...tabProps} ref={ref}>
      {rendered}
    </button>
  );
}

export const TabPanel = ({state, className, ...props}) => {
  let ref = useRef(null);
  let {tabPanelProps} = useTabPanel(props, state, ref);
  return (
    <div  className={className} {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </div>
  );
}