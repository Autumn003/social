'use client'

import { useCurrentUser } from "@/hooks/user";
import Image from "next/image"
import avatar from "@/public/user.png"
import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { useCreateTweet } from "@/hooks/tweet";
import toast from "react-hot-toast";


export default function CreatePost () {
    const {user} = useCurrentUser();
    const { mutate } = useCreateTweet();

    const [content, setContent] = useState("");


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
    )
}