import React, { FC, ReactElement, ChangeEvent } from 'react';
import { ExpansionPanel, Input, Radio } from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum } from 'shared/types/types';

const ClientInputs: FC = (): ReactElement => {
  const [{ intakeFormValues }, dispatch] = useStateValue();

  const { client } = intakeFormValues;

  const handleUpdateClient = (field: string, value: string): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeValues,
      intakeFormValues: {
        ...intakeFormValues,
        client: {
          ...client,
          [field]: value,
        },
      },
    });

  const handleUpdateClientInputValues = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>): void => handleUpdateClient(name, value);

  const handleChangeOtherGender = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void =>
    handleUpdateClient('otherGender', value);

  const handleUpdateClientGender = ({
    target: { name },
  }: ChangeEvent<HTMLInputElement>): void => handleUpdateClient('gender', name);

  const { genderOptions, headings, labels } = copyContent.clientInputs;

  return (
    <ExpansionPanel
      title={
        client.firstName || client.lastName
          ? `${client.firstName} ${client.lastName}`
          : headings.client
      }
      expanded
    >
      <p className="intake-form__field-title">General Information</p>

      <div className="intake-form__field-container">
        <Input
          id="client-first-name"
          name="firstName"
          label={labels.firstName}
          value={client.firstName.value}
          onChange={handleUpdateClientInputValues}
        />

        <Input
          id="client-last-name"
          name="lastName"
          label={labels.lastName}
          value={client.lastName.value}
          onChange={handleUpdateClientInputValues}
        />

        <Input
          type="date"
          name="dob"
          label={labels.dob}
          value={client.dob.value}
          onChange={handleUpdateClientInputValues}
        />

        <Input
          id="client-school"
          name="school"
          label={labels.school}
          value={client.school.value}
          onChange={handleUpdateClientInputValues}
        />

        <Input
          id="client-grade"
          name="grade"
          label={labels.grade}
          value={client.grade.value}
          onChange={handleUpdateClientInputValues}
        />

        <Radio
          label={labels.gender}
          selected={client.gender.value}
          options={genderOptions}
          onChange={handleUpdateClientGender}
          other={{
            value: client.otherGender || '',
            onChange: handleChangeOtherGender,
          }}
        />
      </div>
    </ExpansionPanel>
  );
};

export default ClientInputs;
