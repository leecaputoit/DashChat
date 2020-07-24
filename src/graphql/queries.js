/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
        id
        username
        first_name
        last_name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
