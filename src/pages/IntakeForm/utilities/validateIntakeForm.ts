import { Dispatch } from 'react';

import copyContent from 'shared/data/copyContent';

import {
  Actions,
  ActionTypesEnum,
  Error,
  FieldArrayTypes,
  FieldStringType,
  FieldBooleanType,
  MergeState,
} from 'shared/types/types';

const { errorMessages } = copyContent;

const validateIntakeForm = (
  stateToValidate: MergeState,
  dispatch: Dispatch<Actions>
): boolean => {
  let hasErrors = false;
  const mergeState = Object.keys(stateToValidate).reduce(
    (accumulator, stateProp) => {
      const stateValue = stateToValidate[stateProp];

      return {
        ...accumulator,
        [stateProp]: Object.keys(stateValue).reduce(
          (stateAccumulator, fieldProp) => {
            const fieldValue = stateValue[fieldProp];

            if (!fieldValue.hasOwnProperty('value')) {
              return {
                ...stateAccumulator,
                [fieldProp]: Object.keys(fieldValue).reduce(
                  (fieldAccumulator, groupedProp) => {
                    const groupedValue = fieldValue[groupedProp] as
                      | FieldStringType
                      | FieldBooleanType;

                    if (groupedValue.required && !groupedValue.value) {
                      hasErrors = true;
                      return {
                        ...fieldAccumulator,
                        [groupedProp]: {
                          ...groupedValue,
                          error: (errorMessages as Error)[groupedProp],
                        },
                      };
                    }

                    return {
                      ...fieldAccumulator,
                      [groupedProp]: groupedValue,
                    };
                  },
                  {}
                ),
              };
            } else if (typeof fieldValue.value === 'object') {
              if (fieldValue.required && !fieldValue.value.length) {
                hasErrors = true;
                return {
                  ...stateAccumulator,
                  [fieldProp]: {
                    ...fieldValue,
                    error: (errorMessages as Error)[fieldProp],
                  },
                };
              } else if (
                fieldProp === 'parents' ||
                fieldProp === 'insurances'
              ) {
                return {
                  ...stateAccumulator,
                  [fieldProp]: {
                    ...fieldValue,
                    value: (fieldValue.value as FieldArrayTypes[]).map(item => {
                      return Object.keys(item).reduce(
                        (fieldAccumulator, groupedProp) => {
                          const groupedValue = item[groupedProp];

                          if (groupedValue.required && !groupedValue.value) {
                            hasErrors = true;
                            return {
                              ...fieldAccumulator,
                              [groupedProp]: {
                                ...groupedValue,
                                error: (errorMessages as Error)[groupedProp],
                              },
                            };
                          } else if (groupedProp === 'address') {
                            return {
                              ...fieldAccumulator,
                              [groupedProp]: Object.keys(groupedValue).reduce(
                                (addressAccumulator, addressProp) => {
                                  const addressValue = groupedValue[
                                    addressProp
                                  ] as FieldStringType;

                                  if (
                                    addressValue.required &&
                                    !addressValue.value
                                  ) {
                                    hasErrors = true;
                                    return {
                                      ...addressAccumulator,
                                      [addressProp]: {
                                        ...addressValue,
                                        error: (errorMessages as Error)[
                                          addressProp
                                        ],
                                      },
                                    };
                                  }

                                  return {
                                    ...addressAccumulator,
                                    [addressProp]: addressValue,
                                  };
                                },
                                {}
                              ),
                            };
                          }

                          return {
                            ...fieldAccumulator,
                            [groupedProp]: groupedValue,
                          };
                        },
                        {}
                      );
                    }),
                  },
                };
              }
            } else {
              if (fieldValue.required && !fieldValue.value) {
                hasErrors = true;
                return {
                  ...stateAccumulator,
                  [fieldProp]: {
                    ...fieldValue,
                    error: (errorMessages as Error)[fieldProp],
                  },
                };
              }
            }

            return { ...stateAccumulator, [fieldProp]: fieldValue };
          },
          {}
        ),
      };
    },
    {}
  );

  console.log({ mergeState });

  if (hasErrors) {
    dispatch({
      type: ActionTypesEnum.MergeState,
      mergeState,
    });

    return false;
  }

  return true;
};

export default validateIntakeForm;
