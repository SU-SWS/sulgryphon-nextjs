import {createContext, useContext} from 'react';

const AppContext = createContext({menuItems: [], breadcrumbs: []});

export function AppWrapperProvider({menuItems, breadcrumbs, children}) {
  return (
    <AppContext.Provider value={{menuItems, breadcrumbs}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

