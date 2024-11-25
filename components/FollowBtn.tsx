"use client"

import { graphQLClient } from "@/clients/api";
import { followUserMutation, unfollowUserMutation } from "@/graphql/mutation/user";
import { useCurrentUser, useGetUserById } from "@/hooks/user"
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";


export default function FollowBtn({id}: {id:string}) {
    const {user} = useGetUserById(id);
    const {user: currentUser} = useCurrentUser();
    const queryClient = useQueryClient();

    const amIFollowing = useMemo(() => {
        if (!user) return false;
        return (
          (currentUser?.followings?.findIndex(
            (el) => el?.id === user?.id
          ) ?? -1) >= 0
        );
      }, [currentUser?.followings, user]);

    const handleFollowUser = useCallback(async () => {
        if (!user?.id) return;

        await graphQLClient.request(followUserMutation, { to: user?.id });
        await queryClient.invalidateQueries({queryKey: ["curent-user"]})
    }, [user?.id, queryClient]);
    
    const handleUnfollowUser = useCallback(async () => {
        if (!user?.id) return;

        await graphQLClient.request(unfollowUserMutation, { to: user?.id });
        await queryClient.invalidateQueries({queryKey: ["curent-user"]})
    }, [user?.id, queryClient]);
    
    
    if(user?.id === currentUser?.id) return null;

    return (
        <>
            <button
            className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
            onClick={amIFollowing ? handleUnfollowUser : handleFollowUser}
            >

            <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                <span>
                {
                    amIFollowing ? "Unfollow" : "Follow"
                }
                </span>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
        </>
    )
}