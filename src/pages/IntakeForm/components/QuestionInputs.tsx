import React, { ReactElement, FunctionComponent, ChangeEvent } from 'react';
import {
  Checkbox,
  ExpansionPanel,
  TextArea,
} from '@f-design/component-library';

import { useStateValue } from 'components';
import { ActionTypesEnum } from 'shared/types/types';

const QuestionInputs: FunctionComponent = (): ReactElement => {
  const [{ intakeFormQuestions }, dispatch] = useStateValue();

  const { creditCardInfoSaved, ratesDiscussed } = intakeFormQuestions;

  const handleTogglePaymentInformationSaved = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>): void => {
    dispatch({
      type: ActionTypesEnum.UpdateIntakeQuestions,
      intakeFormQuestions: {
        ...intakeFormQuestions,
        creditCardInfoSaved: checked,
      },
    });
  };

  return (
    <ExpansionPanel title="Intake Questions">
      <div className="intake-form__field-container">
        <Checkbox
          label="Payment information saved?"
          onChange={handleTogglePaymentInformationSaved}
          options={[{ label: 'Yes', checked: creditCardInfoSaved }]}
        />
      </div>
    </ExpansionPanel>
  );
};

export default QuestionInputs;
