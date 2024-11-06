import { graphql } from "../../gql";

export const getAllTweetsQuery = graphql(`
    #graphql
    query getAllTweets {
        getAllTweets {
            id
            content
            imageURL
            createdAt
            author {
                id
                firstName
                lastName
                profileImageURL
            }
        }
    }
`)

export const getSignedURLForTweetQuery = graphql(`
    #graphql
    query GetSinedURL($imageName: String!, $imageType: String!) {
        getSignedURLForTweet(imageName: $imageName, imageType: $imageType)
    }    
`)