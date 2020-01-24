import { ChangeEvent } from 'react';

import { AddressType, ParentType } from 'shared/types/types';

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

const handleToggleIsInSameHousehold = (
  { target: { checked } }: ChangeEvent<HTMLInputElement>,
  index: number,
  parents: ParentType[]
): ParentType[] => {
  const newParents = handleUpdateParentsByIndex(
    parents,
    index,
    'isInSameHousehold',
    checked
  );

  return newParents;
};

const handleUpdateParentAddress = (
  { target: { name, value } }: ChangeEvent<HTMLInputElement>,
  index: number,
  parents: ParentType[]
): ParentType[] => {
  const newAddress = { ...parents[index].address, [name]: value };

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
