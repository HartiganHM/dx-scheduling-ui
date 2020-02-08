import React, { ReactElement, FC, ChangeEvent } from 'react';
import { ExpansionPanel, Input, TextArea } from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum } from 'shared/types/types';

const DiagnosisInputs: FC = (): ReactElement => {
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

  const { heading, labels } = copyContent.diagnosisInputs;

  return (
    <ExpansionPanel title={heading}>
      <div className="intake-form__field-container">
        <Input
          id="diagnosis-name"
          name="name"
          label={labels.name}
          value={diagnosis.name.value}
          onChange={handleChangeDiagnosisValues}
        />

        <Input
          id="diagnosis-provider"
          name="provider"
          label={labels.provider}
          value={diagnosis.provider.value}
          onChange={handleChangeDiagnosisValues}
        />

        <Input
          id="diagnosis-date"
          type="date"
          name="date"
          label={labels.date}
          value={diagnosis.date.value}
          onChange={handleChangeDiagnosisValues}
        />

        <TextArea
          name="comments"
          value={diagnosis.comments.value}
          label={labels.comments}
          onChange={handleChangeDiagnosisValues}
        />
      </div>
    </ExpansionPanel>
  );
};

export default DiagnosisInputs;
