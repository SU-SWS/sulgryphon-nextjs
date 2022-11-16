import { createContext, useContext } from 'react';
import buildMenuTree from "@/lib/build-menu-tree";

const AppContext = createContext({menuItems: []});

export function AppWrapperProvider({menuItems, children}) {
  return (
    <AppContext.Provider value={{menuItems: menuItems}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

