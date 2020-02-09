import {
  IntakeFormValuesType,
  IntakeFormQuestionsType,
} from 'shared/types/types';

const validateIntakeForm = (
  intakeFormValues: IntakeFormValuesType,
  intakeFormQuestions: IntakeFormQuestionsType
) => {
  console.log({ intakeFormValues, intakeFormQuestions });
};

export default validateIntakeForm;
