import React, { FC, ReactElement, ChangeEvent } from 'react';
import { ExpansionPanel, Input } from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum } from 'shared/types/types';

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
          [name]: value,
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
          onChange={handleUpdatePhysicianInputValues}
        />

        <Input
          id="pcp-last-name"
          name="lastName"
          label={labels.lastName}
          value={physician.lastName.value}
          onChange={handleUpdatePhysicianInputValues}
        />

        <Input
          id="pcp-phone-number"
          type="tel"
          name="phoneNumber"
          label={labels.phoneNumber}
          value={physician.phoneNumber.value}
          onChange={handleUpdatePhysicianInputValues}
        />
      </div>
    </ExpansionPanel>
  );
};

export default PrimaryCareProviderInputs;
