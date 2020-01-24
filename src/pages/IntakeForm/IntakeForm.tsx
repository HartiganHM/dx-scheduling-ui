import React, { FunctionComponent, ChangeEvent } from 'react';

import classnames from 'classnames';

import { Button, Checkbox, Input } from '@f-design/component-library';

import { useStateValue } from 'components';
import { defaultParentValues } from 'shared/data';
import { ActionTypesEnum, ServicesType } from 'shared/types/types';

import {
  ClientInputs,
  InsuranceInputs,
  ParentInputs,
  PrimaryCareProviderInputs,
} from './components';

import './IntakeForm.scss';

const IntakeForm: FunctionComponent = () => {
  const [{ intakeFormValues }, dispatch] = useStateValue();

  const { date, servicesRequested, parents } = intakeFormValues;

  const handleUpdateFormValue = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeValues,
      intakeFormValues: {
        ...intakeFormValues,
        [name]: value,
      },
    });

  const handleSelectServices = ({
    target: { name, checked },
  }: ChangeEvent<HTMLInputElement>): void => {
    const newServices = checked
      ? [...servicesRequested, name]
      : servicesRequested.filter(service => service !== name);

    dispatch({
      type: ActionTypesEnum.UpdateIntakeValues,
      intakeFormValues: {
        ...intakeFormValues,
        servicesRequested: newServices as ServicesType[],
      },
    });
  };

  const handleAddParent = (): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeValues,
      intakeFormValues: {
        ...intakeFormValues,
        parents: [...parents, defaultParentValues],
      },
    });

  const handleSubmit = (): void => {
    console.log({ intakeFormValues });
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
        <ClientInputs />

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
