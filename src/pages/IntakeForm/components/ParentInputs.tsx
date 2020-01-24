import React, { ReactElement, FunctionComponent } from 'react';
import {
  Button,
  Checkbox,
  ExpansionPanel,
  Input,
} from '@f-design/component-library';

import { useStateValue } from 'components';
import { ActionTypesEnum, ParentType } from 'shared/types/types';
import {
  handleRemoveParent,
  handleToggleIsInSameHousehold,
  handleUpdateParentAddress,
  handleUpdateParentInputValues,
} from '../utilities';

const ParentInputs: FunctionComponent = (): ReactElement => {
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
                  handleUpdateParents(
                    handleUpdateParentInputValues(event, index, parents)
                  )
                }
              />

              <Input
                name="lastName"
                label="Last"
                value={lastName}
                onChange={(event): void =>
                  handleUpdateParents(
                    handleUpdateParentInputValues(event, index, parents)
                  )
                }
              />

              <Input
                type="tel"
                name="phoneNumber"
                label="Phone Number"
                value={phoneNumber}
                onChange={(event): void =>
                  handleUpdateParents(
                    handleUpdateParentInputValues(event, index, parents)
                  )
                }
              />

              <Input
                type="email"
                name="email"
                label="Email"
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
                    handleUpdateParents(
                      handleUpdateParentAddress(event, index, parents)
                    )
                  }
                />

                <Input
                  name="city"
                  label="City"
                  value={address.city}
                  onChange={(event): void =>
                    handleUpdateParents(
                      handleUpdateParentAddress(event, index, parents)
                    )
                  }
                />

                <Input
                  name="state"
                  label="State"
                  value={address.state}
                  onChange={(event): void =>
                    handleUpdateParents(
                      handleUpdateParentAddress(event, index, parents)
                    )
                  }
                />

                <Input
                  name="zip"
                  label="Zip"
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
                Delete
              </Button>
            )}
          </ExpansionPanel>
        )
      )}
    </>
  );
};

export default ParentInputs;
