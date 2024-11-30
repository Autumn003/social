import React from "react"
import Image from "next/image"
import { FaRegComment } from "react-icons/fa";
import { FaBookmark, FaRegBookmark, FaRegHeart } from "react-icons/fa6";
import { HiOutlineShare } from "react-icons/hi";
import { Tweet } from "@/gql/graphql";
import avatar from "@/public/user.png"
import Link from "next/link";
import { useCreateBookmark, useCurrentUser, useDeleteBookmark } from "@/hooks/user";
import { useGetAllTweets } from "@/hooks/tweet";


interface feedCardProp {
    data: Tweet
}


const FeedCard: React.FC<feedCardProp> = (props) => {
    const { data } = props;
    const { mutate } = useCreateBookmark();
    const { mutate: deleteBookmark } = useDeleteBookmark();
    const { user } = useCurrentUser();

    const isBookmarked = data.bookmarkedBy?.some(
        (bookmarkUser) => bookmarkUser?.id === user?.id
    );
    
    console.log("User has bookmarked this post:", isBookmarked);

    const postCreatedDate = data.createdAt
        ? new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Unknown';

    const handleAddBookmark = () => {
        if(!data.id) return;
        
        mutate(data.id);
    }

    const handleDeleteBookmark = async() => {
        if (!data.id) return;

        deleteBookmark(data.id);
    }


    return (
        <>
            <div className="grid grid-cols-12 p-2 border-b border-gray-900 hover:bg-opacity-20 hover:bg-stone-900 cursor-pointer transition-all ease-linear duration-200">
                <Link href={`/${data.author?.id}`} className=" col-span-2 md:col-span-1 mx-auto">
                    <Image
                    src={data.author?.profileImageURL || avatar}
                    width={40}
                    height={40}
                    alt="avatar"
                    className="rounded-full w-8 md:w-10"
                    />
                </Link>
                <div className="col-span-10">
                    <Link href={`/${data.author?.id}`} className="font-semibold">
                        {data.author?.firstName} {data.author?.lastName}
                    </Link>
                    <p className="text-sm text-gray-600">{postCreatedDate}</p>
                    <div className="my-2">
                        {data.content}
                        {
                            data.imageURL && 
                            <Image
                                src={data.imageURL}
                                alt="Post Image"
                                width={300}
                                height={200}
                                className="my-1 w-56 sm:w-72 md:w-full rounded-lg"
                            />
                        }
                    </div>
                    <div className="flex w-fit sm:gap-14 gap-10 mt-1">
                        <div className="h-8 w-8 flex justify-center rounded-full items-center hover:bg-pink-400 hover:bg-opacity-30 hover:text-pink-600 transition-all cursor-pointer duration-200 ease-linear">
                            <FaRegHeart className="text-lg "/>

                        </div>
                        <div className="h-8 w-8 flex justify-center rounded-full items-center hover:bg-sky-400 hover:bg-opacity-30 hover:text-sky-400 transition-all cursor-pointer duration-200 ease-linear">
                            <FaRegComment className="text-lg "/>
                        </div>
                        <div className="h-8 w-8 flex justify-center rounded-full items-center hover:bg-teal-300 hover:bg-opacity-30 hover:text-teal-400 transition-all cursor-pointer duration-200 ease-linear">
                            <HiOutlineShare className="text-lg "/>
                        </div>
                        <button
                        onClick={() => isBookmarked ? handleDeleteBookmark() : handleAddBookmark()}
                        className="h-8 w-8 flex justify-center rounded-full items-center hover:bg-neutral-300 hover:bg-opacity-30 hover:text-neutral-300 transition-all cursor-pointer duration-200 ease-linear">
                            {isBookmarked ? <FaBookmark className="text-lg "/> : <FaRegBookmark className="text-lg "/>}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeedCard;