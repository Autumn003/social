"use client"

import React, { useCallback } from "react";
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
    const queryClient = useQueryClient();

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

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2"></div>
      <div className="col-span-2 h-screen py-5">
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
        className="bg-blue-600  text-xl px-5 py-2 w-48  rounded-full my-4"
        onClick={() => console.log("Post button clicked")}>
              Post
        </button>
      </div>
      <div className="col-span-4 border-x border-gray-800 h-screen overflow-y-scroll no-scrollbar">
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
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
