"use client"

import { BsThreeDots } from "react-icons/bs"
import { FaHashtag, FaRegBookmark, FaRegEnvelope, FaRegUser, FaTwitter } from "react-icons/fa6"
import { RiHome6Fill, RiNotification4Line } from "react-icons/ri"
import { IoSend } from "react-icons/io5";
import Image from "next/image"
import avatar from "/public/user.png"
import { useCurrentUser } from "@/hooks/user"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import Link from "next/link";

interface sideBarBtn {
    title: string;
    link: string;
    icon: React.ReactNode;
  }

export const Leftbar = () =>{
    const {user} = useCurrentUser();
    const queryClient = useQueryClient();

    const sideBarBtnItems: sideBarBtn[] = useMemo(()=> 
      [
        {
          title: "Home",
          link: "/",
          icon: <RiHome6Fill />,
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
          link: "/bookmarks",
          icon: <FaRegBookmark />,
        },
        {
          title: "Profile",
          link: `${user?.id}`,
          icon: <FaRegUser />,
        },
        {
          title: "More",
          link: "/",
          icon: <BsThreeDots />,
        },
      ],
      [user?.id]
    )

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
        <div className="xl:col-span-2 md:col-span-3 col-span-2 h-screen py-5 relative">
        <div className=" rounded-full mx-auto md:mx-0 overflow-hidden hover:bg-neutral-900 w-fit transition-all cursor-pointer">
          <FaTwitter className="text-5xl my-auto p-2"/>
        </div>
        <div>
          <ul>
            {(sideBarBtnItems.map(item =>
            <li key={item.title} >
              <Link
              href={item.link}
              className="flex items-center md:mx-0 mx-auto gap-2 md:my-1 my-4 hover:bg-neutral-900 hover:bg-opacity-60 w-fit py-2 px-3 rounded-xl transition-all ease-out duration-300 cursor-pointer"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-lg md:block hidden">{item.title}</span>
              </Link>
            </li>))}
          </ul>
        </div>
        <button 
        className="bg-sky-500 md:block hidden text-xl px-5 py-2 w-48  rounded-full my-4"
        onClick={() => console.log("Post button clicked")}>
              Post
        </button>
        <button 
        className="bg-sky-500 md:hidden flex justify-center items-center text-xl w-11 h-11 py-2 mx-auto rounded-full my-4"
        onClick={() => console.log("Post button clicked")}>
              <IoSend className="-rotate-25"/>
        </button>
        {user ? (
          <div className="w-full flex justify-center md:justify-normal">
          <div className="bg-neutral-800 bg-opacity-40 md:w-48 md:h-16 md:p-2 p-1 rounded-full flex gap-2 items-center absolute bottom-5 ">
            
              <Image 
              src={user?.profileImageURL || avatar}
              alt="user"
              width={40}
              height={40}
              className="rounded-full"
              />

              <div className="md:block hidden">
                <p className="">{
                  user?.firstName && user?.lastName ? 
                  user.firstName.length + user.lastName.length <= 12 ? 
                  `${user.firstName} ${user.lastName}` :
                  `${user.firstName} ${user.lastName}`.slice(0, 10) + "..." : ""
                  }</p>
                <p className="text-gray-600">@username</p>
              </div>
            </div>
          </div>
) : 
(
  <div className="w-full flex items-center justify-center">
    <div className="md:hidden blok absolute bottom-5 ">
      <GoogleLogin
      shape="circle"
      type="icon"
      onSuccess={handleLoginWithGoogle}/>
    </div>
    <div className="md:flex hidden absolute justify-center items-center bottom-5 left-0 h-16 w-48">
      <GoogleLogin
      size="large"
      type="standard"
      width={24}
      text="continue_with"
      shape="pill"
      onSuccess={handleLoginWithGoogle}/>
    </div>
  </div>
)
}

      </div>
    )
}