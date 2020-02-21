import gql from 'graphql-tag';

const CREATE_CLIENT = gql`
  mutation createClient($input: ClientCreateInput!) {
    createClient(input: $input) {
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
        dob
        isInSameHousehold
        address {
          id
          street
          city
          state
          zip
        }
      }
    }
  }
`;

export default CREATE_CLIENT;
