"use client"
import Image from "next/image";
import BookmarkCard from "./BookmarkCard";
import { useGetUserBookmarks } from "@/hooks/user"
import { Tweet } from "@/gql/graphql";

export const Bookmarks = () => {
    const { data, isError, isLoading, bookmarks} = useGetUserBookmarks();

    if(isLoading) return <p>Loading Bookmarks...</p>
    if(isError) return <p>Bookmarks ERROR</p>

    
    return (
        <>
            {bookmarks?.map((bookmark) =>
                bookmark ? <BookmarkCard key={bookmark?.id} data={bookmark as Tweet} /> : null
            )}
        </>
    )
}