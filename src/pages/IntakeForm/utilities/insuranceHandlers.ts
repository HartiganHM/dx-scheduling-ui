import { ChangeEvent } from 'react';

import { defaultInsuranceValues } from 'shared/data';
import {
  FieldStringType,
  FieldBooleanType,
  InsuranceType,
  ParentType,
} from 'shared/types/types';

const handleSelectInsurance = (
  { target: { name, checked } }: ChangeEvent<HTMLInputElement>,
  insurances: InsuranceType[]
): InsuranceType[] => {
  const newInsurances = checked
    ? [
        ...insurances,
        {
          ...defaultInsuranceValues,
          provider: {
            ...defaultInsuranceValues.provider,
            value: name,
          },
        },
      ]
    : insurances.filter(({ provider }) => provider.value !== name);

  return newInsurances;
};

const handleUpdateInsuranceByIndex = (
  insurances: InsuranceType[],
  index: number,
  property: string,
  value: FieldStringType
): InsuranceType[] =>
  insurances.map((parent, idx) => {
    if (index === idx) {
      return {
        ...parent,
        [property]: value,
      };
    }

    return parent;
  });

const handleUpdateInsuranceInputValues = (
  { target: { name, value } }: ChangeEvent<HTMLInputElement>,
  index: number,
  insurances: InsuranceType[]
): InsuranceType[] => {
  const newValue = { ...insurances[index][name], value };
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
  insurances: InsuranceType[]
): InsuranceType[] => {
  const newValue = { ...insurances[index].insured, value };
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
