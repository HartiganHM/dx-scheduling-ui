// Global State
export type Actions = {
  type: ActionTypesEnum;
  currentlyViewing?: CurrentlyViewing;
  intakeFormValues?: IntakeFormValuesType;
  intakeFormQuestions?: IntakeFormQuestionsType;
};

export enum ActionTypesEnum {
  UpdateCurrentlyViewing = 'UPDATE_CURRENTLY_VIEWING',
  UpdateIntakeValues = 'UPDATE_INTAKE_VALUES',
  UpdateIntakeQuestions = 'UPDATE_INTAKE_QUESTIONS',
}

export interface InitialState {
  currentlyViewing: CurrentlyViewing;
  intakeFormValues: IntakeFormValuesType;
  intakeFormQuestions: IntakeFormQuestionsType;
}

// Intake Form Values
export interface IntakeFormValuesType {
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
  otherGender?: string;
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

// Intake Form Checklist
export interface IntakeFormQuestionsType {
  creditCardInfoSaved: boolean;
  ratesDiscussed: boolean;
  preferredTimes: string;
  needs: string;
  hasReferral: boolean;
  referral: PersonalInformationType;
  referralConcernMatch?: string;
  diagnosis: DiagnosisType;
  concerns: ConcernType;
  priorTherapy?: string;
  schoolSupport?: string;
  priorTreatments?: string;
}

export interface ConcernType {
  areas?: string;
  communication?: string;
  motor?: string;
  sensory?: string;
  cognitive?: string;
}

export interface DiagnosisType {
  name: string;
  provider: string;
  date: string;
  comments: string;
}

// Navigation
export interface CurrentlyViewing {
  path: string;
  title: string;
  subTitle?: string;
  backPath?: string;
}
