import React, { ReactElement, FunctionComponent, ChangeEvent } from 'react';
import { ExpansionPanel, Input, TextArea } from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum } from 'shared/types/types';

const QuestionInputs: FunctionComponent = (): ReactElement => {
  const [{ intakeFormQuestions }, dispatch] = useStateValue();

  const {
    hasReferral,
    referral,
    referralConcernMatch,
    diagnosis,
    concerns,
  } = intakeFormQuestions;

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
    headingReferral,
    labelAreasOfConcern,
    labelCognitiveConcerns,
    labelCommunicationConcerns,
    labelDiagnosisComments,
    labelMotorConcerns,
    labelReferralConcernMatch,
    labelSensoryConcerns,
  } = copyContent.questionInputs;

  return (
    <ExpansionPanel title="Intake Questions">
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

      <ExpansionPanel title={headingConcerns}>
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
    </ExpansionPanel>
  );
};

export default QuestionInputs;
