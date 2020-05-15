// Global State
export type Actions = {
  type: ActionTypesEnum;
  currentlyViewing?: CurrentlyViewing;
  intakeFormValues?: IntakeFormValuesType;
  intakeFormQuestions?: IntakeFormQuestionsType;
  mergeState?: MergeState;
};

export enum ActionTypesEnum {
  MergeState = 'MERGE_STATE',
  UpdateCurrentlyViewing = 'UPDATE_CURRENTLY_VIEWING',
  UpdateIntakeValues = 'UPDATE_INTAKE_VALUES',
  UpdateIntakeQuestions = 'UPDATE_INTAKE_QUESTIONS',
}

export interface InitialState {
  currentlyViewing: CurrentlyViewing;
  intakeFormValues: IntakeFormValuesType;
  intakeFormQuestions: IntakeFormQuestionsType;
}

export interface MergeState {
  [key: string]: IntakeFormQuestionsType | IntakeFormValuesType;
}

// Errors
export interface Error {
  [key: string]: string;
}

// Intake Form Values
export interface FieldBaseValues {
  [key: string]:
    | boolean
    | string
    | ServicesType[]
    | ParentType[]
    | InsuranceType[];
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

export type FieldArrayTypes = InsuranceType | ParentType;

export interface IntakeFormValuesType {
  [key: string]:
    | FieldStringType
    | FieldServicesType
    | ClientType
    | FieldParentsType
    | PhysicianType
    | FieldInsurancesType;
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

// GQL Input Types
export interface IntakeFormPayload {
  intakeFormValues: IntakeFormValuesCreateInputType;
  intakeFormQuestions: IntakeFormQuestionsCreateInputType;
}

export interface IntakeFormValuesCreateInputType {
  create: IntakeFormValuesPayload;
}

export interface IntakeFormValuesPayload {
  date: string;
  servicesRequested: ServicesCreateInputType;
  client: ClientCreateInputType;
}

export interface PersonalInformationPayloadType {
  firstName: string;
  lastName: string;
}

export interface ClientCreateInputType {
  create: ClientPayloadType;
}

export interface ClientPayloadType extends PersonalInformationPayloadType {
  [key: string]:
    | string
    | ParentCreateInputType
    | PhysicianCreateInputType
    | InsuranceCreatePayloadType
    | undefined;
  dob: string;
  gender: string;
  school: string;
  grade: string;
  parents: ParentCreateInputType;
  physician: PhysicianCreateInputType;
  insurances: InsuranceCreatePayloadType;
  otherGender?: string;
}

export type PayloadArrayType = ParentPayloadType | InsurancePayloadType;

export interface ParentCreateInputType {
  create: ParentPayloadType[];
}

export interface ParentPayloadType extends PersonalInformationPayloadType {
  phoneNumber: string;
  email: string;
  address: AddressCreateInputType;
  isInSameHousehold: boolean;
  dob: string;
}

export interface AddressCreateInputType {
  create: AddressPayloadType;
}

export interface AddressPayloadType {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface PhysicianCreateInputType {
  create: PhysicianPayloadType;
}

export interface PhysicianPayloadType extends PersonalInformationPayloadType {
  practice: string;
  phoneNumber: string;
}

export interface InsuranceCreatePayloadType {
  create: InsurancePayloadType[];
}

export interface InsurancePayloadType {
  idNumber: string;
  groupNumber: string;
  provider: string;
  insured: string;
}

export interface ServicesCreateInputType {
  set: ServicesType[];
}

export interface IntakeFormQuestionsCreateInputType {
  create: IntakeFormQuestionsPayload;
}

export interface IntakeFormQuestionsPayload {
  creditCardInfoSaved: boolean;
  ratesDiscussed: boolean;
  preferredTimes: boolean;
  needs: string;
  hasReferral: boolean;
  priorTherapy: string;
  schoolSupport: string;
  priorTreatments: string;
  referral: PersonalInformationPayloadType;
  referralConcernMatch: string;
  diagnosis: DiagnosisPayloadType;
  concerns: ConcernPayloadType;
}

export interface DiagnosisPayloadType {
  name: string;
  provider: string;
  date: string;
  comments: string;
}

export interface ConcernPayloadType {
  areas: string;
  communication: string;
  motor: string;
  sensory: string;
  cognitive: string;
}
