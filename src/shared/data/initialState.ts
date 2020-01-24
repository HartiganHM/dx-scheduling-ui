import { InitialState } from 'shared/types/types';
import { defaultFormValues } from './intakeFormDefaultValues';

const initialState: InitialState = {
  currentlyViewing: {
    path: '/',
    title: 'Dashboard',
  },
  intakeFormValues: defaultFormValues,
  formChecklist: '',
};

export default initialState;
