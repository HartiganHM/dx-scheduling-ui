import { ChangeEvent } from 'react';

import {
  FieldStringType,
  FieldBooleanType,
  AddressType,
  ParentType,
} from 'shared/types/types';

const handleUpdateParentsByIndex = (
  parents: ParentType[],
  index: number,
  property: string,
  value: FieldStringType | FieldBooleanType | AddressType
): ParentType[] =>
  parents.map((parent, idx) =>
    index === idx
      ? {
          ...parent,
          [property]: value,
        }
      : parent
  );

const handleUpdateParentInputValues = (
  { target: { name, value } }: ChangeEvent<HTMLInputElement>,
  index: number,
  parents: ParentType[]
): ParentType[] => {
  const newValue = { ...parents[index][name], value };
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
  parents: ParentType[]
): ParentType[] => {
  const newValue = { ...parents[index].isInSameHousehold, value: checked };
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
  parents: ParentType[]
): ParentType[] => {
  const newAddress = {
    ...parents[index].address,
    [name]: { ...parents[index].address[name], value },
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
  parents: ParentType[]
): ParentType[] => {
  const newParents = parents.filter((parent, idx) => idx !== index);

  return newParents;
};

export {
  handleUpdateParentsByIndex,
  handleUpdateParentInputValues,
  handleToggleIsInSameHousehold,
  handleUpdateParentAddress,
  handleRemoveParent,
};
