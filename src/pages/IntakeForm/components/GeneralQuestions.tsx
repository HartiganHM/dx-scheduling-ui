import React, { ReactElement, FC, ChangeEvent } from 'react';
import classnames from 'classnames';
import {
  Checkbox,
  ExpansionPanel,
  TextArea,
} from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import {
  FieldBooleanType,
  FieldStringType,
  ActionTypesEnum,
} from 'shared/types/types';

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
        [name]: {
          ...intakeFormQuestions[name],
          value: checked,
        } as FieldBooleanType,
      },
    });

  const handleChangeTextArea = ({
    target: { name, value },
  }: ChangeEvent<HTMLTextAreaElement>): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeQuestions,
      intakeFormQuestions: {
        ...intakeFormQuestions,
        [name]: {
          ...intakeFormQuestions[name],
          value,
        } as FieldStringType,
      },
    });

  const { heading, labels } = copyContent.generalQuestions;

  return (
    <ExpansionPanel title={heading}>
      <div className="intake-form__field-container">
        <Checkbox
          label={labels.creditCardInfoSaved}
          options={[{ label: 'Yes', checked: creditCardInfoSaved.value }]}
          onChange={(event): void =>
            handleChangeCheckbox(event, 'creditCardInfoSaved')
          }
          errorMessage={creditCardInfoSaved.error}
        />

        <Checkbox
          label={labels.ratesDiscussed}
          options={[{ label: 'Yes', checked: ratesDiscussed.value }]}
          onChange={(event): void =>
            handleChangeCheckbox(event, 'ratesDiscussed')
          }
          errorMessage={ratesDiscussed.error}
        />

        <Checkbox
          label={labels.hasReferral}
          options={[{ label: 'Yes', checked: hasReferral.value }]}
          onChange={(event): void => handleChangeCheckbox(event, 'hasReferral')}
          errorMessage={hasReferral.error}
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
          value={preferredTimes.value}
          label={labels.preferredTimes}
          onChange={handleChangeTextArea}
          errorMessage={preferredTimes.error}
        />

        <TextArea
          name="needs"
          value={needs.value}
          label={labels.needs}
          onChange={handleChangeTextArea}
          errorMessage={needs.error}
        />
      </div>
    </ExpansionPanel>
  );
};

export default GeneralQuestions;
