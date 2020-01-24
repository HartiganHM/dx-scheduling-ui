import { Reducer } from 'react';

import { Actions, ActionTypesEnum, InitialState } from 'shared/types/types';

const globalReducer: Reducer<InitialState, Actions> = (state, action) => {
  switch (action.type) {
    case ActionTypesEnum.UpdateCurrentlyViewing: {
      const { currentlyViewing } = action;
      if (currentlyViewing) {
        return {
          ...state,
          currentlyViewing,
        };
      }
    }
    case ActionTypesEnum.UpdateIntakeValues: {
      const { intakeFormValues } = action;
      if (intakeFormValues) {
        return {
          ...state,
          intakeFormValues: intakeFormValues,
        };
      }
    }
    default: {
      return state;
    }
  }
};

export default globalReducer;
