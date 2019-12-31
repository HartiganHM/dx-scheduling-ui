import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, CircleLoader } from '@f-design/component-library';

const GET_PERMISSIONS = gql`
  query permissions {
    permissions {
      id
      name
    }
  }
`;

const Permissions = (props) => {
  const { loading, error, data } = useQuery(GET_PERMISSIONS, { displayName: 'permissionsData' });
  console.log(props);
  console.log({ loading, error, data })

  if (loading) {
    return <CircleLoader />
  }

  return (
    <div className="permissions">
      <Button type="destructive">Hi!</Button>
    </div>
  )
}

export default Permissions;