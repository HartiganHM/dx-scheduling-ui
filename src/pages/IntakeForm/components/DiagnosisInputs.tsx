import React, { ReactElement, FunctionComponent, ChangeEvent } from 'react';
import { ExpansionPanel, Input, TextArea } from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum } from 'shared/types/types';

const DiagnosisInputs: FunctionComponent = (): ReactElement => {
  const [{ intakeFormQuestions }, dispatch] = useStateValue();

  const { diagnosis } = intakeFormQuestions;

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
    headingDiagnosis,
    labelDiagnosisComments,
  } = copyContent.intakeQuestions;

  return (
    <ExpansionPanel title={headingDiagnosis}>
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
    </ExpansionPanel>
  );
};

export default DiagnosisInputs;
