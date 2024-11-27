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
            <div className="flex flex-col items-center bg-gradient-to-br from-indigo-900 via-sky-950 to-violet-900 bg p-2 w-full hover:scale-95 duration-200 h-64 rounded-lg overflow-y-scroll no-scrollbar">
                <h1 className="text-xl font-semibold border-b mb-4 w-fit mx-auto">You may know</h1>
                {user && user.recommendations?.map((recommendedUser) => {
                    const fullname = `${recommendedUser?.firstName} ${recommendedUser?.lastName}`;
                    return (
                        <div
                        key={recommendedUser?.id}
                        className="w-fit my-2 bg-gradient-to-br from-sky-500 via-teal-400 to-indigo-500 hover:scale-110 hover:-translate-y-2 duration-200 rounded-xl p-px "
                        >
                            <Link
                            href={`/${recommendedUser?.id}`}
                            className="bg-neutral-950 duration-200 ease-linear bg-opacity-90 w-60 flex items-center justify-start gap-2 rounded-xl p-2">
                                <Image
                                src={recommendedUser?.profileImageURL || avatar}
                                alt="user"
                                width={50}
                                height={50}
                                className="rounded-full border p-px"
                                />
                                <div className="h-full flex flex-col items-start ">
                                    <p className="">
                                        {
                                            fullname.length <= 15 ? fullname : `${fullname.slice(0, 15)}...`
                                        }
                                    </p>
                                    <p className="text-gray-500">@username</p>
                                </div>
                            </Link>
                        </div>
                    )}
                )}
            </div>
        </div>
    )
}