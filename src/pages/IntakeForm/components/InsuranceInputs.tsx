import React, {
  Fragment,
  ReactElement,
  FC,
  ChangeEvent,
  useEffect,
} from 'react';

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
  ParentType,
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
  const { heading, labels, providers } = copyContent.insuranceInputs;

  useEffect(() => {
    const insuredNames = insurances.value.reduce(
      (accumulator, insurance) =>
        !!insurance.insured.value &&
        !accumulator.includes(insurance.insured.value)
          ? [...accumulator, insurance.insured.value]
          : accumulator,
      [] as string[]
    );
    const numberOfDobCaptured = parents.value.filter(parent => parent.dob.value)
      .length;

    if (insuredNames.length !== numberOfDobCaptured) {
      handleUpdateInsuredParentDobRequired(insuredNames);
    }
    /*eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [insurances.value]);

  const handleUpdateFormValues = (
    key: string,
    updatedValues: FieldInsurancesType | FieldParentsType
  ): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeValues,
      intakeFormValues: {
        ...intakeFormValues,
        [key]: updatedValues,
      },
    });

  const handleUpdateInsuredParentDobRequired = (names: string[]): void => {
    const updatedParents = parents.value.map(parent => {
      const { firstName, lastName } = parent;

      if (names.includes(`${firstName.value} ${lastName.value}`)) {
        return {
          ...parent,
          dob: {
            ...parent.dob,
            required: true,
          },
        };
      }

      return {
        ...parent,
        dob: {
          ...parent.dob,
          required: false,
          error: '',
        },
      };
    });

    handleUpdateFormValues('parents', {
      ...intakeFormValues.parents,
      value: updatedParents as ParentType[],
    });
  };
  const renderInsurance = (
    insurance: InsuranceType,
    index: number
  ): ReactElement => {
    const { provider, idNumber, groupNumber, insured } = insurance;

    const parentOptions = parents.value
      .filter(({ firstName }) => firstName.value)
      .map(({ firstName, lastName }) => ({
        value: `${firstName.value} ${lastName.value}`,
        label: `${firstName.value} ${lastName.value}`,
      }));
    const parentNames = parentOptions.map(({ value }) => value);

    const matchingParent = parents.value.find(({ firstName }) =>
      insured.value.includes(firstName.value)
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
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
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
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
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
            onSelect={({ value }: { value: string; label: string }): void => {
              handleUpdateFormValues(
                'insurances',
                handleUpdateInsured(value, index, insurances)
              );
            }}
          />

          <Input
            type="date"
            name="dob"
            label={labels.dob}
            value={(matchingParent && matchingParent.dob.value) || ''}
            disabled={!insured.value}
            errorMessage={matchingParent && matchingParent.dob.error}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
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
          options={insuranceOptions}
          errorMessage={insurances.error}
          onChange={(event: ChangeEvent<HTMLInputElement>): void =>
            handleUpdateFormValues(
              'insurances',
              handleSelectInsurance(event, insurances)
            )
          }
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
