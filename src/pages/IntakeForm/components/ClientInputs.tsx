import React, {
  FunctionComponent,
  ReactElement,
  ChangeEvent,
  useState,
} from 'react';
import { ExpansionPanel, Input, Radio } from '@f-design/component-library';

import { useStateValue } from 'components';
import { ActionTypesEnum } from 'shared/types/types';

const ClientInputs: FunctionComponent = (): ReactElement => {
  const [{ intakeFormValues }, dispatch] = useStateValue();
  const [otherGenderValue, updateOtherGender] = useState('');

  const { client } = intakeFormValues;

  const handleUpdateClientInputValues = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeValues,
      intakeFormValues: {
        ...intakeFormValues,
        client: {
          ...client,
          [name]: value,
        },
      },
    });

  const handleChangeOtherGender = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => updateOtherGender(value);

  const handleUpdateClientGender = ({
    target: { name },
  }: ChangeEvent<HTMLInputElement>): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeValues,
      intakeFormValues: {
        ...intakeFormValues,
        client: {
          ...client,
          gender: name,
        },
      },
    });

  return (
    <ExpansionPanel
      title={
        client.firstName || client.lastName
          ? `${client.firstName} ${client.lastName}`
          : 'Client'
      }
      expanded
    >
      <p className="intake-form__field-title">General Information</p>

      <div className="intake-form__field-container">
        <Input
          id="client-first-name"
          name="firstName"
          label="First"
          value={client.firstName}
          onChange={handleUpdateClientInputValues}
        />

        <Input
          id="client-last-name"
          name="lastName"
          label="Last"
          value={client.lastName}
          onChange={handleUpdateClientInputValues}
        />

        <Input
          type="date"
          name="dob"
          label="DOB"
          value={client.dob}
          onChange={handleUpdateClientInputValues}
        />

        <Input
          id="client-school"
          name="school"
          label="School Name"
          value={client.school}
          onChange={handleUpdateClientInputValues}
        />

        <Input
          id="client-grade"
          name="grade"
          label="Grade"
          value={client.grade}
          onChange={handleUpdateClientInputValues}
        />

        <Radio
          label="Gender"
          selected={client.gender}
          options={['Female', 'Male', 'Prefer not to say', 'Other']}
          onChange={handleUpdateClientGender}
          other={{
            value: otherGenderValue,
            onChange: handleChangeOtherGender,
          }}
        />
      </div>
    </ExpansionPanel>
  );
};

export default ClientInputs;
