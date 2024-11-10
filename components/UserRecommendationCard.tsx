"use client"
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import avatar from "@/public/user.png"
import Link from "next/link";


export default function UserRecommendationCard() {
    const {user} = useCurrentUser();
    if(user && user?.recommendations?.length === 0 || undefined)
        return null;
    return(
        <div>
            <div className="bg-gray-900 p-2 w-56 h-64 rounded-lg overflow-y-scroll no-scrollbar">
                <h1 className="text-lg font-semibold border-b mb-4 w-fit mx-auto">Users you may know</h1>
                {user && user.recommendations?.map((recommendedUser) => {
                    return (
                        <div
                        key={recommendedUser?.id}
                        className="bg-gray-800 flex items-center gap-2 rounded-md p-2"
                        >
                            <Image
                            src={recommendedUser?.profileImageURL || avatar}
                            alt="user"
                            width={50}
                            height={50}
                            className="rounded-full"
                            />
                            <div className="h-full">
                                <p
                                className="mb-2"
                                >{recommendedUser?.firstName} {recommendedUser?.lastName}</p>
                                <Link
                                href={`/${recommendedUser?.id}`}
                                className="bg-white text-black px-2 py-1 rounded-lg"
                                >View</Link>
                            </div>
                        </div>
                    )}
                )}
            </div>
        </div>
    )
}