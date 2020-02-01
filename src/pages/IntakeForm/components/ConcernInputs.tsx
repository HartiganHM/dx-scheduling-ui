import React, { ReactElement, FunctionComponent, ChangeEvent } from 'react';
import { ExpansionPanel, TextArea } from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum } from 'shared/types/types';

const ConcernInputs: FunctionComponent = (): ReactElement => {
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

  const {
    headingConcerns,
    labelAreasOfConcern,
    labelCognitiveConcerns,
    labelCommunicationConcerns,
    labelMotorConcerns,
    labelSensoryConcerns,
  } = copyContent.intakeQuestions;

  return (
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
  );
};

export default ConcernInputs;
