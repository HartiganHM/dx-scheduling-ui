import React, { useState, FunctionComponent, ChangeEvent } from 'react';
import { Checkbox, Input, Radio } from '@f-design/component-library';

import './IntakeForm.scss';

type IntakeFormProps = {};

type IntakeFormType = {
  date: string;
  servicesRequested: ServicesType[];
  client: ClientType;
  parentGuardian: ParentGuardianType[];
  sameHousehold: boolean | undefined;
  physician: PhysicianType;
  insurance: InsuranceType[];
};

type ServicesType =
  | 'Psych Evaluation'
  | 'Psych Therapy'
  | 'OT Evaluation'
  | 'OT Treatment'
  | 'ST Evaluation'
  | 'ST Treatment';

type PersonalInformationType = {
  firstName: string;
  lastName: string;
};

type ClientType = PersonalInformationType & {
  dob: string;
  gender: GenderType;
  school: string;
  grade: string;
};

type GenderType = 'Female' | 'Male' | 'Prefer not to say' | string;

type ParentGuardianType = PersonalInformationType & {
  gender: string;
  phoneNumber: string;
  email: string;
  address: AddressType;
  dob?: string;
};

type AddressType = {
  street: string;
  city: string;
  state: string;
  zip: number;
};

type PhysicianType = PersonalInformationType & {
  practice: string;
  phoneNumber: string;
};

type InsuranceType = {
  id: string;
  groupNumber: string;
  provider: ProviderType;
};

type ProviderType = 'Kaiser' | 'Medicaid' | 'United' | string;

const defaultFormValues = {
  date: '',
  servicesRequested: [],
  client: {
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    school: '',
    grade: '',
  },
  parentGuardian: [],
  sameHousehold: undefined,
  physician: {
    firstName: '',
    lastName: '',
    practice: '',
    phoneNumber: '',
  },
  insurance: [],
};

const defaultChecklistValues = {
  creditCardInfoSave: false,
  ratesDiscussed: false,
  preferredTimes: '',
  needs: '',
  referral: '',
  referralConcernMatch: '',
  diagnosis: {
    name: '',
    date: '',
    provider: '',
    comments: '',
  },
  concerns: {
    areas: '',
    communication: '',
    motor: '',
    sensory: '',
    cognitive: '',
  },
  priorTherapy: '',
  schoolSupport: '',
  priorTreatments: '',
};

const defaultInsuranceValues = {
  id: '',
  groupNumber: '',
  provider: '',
};

const IntakeForm: FunctionComponent<IntakeFormProps> = (
  props: IntakeFormProps
) => {
  const [formValues, updateFormValues] = useState<IntakeFormType>(
    defaultFormValues
  );
  const [formChecklist, updateFormChecklist] = useState(defaultChecklistValues);

  const { date, servicesRequested, client, insurance } = formValues;

  const handleUpdateFormValue = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>): void =>
    updateFormValues({
      ...formValues,
      [name]: value,
    });

  const handleSelectServices = ({
    target: { name, checked },
  }: ChangeEvent<HTMLInputElement>): void => {
    const newServices = checked
      ? [...servicesRequested, name]
      : servicesRequested.filter(service => service !== name);

    updateFormValues({
      ...formValues,
      servicesRequested: newServices as ServicesType[],
    });
  };

  const handleSelectInsurance = ({
    target: { name, checked },
  }: ChangeEvent<HTMLInputElement>): void => {
    console.log({ name, checked });

    const newInsurance = checked
      ? [
          ...insurance,
          {
            ...defaultInsuranceValues,
            provider: name,
          },
        ]
      : insurance.filter(({ provider }) => provider !== name);

    updateFormValues({
      ...formValues,
      insurance: newInsurance,
    });
  };

  const handleUpdateClientInputValues = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>): void =>
    updateFormValues({
      ...formValues,
      client: {
        ...client,
        [name]: value,
      },
    });

  const handleUpdateClientGender = ({
    target: { name },
  }: ChangeEvent<HTMLInputElement>): void =>
    updateFormValues({
      ...formValues,
      client: {
        ...client,
        gender: name,
      },
    });

  const services = [
    'Psych Evaluation',
    'Psych Therapy',
    'OT Evaluation',
    'OT Treatment',
    'ST Evaluation',
    'ST Treatment',
  ];

  const serviceOptions = services.map(service => ({
    label: service,
    checked: servicesRequested.includes(service as ServicesType),
  }));

  return (
    <div className="dx-intake-form">
      <Input
        type="date"
        name="date"
        label="Date"
        value={date}
        onChange={handleUpdateFormValue}
      />

      <h4>Services Requested</h4>
      <Checkbox onChange={handleSelectServices} options={serviceOptions} />

      <div className="dx-intake-form__card">
        <h4 className="dx-intake-form__card-heading">Client Information</h4>
        <div className="dx-intake-form__field-container">
          <Input
            name="firstName"
            label="First"
            value={client.firstName}
            onChange={handleUpdateClientInputValues}
          />

          <Input
            name="lastName"
            label="Last"
            value={client.lastName}
            onChange={handleUpdateClientInputValues}
          />

          <Input
            type="date"
            name="dob"
            label="DOB"
            value={client.dob}
            onChange={handleUpdateClientInputValues}
          />

          <Input
            name="school"
            label="School Name"
            value={client.school}
            onChange={handleUpdateClientInputValues}
          />

          <Input
            name="grade"
            label="Grade"
            value={client.grade}
            onChange={handleUpdateClientInputValues}
          />
        </div>

        <Radio
          selected={client.gender}
          options={['Female', 'Male', 'Prefer not to say', 'Other']}
          onChange={handleUpdateClientGender}
        />
      </div>
    </div>
  );
};

export default IntakeForm;
