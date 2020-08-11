/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      createdAt
      first_name
      id
      last_name
      location {
        lat
        lng
        averageSpeed
        lastTimeUpdated
      }
      store {
        name
        resourceKey
      }
      updatedAt
      username
      vehicles {
        make
        model
        name
        licensePlateNumber
      }
      awsIdentityId
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      createdAt
      first_name
      id
      last_name
      location {
        lat
        lng
        averageSpeed
        lastTimeUpdated
      }
      store {
        name
        resourceKey
      }
      updatedAt
      username
      vehicles {
        make
        model
        name
        licensePlateNumber
      }
      awsIdentityId
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      createdAt
      first_name
      id
      last_name
      location {
        lat
        lng
        averageSpeed
        lastTimeUpdated
      }
      store {
        name
        resourceKey
      }
      updatedAt
      username
      vehicles {
        make
        model
        name
        licensePlateNumber
      }
      awsIdentityId
    }
  }
`;
