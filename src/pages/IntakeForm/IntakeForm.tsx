import React, { FC, ChangeEvent } from 'react';
import classnames from 'classnames';
import { useMutation } from '@apollo/client';
import { Button, Checkbox, Input } from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent, defaultParentValues } from 'shared/data';
import CREATE_CLIENT_INTAKE from 'shared/mutations/createClientIntake';
import { ActionTypesEnum, ServicesType } from 'shared/types/types';
import { validateIntakeForm, formatIntakePayload } from './utilities';

import {
  ClientInputs,
  DiagnosisInputs,
  GeneralQuestionsInputs,
  InsuranceInputs,
  ParentInputs,
  PrimaryCareProviderInputs,
  ConcernInputs,
  ReferralInputs,
} from './components';

import './IntakeForm.scss';

const IntakeForm: FC = () => {
  const [submitIntakeForm, { data }] = useMutation(CREATE_CLIENT_INTAKE);
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
          ...date,
          value,
          error: '',
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
          error: '',
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

  const handleSubmit = async () => {
    const isValid = validateIntakeForm(
      { intakeFormValues, intakeFormQuestions },
      dispatch
    );


    if (isValid) {
      const payload = formatIntakePayload({
        intakeFormValues,
        intakeFormQuestions,
      });

      await submitIntakeForm({ variables: { input: payload } });
    }
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
          errorMessage={date.error}
        />

        <Checkbox
          label={labels.servicesRequested}
          onChange={handleSelectServices}
          options={serviceOptions}
          errorMessage={servicesRequested.error}
        />
      </div>

      <div className="intake-form__contacts">
        <ClientInputs />
        <ParentInputs />
        <PrimaryCareProviderInputs />
        <InsuranceInputs />
        <GeneralQuestionsInputs />
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
