import React, { FunctionComponent, ReactElement, ChangeEvent } from 'react';
import { ExpansionPanel, Input } from '@f-design/component-library';

import { useStateValue } from 'components';
import { ActionTypesEnum } from 'shared/types/types';

const PrimaryCareProviderInputs: FunctionComponent = (): ReactElement => {
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

  return (
    <ExpansionPanel title="Primary Care Provider">
      <div className="intake-form__field-container">
        <Input
          id="pcp-first-name"
          name="firstName"
          label="First"
          value={physician.firstName}
          onChange={handleUpdatePhysicianInputValues}
        />

        <Input
          id="pcp-last-name"
          name="lastName"
          label="Last"
          value={physician.lastName}
          onChange={handleUpdatePhysicianInputValues}
        />

        <Input
          id="pcp-phone-number"
          type="tel"
          name="phoneNumber"
          label="Phone Number"
          value={physician.phoneNumber}
          onChange={handleUpdatePhysicianInputValues}
        />
      </div>
    </ExpansionPanel>
  );
};

export default PrimaryCareProviderInputs;
