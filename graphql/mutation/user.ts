import { graphql } from "@/gql";


export const followUserMutation = graphql(`
    #graphql
    mutation FollowUser($to: String!) {
        followUser(to: $to)
    }
`);

export const unfollowUserMutation = graphql(`
    #graphql
    mutation UnfollowUser($to: String!) {
        unfollowUser(to: $to)
    }
`);

export const createBookmarkMutaion = graphql(`
    #graphql
    mutation createBookmark($tweetId: String!) {
        createBookmark(tweetId: $tweetId) {
            id
        }
    }
`);

export const deleteBookmarkMutaion = graphql(`
    #graphql
    mutation deleteBookmark($tweetId: String!) {
        deleteBookmark(tweetId: $tweetId)
    }
`);
