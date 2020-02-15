import { ChangeEvent } from 'react';

import {
  FieldStringType,
  FieldBooleanType,
  FieldParentsType,
  AddressType,
} from 'shared/types/types';

const handleUpdateParentsByIndex = (
  parents: FieldParentsType,
  index: number,
  property: string,
  value: FieldStringType | FieldBooleanType | AddressType
): FieldParentsType => ({
  ...parents,
  value: parents.value.map((parent, idx) =>
    index === idx
      ? {
          ...parent,
          [property]: value,
        }
      : parent
  ),
});

const handleUpdateParentInputValues = (
  { target: { name, value } }: ChangeEvent<HTMLInputElement>,
  index: number,
  parents: FieldParentsType
): FieldParentsType => {
  const newValue = { ...parents.value[index][name], value, error: '' };
  const newParents = handleUpdateParentsByIndex(
    parents,
    index,
    name,
    newValue as FieldStringType
  );

  return newParents;
};

const handleToggleIsInSameHousehold = (
  { target: { checked } }: ChangeEvent<HTMLInputElement>,
  index: number,
  parents: FieldParentsType
): FieldParentsType => {
  const newValue = {
    ...parents.value[index].isInSameHousehold,
    value: checked,
    error: '',
  };
  const newParents = handleUpdateParentsByIndex(
    parents,
    index,
    'isInSameHousehold',
    newValue
  );

  return newParents;
};

const handleUpdateParentAddress = (
  { target: { name, value } }: ChangeEvent<HTMLInputElement>,
  index: number,
  parents: FieldParentsType
): FieldParentsType => {
  const newAddress = {
    ...parents.value[index].address,
    [name]: { ...parents.value[index].address[name], value, error: '' },
  };

  const newParents = handleUpdateParentsByIndex(
    parents,
    index,
    'address',
    newAddress
  );

  return newParents;
};

const handleRemoveParent = (
  index: number,
  parents: FieldParentsType
): FieldParentsType => {
  const newParents = {
    ...parents,
    value: parents.value.filter((parent, idx) => idx !== index),
  };

  return newParents;
};

export {
  handleUpdateParentsByIndex,
  handleUpdateParentInputValues,
  handleToggleIsInSameHousehold,
  handleUpdateParentAddress,
  handleRemoveParent,
};
