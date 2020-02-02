import React, { ReactElement, FC, ChangeEvent } from 'react';
import classnames from 'classnames';
import {
  Checkbox,
  ExpansionPanel,
  TextArea,
} from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum } from 'shared/types/types';

const GeneralQuestions: FC = (): ReactElement => {
  const [{ intakeFormQuestions }, dispatch] = useStateValue();

  const {
    creditCardInfoSaved,
    ratesDiscussed,
    preferredTimes,
    needs,
    hasReferral,
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

  const { heading, labels } = copyContent.generalQuestions;

  return (
    <ExpansionPanel title={heading}>
      <div className="intake-form__field-container">
        <Checkbox
          label={labels.creditCardInfoSaved}
          options={[{ label: 'Yes', checked: creditCardInfoSaved }]}
          onChange={(event): void =>
            handleChangeCheckbox(event, 'creditCardInfoSaved')
          }
        />

        <Checkbox
          label={labels.ratesDiscussed}
          options={[{ label: 'Yes', checked: ratesDiscussed }]}
          onChange={(event): void =>
            handleChangeCheckbox(event, 'ratesDiscussed')
          }
        />

        <Checkbox
          label={labels.hasReferral}
          options={[{ label: 'Yes', checked: hasReferral }]}
          onChange={(event): void => handleChangeCheckbox(event, 'hasReferral')}
        />
      </div>

      <div
        className={classnames({
          'intake-form__field-container': true,
          'intake-form__field-container-text-area': true,
        })}
      >
        <TextArea
          name="preferredTimes"
          value={preferredTimes}
          label={labels.preferredTimes}
          onChange={handleChangeTextArea}
        />

        <TextArea
          name="needs"
          value={needs}
          label={labels.needs}
          onChange={handleChangeTextArea}
        />
      </div>
    </ExpansionPanel>
  );
};

export default GeneralQuestions;
