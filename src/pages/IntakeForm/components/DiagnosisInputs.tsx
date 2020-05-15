import React, { ReactElement, FC, ChangeEvent } from 'react';
import { ExpansionPanel, Input, TextArea } from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum } from 'shared/types/types';

const DiagnosisInputs: FC = (): ReactElement => {
  const [{ intakeFormQuestions }, dispatch] = useStateValue();

  const { diagnosis } = intakeFormQuestions;
  const { name, provider, date, comments } = diagnosis;

  const handleChangeDiagnosisValues = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const newDiagnosis = {
      ...diagnosis,
      [name]: {
        ...diagnosis[name],
        value,
        error: '',
      },
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
          value={name.value}
          onChange={handleChangeDiagnosisValues}
          errorMessage={name.error}
        />

        <Input
          id="diagnosis-provider"
          name="provider"
          label={labels.provider}
          value={provider.value}
          onChange={handleChangeDiagnosisValues}
          errorMessage={provider.error}
        />

        <Input
          id="diagnosis-date"
          type="date"
          name="date"
          label={labels.date}
          value={date.value}
          onChange={handleChangeDiagnosisValues}
          errorMessage={date.error}
        />

        <TextArea
          name="comments"
          value={comments.value}
          label={labels.comments}
          onChange={handleChangeDiagnosisValues}
          errorMessage={comments.error}
        />
      </div>
    </ExpansionPanel>
  );
};

export default DiagnosisInputs;
