"use client"

import { IoArrowBackOutline } from "react-icons/io5";
import { PiCalendarDotsLight } from "react-icons/pi";
import Image from "next/image"
import { useCurrentUser } from "@/hooks/user";
import avatar from "@/public/user.png"
import FeedCard from "@/components/FeedCard";
import { Tweet } from "@/gql/graphql";

export default function Profile(){
    const {user} = useCurrentUser();

    const formattedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
        : 'Unknown';

    return (
        <div className="xl:col-span-4 md:col-span-7 col-span-10 border-x border-gray-800 h-screen overflow-y-scroll no-scrollbar">
            <div className="flex p-2 gap-3 items-center">
                <button className="text-xl hover:bg-gray-900 transition-all duration-200 ease-linear flex items-center justify-center w-10 h-10 rounded-full">
                    <IoArrowBackOutline/>
                </button>
                <div>
                    <h1 className="text-xl font-semibold">Hemant Sharma</h1>
                    <p className="text-gray-700">Software Engineer</p>
                </div>
            </div>
            <div className="relative">
                <Image
                src={"https://media.istockphoto.com/id/2065674519/photo/rolling-says-macro.jpg?s=1024x1024&w=is&k=20&c=ZRzdKZTGsNQqzQ4HpvVsrWT1BL9NjKmB76pIteut-xs="}
                alt="Background Image"
                width={450}
                height={300}
                objectFit="cover"
                className="h-36 object-cover"
                />
                <Image
                src={user?.profileImageURL || avatar}
                alt="Avatar"
                width={90}
                height={90}
                className="absolute -bottom-10 p-1 bg-gray-900 rounded-full mx-5"
                />
            </div>
            <div className="mt-10 px-4 border-b border-gray-800">
                <h1 className="text-xl font-semibold">Hemant Sharma</h1>
                <p className="text-gray-700">@username</p>
                <div className="flex items-center gap-2 my-5">
                    <PiCalendarDotsLight className="text-gray-700 text-lg"/>
                    <p className="text-gray-700">Joined <span>{formattedDate}</span></p>
                </div>
            </div>
            {
                user?.tweets?.map(tweet => tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet}/> : null)
            }
        </div>
    )
}