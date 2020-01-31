import React, { ReactElement, FunctionComponent, ChangeEvent } from 'react';
import classnames from 'classnames';
import {
  Checkbox,
  ExpansionPanel,
  Input,
  TextArea,
} from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum } from 'shared/types/types';

const QuestionInputs: FunctionComponent = (): ReactElement => {
  const [{ intakeFormQuestions }, dispatch] = useStateValue();

  const {
    creditCardInfoSaved,
    ratesDiscussed,
    preferredTimes,
    needs,
    hasReferral,
    referral,
    referralConcernMatch,
    diagnosis,
  } = intakeFormQuestions;

  const handleChangeCheckbox = (
    { target: { checked } }: ChangeEvent<HTMLInputElement>,
    name: string
  ): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeQuestions,
      intakeFormQuestions: {
        ...intakeFormQuestions,
        [name]: checked,
      },
    });

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

  const handleChangeDiagnosisValues = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const newDiagnosis = {
      ...diagnosis,
      [name]: value,
    };

    dispatch({
      type: ActionTypesEnum.UpdateIntakeQuestions,
      intakeFormQuestions: {
        ...intakeFormQuestions,
        diagnosis: newDiagnosis,
      },
    });
  };

  const {
    creditCardInfoSavedLabel,
    diagnosisCommentsLabel,
    diagnosisHeading,
    generalQuestionsHeading,
    hasReferralLabel,
    needsLabel,
    preferredTimesLabel,
    ratesDiscussedLabel,
    referralConcernMatchLabel,
    referralHeading,
  } = copyContent.questionInputs;

  return (
    <ExpansionPanel title="Intake Questions">
      <div className="intake-form__field-container">
        <Checkbox
          label={creditCardInfoSavedLabel}
          options={[{ label: 'Yes', checked: creditCardInfoSaved }]}
          onChange={(event): void =>
            handleChangeCheckbox(event, 'creditCardInfoSaved')
          }
        />

        <Checkbox
          label={ratesDiscussedLabel}
          options={[{ label: 'Yes', checked: ratesDiscussed }]}
          onChange={(event): void =>
            handleChangeCheckbox(event, 'ratesDiscussed')
          }
        />

        <Checkbox
          label={hasReferralLabel}
          options={[{ label: 'Yes', checked: hasReferral }]}
          onChange={(event): void => handleChangeCheckbox(event, 'hasReferral')}
        />
      </div>

      <ExpansionPanel expanded={!!hasReferral}>
        <p className="intake-form__field-title">{referralHeading}</p>
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
            label={referralConcernMatchLabel}
            onChange={handleChangeTextArea}
          />
        </div>
      </ExpansionPanel>

      <p className="intake-form__field-title">{generalQuestionsHeading}</p>
      <div
        className={classnames({
          'intake-form__field-container': true,
          'intake-form__field-container-text-area': true,
        })}
      >
        <TextArea
          name="preferredTimes"
          value={preferredTimes}
          label={preferredTimesLabel}
          onChange={handleChangeTextArea}
        />

        <TextArea
          name="needs"
          value={needs}
          label={needsLabel}
          onChange={handleChangeTextArea}
        />
      </div>

      <p className="intake-form__field-title">{diagnosisHeading}</p>
      <div className="intake-form__field-container">
        <Input
          id="diagnosis-name"
          name="name"
          label="First"
          value={diagnosis.name}
          onChange={handleChangeDiagnosisValues}
        />

        <Input
          id="diagnosis-provider"
          name="provider"
          label="Provider"
          value={diagnosis.provider}
          onChange={handleChangeDiagnosisValues}
        />

        <Input
          id="diagnosis-date"
          type="date"
          name="date"
          label="Date"
          value={diagnosis.date}
          onChange={handleChangeDiagnosisValues}
        />

        <TextArea
          name="comments"
          value={diagnosis.comments}
          label={diagnosisCommentsLabel}
          onChange={handleChangeDiagnosisValues}
        />
      </div>
    </ExpansionPanel>
  );
};

export default QuestionInputs;
