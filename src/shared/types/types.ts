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

// Errors
export interface Errors {
  [key: string]: string;
}

// Intake Form Values
interface FieldBaseValues {
  required: boolean;
  error: string;
}
export interface FieldStringType extends FieldBaseValues {
  value: string;
}

export interface FieldBooleanType extends FieldBaseValues {
  value: boolean;
}

export interface FieldServicesType extends FieldBaseValues {
  value: ServicesType[];
}

export interface FieldGenderType extends FieldBaseValues {
  value: GenderType;
}

export interface FieldProviderType extends FieldBaseValues {
  value: ProviderType;
}

export interface FieldParentsType extends FieldBaseValues {
  value: ParentType[];
}

export interface FieldInsurancesType extends FieldBaseValues {
  value: InsuranceType[];
}

export interface IntakeFormValuesType {
  date: FieldStringType;
  servicesRequested: FieldServicesType;
  client: ClientType;
  parents: FieldParentsType;
  physician: PhysicianType;
  insurances: FieldInsurancesType;
}

export type ServicesType =
  | 'Psych Evaluation'
  | 'Psych Therapy'
  | 'OT Evaluation'
  | 'OT Treatment'
  | 'ST Evaluation'
  | 'ST Treatment';

export interface PersonalInformationType {
  [key: string]: FieldStringType | FieldBooleanType | AddressType;
  firstName: FieldStringType;
  lastName: FieldStringType;
}

export interface ClientType extends PersonalInformationType {
  [key: string]: FieldStringType;
  dob: FieldStringType;
  gender: FieldGenderType;
  school: FieldStringType;
  grade: FieldStringType;
  otherGender: FieldStringType;
}

export type GenderType = 'Female' | 'Male' | 'Prefer not to say' | string;

export interface ParentType extends PersonalInformationType {
  gender: FieldStringType;
  phoneNumber: FieldStringType;
  email: FieldStringType;
  address: AddressType;
  isInSameHousehold: FieldBooleanType;
  dob: FieldStringType;
}

export interface AddressType {
  [key: string]: FieldStringType;
  street: FieldStringType;
  city: FieldStringType;
  state: FieldStringType;
  zip: FieldStringType;
}

export interface PhysicianType extends PersonalInformationType {
  practice: FieldStringType;
  phoneNumber: FieldStringType;
}

export interface InsuranceType {
  [key: string]: FieldStringType;
  idNumber: FieldStringType;
  groupNumber: FieldStringType;
  insured: FieldStringType;
  provider: FieldProviderType;
}

type ProviderType = 'Kaiser' | 'Medicaid' | 'United' | string;

// Intake Form Checklist
export interface IntakeFormQuestionsType {
  [key: string]:
    | FieldBooleanType
    | FieldStringType
    | PersonalInformationType
    | DiagnosisType
    | ConcernType;
  creditCardInfoSaved: FieldBooleanType;
  ratesDiscussed: FieldBooleanType;
  preferredTimes: FieldStringType;
  needs: FieldStringType;
  hasReferral: FieldBooleanType;
  referral: PersonalInformationType;
  referralConcernMatch: FieldStringType;
  diagnosis: DiagnosisType;
  concerns: ConcernType;
  priorTherapy: FieldStringType;
  schoolSupport: FieldStringType;
  priorTreatments: FieldStringType;
}

export interface ConcernType {
  [key: string]: FieldStringType;
  areas: FieldStringType;
  communication: FieldStringType;
  motor: FieldStringType;
  sensory: FieldStringType;
  cognitive: FieldStringType;
}

export interface DiagnosisType {
  [key: string]: FieldStringType;
  name: FieldStringType;
  provider: FieldStringType;
  date: FieldStringType;
  comments: FieldStringType;
}

// Navigation
export interface CurrentlyViewing {
  path: string;
  title: string;
  subTitle?: string;
  backPath?: string;
}
