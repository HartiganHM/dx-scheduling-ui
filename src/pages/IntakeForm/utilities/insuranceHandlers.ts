import { ChangeEvent } from 'react';

import { defaultInsuranceValues } from 'shared/data';
import { FieldStringType, FieldInsurancesType } from 'shared/types/types';

const handleSelectInsurance = (
  { target: { name, checked } }: ChangeEvent<HTMLInputElement>,
  insurances: FieldInsurancesType
): FieldInsurancesType => {
  const newInsurances = {
    ...insurances,
    value: checked
      ? [
          ...insurances.value,
          {
            ...defaultInsuranceValues,
            provider: {
              ...defaultInsuranceValues.provider,
              value: name,
            },
          },
        ]
      : insurances.value.filter(({ provider }) => provider.value !== name),
  };

  return newInsurances;
};

const handleUpdateInsuranceByIndex = (
  insurances: FieldInsurancesType,
  index: number,
  property: string,
  value: FieldStringType
): FieldInsurancesType => ({
  ...insurances,
  value: insurances.value.map((insurance, idx) => {
    if (index === idx) {
      return {
        ...insurance,
        [property]: value,
      };
    }

    return insurance;
  }),
});

const handleUpdateInsuranceInputValues = (
  { target: { name, value } }: ChangeEvent<HTMLInputElement>,
  index: number,
  insurances: FieldInsurancesType
): FieldInsurancesType => {
  const newValue = { ...insurances.value[index][name], value };
  const newInsurances = handleUpdateInsuranceByIndex(
    insurances,
    index,
    name,
    newValue
  );

  return newInsurances;
};

const handleUpdateInsured = (
  value: string,
  index: number,
  insurances: FieldInsurancesType
): FieldInsurancesType => {
  const newValue = { ...insurances.value[index].insured, value };
  const newInsurances = handleUpdateInsuranceByIndex(
    insurances,
    index,
    'insured',
    newValue
  );

  return newInsurances;
};

export {
  handleSelectInsurance,
  handleUpdateInsuranceByIndex,
  handleUpdateInsuranceInputValues,
  handleUpdateInsured,
};
