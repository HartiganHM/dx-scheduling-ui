import React, { ReactElement, FC } from 'react';
import {
  Button,
  Checkbox,
  ExpansionPanel,
  Input,
} from '@f-design/component-library';

import { useStateValue } from 'components';
import { copyContent } from 'shared/data';
import { ActionTypesEnum, ParentType } from 'shared/types/types';
import {
  handleRemoveParent,
  handleToggleIsInSameHousehold,
  handleUpdateParentAddress,
  handleUpdateParentInputValues,
} from '../utilities';

const ParentInputs: FC = (): ReactElement => {
  const [{ intakeFormValues }, dispatch] = useStateValue();
  const { parents } = intakeFormValues;

  const handleUpdateParents = (newParents: ParentType[]): void =>
    dispatch({
      type: ActionTypesEnum.UpdateIntakeValues,
      intakeFormValues: {
        ...intakeFormValues,
        parents: newParents,
      },
    });

  const { buttons, heading, labels } = copyContent.parentInputs;

  return (
    <>
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
                : heading(index + 1)
            }`}
          >
            <p className="intake-form__field-title">Contact</p>

            <div className="intake-form__field-container">
              <Input
                id={`parent-${index}-first-name`}
                name="firstName"
                label={labels.firstName}
                value={firstName}
                onChange={(event): void =>
                  handleUpdateParents(
                    handleUpdateParentInputValues(event, index, parents)
                  )
                }
              />

              <Input
                id={`parent-${index}-last-name`}
                name="lastName"
                label={labels.lastName}
                value={lastName}
                onChange={(event): void =>
                  handleUpdateParents(
                    handleUpdateParentInputValues(event, index, parents)
                  )
                }
              />

              <Input
                id={`parent-${index}-phone-number`}
                type="tel"
                name="phoneNumber"
                label={labels.phoneNumber}
                value={phoneNumber}
                onChange={(event): void =>
                  handleUpdateParents(
                    handleUpdateParentInputValues(event, index, parents)
                  )
                }
              />

              <Input
                id={`parent-${index}-email`}
                type="email"
                name="email"
                label={labels.email}
                value={email}
                onChange={(event): void =>
                  handleUpdateParents(
                    handleUpdateParentInputValues(event, index, parents)
                  )
                }
              />
            </div>

            <p className="intake-form__field-title">Address</p>

            <>
              {index !== 0 && (
                <div className="intake-form__field-container">
                  <Checkbox
                    onChange={(event): void =>
                      handleUpdateParents(
                        handleToggleIsInSameHousehold(event, index, parents)
                      )
                    }
                    options={[
                      {
                        label: labels.sameHousehold,
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
                  id={`parent-${index}-street`}
                  name="street"
                  label={labels.street}
                  value={address.street}
                  onChange={(event): void =>
                    handleUpdateParents(
                      handleUpdateParentAddress(event, index, parents)
                    )
                  }
                />

                <Input
                  id={`parent-${index}-city`}
                  name="city"
                  label={labels.city}
                  value={address.city}
                  onChange={(event): void =>
                    handleUpdateParents(
                      handleUpdateParentAddress(event, index, parents)
                    )
                  }
                />

                <Input
                  id={`parent-${index}-state`}
                  name="state"
                  label={labels.state}
                  value={address.state}
                  onChange={(event): void =>
                    handleUpdateParents(
                      handleUpdateParentAddress(event, index, parents)
                    )
                  }
                />

                <Input
                  id={`parent-${index}-zip`}
                  name="zip"
                  label={labels.zip}
                  value={address.zip}
                  onChange={(event): void =>
                    handleUpdateParents(
                      handleUpdateParentAddress(event, index, parents)
                    )
                  }
                />
              </div>
            </ExpansionPanel>

            {parents.length > 1 && (
              <Button
                className="intake-form__delete-button"
                type="default-destructive"
                onClick={(): void =>
                  handleUpdateParents(handleRemoveParent(index, parents))
                }
              >
                {buttons.delete}
              </Button>
            )}
          </ExpansionPanel>
        )
      )}
    </>
  );
};

export default ParentInputs;
