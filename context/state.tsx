import {createContext, useContext} from 'react';

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

