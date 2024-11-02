import React from "react"
import Image from "next/image"
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaRetweet } from "react-icons/fa6";
import { HiOutlineShare } from "react-icons/hi";
import { Tweet } from "@/gql/graphql";
import avatar from "@/public/user.png"


interface feedCardProp {
    data: Tweet
}


const FeedCard: React.FC<feedCardProp> = (props) => {
    const { data } = props;
    return (
        <>
            <div className="grid grid-cols-12 p-2 border-b border-gray-900 hover:bg-opacity-20 hover:bg-stone-900 cursor-pointer transition-all ease-linear duration-200">
                <div className=" col-span-2 mx-auto">
                    <Image
                    src={data.author?.profileImageURL || avatar}
                    width={40}
                    height={40}
                    alt="avatar"
                    className="rounded-full"
                    />
                </div>
                <div className="col-span-10">
                    <div className="font-semibold">{data.author?.firstName} {data.author?.lastName}</div>
                    <div>
                        {data.content}
                    </div>
                    <div className="flex w-fit sm:gap-14 gap-10 mt-1">
                        <div className="h-8 w-8 flex justify-center rounded-full items-center hover:bg-pink-400 hover:bg-opacity-30 hover:text-pink-600 transition-all cursor-pointer duration-200 ease-linear">
                            <FaRegHeart className="text-lg "/>

                        </div>
                        <div className="h-8 w-8 flex justify-center rounded-full items-center hover:bg-sky-400 hover:bg-opacity-30 hover:text-sky-400 transition-all cursor-pointer duration-200 ease-linear">
                            <FaRegComment className="text-lg "/>
                        </div>
                        <div className="h-8 w-8 flex justify-center rounded-full items-center hover:bg-teal-300 hover:bg-opacity-30 hover:text-teal-400 transition-all cursor-pointer duration-200 ease-linear">
                            <FaRetweet className="text-lg "/>
                        </div>
                        <div className="h-8 w-8 flex justify-center rounded-full items-center hover:bg-sky-400 hover:bg-opacity-30 hover:text-blue-500 transition-all cursor-pointer duration-200 ease-linear">
                            <HiOutlineShare className="text-lg "/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeedCard;