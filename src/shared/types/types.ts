// Global State
export type Actions = {
  type: ActionTypesEnum;
  currentlyViewing: CurrentlyViewing;
};

export enum ActionTypesEnum {
  UpdateCurrentlyViewing = 'UPDATE_CURRENTLY_VIEWING',
}

export interface InitialState {
  currentlyViewing: CurrentlyViewing;
  intakeFormValues: IntakeFormType;
  formChecklist: string;
}

// Intake Form
export interface IntakeFormType {
  date: string;
  servicesRequested: ServicesType[];
  client: ClientType;
  parents: ParentType[];
  sameHousehold: boolean | undefined;
  physician: PhysicianType;
  insurances: InsuranceType[];
}

export type ServicesType =
  | 'Psych Evaluation'
  | 'Psych Therapy'
  | 'OT Evaluation'
  | 'OT Treatment'
  | 'ST Evaluation'
  | 'ST Treatment';

export interface PersonalInformationType {
  firstName: string;
  lastName: string;
}

export interface ClientType extends PersonalInformationType {
  dob: string;
  gender: GenderType;
  school: string;
  grade: string;
}

export type GenderType = 'Female' | 'Male' | 'Prefer not to say' | string;

export interface ParentType extends PersonalInformationType {
  gender: string;
  phoneNumber: string;
  email: string;
  address: AddressType;
  isInSameHousehold: boolean;
  dob: string;
}

export interface AddressType {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface PhysicianType extends PersonalInformationType {
  practice: string;
  phoneNumber: string;
}

export interface InsuranceType {
  id: string;
  groupNumber: string;
  insured: string;
  provider: ProviderType;
}

type ProviderType = 'Kaiser' | 'Medicaid' | 'United' | string;

// Navigation
export interface CurrentlyViewing {
  path: string;
  title: string;
  subTitle?: string;
  backPath?: string;
}
