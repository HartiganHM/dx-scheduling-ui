import React, { Fragment, ReactElement, FC } from 'react';

import {
  Checkbox,
  ExpansionPanel,
  Input,
  Select,
} from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import {
  ActionTypesEnum,
  FieldInsurancesType,
  FieldParentsType,
  InsuranceType,
} from 'shared/types/types';
import {
  handleSelectInsurance,
  handleUpdateInsuranceInputValues,
  handleUpdateInsured,
  handleUpdateParentInputValues,
} from '../utilities';

const InsuranceInputs: FC = (): ReactElement => {
  const [{ intakeFormValues }, dispatch] = useStateValue();

  const { insurances, parents } = intakeFormValues;

  const handleUpdateFormValues = (
    key: string,
    newInsurances: FieldInsurancesType | FieldParentsType
  ): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeValues,
      intakeFormValues: {
        ...intakeFormValues,
        [key]: newInsurances,
      },
    });

  const { heading, labels, providers } = copyContent.insuranceInputs;

  const renderInsurance = (
    insurance: InsuranceType,
    index: number
  ): ReactElement => {
    const { provider, idNumber, groupNumber, insured } = insurance;

    const parentOptions = parents.value
      .filter(({ firstName }) => firstName.value)
      .map(({ firstName, lastName }) => ({
        value: firstName.value,
        label: `${firstName.value} ${lastName.value}`,
      }));
    const parentNames = parentOptions.map(({ value }) => value);

    const matchingParent = parents.value.find(
      ({ firstName }) => firstName.value === insured.value
    );
    const selectedOption = matchingParent && {
      value: insured.value,
      label: `${matchingParent.firstName.value} ${matchingParent.lastName.value}`,
    };

    return (
      <Fragment key={provider.value}>
        <p className="intake-form__field-title">{provider.value}</p>

        <div className="intake-form__field-container">
          <Input
            id={`provider-${provider.value}`}
            name="idNumber"
            label={labels.idNumber}
            value={idNumber.value}
            errorMessage={idNumber.error}
            onChange={(event): void =>
              handleUpdateFormValues(
                'insurances',
                handleUpdateInsuranceInputValues(event, index, insurances)
              )
            }
          />

          <Input
            name="groupNumber"
            label={labels.groupNumber}
            value={groupNumber.value}
            errorMessage={groupNumber.error}
            onChange={(event): void =>
              handleUpdateFormValues(
                'insurances',
                handleUpdateInsuranceInputValues(event, index, insurances)
              )
            }
          />

          <Select
            label={labels.insured}
            selected={selectedOption}
            options={parentOptions}
            errorMessage={insured.error}
            onSelect={({ value }): void =>
              handleUpdateFormValues(
                'insurances',
                handleUpdateInsured(value, index, insurances)
              )
            }
          />

          <Input
            type="date"
            name="dob"
            label={labels.dob}
            value={(matchingParent && matchingParent.dob.value) || ''}
            disabled={!insured.value}
            errorMessage={matchingParent && matchingParent.dob.error}
            onChange={(event): void =>
              handleUpdateFormValues(
                'parents',
                handleUpdateParentInputValues(
                  event,
                  parentNames.indexOf(insured.value),
                  parents
                )
              )
            }
          />
        </div>
      </Fragment>
    );
  };

  const insuranceOptions = providers.map(provider => ({
    label: provider,
    checked: !!insurances.value.find(
      insurance => insurance.provider.value === provider
    ),
  }));

  return (
    <ExpansionPanel title={heading}>
      <div className="intake-form__field-container">
        <Checkbox
          label={labels.providers}
          onChange={(event): void =>
            handleUpdateFormValues(
              'insurances',
              handleSelectInsurance(event, insurances)
            )
          }
          options={insuranceOptions}
        />
      </div>

      <>
        {insurances.value.map((insurance, index) =>
          renderInsurance(insurance, index)
        )}
      </>
    </ExpansionPanel>
  );
};

export default InsuranceInputs;
