/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      first_name
      last_name
      store {
        name
        resourceKey
      }
      location {
        lat
        lng
      }
      vehicles {
        name
        make
        model
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      username
      first_name
      last_name
      store {
        name
        resourceKey
      }
      location {
        lat
        lng
      }
      vehicles {
        name
        make
        model
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      username
      first_name
      last_name
      store {
        name
        resourceKey
      }
      location {
        lat
        lng
      }
      vehicles {
        name
        make
        model
      }
      createdAt
      updatedAt
    }
  }
`;
