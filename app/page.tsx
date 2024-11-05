import FeedCard from "@/components/FeedCard";
import { Tweet } from "@/gql/graphql";
import { fetchAllTweets } from "@/src/actions/postActions";
import CreatePost from "@/components/CreatePost";


export default async function Home() {
    const tweets = await fetchAllTweets();
    return (
      <div className="xl:col-span-4 md:col-span-7 col-span-10 border-x border-gray-800 h-screen overflow-y-scroll no-scrollbar">
        <CreatePost/>
          {
            tweets?.map(tweet => tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet}/> : null)
          }
      </div>
    );
}