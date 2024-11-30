"use client"
import Image from "next/image";
import BookmarkCard from "./BookmarkCard";
import { useGetUserBookmarks } from "@/hooks/user"
import { Tweet } from "@/gql/graphql";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter }  from "next/navigation";


export const Bookmarks = () => {
    const { data, isError, isLoading, bookmarks} = useGetUserBookmarks();
    const router = useRouter();

    if(isLoading) return <p>Loading Bookmarks...</p>
    if(isError) return <p>Bookmarks ERROR</p>

    
    return (
        <>
            <div className="flex items-center gap-4 my-2">
                <button
                onClick={() => router.back()}
                className="text-lg hover:bg-neutral-800 transition-all ease-linear p-2 m-2 rounded-full">
                    <FaArrowLeft />
                </button>
                <p className="text-lg font-semibold">
                    Bookmarks
                </p>
            </div>
            {bookmarks?.map((bookmark) =>
                bookmark ? <BookmarkCard key={bookmark?.id} data={bookmark as Tweet} /> : null
            )}
        </>
    )
}