import { InitialState } from 'shared/types/types';
import {
  defaultChecklistValues,
  defaultFormValues,
} from './intakeFormDefaultValues';

const initialState: InitialState = {
  currentlyViewing: {
    path: '/',
    title: 'Dashboard',
  },
  intakeFormValues: defaultFormValues,
  intakeFormChecklist: defaultChecklistValues,
};

export default initialState;
