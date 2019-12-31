import { Reducer } from 'react';

import { Actions, ActionTypeEnum, InitialState } from 'shared/types/types';

const globalReducer: Reducer<InitialState, Actions> = (state, action) => {
  switch (action.type) {
    case ActionTypeEnum.UpdateCurrentlyViewing: {
      const { currentlyViewing } = action;

      return {
        ...state,
        currentlyViewing,
      };
    }

    default: {
      return state;
    }
  }
};

export default globalReducer;
