import { Reducer } from 'react';

import { Actions, ActionTypesEnum, InitialState } from 'shared/types/types';

const globalReducer: Reducer<InitialState, Actions> = (state, action) => {
  switch (action.type) {
    case ActionTypesEnum.UpdateCurrentlyViewing: {
      return {
        ...state,
        currentlyViewing: action.currentlyViewing,
      };
    }

    default: {
      return state;
    }
  }
};

export default globalReducer;
