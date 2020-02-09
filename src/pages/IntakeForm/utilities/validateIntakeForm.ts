import { Dispatch } from 'react';

import {
  Actions,
  ActionTypesEnum,
  MergeState,
  FieldBooleanType,
  FieldStringType,
  FieldArrayTypes,
  ParentType,
  InsuranceType,
} from 'shared/types/types';

const validateIntakeForm = (
  stateToValidate: MergeState,
  dispatch: Dispatch<Actions>
): boolean => {
  console.log({ stateToValidate });
  const mergeState = Object.keys(stateToValidate).reduce(
    (accumulator, stateProp) => {
      const stateValue = stateToValidate[stateProp];

      Object.keys(stateValue).forEach(fieldProp => {
        const fieldValue = stateValue[fieldProp];

        if (
          fieldValue.required &&
          (!fieldValue.value || !(fieldValue.value as FieldArrayTypes).length)
        ) {
          accumulator[stateProp][fieldProp].error = 'Error';
        } else if (
          typeof fieldValue.value === 'object' &&
          fieldValue.value.length
        ) {
          console.log(fieldProp, fieldValue);
          accumulator[stateProp][fieldProp].value = (accumulator[stateProp][
            fieldProp
          ].value as FieldArrayTypes).map(thing => {
            console.log({ thing });
            return thing;
          });
        }
      });

      return accumulator;
    },
    stateToValidate
  );

  console.log({ mergeState });
  return true;
};

export default validateIntakeForm;
