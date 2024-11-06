"use client";

import FeedCard from "@/components/FeedCard";
import { Tweet } from "@/gql/graphql";
import { useGetAllTweets } from "@/hooks/tweet";

interface TweetsListProps {
  initialTweets: Tweet[];
}

export default function TweetsList({ initialTweets }: TweetsListProps) {
  const { tweets: clientTweets } = useGetAllTweets();

  const tweetsToRender = clientTweets || initialTweets;

  return (
    <>
      {tweetsToRender?.map((tweet) =>
        tweet ? <FeedCard key={tweet.id} data={tweet as Tweet} /> : null
      )}
    </>
  );
}
