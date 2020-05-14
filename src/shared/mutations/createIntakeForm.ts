import { gql } from '@apollo/client';

/*
* Input Example
{
  "input": {
    "intakeFormValues": {
      "create": {
          "date": String!
          "servicesRequested": {
            "set": [String!]
          },
          "client": {
            "create": {
              "firstName": String!
              "lastName": String!
              "dob": String!
              "gender": String!
              "school": String!
              "grade": String!
              "parents": {
                "create": [
                  {
                    "firstName": String!
                    "lastName": String!
                    "phoneNumber": String!
                    "email": String!
                    "isInSameHousehold": Boolean!,
                    "address": {
                      "create": {
                        "street": String!
                        "city": String!
                        "state": String!
                        "zip": String!
                      }
                    }
                  }
                ]
              },
              "insurances": {
                "create": {
                  "idNumber": String!
                  "groupNumber": String!
                  "provider": String!
                  "insured": String!
                }
              },
              "physician": {
                "create": {
                  "firstName": String!
                  "lastName": String!
                  "practice": String!
                  "phoneNumber": String!
                }
              }
            }
          }
        }
      }
    intakeFormQuestions": {
      "create": {
        "creditCardInfoSaved": Boolean!
        "ratesDiscussed": Boolean!
        "preferredTimes": String!
        "needs": String!
        "hasReferral": Boolean!
        "priorTherapy": String!
        "schoolSupport": String!
        "priorTreatments": String!
        "referralConcernMatch": Boolean
        "diagnosis": {
          "create": {
            "name": String!
            "provider": String!
            "date": String!
            "comments": String!
          }
        },
        "referral": {
          "create": {
            "firstName": String!
            "lastName": String!
          }
        },
        "concerns": {
          "create": {
            "areas": String
            "communication": String
            "motor": String
            "sensory": String
            "cognitive": String
          }
        }
      }
    }
  }
}
*/

const CREATE_INTAKE_FORM = gql`
  mutation createIntakeFormValues($input: IntakeFormValuesCreateInput!) {
    createIntakeFormValues(input: $input) {
      id
      date
      servicesRequested
      client {
        id
        firstName
        lastName
        dob
        gender
        school
        grade
        parents {
          id
          firstName
          lastName
          phoneNumber
          email
          isInSameHousehold
          address {
            id
            street
            city
            state
            zip
          }
        }
        insurances {
          id
          idNumber
          groupNumber
          provider
          insured
        }
        physician {
          id
          firstName
          lastName
          practice
          phoneNumber
        }
      }
    }
  }
`;

export default CREATE_INTAKE_FORM;
