import React, { ReactElement, FC, ChangeEvent } from 'react';
import { ExpansionPanel, Input, TextArea } from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum } from 'shared/types/types';

const ReferralInputs: FC = (): ReactElement => {
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

  const { heading, labels } = copyContent.referralInputs;

  return (
    <ExpansionPanel title={heading}>
      <div className="intake-form__field-container">
        <Input
          id="referral-first-name"
          name="firstName"
          label={labels.firstName}
          value={referral.firstName}
          onChange={handleChangeReferralValue}
        />

        <Input
          id="referral-last-name"
          name="lastName"
          label={labels.lastName}
          value={referral.lastName}
          onChange={handleChangeReferralValue}
        />

        <TextArea
          name="referralConcernMatch"
          value={referralConcernMatch || ''}
          label={labels.referralConcernMatch}
          onChange={handleChangeTextArea}
        />
      </div>
    </ExpansionPanel>
  );
};

export default ReferralInputs;
