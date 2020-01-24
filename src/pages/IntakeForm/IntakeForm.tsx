import React, { useState, FunctionComponent, ChangeEvent } from 'react';

import classnames from 'classnames';

import {
  Button,
  Checkbox,
  ExpansionPanel,
  Input,
  Radio,
} from '@f-design/component-library';

import {
  defaultChecklistValues,
  defaultFormValues,
  defaultParentValues,
} from 'shared/data';

import { IntakeFormType, ServicesType } from 'shared/types/types';

import {
  InsuranceInputs,
  ParentInputs,
  PrimaryCareProviderInputs,
} from './components';

import './IntakeForm.scss';

type IntakeFormProps = {};

const IntakeForm: FunctionComponent<IntakeFormProps> = (
  props: IntakeFormProps
) => {
  const [formValues, updateFormValues] = useState<IntakeFormType>(
    defaultFormValues
  );
  const [otherGenderValue, updateOtherGender] = useState('');
  const [formChecklist, updateFormChecklist] = useState(defaultChecklistValues);

  const { date, servicesRequested, client, parents } = formValues;

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

  const handleAddParent = (): void =>
    updateFormValues({
      ...formValues,
      parents: [...parents, defaultParentValues],
    });

  const handleSubmit = (): void => {
    console.log({ formValues, formChecklist });
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

        <ParentInputs />

        <PrimaryCareProviderInputs />

        <InsuranceInputs />
      </div>

      <div className="intake-form__parent-controls-container">
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

        <Button onClick={handleSubmit} type="brand">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default IntakeForm;
