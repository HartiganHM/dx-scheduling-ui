import { Dispatch } from 'react';

import {
  Actions,
  IntakeFormValuesType,
  IntakeFormQuestionsType,
} from 'shared/types/types';

const validateIntakeForm = (
  intakeFormValues: IntakeFormValuesType,
  intakeFormQuestions: IntakeFormQuestionsType,
  dispatch: Dispatch<Actions>
) => {
  console.log({ intakeFormValues, intakeFormQuestions });
};

export default validateIntakeForm;
