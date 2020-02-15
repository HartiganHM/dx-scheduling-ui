import React, { ReactElement, FC, ChangeEvent } from 'react';
import classnames from 'classnames';
import { ExpansionPanel, TextArea } from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum } from 'shared/types/types';

const ConcernInputs: FC = (): ReactElement => {
  const [{ intakeFormQuestions }, dispatch] = useStateValue();

  const { concerns } = intakeFormQuestions;
  const { areas, communication, motor, sensory, cognitive } = concerns;

  const handleChangeConcernsValues = ({
    target: { name, value },
  }: ChangeEvent<HTMLTextAreaElement>): void => {
    const newConcerns = {
      ...concerns,
      [name]: {
        ...concerns[name],
        value,
        error: '',
      },
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
      <div
        className={classnames({
          'intake-form__field-container': true,
          'intake-form__field-container-text-area': true,
        })}
      >
        <TextArea
          name="areas"
          value={areas.value}
          label={labels.areasOfConcern}
          onChange={handleChangeConcernsValues}
          errorMessage={areas.error}
        />

        <TextArea
          name="communication"
          value={communication.value}
          label={labels.communicationConcerns}
          onChange={handleChangeConcernsValues}
          errorMessage={communication.error}
        />

        <TextArea
          name="motor"
          value={motor.value}
          label={labels.motorConcerns}
          onChange={handleChangeConcernsValues}
          errorMessage={motor.error}
        />

        <TextArea
          name="sensory"
          value={sensory.value}
          label={labels.sensoryConcerns}
          onChange={handleChangeConcernsValues}
          errorMessage={sensory.error}
        />

        <TextArea
          name="cognitive"
          value={cognitive.value}
          label={labels.cognitiveConcerns}
          onChange={handleChangeConcernsValues}
          errorMessage={cognitive.error}
        />
      </div>
    </ExpansionPanel>
  );
};

export default ConcernInputs;
