/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
