import { fetchAllTweets } from "@/src/actions/postActions";
import CreatePost from "@/components/CreatePost";
import TweetsList from "@/components/TweetsList";

export default async function Home() {
  const initialTweets = await fetchAllTweets();
  
  return (
    <div className="xl:col-span-5 md:col-span-7 col-span-10 border-x border-gray-800 h-screen overflow-y-scroll no-scrollbar">
      <CreatePost />
      <TweetsList initialTweets={initialTweets} />
    </div>
  );
}
