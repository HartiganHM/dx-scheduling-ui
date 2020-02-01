import React, { ReactElement, FunctionComponent, ChangeEvent } from 'react';
import { ExpansionPanel, Input, TextArea } from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum } from 'shared/types/types';

const ReferralInputs: FunctionComponent = (): ReactElement => {
  const [{ intakeFormQuestions }, dispatch] = useStateValue();

  const { referral, referralConcernMatch } = intakeFormQuestions;

  const handleChangeReferralValue = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>): void => {
    const newReferral = {
      ...referral,
      [name]: value,
    };

    dispatch({
      type: ActionTypesEnum.UpdateIntakeQuestions,
      intakeFormQuestions: {
        ...intakeFormQuestions,
        referral: newReferral,
      },
    });
  };

  const handleChangeTextArea = ({
    target: { name, value },
  }: ChangeEvent<HTMLTextAreaElement>): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeQuestions,
      intakeFormQuestions: {
        ...intakeFormQuestions,
        [name]: value,
      },
    });

  const {
    headingReferral,
    labelReferralConcernMatch,
  } = copyContent.intakeQuestions;

  return (
    <ExpansionPanel title={headingReferral}>
      <div className="intake-form__field-container">
        <Input
          id="referral-first-name"
          name="firstName"
          label="First"
          value={referral.firstName}
          onChange={handleChangeReferralValue}
        />

        <Input
          id="referral-last-name"
          name="lastName"
          label="Last"
          value={referral.lastName}
          onChange={handleChangeReferralValue}
        />

        <TextArea
          name="referralConcernMatch"
          value={referralConcernMatch || ''}
          label={labelReferralConcernMatch}
          onChange={handleChangeTextArea}
        />
      </div>
    </ExpansionPanel>
  );
};

export default ReferralInputs;
