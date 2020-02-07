import {
  IntakeFormValuesType,
  IntakeFormQuestionsType,
} from 'shared/types/types';

const requiredIntakeValue = [
  'date',
  'servicesRequested',
  'firstName',
  'lastName',
  'dob',
  'gender',
  'school',
  'grade',
  'phoneNumber',
  'email',
  'street',
  'city',
  'state',
  'zip',
  'idNumber',
  'groupNumber',
  'provider',
  'insured',
  'practice',
];

const requiredIntakeQuestions = [
  'creditCardInfoSaved',
  'ratesDiscussed',
  
];

const validateIntakeForm = (
  intakeFormValues: IntakeFormValuesType,
  intakeFormQuestions: IntakeFormQuestionsType
) => {};

export default validateIntakeForm;
