"user server"

import { graphQLClient } from "@/clients/api"
import { Tweet } from "@/gql/graphql";
import { getAllTweetsQuery } from "@/graphql/query/tweet"
import { notFound } from "next/navigation";

export const fetchAllTweets = async() => {
    try {
        const { getAllTweets } = await graphQLClient.request( getAllTweetsQuery );
        if(!getAllTweets) return notFound();
    
        return getAllTweets as Tweet[];
    } catch (error) {
        console.error("Error fetching Tweets:", error);
        return notFound();
    }

}