'use client'

import { useCurrentUser } from "@/hooks/user";
import Image from "next/image"
import avatar from "@/public/user.png"
import { useCallback, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { useCreateTweet } from "@/hooks/tweet";
import toast from "react-hot-toast";
import { graphQLClient } from "@/clients/api";
import { getSignedURLForTweetQuery } from "@/graphql/query/tweet";
import axios from "axios";
import { Button } from "./Button";
import { motion } from "motion/react";


export default function CreatePost () {
    const {user} = useCurrentUser();
    const { mutateAsync } = useCreateTweet();

    const [content, setContent] = useState("");
    const [imageURL, setImageURL] = useState("");

    const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
        return async (event: Event) => {
            event.preventDefault();
            const file: File | null | undefined = input.files?.item(0);
            if (!file) return;
      
            const { getSignedURLForTweet } = await graphQLClient.request(
              getSignedURLForTweetQuery,
              {
                imageName: file.name,
                imageType: file.type,
              }
            );
      
            if (getSignedURLForTweet) {
              toast.loading("Uploading...", { id: "2" });
              await axios.put(getSignedURLForTweet, file, {
                headers: {
                  "Content-Type": file.type,
                },
              });
              toast.success("Upload Completed", { id: "2" });
              const url = new URL(getSignedURLForTweet);
              const myFilePath = `${url.origin}${url.pathname}`;
              setImageURL(myFilePath);
            }
          };
    },[])

    const handleSelectImage = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
    
        const handlerFn = handleInputChangeFile(input);
    
        input.addEventListener("change", handlerFn);
    
        input.click();
    }, [handleInputChangeFile]);

    const handleCreatePost = async() => {
        if(!content) return toast.error("Please enter something to post");
        await mutateAsync({
        content,
        imageURL
        })
        setContent("");
        setImageURL("");
    }

    const textareaAnimate = {
      focus: {  backdropFilter: "blur(8px)",
        scale: 1.1,
        transition: { duration: 0.15 } 
      },
    }

    return (
        <div className="grid grid-cols-12 p-2 border-b border-gray-900 hover:bg-opacity-20 hover:bg-stone-900 cursor-pointer transition-all ease-linear duration-200">
            <div
            
            className=" col-span-2 md:col-span-1 mx-auto">
                <Image
                src={user?.profileImageURL || avatar}
                width={40}
                height={40}
                alt="avatar"
                className="rounded-full w-8 md:w-10"
                />
            </div>
            <div className="col-span-10 md:col-span-11 mr-4">
                <motion.textarea
                whileFocus='focus'
                variants={textareaAnimate}
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="What's happening?"
                className="w-full p-2 border-b border-gray-800 bg-transparent focus:outline-none tracking-wider font-sans rounded-lg"
                rows={3}
                ></motion.textarea>
                {
                    imageURL && <Image src={imageURL} alt="Post Image" width={300} height={300} />
                }
                <div className="flex items-center justify-between">
                <button 
                onClick={handleSelectImage}
                className="my-2 hover:bg-gray-900 p-3 rounded-full transition-all duration-200"
                ><FaImage/>
                </button>
                <Button 
                  placeholder="Post"
                  onClick={handleCreatePost}
                />
                </div>
            </div>
        </div>
    )
}
