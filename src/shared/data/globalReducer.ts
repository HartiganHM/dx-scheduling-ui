import { Reducer } from 'react';

import { Actions, ActionTypesEnum, InitialState } from 'shared/types/types';

const globalReducer: Reducer<InitialState, Actions> = (state, action) => {
  switch (action.type) {
    case ActionTypesEnum.MergeState: {
      const { mergeState } = action;

      if (mergeState) {
        return {
          ...state,
          ...mergeState,
        };
      }
      return state;
    }
    case ActionTypesEnum.UpdateCurrentlyViewing: {
      const { currentlyViewing } = action;

      if (currentlyViewing) {
        return {
          ...state,
          currentlyViewing,
        };
      }
      return state;
    }
    case ActionTypesEnum.UpdateIntakeQuestions: {
      const { intakeFormQuestions } = action;

      if (intakeFormQuestions) {
        return {
          ...state,
          intakeFormQuestions,
        };
      }
      return state;
    }
    case ActionTypesEnum.UpdateIntakeValues: {
      const { intakeFormValues } = action;

      if (intakeFormValues) {
        return {
          ...state,
          intakeFormValues,
        };
      }
      return state;
    }
    default: {
      return state;
    }
  }
};

export default globalReducer;
