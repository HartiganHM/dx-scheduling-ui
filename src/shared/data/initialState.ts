import { InitialState } from 'shared/types/types';
import {
  defaultIntakeQuestionValues,
  defaultFormValues,
} from './intakeFormDefaultValues';

const initialState: InitialState = {
  currentlyViewing: {
    path: '/',
    title: 'Dashboard',
  },
  intakeFormValues: defaultFormValues,
  intakeFormQuestions: defaultIntakeQuestionValues,
};

export default initialState;
