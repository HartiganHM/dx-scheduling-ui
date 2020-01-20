import React, {
  useState,
  FunctionComponent,
  ChangeEvent,
  ReactElement,
} from 'react';
import classnames from 'classnames';

import {
  Button,
  Checkbox,
  ExpansionPanel,
  Input,
  Radio,
  Select,
} from '@f-design/component-library';

import './IntakeForm.scss';

type IntakeFormProps = {};

type IntakeFormType = {
  date: string;
  servicesRequested: ServicesType[];
  client: ClientType;
  parents: ParentType[];
  sameHousehold: boolean | undefined;
  physician: PhysicianType;
  insurances: InsuranceType[];
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

type ParentType = PersonalInformationType & {
  gender: string;
  phoneNumber: string;
  email: string;
  address: AddressType;
  isInSameHousehold: boolean;
  dob: string;
};

type AddressType = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

type PhysicianType = PersonalInformationType & {
  practice: string;
  phoneNumber: string;
};

type InsuranceType = {
  id: string;
  groupNumber: string;
  insured: string;
  provider: ProviderType;
};

type ProviderType = 'Kaiser' | 'Medicaid' | 'United' | string;

const defaultParentValues = {
  firstName: '',
  lastName: '',
  gender: '',
  phoneNumber: '',
  email: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
  },
  isInSameHousehold: false,
  dob: '',
};

const defaultInsuranceValues = {
  id: '',
  groupNumber: '',
  provider: '',
  insured: '',
};

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
  parents: [defaultParentValues],
  sameHousehold: undefined,
  physician: {
    firstName: '',
    lastName: '',
    practice: '',
    phoneNumber: '',
  },
  insurances: [],
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

const IntakeForm: FunctionComponent<IntakeFormProps> = (
  props: IntakeFormProps
) => {
  const [formValues, updateFormValues] = useState<IntakeFormType>(
    defaultFormValues
  );
  const [otherGenderValue, updateOtherGender] = useState('');
  const [formChecklist, updateFormChecklist] = useState(defaultChecklistValues);

  const {
    date,
    servicesRequested,
    client,
    parents,
    physician,
    insurances,
  } = formValues;

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

  const handleChangeOtherGender = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => updateOtherGender(value);

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

  const handleUpdateParents = (newParents: ParentType[]): void =>
    updateFormValues({
      ...formValues,
      parents: newParents,
    });

  const handleUpdateParentsByIndex = (
    parents: ParentType[],
    index: number,
    property: string,
    value: string | boolean | AddressType
  ): ParentType[] =>
    parents.map((parent, idx) => {
      if (index === idx) {
        return {
          ...parent,
          [property]: value,
        };
      }

      return parent;
    });

  const handleUpdateParentInputValues = (
    { target: { name, value } }: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const newParents = handleUpdateParentsByIndex(parents, index, name, value);

    handleUpdateParents(newParents);
  };

  const handleToggleIsInSameHousehold = (
    { target: { checked } }: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const newParents = handleUpdateParentsByIndex(
      parents,
      index,
      'isInSameHousehold',
      checked
    );

    handleUpdateParents(newParents);
  };

  const handleUpdateParentAddress = (
    { target: { name, value } }: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const newAddress = { ...parents[index].address, [name]: value };

    const newParents = handleUpdateParentsByIndex(
      parents,
      index,
      'address',
      newAddress
    );

    handleUpdateParents(newParents);
  };

  const handleAddParent = (): void =>
    updateFormValues({
      ...formValues,
      parents: [...parents, defaultParentValues],
    });

  const handleUpdatePhysicianInputValues = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>): void =>
    updateFormValues({
      ...formValues,
      physician: {
        ...physician,
        [name]: value,
      },
    });

  const handleSelectInsurance = ({
    target: { name, checked },
  }: ChangeEvent<HTMLInputElement>): void => {
    console.log({ name, checked });

    const newInsurance = checked
      ? [
          ...insurances,
          {
            ...defaultInsuranceValues,
            provider: name,
          },
        ]
      : insurances.filter(({ provider }) => provider !== name);

    updateFormValues({
      ...formValues,
      insurances: newInsurance,
    });
  };

  const handleUpdateInsurances = (newInsurances: InsuranceType[]): void =>
    updateFormValues({
      ...formValues,
      insurances: newInsurances,
    });

  const handleUpdateInsuranceByIndex = (
    insurances: InsuranceType[],
    index: number,
    property: string,
    value: string | boolean | ParentType
  ): InsuranceType[] =>
    insurances.map((parent, idx) => {
      if (index === idx) {
        return {
          ...parent,
          [property]: value,
        };
      }

      return parent;
    });

  const handleUpdateInsuranceInputValues = (
    { target: { name, value } }: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const newInsurance = handleUpdateInsuranceByIndex(
      insurances,
      index,
      name,
      value
    );

    handleUpdateInsurances(newInsurance);
  };

  const handleUpdateInsured = (value: string, index: number): void => {
    const newInsurance = handleUpdateInsuranceByIndex(
      insurances,
      index,
      'insured',
      value
    );

    handleUpdateInsurances(newInsurance);
  };

  const renderInsurance = (
    insurance: InsuranceType,
    index: number
  ): ReactElement => {
    const { provider, id, groupNumber, insured } = insurance;
    const parentOptions = parents
      .filter(({ firstName }) => firstName)
      .map(({ firstName, lastName }) => ({
        value: firstName,
        label: `${firstName} ${lastName}`,
      }));
    const parentNames = parentOptions.map(({ value }) => value);

    const matchingParent = parents.find(
      ({ firstName }) => firstName === insured
    );
    const selectedOption = matchingParent && {
      value: insured,
      label: `${matchingParent.firstName} ${matchingParent.lastName}`,
    };

    return (
      <>
        <p className="intake-form__field-title">{provider}</p>

        <div className="intake-form__field-container">
          <Input
            name="id"
            label="ID #"
            value={id}
            onChange={(event): void =>
              handleUpdateInsuranceInputValues(event, index)
            }
          />

          <Input
            name="groupNumber"
            label="Group #"
            value={groupNumber}
            onChange={(event): void =>
              handleUpdateInsuranceInputValues(event, index)
            }
          />

          <Select
            label="Insured"
            selected={selectedOption}
            options={parentOptions}
            onSelect={({ value }): void => handleUpdateInsured(value, index)}
          />

          <Input
            type="date"
            name="dob"
            label="Insured DOB"
            value={(matchingParent && matchingParent.dob) || ''}
            disabled={!insured}
            onChange={(event): void =>
              handleUpdateParentInputValues(event, parentNames.indexOf(insured))
            }
          />
        </div>
      </>
    );
  };

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

  const providers = ['Kaiser', 'Medicaid', 'United', 'Other'];

  const insuranceOptions = providers.map(provider => ({
    label: provider,
    checked: !!insurances.find(insurance => insurance.provider === provider),
  }));

  return (
    <div className="intake-form">
      <div className="intake-form__field-container">
        <Input
          type="date"
          name="date"
          label="Date"
          value={date}
          onChange={handleUpdateFormValue}
        />

        <Checkbox
          label="Services Requested"
          onChange={handleSelectServices}
          options={serviceOptions}
        />
      </div>

      <div className="intake-form__contacts">
        <ExpansionPanel
          title={
            client.firstName || client.lastName
              ? `${client.firstName} ${client.lastName}`
              : 'Client'
          }
          expanded
        >
          <p className="intake-form__field-title">General Information</p>

          <div className="intake-form__field-container">
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

            <Radio
              label="Gender"
              selected={client.gender}
              options={['Female', 'Male', 'Prefer not to say', 'Other']}
              onChange={handleUpdateClientGender}
              other={{
                value: otherGenderValue,
                onChange: handleChangeOtherGender,
              }}
            />
          </div>
        </ExpansionPanel>

        {parents.map(
          (
            {
              firstName,
              lastName,
              phoneNumber,
              email,
              address,
              isInSameHousehold,
            },
            index
          ) => (
            <ExpansionPanel
              key={`dfx-pg-${index}`}
              title={`${
                firstName || lastName
                  ? `${firstName} ${lastName}`
                  : `Parent/Guardian ${index + 1}`
              }`}
            >
              <p className="intake-form__field-title">Contact</p>

              <div className="intake-form__field-container">
                <Input
                  name="firstName"
                  label="First"
                  value={firstName}
                  onChange={(event): void =>
                    handleUpdateParentInputValues(event, index)
                  }
                />

                <Input
                  name="lastName"
                  label="Last"
                  value={lastName}
                  onChange={(event): void =>
                    handleUpdateParentInputValues(event, index)
                  }
                />

                <Input
                  type="tel"
                  name="phoneNumber"
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(event): void =>
                    handleUpdateParentInputValues(event, index)
                  }
                />

                <Input
                  type="email"
                  name="email"
                  label="Email"
                  value={email}
                  onChange={(event): void =>
                    handleUpdateParentInputValues(event, index)
                  }
                />
              </div>

              <p className="intake-form__field-title">Address</p>

              <>
                {index !== 0 && (
                  <div className="intake-form__field-container">
                    <Checkbox
                      onChange={(event): void =>
                        handleToggleIsInSameHousehold(event, index)
                      }
                      options={[
                        {
                          label: 'In same household?',
                          checked: isInSameHousehold,
                        },
                      ]}
                    />
                  </div>
                )}
              </>

              <ExpansionPanel expanded={!isInSameHousehold}>
                <div className="intake-form__field-container">
                  <Input
                    name="street"
                    label="Street"
                    value={address.street}
                    onChange={(event): void =>
                      handleUpdateParentAddress(event, index)
                    }
                  />

                  <Input
                    name="city"
                    label="City"
                    value={address.city}
                    onChange={(event): void =>
                      handleUpdateParentAddress(event, index)
                    }
                  />

                  <Input
                    name="state"
                    label="State"
                    value={address.state}
                    onChange={(event): void =>
                      handleUpdateParentAddress(event, index)
                    }
                  />

                  <Input
                    name="zip"
                    label="Zip"
                    value={address.zip}
                    onChange={(event): void =>
                      handleUpdateParentAddress(event, index)
                    }
                  />
                </div>
              </ExpansionPanel>
            </ExpansionPanel>
          )
        )}

        <ExpansionPanel title="Primary Care Provider">
          <div className="intake-form__field-container">
            <Input
              name="firstName"
              label="First"
              value={physician.firstName}
              onChange={handleUpdatePhysicianInputValues}
            />

            <Input
              name="lastName"
              label="Last"
              value={physician.lastName}
              onChange={handleUpdatePhysicianInputValues}
            />

            <Input
              type="tel"
              name="phoneNumber"
              label="Phone Number"
              value={physician.phoneNumber}
              onChange={handleUpdatePhysicianInputValues}
            />
          </div>
        </ExpansionPanel>

        <ExpansionPanel title="Insurance">
          <div className="intake-form__field-container">
            <Checkbox
              label="Providers"
              onChange={handleSelectInsurance}
              options={insuranceOptions}
            />
          </div>

          <>
            {insurances.map((insurance, index) =>
              renderInsurance(insurance, index)
            )}
          </>
        </ExpansionPanel>
      </div>

      <div className="intake-form__parent-controls">
        <Button onClick={handleAddParent} type="outline">
          <i
            className={classnames({
              'material-icons': true,
              'intake-form__add-button-icon': true,
            })}
          >
            add_circle_outline
          </i>
          Add Parent/Guardian
        </Button>
      </div>
    </div>
  );
};

export default IntakeForm;
