import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CircleLoader } from '@f-design/component-library';

type PermissionsProps = {
  data: DataType;
};

type DataType = {
  permissions: PermissionType[];
};

type PermissionType = {
  id: string;
  name: string;
};

const GET_PERMISSIONS = gql`
  query permissions {
    permissions {
      id
      name
    }
  }
`;

const Permissions: FC<PermissionsProps> = (props: PermissionsProps) => {
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
      {data.permissions.map(({ id, name }: PermissionType) => (
        <span key={id}>{name}</span>
      ))}
    </div>
  );
};

export default Permissions;
