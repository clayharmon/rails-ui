import React, { createContext, Dispatch, ReducerState, useContext } from "react";
import { IUIState, useUIReducer } from './ui';

interface IAppContext {
  uiState: IUIState,
  uiDispatch: Dispatch<any>
}

const AppContext = createContext<IAppContext | null>(null);

export const AppProvider: React.FC = ({ children }) => {
  const [uiState, uiDispatch] = useUIReducer();
  const value = {
    uiState,
    uiDispatch
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
};

export const useAppContext = () => {
  return useContext(AppContext);
};
