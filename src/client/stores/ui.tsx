import { Reducer, useReducer } from 'react';

export interface IUIState {
  currentAction: string
}

const INITIAL_STATE: IUIState = {
  currentAction:  'rake_tasks'
};

const reducer: Reducer<IUIState, any> = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ACTION':
      return ({ ...state, currentAction: action.payload });
    default:
      throw new Error(`Unknown action`);
  }
}

export const useUIReducer = () => {
  return useReducer(reducer, INITIAL_STATE);
}
