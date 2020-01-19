import React, { FunctionComponent } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, CircleLoader } from '@f-design/component-library';

type PermissionsProps = {};

const GET_PERMISSIONS = gql`
  query permissions {
    permissions {
      id
      name
    }
  }
`;

const Permissions: FunctionComponent<PermissionsProps> = (
  props: PermissionsProps
) => {
  const { loading, error, data } = useQuery(GET_PERMISSIONS, {
    displayName: 'permissionsData',
  });
  console.log(props);
  console.log({ loading, error, data });

  if (loading) {
    return <CircleLoader />;
  }

  return (
    <div className="permissions">
      <Button type="brand" onClick={(): void => console.log('butt')}>
        Hi!
      </Button>
    </div>
  );
};

export default Permissions;
