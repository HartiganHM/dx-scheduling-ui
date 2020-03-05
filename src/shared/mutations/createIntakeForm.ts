import gql from 'graphql-tag';

/*
* Input Example
{
  "input": {
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
