import React, { ReactElement, FunctionComponent, ChangeEvent } from 'react';
import classnames from 'classnames';
import {
  Checkbox,
  ExpansionPanel,
  Input,
  TextArea,
} from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum } from 'shared/types/types';

const GeneralQuestions: FunctionComponent = (): ReactElement => {
  const [{ intakeFormQuestions }, dispatch] = useStateValue();

  const {
    creditCardInfoSaved,
    ratesDiscussed,
    preferredTimes,
    needs,
    hasReferral,
  } = intakeFormQuestions;

  const {
    headingGeneralQuestions,
    labelCreditCardInfoSaved,
    labelHasReferral,
    labelNeeds,
    labelPreferredTimes,
    labelRatesDiscussed,
  } = copyContent.questionInputs;

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

  return (
    <ExpansionPanel title={headingGeneralQuestions}>
      <div className="intake-form__field-container">
        <Checkbox
          label={labelCreditCardInfoSaved}
          options={[{ label: 'Yes', checked: creditCardInfoSaved }]}
          onChange={(event): void =>
            handleChangeCheckbox(event, 'creditCardInfoSaved')
          }
        />

        <Checkbox
          label={labelRatesDiscussed}
          options={[{ label: 'Yes', checked: ratesDiscussed }]}
          onChange={(event): void =>
            handleChangeCheckbox(event, 'ratesDiscussed')
          }
        />

        <Checkbox
          label={labelHasReferral}
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
          label={labelPreferredTimes}
          onChange={handleChangeTextArea}
        />

        <TextArea
          name="needs"
          value={needs}
          label={labelNeeds}
          onChange={handleChangeTextArea}
        />
      </div>
    </ExpansionPanel>
  );
};

export default GeneralQuestions;
