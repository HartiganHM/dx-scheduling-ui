import React, { Fragment, ReactElement, FunctionComponent } from 'react';

import {
  Checkbox,
  ExpansionPanel,
  Input,
  Select,
} from '@f-design/component-library';

import { useStateValue } from 'components';
import { ActionTypesEnum, InsuranceType, ParentType } from 'shared/types/types';
import {
  handleSelectInsurance,
  handleUpdateInsuranceInputValues,
  handleUpdateInsured,
  handleUpdateParentInputValues,
} from '../utilities';

const InsuranceInputs: FunctionComponent = (): ReactElement => {
  const [{ intakeFormValues }, dispatch] = useStateValue();

  const { insurances, parents } = intakeFormValues;

  const handleUpdateFormValues = (
    key: string,
    newInsurances: InsuranceType[] | ParentType[]
  ): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeValues,
      intakeFormValues: {
        ...intakeFormValues,
        [key]: newInsurances,
      },
    });

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
      <Fragment key={provider}>
        <p className="intake-form__field-title">{provider}</p>

        <div className="intake-form__field-container">
          <Input
            name="id"
            label="ID #"
            value={id}
            onChange={(event): void =>
              handleUpdateFormValues(
                'insurances',
                handleUpdateInsuranceInputValues(event, index, insurances)
              )
            }
          />

          <Input
            name="groupNumber"
            label="Group #"
            value={groupNumber}
            onChange={(event): void =>
              handleUpdateFormValues(
                'insurances',
                handleUpdateInsuranceInputValues(event, index, insurances)
              )
            }
          />

          <Select
            label="Insured"
            selected={selectedOption}
            options={parentOptions}
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
            label="Insured DOB"
            value={(matchingParent && matchingParent.dob) || ''}
            disabled={!insured}
            onChange={(event): void =>
              handleUpdateFormValues(
                'parents',
                handleUpdateParentInputValues(
                  event,
                  parentNames.indexOf(insured),
                  parents
                )
              )
            }
          />
        </div>
      </Fragment>
    );
  };

  const providers = ['Kaiser', 'Medicaid', 'United', 'Other'];
  const insuranceOptions = providers.map(provider => ({
    label: provider,
    checked: !!insurances.find(insurance => insurance.provider === provider),
  }));

  return (
    <ExpansionPanel title="Insurance">
      <div className="intake-form__field-container">
        <Checkbox
          label="Providers"
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
        {insurances.map((insurance, index) =>
          renderInsurance(insurance, index)
        )}
      </>
    </ExpansionPanel>
  );
};

export default InsuranceInputs;
