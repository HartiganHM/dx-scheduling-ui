import React, {
  createContext,
  useContext,
  useReducer,
  ReactChild,
  FC,
  Dispatch,
  Reducer,
} from 'react';

import { Actions, InitialState } from 'shared/types/types';

type StateProviderProps = {
  reducer: Reducer<InitialState, Actions>;
  initialState: InitialState;
  children: ReactChild | ReactChild[];
};

type ProviderValue = [InitialState, Dispatch<Actions>];

const StateContext = createContext({} as ProviderValue);
const { Provider } = StateContext;

export const useStateValue = (): ProviderValue => useContext(StateContext);

const StateProvider: FC<StateProviderProps> = ({
  reducer,
  initialState,
  children,
}: StateProviderProps) => (
  <Provider value={useReducer(reducer, initialState)}>{children}</Provider>
);

export default StateProvider;
