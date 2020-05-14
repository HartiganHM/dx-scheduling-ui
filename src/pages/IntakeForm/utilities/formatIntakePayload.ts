import {
  DiagnosisType,
  FieldStringType,
  FieldBooleanType,
  FieldArrayTypes,
  IntakeFormPayload,
  MergeState,
  PersonalInformationType,
  PhysicianType,
  ConcernType,
  FieldServicesType,
  IntakeFormValuesType,
  IntakeFormQuestionsType,
  IntakeFormQuestionsCreateInputType,
  IntakeFormValuesCreateInputType,
  ParentPayloadType,
} from 'shared/types/types';

type CreateTypes =
  | DiagnosisType
  | PersonalInformationType
  | PhysicianType
  | DiagnosisType
  | FieldStringType
  | FieldBooleanType
  | ConcernType
  | FieldServicesType;

const formatSimpleValues = (value: CreateTypes) =>
  Object.keys(value).reduce((fieldAccumulator, groupedProp) => {
    const groupedValue = value[groupedProp] as
      | FieldStringType
      | FieldBooleanType;

    return {
      ...fieldAccumulator,
      [groupedProp]: groupedValue.value,
    };
  }, {});

const formatFieldArrayValues = (fieldValue: any) =>
  (fieldValue as FieldArrayTypes[]).map(item => {
    return Object.keys(item).reduce((fieldAccumulator, groupedProp) => {
      const groupedValue = item[groupedProp];

      if (groupedProp === 'address') {
        return {
          ...fieldAccumulator,
          create: {
            [groupedProp]: Object.keys(groupedValue).reduce(
              (addressAccumulator, addressProp) => {
                const addressValue = groupedValue[
                  addressProp
                ] as FieldStringType;

                return {
                  ...addressAccumulator,
                  [addressProp]: addressValue.value,
                };
              },
              {}
            ),
          },
        };
      }

      return {
        ...fieldAccumulator,
        [groupedProp]: groupedValue.value,
      };
    }, {});
  });

const formatIntakeValues = (
  values: IntakeFormValuesType
): IntakeFormValuesCreateInputType => {
  const {
    date,
    servicesRequested,
    client,
    parents,
    physician,
    insurances,
  } = values;

  const formattedClient = formatSimpleValues(client);

  return {
    create: {
      date: date.value,
      servicesRequested: {
        set: servicesRequested.value,
      },
      client: {
        create: {
          ...formattedClient,
          parents: {
            create: formatFieldArrayValues(parents.value),
          },
          physician: {
            create: formatSimpleValues(physician),
          },
          insurances: {
            create: formatFieldArrayValues(insurances.value),
          },
        },
      },
    },
  } as IntakeFormValuesCreateInputType;
};

const formatIntakeQuestions = (
  values: IntakeFormQuestionsType
): IntakeFormQuestionsCreateInputType => {
  return {
    create: Object.keys(values).reduce((accumulator, fieldProp) => {
      const fieldValue = values[fieldProp];

      if (!fieldValue.hasOwnProperty('value')) {
        return {
          ...accumulator,
          [fieldProp]: {
            create: formatSimpleValues(fieldValue as CreateTypes),
          },
        };
      }

      return { ...accumulator, [fieldProp]: fieldValue.value };
    }, {}),
  } as IntakeFormQuestionsCreateInputType;
};

const formatIntakePayload = ({
  intakeFormValues,
  intakeFormQuestions,
}: MergeState): IntakeFormPayload => {
  const formattedValues = formatIntakeValues(
    intakeFormValues as IntakeFormValuesType
  );
  const formattedQuestions = formatIntakeQuestions(
    intakeFormQuestions as IntakeFormQuestionsType
  );

  const updatedParents = formattedValues.create.client.create.parents.create.map(
    (parent, index) => {
      const { isInSameHousehold } = parent;

      if (index > 0 && isInSameHousehold) {
        return {
          ...parent,
          address:
            formattedValues.create.client.create.parents.create[0].address,
        };
      }

      return parent;
    }
  );

  console.log({ formattedValues, formattedQuestions, updatedParents });
  return {
    intakeFormValues: formattedValues,
    intakeFormQuestions: formattedQuestions,
  };
};

export default formatIntakePayload;
