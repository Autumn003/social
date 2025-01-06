
import { IoArrowBackOutline } from "react-icons/io5";
import { PiCalendarDotsLight } from "react-icons/pi";
import Image from "next/image"
import avatar from "@/public/user.png"
import FeedCard from "@/components/FeedCard";
import { Tweet } from "@/gql/graphql";
import { fetchUserInfo } from "@/src/actions/userActions";
import React from "react";
import { notFound } from "next/navigation";
import FollowBtn from "@/components/FollowBtn";


export default async function Profile({ params }:{params: {id: string}}){
    const { id } = await params
    const user = await fetchUserInfo(id);
    
    if(!user) return notFound(); 

    const userJoinedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
        : 'Unknown';

    return (
        <div className="xl:col-span-5 md:col-span-7 col-span-10 border-x border-gray-800 h-screen overflow-y-scroll no-scrollbar">
            <div className="flex p-2 gap-3 items-center">
                <button  className="text-xl hover:bg-gray-900 transition-all duration-200 ease-linear flex items-center justify-center w-10 h-10 rounded-full">
                    <IoArrowBackOutline/>
                </button>
                <div>
                    <h1 className="text-xl font-semibold">{user?.firstName} {user?.lastName}</h1>
                    <p className="text-gray-700">Software Engineer</p>
                </div>
            </div>
            <div className="relative">
                <Image
                src={"https://media.istockphoto.com/id/2065674519/photo/rolling-says-macro.jpg?s=1024x1024&w=is&k=20&c=ZRzdKZTGsNQqzQ4HpvVsrWT1BL9NjKmB76pIteut-xs="}
                alt="Background Image"
                width={450}
                height={300}
                className="h-36 object-cover w-full"
                />
                <Image
                src={user?.profileImageURL || avatar}
                alt="Avatar"
                width={90}
                height={90}
                className="absolute -bottom-10 p-[1.5px] from-blue-500  via-emerald-600 to-fuchsia-600 bg-gradient-to-br rounded-full mx-5"
                />
            </div>
            <div className="mt-10 px-4 border-b border-gray-800">
                <h1 className="text-xl font-semibold">{user?.firstName} {user?.lastName}</h1>
                <p className="text-gray-700">@username</p>
                <div className="flex items-center gap-2 my-5">
                    <PiCalendarDotsLight className="text-gray-700 text-lg"/>
                    <p className="text-gray-700">Joined <span>{userJoinedDate}</span></p>
                </div>
                <div className="flex justify-between my-3 items-center">
                    <div className="flex gap-3">
                        <p><span>{user.followers?.length}</span> followers</p>
                        <p><span>{user.followings?.length}</span> followings</p>
                    </div>
                    <FollowBtn id={user.id}/>
                </div>
            </div>
            {
                user?.tweets
                    ?.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map(tweet => tweet ? <FeedCard key={tweet.id} data={tweet as Tweet}/> : null)
            }

        </div>
    )
}