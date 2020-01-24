import { ChangeEvent } from 'react';

import { defaultInsuranceValues } from 'shared/data';
import { AddressType, InsuranceType, ParentType } from 'shared/types/types';

const handleSelectInsurance = (
  { target: { name, checked } }: ChangeEvent<HTMLInputElement>,
  insurances: InsuranceType[]
): InsuranceType[] => {
  const newInsurances = checked
    ? [
        ...insurances,
        {
          ...defaultInsuranceValues,
          provider: name,
        },
      ]
    : insurances.filter(({ provider }) => provider !== name);

  return newInsurances;
};

const handleUpdateInsuranceByIndex = (
  insurances: InsuranceType[],
  index: number,
  property: string,
  value: string | boolean | ParentType
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
  const newInsurances = handleUpdateInsuranceByIndex(
    insurances,
    index,
    name,
    value
  );

  return newInsurances;
};

const handleUpdateInsured = (
  value: string,
  index: number,
  insurances: InsuranceType[]
): InsuranceType[] => {
  const newInsurances = handleUpdateInsuranceByIndex(
    insurances,
    index,
    'insured',
    value
  );

  return newInsurances;
};

const handleUpdateParentsByIndex = (
  parents: ParentType[],
  index: number,
  property: string,
  value: string | boolean | AddressType
): ParentType[] =>
  parents.map((parent, idx) => {
    if (index === idx) {
      return {
        ...parent,
        [property]: value,
      };
    }

    return parent;
  });

const handleUpdateParentInputValues = (
  { target: { name, value } }: ChangeEvent<HTMLInputElement>,
  index: number,
  parents: ParentType[]
): ParentType[] => {
  const newParents = handleUpdateParentsByIndex(parents, index, name, value);

  return newParents;
};

export {
  handleSelectInsurance,
  handleUpdateInsuranceByIndex,
  handleUpdateInsuranceInputValues,
  handleUpdateInsured,
  handleUpdateParentsByIndex,
  handleUpdateParentInputValues,
};
