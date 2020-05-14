import {
  ConcernPayloadType,
  ConcernType,
  DiagnosisPayloadType,
  DiagnosisType,
  FieldStringType,
  FieldBooleanType,
  FieldArrayTypes,
  IntakeFormPayload,
  IntakeFormQuestionsCreateInputType,
  IntakeFormQuestionsType,
  IntakeFormValuesCreateInputType,
  IntakeFormValuesType,
  MergeState,
  ParentType,
  PersonalInformationType,
  PhysicianType,
  PayloadArrayType,
  PersonalInformationPayloadType,
  PhysicianPayloadType,
} from 'shared/types/types';

type CreateTypes =
  | DiagnosisType
  | PersonalInformationType
  | PhysicianType
  | ConcernType;

type CreatePayloadTypes =
  | DiagnosisPayloadType
  | PersonalInformationPayloadType
  | PhysicianPayloadType
  | ConcernPayloadType;

const formatCreateTypes = (value: CreateTypes): CreatePayloadTypes =>
  Object.keys(value).reduce((fieldAccumulator, groupedProp) => {
    const groupedValue = value[groupedProp] as
      | FieldStringType
      | FieldBooleanType;

    return {
      ...fieldAccumulator,
      [groupedProp]: groupedValue.value,
    };
  }, {}) as CreatePayloadTypes;

const formatFieldArrayValues = (
  fieldValue: FieldArrayTypes[]
): PayloadArrayType[] =>
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
  }) as PayloadArrayType[];

const formatParents = (parents: ParentType[]): ParentType[] => {
  const updatedParents = parents.map((parent, index) => {
    const { isInSameHousehold } = parent;

    if (index > 0 && isInSameHousehold) {
      return {
        ...parent,
        address: parents[0].address,
      };
    }

    return parent;
  });

  return updatedParents;
};

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

  const formattedClient = formatCreateTypes(client);
  const hasParentInSameHousehold = !!parents.value.find(
    parent => parent.isInSameHousehold
  );

  const parentValues =
    parents.value.length > 1 && hasParentInSameHousehold
      ? formatParents(parents.value)
      : parents.value;

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
            create: formatFieldArrayValues(parentValues),
          },
          physician: {
            create: formatCreateTypes(physician),
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
            create: formatCreateTypes(fieldValue as CreateTypes),
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

  console.log({ formattedValues, formattedQuestions });
  return {
    intakeFormValues: formattedValues,
    intakeFormQuestions: formattedQuestions,
  };
};

export default formatIntakePayload;
