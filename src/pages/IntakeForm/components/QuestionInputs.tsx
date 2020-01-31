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
    concerns,
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

  const handleChangeConcernsValues = ({
    target: { name, value },
  }: ChangeEvent<HTMLTextAreaElement>): void => {
    const newConcerns = {
      ...concerns,
      [name]: value,
    };

    dispatch({
      type: ActionTypesEnum.UpdateIntakeQuestions,
      intakeFormQuestions: {
        ...intakeFormQuestions,
        concerns: newConcerns,
      },
    });
  };

  const {
    headingConcerns,
    headingDiagnosis,
    headingGeneralQuestions,
    headingReferral,
    labelAreasOfConcern,
    labelCognitiveConcerns,
    labelCommunicationConcerns,
    labelCreditCardInfoSaved,
    labelDiagnosisComments,
    labelHasReferral,
    labelMotorConcerns,
    labelNeeds,
    labelPreferredTimes,
    labelRatesDiscussed,
    labelReferralConcernMatch,
    labelSensoryConcerns,
  } = copyContent.questionInputs;

  return (
    <ExpansionPanel title="Intake Questions">
      <div className="intake-form__field-container">
        <Checkbox
          label={labelCreditCardInfoSaved}
          options={[{ label: 'Yes', checked: creditCardInfoSaved }]}
          onChange={(event): void =>
            handleChangeCheckbox(event, 'creditCardInfoSaved')
          }
        />

        <Checkbox
          label={labelRatesDiscussed}
          options={[{ label: 'Yes', checked: ratesDiscussed }]}
          onChange={(event): void =>
            handleChangeCheckbox(event, 'ratesDiscussed')
          }
        />

        <Checkbox
          label={labelHasReferral}
          options={[{ label: 'Yes', checked: hasReferral }]}
          onChange={(event): void => handleChangeCheckbox(event, 'hasReferral')}
        />
      </div>

      <ExpansionPanel expanded={!!hasReferral}>
        <p className="intake-form__field-title">{headingReferral}</p>

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

      <p className="intake-form__field-title">{headingGeneralQuestions}</p>

      <div
        className={classnames({
          'intake-form__field-container': true,
          'intake-form__field-container-text-area': true,
        })}
      >
        <TextArea
          name="preferredTimes"
          value={preferredTimes}
          label={labelPreferredTimes}
          onChange={handleChangeTextArea}
        />

        <TextArea
          name="needs"
          value={needs}
          label={labelNeeds}
          onChange={handleChangeTextArea}
        />
      </div>

      <p className="intake-form__field-title">{headingDiagnosis}</p>

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
          label={labelDiagnosisComments}
          onChange={handleChangeDiagnosisValues}
        />
      </div>

      <p className="intake-form__field-title">{headingConcerns}</p>

      <div className="intake-form__field-container">
        <TextArea
          name="areas"
          value={concerns.areas || ''}
          label={labelAreasOfConcern}
          onChange={handleChangeConcernsValues}
        />

        <TextArea
          name="communication"
          value={concerns.communication || ''}
          label={labelCommunicationConcerns}
          onChange={handleChangeConcernsValues}
        />

        <TextArea
          name="motor"
          value={concerns.motor || ''}
          label={labelMotorConcerns}
          onChange={handleChangeConcernsValues}
        />

        <TextArea
          name="sensory"
          value={concerns.sensory || ''}
          label={labelSensoryConcerns}
          onChange={handleChangeConcernsValues}
        />

        <TextArea
          name="cognitive"
          value={concerns.cognitive || ''}
          label={labelCognitiveConcerns}
          onChange={handleChangeConcernsValues}
        />
      </div>
    </ExpansionPanel>
  );
};

export default QuestionInputs;
