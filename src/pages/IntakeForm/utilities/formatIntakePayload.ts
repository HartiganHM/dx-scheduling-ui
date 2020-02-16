import {
  MergeState,
  FieldStringType,
  FieldBooleanType,
  FieldArrayTypes,
  IntakeFormPayload,
} from 'shared/types/types';

const formatIntakePayload = (stateToFormat: MergeState) => {
  const formattedPayload = Object.keys(stateToFormat).reduce(
    (accumulator, stateProp) => {
      const stateValue = stateToFormat[stateProp];

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

                    return {
                      ...fieldAccumulator,
                      [groupedProp]: groupedValue.value,
                    };
                  },
                  {}
                ),
              };
            }

            if (fieldProp === 'parents' || fieldProp === 'insurances') {
              return {
                ...stateAccumulator,
                [fieldProp]: (fieldValue.value as FieldArrayTypes[]).map(
                  item => {
                    return Object.keys(item).reduce(
                      (fieldAccumulator, groupedProp) => {
                        const groupedValue = item[groupedProp];

                        if (groupedProp === 'address') {
                          return {
                            ...fieldAccumulator,
                            [groupedProp]: Object.keys(groupedValue).reduce(
                              (addressAccumulator, addressProp) => {
                                const addressValue = groupedValue[
                                  addressProp
                                ] as FieldStringType;

                                return {
                                  ...addressAccumulator,
                                  [addressProp]: addressValue.value,
                                };
                              },
                              {}
                            ),
                          };
                        }

                        return {
                          ...fieldAccumulator,
                          [groupedProp]: groupedValue.value,
                        };
                      },
                      {}
                    );
                  }
                ),
              };
            }

            return { ...stateAccumulator, [fieldProp]: fieldValue.value };
          },
          {}
        ),
      };
    },
    {} as IntakeFormPayload
  );

  const updatedParents = formattedPayload.intakeFormValues.parents.map(
    (parent, index) => {
      const { isInSameHousehold } = parent;

      if (index > 0 && isInSameHousehold) {
        return {
          ...parent,
          address: formattedPayload.intakeFormValues.parents[0].address,
        };
      }

      return parent;
    }
  );

  console.log({ formattedPayload, updatedParents });
  return formattedPayload;
};

export default formatIntakePayload;
