import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
    #graphql
    query verifyUserGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }
`);

export const getCurrentUserQuery = graphql(`
    #graphql
    query getCurrentUser {
        getCurrentUser{
            id
            email
            firstName
            lastName
            profileImageURL
            createdAt
            followers {
              id
              firstName
              lastName
              profileImageURL
            }
            followings {
              id
              firstName
              lastName
              profileImageURL
            }
            tweets{
                id
                content
                imageURL
                author {
                    id
                    firstName
                    lastName
                    profileImageURL
                }
            }
        }
    }
`)


export const getUserByIdQuery = graphql(`
    #graphql
    query getUserById($id: String!) {
        getUserById(id: $id) {
            id
            firstName
            lastName
            profileImageURL
            createdAt
            followers {
              id
              firstName
              lastName
              profileImageURL
            }
            followings {
              id
              firstName
              lastName
              profileImageURL
            }
            tweets {
                id
                content
                imageURL
                createdAt
                author {
                    firstName
                    lastName
                    profileImageURL
                }
            }
        }
    }    
`)