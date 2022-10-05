import { createContext, useContext } from 'react';

const AppContext = createContext({menu: []});

export function AppWrapper({menu, children }) {
  return (
    <AppContext.Provider value={{menu: menu}}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}

