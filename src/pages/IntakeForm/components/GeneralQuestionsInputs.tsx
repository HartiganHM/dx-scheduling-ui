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

const GeneralQuestionsInputs: FC = (): ReactElement => {
  const [{ intakeFormQuestions }, dispatch] = useStateValue();

  const {
    creditCardInfoSaved,
    ratesDiscussed,
    preferredTimes,
    needs,
    hasReferral,
    priorTherapy,
    schoolSupport,
    priorTreatments,
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
          error: '',
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
          error: '',
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
          errorMessage={creditCardInfoSaved.error}
          onChange={(event): void =>
            handleChangeCheckbox(event, 'creditCardInfoSaved')
          }
        />

        <Checkbox
          label={labels.ratesDiscussed}
          options={[{ label: 'Yes', checked: ratesDiscussed.value }]}
          errorMessage={ratesDiscussed.error}
          onChange={(event): void =>
            handleChangeCheckbox(event, 'ratesDiscussed')
          }
        />

        <Checkbox
          label={labels.hasReferral}
          options={[{ label: 'Yes', checked: hasReferral.value }]}
          errorMessage={hasReferral.error}
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
          value={preferredTimes.value}
          label={labels.preferredTimes}
          errorMessage={preferredTimes.error}
          onChange={handleChangeTextArea}
        />

        <TextArea
          name="needs"
          value={needs.value}
          label={labels.needs}
          errorMessage={needs.error}
          onChange={handleChangeTextArea}
        />

        <TextArea
          name="priorTherapy"
          value={priorTherapy.value}
          label={labels.priorTherapy}
          errorMessage={priorTherapy.error}
          onChange={handleChangeTextArea}
        />

        <TextArea
          name="schoolSupport"
          value={schoolSupport.value}
          label={labels.schoolSupport}
          errorMessage={schoolSupport.error}
          onChange={handleChangeTextArea}
        />

        <TextArea
          name="priorTreatments"
          value={priorTreatments.value}
          label={labels.priorTreatments}
          errorMessage={priorTreatments.error}
          onChange={handleChangeTextArea}
        />
      </div>
    </ExpansionPanel>
  );
};

export default GeneralQuestionsInputs;
