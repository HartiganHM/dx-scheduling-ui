import React, { FC, ChangeEvent } from 'react';
import classnames from 'classnames';
import { Button, Checkbox, Input } from '@f-design/component-library';
import { useStateValue } from 'components';
import { copyContent, defaultParentValues } from 'shared/data';
import { ActionTypesEnum, ServicesType } from 'shared/types/types';
import { validateIntakeForm } from './utilities';

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

const IntakeForm: FC = () => {
  const [{ intakeFormValues, intakeFormQuestions }, dispatch] = useStateValue();

  const { date, servicesRequested, parents } = intakeFormValues;
  const { hasReferral } = intakeFormQuestions;

  const handleUpdateDate = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeValues,
      intakeFormValues: {
        ...intakeFormValues,
        date: {
          ...intakeFormValues.date,
          value,
        },
      },
    });

  const handleSelectServices = ({
    target: { name, checked },
  }: ChangeEvent<HTMLInputElement>): void => {
    const newServices = checked
      ? [...servicesRequested.value, name]
      : servicesRequested.value.filter(service => service !== name);

    dispatch({
      type: ActionTypesEnum.UpdateIntakeValues,
      intakeFormValues: {
        ...intakeFormValues,
        servicesRequested: {
          ...intakeFormValues.servicesRequested,
          value: newServices as ServicesType[],
        },
      },
    });
  };

  const handleAddParent = (): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeValues,
      intakeFormValues: {
        ...intakeFormValues,
        parents: {
          ...intakeFormValues.parents,
          value: [...parents.value, defaultParentValues],
        },
      },
    });

  const handleSubmit = (): void => {
    const isValid = validateIntakeForm(intakeFormValues, intakeFormQuestions);
  };

  const { buttons, icons, labels, services } = copyContent.intakeForm;

  const serviceOptions = services.map(service => ({
    label: service,
    checked: servicesRequested.value.includes(service as ServicesType),
  }));

  return (
    <div className="intake-form">
      <div className="intake-form__field-container">
        <Input
          type="date"
          name="date"
          label={labels.date}
          value={date.value}
          onChange={handleUpdateDate}
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
        {hasReferral.value && <ReferralInputs />}
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
