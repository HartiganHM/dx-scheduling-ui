import React, { ReactElement, FC, ChangeEvent } from 'react';
import { ExpansionPanel, TextArea } from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum } from 'shared/types/types';

const ConcernInputs: FC = (): ReactElement => {
  const [{ intakeFormQuestions }, dispatch] = useStateValue();

  const { concerns } = intakeFormQuestions;

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

  const { heading, labels } = copyContent.concernInputs;

  return (
    <ExpansionPanel title={heading}>
      <div className="intake-form__field-container">
        <TextArea
          name="areas"
          value={concerns.areas || ''}
          label={labels.areasOfConcern}
          onChange={handleChangeConcernsValues}
        />

        <TextArea
          name="communication"
          value={concerns.communication || ''}
          label={labels.communicationConcerns}
          onChange={handleChangeConcernsValues}
        />

        <TextArea
          name="motor"
          value={concerns.motor || ''}
          label={labels.motorConcerns}
          onChange={handleChangeConcernsValues}
        />

        <TextArea
          name="sensory"
          value={concerns.sensory || ''}
          label={labels.sensoryConcerns}
          onChange={handleChangeConcernsValues}
        />

        <TextArea
          name="cognitive"
          value={concerns.cognitive || ''}
          label={labels.cognitiveConcerns}
          onChange={handleChangeConcernsValues}
        />
      </div>
    </ExpansionPanel>
  );
};

export default ConcernInputs;
