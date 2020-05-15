import React, { ReactElement, FC, ChangeEvent } from 'react';
import { ExpansionPanel, Input, TextArea } from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import {
  ActionTypesEnum,
  FieldStringType,
  PersonalInformationType,
} from 'shared/types/types';

const ReferralInputs: FC = (): ReactElement => {
  const [{ intakeFormQuestions }, dispatch] = useStateValue();

  const { referral, referralConcernMatch } = intakeFormQuestions;

  const handleChangeReferralValue = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>): void => {
    const newReferral = {
      ...referral,
      [name]: {
        ...referral[name],
        value,
        error: '',
      },
    };

    dispatch({
      type: ActionTypesEnum.UpdateIntakeQuestions,
      intakeFormQuestions: {
        ...intakeFormQuestions,
        referral: newReferral as PersonalInformationType,
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
        [name]: {
          ...intakeFormQuestions[name],
          value,
          error: '',
        } as FieldStringType,
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
          value={referral.firstName.value}
          onChange={handleChangeReferralValue}
          errorMessage={referral.firstName.error}
        />

        <Input
          id="referral-last-name"
          name="lastName"
          label={labels.lastName}
          value={referral.lastName.value}
          onChange={handleChangeReferralValue}
          errorMessage={referral.lastName.error}
        />

        <TextArea
          name="referralConcernMatch"
          value={referralConcernMatch.value || ''}
          label={labels.referralConcernMatch}
          onChange={handleChangeTextArea}
          errorMessage={referralConcernMatch.error}
        />
      </div>
    </ExpansionPanel>
  );
};

export default ReferralInputs;
