import {createContext, useContext} from 'react';
import {ReactNodeLike} from "prop-types";
import {DrupalMenuLinkContent} from "next-drupal";

import {Breadcrumb} from "../types/drupal";

const AppContext = createContext({menuItems: [], breadcrumbs: []});
interface AppWrapperProps {
  menuItems: DrupalMenuLinkContent[]
  breadcrumbs?: Breadcrumb[]
  children: ReactNodeLike
}
export function AppWrapperProvider({menuItems, breadcrumbs = [], children}: AppWrapperProps) {
  return (
    <AppContext.Provider value={{menuItems, breadcrumbs}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

