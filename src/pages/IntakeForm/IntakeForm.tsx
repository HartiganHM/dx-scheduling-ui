import React, { FunctionComponent, ChangeEvent } from 'react';
import classnames from 'classnames';
import { Button, Checkbox, Input } from '@f-design/component-library';
import { useStateValue } from 'components';
import { copyContent, defaultParentValues } from 'shared/data';
import { ActionTypesEnum, ServicesType } from 'shared/types/types';

import {
  ClientInputs,
  DiagnosisInputs,
  GeneralQuestions,
  InsuranceInputs,
  ParentInputs,
  PrimaryCareProviderInputs,
  ConcernInputs,
  ReferralInputs,
} from './components';

import './IntakeForm.scss';

const IntakeForm: FunctionComponent = () => {
  const [{ intakeFormValues, intakeFormQuestions }, dispatch] = useStateValue();

  const { date, servicesRequested, parents } = intakeFormValues;
  const { hasReferral } = intakeFormQuestions;

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

  const { buttons, icons, labels, services } = copyContent.intakeForm;

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
          label={labels.date}
          value={date}
          onChange={handleUpdateFormValue}
        />

        <Checkbox
          label={labels.servicesRequested}
          onChange={handleSelectServices}
          options={serviceOptions}
        />
      </div>

      <div className="intake-form__contacts">
        <ClientInputs />
        <ParentInputs />
        <PrimaryCareProviderInputs />
        <InsuranceInputs />
        <GeneralQuestions />
        {hasReferral && <ReferralInputs />}
        <DiagnosisInputs />
        <ConcernInputs />
      </div>

      <div className="intake-form__parent-controls-container">
        <Button onClick={handleAddParent} type="outline">
          <i
            className={classnames({
              'material-icons': true,
              'intake-form__add-button-icon': true,
            })}
          >
            {icons.addParent}
          </i>
          {buttons.addParent}
        </Button>

        <Button onClick={handleSubmit} type="brand">
          {buttons.submit}
        </Button>
      </div>
    </div>
  );
};

export default IntakeForm;
