"use client"

import React, { useCallback, useState } from "react";
import { FaTwitter } from "react-icons/fa6";
import { RiHome6Fill } from "react-icons/ri";
import { FaHashtag } from "react-icons/fa6";
import { RiNotification4Line } from "react-icons/ri";
import { FaRegEnvelope } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image"
import avatar from "/public/user.png"
import { FaImage } from "react-icons/fa6";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";

  interface sideBarBtn {
    title: string;
    link: string;
    icon: React.ReactNode;
  }

  const sideBarBtnItems: sideBarBtn[] = [
    {
      title: "Home",
      link: "/",
      icon: <RiHome6Fill />,
    },
    {
      title: "Explore",
      link: "/",
      icon: <FaHashtag />,
    },
    {
      title: "Notifications",
      link: "/",
      icon: <RiNotification4Line />,
    },
    {
      title: "Messages",
      link: "/",
      icon: <FaRegEnvelope />,
    },
    {
      title: "Bookmarks",
      link: "/",
      icon: <FaRegBookmark />,
    },
    {
      title: "Profile",
      link: "/",
      icon: <FaRegUser />,
    },
    {
      title: "More",
      link: "/",
      icon: <BsThreeDots />,
    },
  ]


export default function Home() {    
    const {user} = useCurrentUser();
    const {tweets = []} = useGetAllTweets();
    const { mutate } = useCreateTweet();

    const queryClient = useQueryClient();
    const [content, setContent] = useState("");
  
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if(!googleToken) return toast.error("Google token not found");

      const { verifyGoogleToken } = await graphQLClient.request(verifyUserGoogleTokenQuery, {token: googleToken});

      toast.success("Verified Success");
      console.log(verifyGoogleToken);
      
      if(verifyGoogleToken){
        window.localStorage.setItem("social_token", verifyGoogleToken);
      }
      await queryClient.invalidateQueries({queryKey: ["curent-user"]})
      
    }, [queryClient]
  )

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
  }

  const handleCreatePost = () => {
    if(!content) return toast.error("Please enter something to post");
    mutate({
      content,
    })
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2"></div>
      <div className="col-span-2 h-screen py-5 relative">
        <div className=" rounded-full overflow-hidden hover:bg-gray-800 w-fit transition-all cursor-pointer">
          <FaTwitter className="text-5xl my-auto p-2"/>
        </div>
        <div>
          <ul>
            {(sideBarBtnItems.map(item =>
            <li key={item.title} className="flex items-center gap-2 my-1 hover:bg-gray-900 hover:bg-opacity-60 w-fit py-2 px-3 rounded-xl transition-all ease-out duration-300 cursor-pointer">
              <span className="text-lg">{item.icon}</span>
              <span className="text-lg">{item.title}</span>
            </li>))}
          </ul>
        </div>
        <button 
        className="bg-sky-500  text-xl px-5 py-2 w-48  rounded-full my-4"
        onClick={() => console.log("Post button clicked")}>
              Post
        </button>
        {user && (
          <div className="bg-gray-900 bg-opacity-40 w-48 h-16 p-2 rounded-full flex gap-2 items-center absolute bottom-5">
            <Image 
            src={user?.profileImageURL || avatar}
            alt="user"
            width={40}
            height={40}
            className="rounded-full"
            />

            <div className="">
              <p className="">{
                user?.firstName && user?.lastName ? 
                user.firstName.length + user.lastName.length <= 12 ? 
                `${user.firstName} ${user.lastName}` :
                `${user.firstName} ${user.lastName}`.slice(0, 10) + "..." : ""
                }</p>
              <p className="text-gray-600">@username</p>
            </div>

          </div>
        )}
      </div>
      <div className="col-span-4 border-x border-gray-800 h-screen overflow-y-scroll no-scrollbar">
        


      <div className="grid grid-cols-12 p-2 border-b border-gray-900 hover:bg-opacity-20 hover:bg-stone-900 cursor-pointer transition-all ease-linear duration-200">
                <div className=" col-span-2 mx-auto">
                    <Image
                    src={user?.profileImageURL || avatar}
                    width={40}
                    height={40}
                    alt="avatar"
                    className="rounded-full"
                    />
                </div>
                <div className="col-span-10">
                    <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="What's happening?"
                    className="w-full p-2 border-b border-gray-800 bg-transparent focus:outline-none tracking-wider font-sans"
                    rows={3}
                    ></textarea>
                    <div className="flex items-center justify-between">
                      <button 
                      onClick={handleImageClick}
                      className="my-2 hover:bg-gray-900 p-3 rounded-full transition-all duration-200"
                      ><FaImage/>
                      </button>
                      <button
                      onClick={handleCreatePost}
                      className="bg-sky-500 mx-5 w-16 h-8 text-center rounded-full hover:bg-sky-600 transition-all duration-200">Post</button>
                    </div>
                </div>
            </div>


        {
          tweets?.map(tweet => tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet}/> : null)
        }
      </div>
      <div className="col-span-2 h-screen p-4 text-center">
      {user === null ? (<div>
          <h1 className="font-semibold text-xl mb-5 mt-2">Sign In</h1>
          <GoogleLogin onSuccess={handleLoginWithGoogle}/>
        </div>): <div></div> }
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}
