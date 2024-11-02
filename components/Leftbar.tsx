"use client"

import { BsThreeDots } from "react-icons/bs"
import { FaHashtag, FaRegBookmark, FaRegEnvelope, FaRegUser, FaTwitter } from "react-icons/fa6"
import { RiHome6Fill, RiNotification4Line } from "react-icons/ri"
import { IoSend } from "react-icons/io5";
import Image from "next/image"
import avatar from "/public/user.png"
import { useCurrentUser } from "@/hooks/user"

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

export const Leftbar = () =>{
    const {user} = useCurrentUser();
    return (
        <div className="col-span-2 h-screen py-5 relative">
        <div className=" rounded-full mx-auto sm:mx-0 overflow-hidden hover:bg-gray-800 w-fit transition-all cursor-pointer">
          <FaTwitter className="text-5xl my-auto p-2"/>
        </div>
        <div>
          <ul>
            {(sideBarBtnItems.map(item =>
            <li key={item.title} className="flex items-center sm:mx-0 mx-auto gap-2 sm:my-1 my-4 hover:bg-gray-900 hover:bg-opacity-60 w-fit py-2 px-3 rounded-xl transition-all ease-out duration-300 cursor-pointer">
              <span className="text-lg">{item.icon}</span>
              <span className="text-lg sm:block hidden">{item.title}</span>
            </li>))}
          </ul>
        </div>
        <button 
        className="bg-sky-500 sm:block hidden text-xl px-5 py-2 w-48  rounded-full my-4"
        onClick={() => console.log("Post button clicked")}>
              Post
        </button>
        <button 
        className="bg-sky-500 sm:hidden flex justify-center items-center text-xl w-11 h-11 py-2 mx-auto rounded-full my-4"
        onClick={() => console.log("Post button clicked")}>
              <IoSend className="-rotate-25"/>
        </button>
        {user && (
          <div className="bg-gray-900 bg-opacity-40 w-48 h-16 p-2 rounded-full sm:flex hidden gap-2 items-center absolute bottom-5">
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
    )
}