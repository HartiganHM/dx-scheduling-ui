import React, { FC, ReactElement, ChangeEvent } from 'react';
import { ExpansionPanel, Input, Radio } from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum } from 'shared/types/types';

const ClientInputs: FC = (): ReactElement => {
  const [{ intakeFormValues }, dispatch] = useStateValue();

  const { client } = intakeFormValues;
  const {
    firstName,
    lastName,
    dob,
    school,
    grade,
    gender,
    otherGender,
  } = client;

  const handleUpdateClient = (field: string, value: string): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeValues,
      intakeFormValues: {
        ...intakeFormValues,
        client: {
          ...client,
          [field]: {
            ...client[field],
            value,
          },
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
        firstName.value || lastName.value
          ? `${firstName.value} ${lastName.value}`
          : headings.client
      }
      expanded
    >
      <p className="intake-form__field-title">{headings.general}</p>

      <div className="intake-form__field-container">
        <Input
          id="client-first-name"
          name="firstName"
          label={labels.firstName}
          value={firstName.value}
          onChange={handleUpdateClientInputValues}
          errorMessage={firstName.error}
        />

        <Input
          id="client-last-name"
          name="lastName"
          label={labels.lastName}
          value={lastName.value}
          onChange={handleUpdateClientInputValues}
          errorMessage={lastName.error}
        />

        <Input
          type="date"
          name="dob"
          label={labels.dob}
          value={dob.value}
          onChange={handleUpdateClientInputValues}
          errorMessage={dob.error}
        />

        <Input
          id="client-school"
          name="school"
          label={labels.school}
          value={school.value}
          onChange={handleUpdateClientInputValues}
          errorMessage={school.error}
        />

        <Input
          id="client-grade"
          name="grade"
          label={labels.grade}
          value={grade.value}
          onChange={handleUpdateClientInputValues}
          errorMessage={grade.error}
        />

        <Radio
          label={labels.gender}
          selected={gender.value}
          options={genderOptions}
          onChange={handleUpdateClientGender}
          other={{
            value: otherGender.value || '',
            onChange: handleChangeOtherGender,
          }}
          errorMessage={gender.error}
        />
      </div>
    </ExpansionPanel>
  );
};

export default ClientInputs;
