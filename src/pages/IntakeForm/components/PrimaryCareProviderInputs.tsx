import React, { FC, ReactElement, ChangeEvent } from 'react';
import { ExpansionPanel, Input } from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum, FieldStringType } from 'shared/types/types';

const PrimaryCareProviderInputs: FC = (): ReactElement => {
  const [{ intakeFormValues }, dispatch] = useStateValue();
  const { physician } = intakeFormValues;

  const handleUpdatePhysicianInputValues = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeValues,
      intakeFormValues: {
        ...intakeFormValues,
        physician: {
          ...physician,
          [name]: {
            ...physician[name],
            value,
            error: '',
          } as FieldStringType,
        },
      },
    });

  const { heading, labels } = copyContent.primaryCareProviderInputs;

  return (
    <ExpansionPanel title={heading}>
      <div className="intake-form__field-container">
        <Input
          id="pcp-first-name"
          name="firstName"
          label={labels.firstName}
          value={physician.firstName.value}
          errorMessage={physician.firstName.error}
          onChange={handleUpdatePhysicianInputValues}
        />

        <Input
          id="pcp-last-name"
          name="lastName"
          label={labels.lastName}
          value={physician.lastName.value}
          errorMessage={physician.lastName.error}
          onChange={handleUpdatePhysicianInputValues}
        />

        <Input
          id="pcp-phone-number"
          type="tel"
          name="phoneNumber"
          label={labels.phoneNumber}
          value={physician.phoneNumber.value}
          errorMessage={physician.phoneNumber.error}
          onChange={handleUpdatePhysicianInputValues}
        />

        <Input
          id="pcp-practice"
          name="practice"
          label={labels.practice}
          value={physician.practice.value}
          errorMessage={physician.practice.error}
          onChange={handleUpdatePhysicianInputValues}
        />
      </div>
    </ExpansionPanel>
  );
};

export default PrimaryCareProviderInputs;
